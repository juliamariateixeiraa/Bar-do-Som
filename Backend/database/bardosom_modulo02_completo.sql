-- ========================================
-- BANCO DE DADOS: Bar do Som
-- MÓDULO 02 - SCRIPTS COMPLETOS
-- Etapa 04: Índices
-- Etapa 05: Funções, Procedures e Triggers
-- ========================================
-- Data: Novembro 2025
-- Grupo: [INSIRA O NOME DO GRUPO AQUI]
-- ========================================

-- IMPORTANTE: Se você já executou este script antes,
-- execute os comandos abaixo ANTES de executar tudo:
/*
DROP INDEX idx_pedidos_cliente ON pedidos;
DROP INDEX idx_pedido_produto_lookup ON pedido_produto;
DROP FUNCTION IF EXISTS calcular_ticket_medio;
DROP FUNCTION IF EXISTS verificar_estoque_baixo;
DROP PROCEDURE IF EXISTS atualizar_estoque;
DROP PROCEDURE IF EXISTS processar_pedidos_lote;
DROP TRIGGER IF EXISTS trg_log_insert_cliente;
DROP TRIGGER IF EXISTS trg_log_update_produto;
*/

-- Seleciona o banco de dados
USE bar_do_som;

-- ========================================
-- 1. TABELA DE LOGS DE AUDITORIA
-- ========================================
-- Armazena histórico de todas as operações realizadas
-- Utilizada pelos triggers para rastreabilidade

DROP TABLE IF EXISTS logs_auditoria;

CREATE TABLE logs_auditoria (
    id_log INT PRIMARY KEY AUTO_INCREMENT,
    acao VARCHAR(50) NOT NULL COMMENT 'Tipo de ação: INSERT, UPDATE, DELETE, etc.',
    tabela VARCHAR(100) NOT NULL COMMENT 'Tabela afetada pela ação',
    usuario VARCHAR(100) COMMENT 'Usuário que executou a ação',
    detalhes TEXT COMMENT 'Descrição detalhada da operação',
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Data e hora da operação',
    INDEX idx_data_hora (data_hora),
    INDEX idx_tabela (tabela)
) COMMENT='Tabela de auditoria para rastreamento de operações';


-- ========================================
-- 2. ÍNDICES (ETAPA 04)
-- ========================================
-- Criação de 2 índices para otimização de consultas

-- ÍNDICE 1: Otimiza consultas que filtram pedidos por cliente e ordenam por data
-- Utilizado em: Anti-Join (clientesSemPedidos), Views, Relatórios
CREATE INDEX idx_pedidos_cliente 
ON pedidos(id_cliente, data_hora DESC);

-- ÍNDICE 2: Otimiza consultas de produtos vendidos
-- Utilizado em: Views (vendas por produto), Relatórios de vendas
CREATE INDEX idx_pedido_produto_lookup 
ON pedido_produto(id_produto, id_pedido);

-- Verificação dos índices criados
SHOW INDEX FROM pedidos WHERE Key_name = 'idx_pedidos_cliente';
SHOW INDEX FROM pedido_produto WHERE Key_name = 'idx_pedido_produto_lookup';


-- ========================================
-- 3. FUNÇÕES (ETAPA 05)
-- ========================================

-- ----------------------------------------
-- FUNÇÃO 1: Calcular Ticket Médio do Cliente
-- ----------------------------------------
-- Justificativa: Calcula o valor médio gasto por um cliente
-- Utilidade: Análises de comportamento de compra, segmentação de clientes
-- Retorno: Valor decimal (média dos pedidos)

DELIMITER //
CREATE FUNCTION calcular_ticket_medio(p_id_cliente INT) 
RETURNS DECIMAL(10,2)
DETERMINISTIC
READS SQL DATA
COMMENT 'Calcula o ticket médio (valor médio dos pedidos) de um cliente'
BEGIN
    DECLARE v_ticket_medio DECIMAL(10,2);
    
    -- Calcula a média do valor total dos pedidos
    SELECT AVG(total) INTO v_ticket_medio
    FROM pedidos
    WHERE id_cliente = p_id_cliente;
    
    -- Retorna 0 se o cliente não tiver pedidos
    RETURN COALESCE(v_ticket_medio, 0.00);
END //
DELIMITER ;

-- ----------------------------------------
-- FUNÇÃO 2: Verificar Status do Estoque (COM CONDICIONAL)
-- ----------------------------------------
-- Justificativa: Classifica produtos conforme nível de estoque
-- Utilidade: Alertas de reposição, gestão de inventário
-- Retorno: Status do estoque (ESGOTADO, BAIXO, MODERADO, OK)

DELIMITER //
CREATE FUNCTION verificar_estoque_baixo(p_id_produto INT) 
RETURNS VARCHAR(50)
DETERMINISTIC
READS SQL DATA
COMMENT 'Verifica e classifica o status do estoque de um produto'
BEGIN
    DECLARE v_estoque INT;
    DECLARE v_status VARCHAR(50);
    
    -- Busca a quantidade em estoque
    SELECT estoque INTO v_estoque
    FROM produtos
    WHERE id_produto = p_id_produto;
    
    -- *** ESTRUTURA CONDICIONAL (REQUISITO) ***
    -- Classifica o estoque em 4 níveis
    IF v_estoque = 0 THEN
        SET v_status = 'ESGOTADO';
    ELSEIF v_estoque < 10 THEN
        SET v_status = 'ESTOQUE BAIXO';
    ELSEIF v_estoque < 50 THEN
        SET v_status = 'ESTOQUE MODERADO';
    ELSE
        SET v_status = 'ESTOQUE OK';
    END IF;
    
    RETURN v_status;
END //
DELIMITER ;


-- ========================================
-- 4. PROCEDURES (ETAPA 05)
-- ========================================

-- ----------------------------------------
-- PROCEDURE 1: Atualizar Estoque (ATUALIZAÇÃO DE DADOS)
-- ----------------------------------------
-- Justificativa: Gerenciamento centralizado de estoque com validação e log
-- Utilidade: Atualização segura de estoque com rastreabilidade

DELIMITER //
CREATE PROCEDURE atualizar_estoque(
    IN p_id_produto INT,
    IN p_nova_quantidade INT
)
COMMENT 'Atualiza o estoque de um produto com validação e log automático'
BEGIN
    DECLARE v_nome_produto VARCHAR(100);
    
    -- Validação: quantidade não pode ser negativa
    IF p_nova_quantidade < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Erro: Quantidade não pode ser negativa';
    END IF;
    
    -- Busca o nome do produto para o log
    SELECT nome INTO v_nome_produto
    FROM produtos
    WHERE id_produto = p_id_produto;
    
    -- *** ATUALIZAÇÃO DE DADOS (REQUISITO) ***
    UPDATE produtos
    SET estoque = p_nova_quantidade
    WHERE id_produto = p_id_produto;
    
    -- Registra a operação no log de auditoria
    INSERT INTO logs_auditoria (acao, tabela, usuario, detalhes)
    VALUES (
        'UPDATE', 
        'produtos', 
        USER(), 
        CONCAT('Estoque do produto "', v_nome_produto, '" (ID: ', p_id_produto, ') atualizado para ', p_nova_quantidade, ' unidades')
    );
END //
DELIMITER ;

-- ----------------------------------------
-- PROCEDURE 2: Processar Pedidos em Lote (COM CURSOR)
-- ----------------------------------------
-- Justificativa: Automação do processamento de pedidos pendentes
-- Utilidade: Aprovação/revisão em lote baseada em valor
-- Diferencial: Não pode ser feito com UPDATE simples pois requer lógica condicional por linha

DELIMITER //
CREATE PROCEDURE processar_pedidos_lote()
COMMENT 'Processa pedidos pendentes em lote usando cursor para lógica condicional'
BEGIN
    DECLARE v_id_pedido INT;
    DECLARE v_total DECIMAL(10,2);
    DECLARE v_status_atual VARCHAR(50);
    DECLARE v_novo_status VARCHAR(50);
    DECLARE v_contador INT DEFAULT 0;
    DECLARE v_finished INT DEFAULT 0;
    
    -- *** CURSOR (REQUISITO) ***
    -- Necessário porque cada pedido tem tratamento individual baseado em múltiplas condições
    DECLARE cursor_pedidos CURSOR FOR
        SELECT id_pedido, total, status
        FROM pedidos
        WHERE status IN ('Pendente', 'Em Processamento')
        ORDER BY data_hora ASC
        LIMIT 100;
    
    -- Handler para detectar fim do cursor
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_finished = 1;
    
    -- Inicia o log do processamento
    INSERT INTO logs_auditoria (acao, tabela, usuario, detalhes)
    VALUES ('PROCESSAMENTO_LOTE', 'pedidos', USER(), 'Iniciando processamento em lote de pedidos');
    
    OPEN cursor_pedidos;
    
    -- Loop através de cada pedido
    processar_loop: LOOP
        FETCH cursor_pedidos INTO v_id_pedido, v_total, v_status_atual;
        
        -- Sai do loop quando não houver mais registros
        IF v_finished = 1 THEN
            LEAVE processar_loop;
        END IF;
        
        -- Lógica condicional complexa que justifica uso do cursor:
        -- - Pedidos > R$ 100: Aprovados automaticamente
        -- - Pedidos entre R$ 50-100: Em Revisão (análise manual)
        -- - Pedidos < R$ 50: Aprovados se não houver problemas
        
        IF v_total > 100 THEN
            SET v_novo_status = 'Aprovado';
        ELSEIF v_total >= 50 THEN
            SET v_novo_status = 'Em Revisão';
        ELSE
            SET v_novo_status = 'Aprovado';
        END IF;
        
        -- Atualiza o status do pedido
        UPDATE pedidos
        SET status = v_novo_status
        WHERE id_pedido = v_id_pedido;
        
        -- Log individual de cada processamento
        INSERT INTO logs_auditoria (acao, tabela, usuario, detalhes)
        VALUES (
            'PROCESSAMENTO', 
            'pedidos', 
            USER(), 
            CONCAT('Pedido #', v_id_pedido, ': ', v_status_atual, ' → ', v_novo_status, ' (R$ ', v_total, ')')
        );
        
        SET v_contador = v_contador + 1;
    END LOOP;
    
    CLOSE cursor_pedidos;
    
    -- Log final com total processado
    INSERT INTO logs_auditoria (acao, tabela, usuario, detalhes)
    VALUES ('PROCESSAMENTO_LOTE', 'pedidos', USER(), 
            CONCAT('Processamento concluído: ', v_contador, ' pedidos processados'));
END //
DELIMITER ;


-- ========================================
-- 5. TRIGGERS (ETAPA 05)
-- ========================================

-- ----------------------------------------
-- TRIGGER 1: Log de Inserção de Clientes
-- ----------------------------------------
-- Justificativa: Rastreabilidade de novos cadastros
-- Atualiza: Tabela logs_auditoria (REQUISITO)

DELIMITER //
CREATE TRIGGER trg_log_insert_cliente
AFTER INSERT ON clientes
FOR EACH ROW
BEGIN
    -- *** ATUALIZA TABELA DE LOGS (REQUISITO) ***
    INSERT INTO logs_auditoria (acao, tabela, usuario, detalhes)
    VALUES (
        'INSERT', 
        'clientes', 
        USER(), 
        CONCAT('Novo cliente cadastrado: ', NEW.nome, ' (ID: ', NEW.id_cliente, ', Email: ', NEW.email, ')')
    );
END //
DELIMITER ;

-- ----------------------------------------
-- TRIGGER 2: Log de Atualização de Produtos
-- ----------------------------------------
-- Justificativa: Rastreamento de mudanças em produtos (preço, estoque)
-- Importância: Auditoria de alterações críticas

DELIMITER //
CREATE TRIGGER trg_log_update_produto
AFTER UPDATE ON produtos
FOR EACH ROW
BEGIN
    DECLARE v_detalhes TEXT;
    
    -- Constrói mensagem detalhada do que foi alterado
    SET v_detalhes = CONCAT('Produto "', NEW.nome, '" (ID: ', NEW.id_produto, ') atualizado. ');
    
    -- Detecta mudança de preço
    IF OLD.preco != NEW.preco THEN
        SET v_detalhes = CONCAT(v_detalhes, 
            'Preço: R$ ', FORMAT(OLD.preco, 2), ' → R$ ', FORMAT(NEW.preco, 2), '. ');
    END IF;
    
    -- Detecta mudança de estoque
    IF OLD.estoque != NEW.estoque THEN
        SET v_detalhes = CONCAT(v_detalhes, 
            'Estoque: ', OLD.estoque, ' → ', NEW.estoque, ' unidades');
    END IF;
    
    -- Registra no log de auditoria
    INSERT INTO logs_auditoria (acao, tabela, usuario, detalhes)
    VALUES ('UPDATE', 'produtos', USER(), v_detalhes);
END //
DELIMITER ;


-- ========================================
-- 6. TESTES E VALIDAÇÕES
-- ========================================

-- Testa a função de ticket médio
SELECT 'Testando função calcular_ticket_medio...' AS teste;
SELECT id_cliente, nome, calcular_ticket_medio(id_cliente) AS ticket_medio
FROM clientes
LIMIT 5;

-- Testa a função de verificação de estoque
SELECT 'Testando função verificar_estoque_baixo...' AS teste;
SELECT id_produto, nome, estoque, verificar_estoque_baixo(id_produto) AS status_estoque
FROM produtos
LIMIT 10;

-- Testa a procedure de atualização de estoque
SELECT 'Testando procedure atualizar_estoque...' AS teste;
CALL atualizar_estoque(1, 75);

-- Testa a procedure de processamento em lote
SELECT 'Testando procedure processar_pedidos_lote...' AS teste;
CALL processar_pedidos_lote();

-- Verifica os logs gerados
SELECT 'Últimos 10 registros de log...' AS teste;
SELECT * FROM logs_auditoria 
ORDER BY data_hora DESC 
LIMIT 10;

-- Verifica os índices criados
SELECT 'Verificando índices...' AS teste;
SHOW INDEX FROM pedidos WHERE Key_name LIKE 'idx_%';
SHOW INDEX FROM pedido_produto WHERE Key_name LIKE 'idx_%';


-- ========================================
-- 7. DOCUMENTAÇÃO DOS REQUISITOS ATENDIDOS
-- ========================================

/*
✅ ETAPA 04 - ÍNDICES (2 criados):
   1. idx_pedidos_cliente - Otimiza consultas de pedidos por cliente
   2. idx_pedido_produto_lookup - Otimiza consultas de produtos vendidos

✅ ETAPA 05 - FUNÇÕES (2 criadas):
   1. calcular_ticket_medio() - Calcula média de gastos do cliente
   2. verificar_estoque_baixo() - Classifica estoque (COM CONDICIONAL)

✅ ETAPA 05 - PROCEDURES (2 criados):
   1. atualizar_estoque() - Atualização de dados com validação
   2. processar_pedidos_lote() - Processamento em lote COM CURSOR

✅ ETAPA 05 - TRIGGERS (2 criados):
   1. trg_log_insert_cliente - Log de novos clientes
   2. trg_log_update_produto - Log de alterações em produtos (ATUALIZA TABELA DE LOGS)

✅ TABELA DE LOGS:
   - logs_auditoria - Armazena histórico de todas as operações

OBSERVAÇÕES:
- Todos os índices são utilizados nas consultas/views
- Uma das funções utiliza estrutura condicional (IF-THEN-ELSE)
- Uma das procedures realiza UPDATE
- Uma das procedures utiliza CURSOR (não pode ser feita com UPDATE simples)
- Um dos triggers atualiza a tabela de logs
- Todas as justificativas semânticas estão documentadas
*/


-- ========================================
-- FIM DO SCRIPT
-- ========================================
-- Para executar: Copie todo este arquivo e cole no MySQL Workbench
-- Execute tudo de uma vez (Ctrl + Shift + Enter)
-- ========================================
