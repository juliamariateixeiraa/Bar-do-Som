-- funcao 1
DELIMITER $$
CREATE FUNCTION CalcularIdadeCliente (data_nasc DATE)
RETURNS INT
DETERMINISTIC
BEGIN
    RETURN TIMESTAMPDIFF(YEAR, data_nasc, CURDATE());
END $$
DELIMITER ;

-- Justificativa Semântica:
-- Facilita a obtenção da idade do cliente diretamente em consultas, relatórios ou até mesmo dentro de outros procedimentos e funções,
-- evitando a repetição da lógica de cálculo de idade.

-- funcao 2
DELIMITER $$
CREATE FUNCTION VerificarStatusEstoque (produto_id INT)
RETURNS VARCHAR(30)
READS SQL DATA
BEGIN
    DECLARE quant_estoque INT;
    DECLARE status_estoque VARCHAR(30);

    SELECT estoque INTO quant_estoque
    FROM produtos
    WHERE id_produto = produto_id;

    IF quant_estoque IS NULL THEN
        SET status_estoque = 'Produto Não Encontrado';
    ELSEIF quant_estoque > 10 THEN
        SET status_estoque = 'Em Estoque';
    ELSEIF quant_estoque > 0 THEN
        SET status_estoque = 'Estoque Baixo';
    ELSE
        SET status_estoque = 'Fora de Estoque';
    END IF;

    RETURN status_estoque;
END $$
DELIMITER ;

-- Justificativa Semântica:
-- Permite uma rápida classificação do nível de estoque de um produto. Isso é útil para dashboards de gerenciamento ou para disparar alertas
-- em processos externos, utilizando regras de negócio (neste caso, "Estoque Baixo" <= 10).

-- procedure 1
DELIMITER $$
CREATE PROCEDURE AtualizarStatusMesa (IN mesa_id INT, IN novo_status VARCHAR(20))
BEGIN
    -- Atualiza o status da mesa para um valor fornecido
    UPDATE mesas
    SET status = novo_status
    WHERE id_mesa = mesa_id;

END $$
DELIMITER ;

-- Justificativa Semântica:
-- Centraliza a lógica de atualização do status da mesa. Isso é crucial para gerenciar a disponibilidade (disponivel, ocupada, reservada)
-- de forma consistente, especialmente em um ambiente de bar/restaurante.

-- procedure 2
DELIMITER $$
CREATE PROCEDURE AjustarPublicoEstimadoEventos ()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE evento_id_atual INT;
    DECLARE publico_atual INT;
    DECLARE num_artistas INT;
    DECLARE bonus_percentual DECIMAL(5,2);

    DECLARE cur_eventos CURSOR FOR
        SELECT id_evento, publico_estimado
        FROM eventos;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN cur_eventos;

    read_loop: LOOP
        FETCH cur_eventos INTO evento_id_atual, publico_atual;

        IF done THEN
            LEAVE read_loop;
        END IF;

        SELECT COUNT(id_banda) INTO num_artistas
        FROM participacao
        WHERE id_evento = evento_id_atual;

        IF num_artistas = 1 THEN
            SET bonus_percentual = 0.05;
        ELSEIF num_artistas BETWEEN 2 AND 3 THEN
            SET bonus_percentual = 0.10;
        ELSEIF num_artistas >= 4 THEN
            SET bonus_percentual = 0.15;
        ELSE
            SET bonus_percentual = 0.00;
        END IF;

        IF publico_atual > 50 THEN
            UPDATE eventos
            SET publico_estimado = publico_atual + (publico_atual * bonus_percentual)
            WHERE id_evento = evento_id_atual;
        END IF;

    END LOOP;

    CLOSE cur_eventos;

END $$
DELIMITER ;

-- Justificativa Semântica (Por que o CURSOR é necessário)
-- Dependência de Consulta Auxiliar por Linha: Para calcular a porcentagem de bônus (`bonus_percentual`),
-- o procedimento precisa executar uma instrução `SELECT COUNT()` na tabela `participacao` para cada evento.
-- Fazer um `UPDATE` com `JOIN` e lógica condicional complexa dentro da subconsulta que depende de uma agregação por linha é extremamente complicado ou inviável,
-- especialmente com a condição extra (`publico_atual > 50`)
-- Lógica Condicional Complexa de Múltiplos Passos: O cálculo do novo público envolve:
-- a) Contar artistas (consulta auxiliar),
-- b) Determinar o percentual (IF/ELSEIF), e
-- c) Aplicar a atualização somente se a condição de `publico_atual > 50` for atendida.
--  CURSOR permite gerenciar esses passos sequencialmente para cada linha, o que não é facilmente replicado por uma única instrução `UPDATE`.

-- criacao da tabela de log
CREATE TABLE log_operacoes (
    id_log INT AUTO_INCREMENT PRIMARY KEY,
    tabela_afetada VARCHAR(50) NOT NULL,
    operacao VARCHAR(10) NOT NULL, -- INSERT, UPDATE, DELETE
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    detalhes VARCHAR(255)
);

-- trigger 1
DELIMITER $$
CREATE TRIGGER tg_after_insert_pedido
AFTER INSERT ON pedidos
FOR EACH ROW
BEGIN
    INSERT INTO log_operacoes (tabela_afetada, operacao, detalhes)
    VALUES (
        'pedidos',
        'INSERT',
        CONCAT('Novo pedido criado. ID: ', NEW.id_pedido, '. Cliente: ', NEW.id_cliente)
    );
END $$
DELIMITER ;

-- Justificativa Semântica:
-- É fundamental para a auditoria. Ele garante que cada novo pedido,
-- que é uma transação financeira importante, seja imediatamente registrado
-- em um log, permitindo rastrear a atividade do sistema e identificar
-- quando o pedido foi criado.

-- trigger 2
DELIMITER $$
CREATE TRIGGER tg_before_insert_pedido_produto
BEFORE INSERT ON pedido_produto
FOR EACH ROW
BEGIN
    UPDATE produtos
    SET estoque = estoque - NEW.quantidade
    WHERE id_produto = NEW.id_produto;

END $$
DELIMITER ;

-- Justificativa Semântica:
-- Garante a integridade transacional do estoque. Sempre que um produto é
-- adicionado a um pedido (antes que a inserção seja concluída), o sistema
-- automaticamente abate a quantidade do estoque. Isso evita que o estoque
-- seja esquecido de ser atualizado manualmente, mantendo os níveis de
-- inventário sempre sincronizados com os pedidos em andamento.