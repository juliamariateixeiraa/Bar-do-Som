package br.com.bardosom.api.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;

@Repository
public class RelatorioDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // ========== MÉTODOS PARA OS ENDPOINTS ORIGINAIS ==========

    /**
     * Lista detalhes de todos os pedidos
     */
    public List<Map<String, Object>> listarDetalhesPedidos() {
        String sql = """
            SELECT 
                p.id_pedido,
                p.data_hora,
                p.total,
                p.status,
                c.nome AS nome_cliente,
                m.numero AS numero_mesa,
                pr.nome AS nome_produto,
                pp.quantidade,
                pr.preco AS preco_unitario,
                (pp.quantidade * pr.preco) AS subtotal
            FROM pedidos p
            INNER JOIN clientes c ON p.id_cliente = c.id_cliente
            INNER JOIN mesas m ON p.id_mesa = m.id_mesa
            INNER JOIN pedido_produto pp ON p.id_pedido = pp.id_pedido
            INNER JOIN produtos pr ON pp.id_produto = pr.id_produto
            ORDER BY p.data_hora DESC
            LIMIT 100
        """;

        return jdbcTemplate.queryForList(sql);
    }

    /**
     * Encontra o cliente que fez o maior pedido
     */
    public List<Map<String, Object>> encontrarClienteDoMaiorPedido() {
        String sql = """
            SELECT 
                c.nome AS nome_cliente,
                c.email,
                c.telefone,
                p.id_pedido,
                p.total,
                p.data_hora,
                p.status
            FROM pedidos p
            INNER JOIN clientes c ON p.id_cliente = c.id_cliente
            WHERE p.total = (SELECT MAX(total) FROM pedidos)
            LIMIT 1
        """;

        return jdbcTemplate.queryForList(sql);
    }

    /**
     * Encontra produtos que nunca foram vendidos (ANTI JOIN)
     */
    public List<Map<String, Object>> findProdutosSemVendas() {
        String sql = """
            SELECT 
                pr.id_produto,
                pr.nome,
                pr.tipo,
                pr.preco,
                pr.estoque
            FROM produtos pr
            LEFT JOIN pedido_produto pp ON pr.id_produto = pp.id_produto
            WHERE pp.id_produto IS NULL
            ORDER BY pr.tipo, pr.nome
        """;

        return jdbcTemplate.queryForList(sql);
    }

    /**
     * Lista clientes e reservas usando FULL OUTER JOIN simulado
     */
    public List<Map<String, Object>> listarClientesReservasFullJoin() {
        String sql = """
            SELECT 
                c.id_cliente,
                c.nome AS nome_cliente,
                c.email,
                r.id_reserva,
                r.data_reserva,
                e.nome AS nome_evento,
                e.data AS data_evento,
                'Cliente com Reserva' AS tipo
            FROM clientes c
            LEFT JOIN reservas r ON c.id_cliente = r.id_cliente
            LEFT JOIN eventos e ON r.id_evento = e.id_evento
            
            UNION
            
            SELECT 
                c.id_cliente,
                c.nome AS nome_cliente,
                c.email,
                r.id_reserva,
                r.data_reserva,
                e.nome AS nome_evento,
                e.data AS data_evento,
                'Reserva sem Cliente' AS tipo
            FROM reservas r
            LEFT JOIN clientes c ON r.id_cliente = c.id_cliente
            LEFT JOIN eventos e ON r.id_evento = e.id_evento
            WHERE c.id_cliente IS NULL
            
            ORDER BY data_reserva DESC
            LIMIT 100
        """;

        return jdbcTemplate.queryForList(sql);
    }

    // ========== MÉTODOS PARA OS NOVOS GRÁFICOS ==========

    /**
     * Retorna a distribuição de vendas por tipo de produto (Bebida vs Comida)
     */
    public List<Map<String, Object>> obterDistribuicaoPorTipoProduto() {
        String sql = """
            SELECT 
                pr.tipo,
                COUNT(DISTINCT pp.id_pedido) AS total_pedidos,
                SUM(pp.quantidade) AS quantidade_vendida,
                SUM(pp.quantidade * pr.preco) AS valor_total
            FROM pedido_produto pp
            INNER JOIN produtos pr ON pp.id_produto = pr.id_produto
            GROUP BY pr.tipo
            ORDER BY valor_total DESC
        """;

        return jdbcTemplate.queryForList(sql);
    }

    /**
     * Retorna análise de eventos por estilo musical
     */
    public List<Map<String, Object>> obterEventosPorEstilo() {
        String sql = """
            SELECT 
                ba.estilo,
                COUNT(DISTINCT e.id_evento) AS total_eventos,
                AVG(e.publico_estimado) AS media_publico,
                SUM(e.valor_ingresso * e.publico_estimado) AS receita_estimada,
                MIN(e.data) AS primeiro_evento,
                MAX(e.data) AS ultimo_evento
            FROM eventos e
            INNER JOIN participacao p ON e.id_evento = p.id_evento
            INNER JOIN banda_artista ba ON p.id_banda = ba.id_banda
            GROUP BY ba.estilo
            HAVING COUNT(DISTINCT e.id_evento) > 0
            ORDER BY total_eventos DESC
        """;

        return jdbcTemplate.queryForList(sql);
    }

    /**
     * Retorna análise de faixa etária dos clientes
     */
    public List<Map<String, Object>> obterClientesPorFaixaEtaria() {
        String sql = """
            SELECT 
                CASE 
                    WHEN TIMESTAMPDIFF(YEAR, data_nascimento, CURDATE()) < 25 THEN '18-24 anos'
                    WHEN TIMESTAMPDIFF(YEAR, data_nascimento, CURDATE()) BETWEEN 25 AND 34 THEN '25-34 anos'
                    WHEN TIMESTAMPDIFF(YEAR, data_nascimento, CURDATE()) BETWEEN 35 AND 44 THEN '35-44 anos'
                    WHEN TIMESTAMPDIFF(YEAR, data_nascimento, CURDATE()) BETWEEN 45 AND 54 THEN '45-54 anos'
                    ELSE '55+ anos'
                END AS faixa_etaria,
                COUNT(*) AS quantidade_clientes,
                COUNT(DISTINCT p.id_pedido) AS total_pedidos,
                COALESCE(SUM(p.total), 0) AS valor_gasto_total
            FROM clientes c
            LEFT JOIN pedidos p ON c.id_cliente = p.id_cliente
            WHERE c.data_nascimento IS NOT NULL
            GROUP BY faixa_etaria
            ORDER BY 
                CASE faixa_etaria
                    WHEN '18-24 anos' THEN 1
                    WHEN '25-34 anos' THEN 2
                    WHEN '35-44 anos' THEN 3
                    WHEN '45-54 anos' THEN 4
                    ELSE 5
                END
        """;

        return jdbcTemplate.queryForList(sql);
    }

    // ========== CONSULTAS AVANÇADAS E VIEWS ==========

    /**
     * ANTI JOIN: Clientes que nunca fizeram pedidos
     */
    public List<Map<String, Object>> clientesSemPedidos() {
        String sql = """
        SELECT 
            c.id_cliente AS id,
            c.nome,
            c.email,
            c.telefone
        FROM clientes c
        LEFT JOIN pedidos p ON c.id_cliente = p.id_cliente
        WHERE p.id_pedido IS NULL
        ORDER BY c.nome ASC
    """;

        return jdbcTemplate.queryForList(sql);
    }

    /**
     * FULL OUTER JOIN: Todos os clientes e todos os eventos (incluindo não relacionados)
     */
    public List<Map<String, Object>> fullOuterJoinClientesEventos() {
        String sql = """
            SELECT 
                c.nome AS nome_cliente,
                e.nome AS nome_evento,
                e.data AS data_evento,
                CASE 
                    WHEN r.id_reserva IS NOT NULL THEN 'Confirmado'
                    WHEN c.id_cliente IS NULL THEN 'Evento sem Reservas'
                    ELSE 'Pendente'
                END AS status
            FROM clientes c
            LEFT JOIN reservas r ON c.id_cliente = r.id_cliente
            LEFT JOIN eventos e ON r.id_evento = e.id_evento
            
            UNION
            
            SELECT 
                c.nome AS nome_cliente,
                e.nome AS nome_evento,
                e.data AS data_evento,
                'Evento sem Reservas' AS status
            FROM eventos e
            LEFT JOIN reservas r ON e.id_evento = r.id_evento
            LEFT JOIN clientes c ON r.id_cliente = c.id_cliente
            WHERE r.id_reserva IS NULL
            
            ORDER BY data_evento DESC
            LIMIT 100
        """;

        return jdbcTemplate.queryForList(sql);
    }

    /**
     * SUBCONSULTA 1: Produtos com preço acima da média
     */
    public List<Map<String, Object>> produtosAcimaDaMedia() {
        String sql = """
            SELECT 
                id_produto,
                nome,
                tipo AS categoria,
                preco,
                estoque
            FROM produtos
            WHERE preco > (SELECT AVG(preco) FROM produtos)
            ORDER BY preco DESC
        """;

        return jdbcTemplate.queryForList(sql);
    }

    /**
     * SUBCONSULTA 2: Clientes com mais de X pedidos
     */
    public List<Map<String, Object>> clientesComMuitosPedidos(Integer minPedidos) {
        String sql = """
            SELECT 
                c.nome AS nome_cliente,
                COUNT(p.id_pedido) AS total_pedidos,
                SUM(p.total) AS valor_total,
                AVG(p.total) AS ticket_medio
            FROM clientes c
            INNER JOIN pedidos p ON c.id_cliente = p.id_cliente
            GROUP BY c.id_cliente, c.nome
            HAVING COUNT(p.id_pedido) >= ?
            ORDER BY total_pedidos DESC
        """;

        return jdbcTemplate.queryForList(sql, minPedidos);
    }

    /**
     * VIEW 1: Resumo de Vendas por Produto (3+ joins)
     */
    public List<Map<String, Object>> consultarViewVendasPorProduto() {
        String sql = """
            SELECT 
                pr.nome AS nome_produto,
                pr.tipo AS categoria,
                SUM(pp.quantidade) AS quantidade_vendida,
                SUM(pp.quantidade * pr.preco) AS receita_total,
                COUNT(DISTINCT p.id_cliente) AS num_clientes
            FROM produtos pr
            INNER JOIN pedido_produto pp ON pr.id_produto = pp.id_produto
            INNER JOIN pedidos p ON pp.id_pedido = p.id_pedido
            INNER JOIN clientes c ON p.id_cliente = c.id_cliente
            GROUP BY pr.id_produto, pr.nome, pr.tipo
            HAVING SUM(pp.quantidade) > 0
            ORDER BY receita_total DESC
        """;

        return jdbcTemplate.queryForList(sql);
    }

    /**
     * VIEW 2: Análise de Eventos e Reservas (3+ joins)
     */
    public List<Map<String, Object>> consultarViewEventosReservas() {
        String sql = """
        SELECT 
            e.nome AS nome_evento,
            e.data AS data_evento,
            COUNT(DISTINCT r.id_reserva) AS total_reservas,
            SUM(e.valor_ingresso) AS receita_estimada
        FROM eventos e
        LEFT JOIN reservas r ON e.id_evento = r.id_evento
        LEFT JOIN clientes c ON r.id_cliente = c.id_cliente
        LEFT JOIN mesas m ON r.id_mesa = m.id_mesa
        GROUP BY e.id_evento, e.nome, e.data, e.valor_ingresso
        ORDER BY e.data DESC
        LIMIT 50
    """;
        return jdbcTemplate.queryForList(sql);
    }
}