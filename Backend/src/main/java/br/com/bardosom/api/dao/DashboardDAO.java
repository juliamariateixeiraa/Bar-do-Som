package br.com.bardosom.api.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class DashboardDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Indicadores gerais do dashboard
    public Map<String, Object> obterIndicadoresGerais() {
        Map<String, Object> indicadores = new HashMap<>();

        try {
            // Total de clientes
            String sqlClientes = "SELECT COUNT(*) as total FROM clientes";
            Integer totalClientes = jdbcTemplate.queryForObject(sqlClientes, Integer.class);
            indicadores.put("total_clientes", totalClientes != null ? totalClientes : 0);

            // Total de pedidos (CORRIGIDO: aceita qualquer status ou sem filtro)
            String sqlPedidos = "SELECT COUNT(*) as total FROM pedidos";
            Integer totalPedidos = jdbcTemplate.queryForObject(sqlPedidos, Integer.class);
            indicadores.put("total_pedidos", totalPedidos != null ? totalPedidos : 0);

            // Receita total (CORRIGIDO: usa COALESCE para evitar NULL)
            String sqlReceita = "SELECT COALESCE(SUM(total), 0) as receita FROM pedidos";
            Double receitaTotal = jdbcTemplate.queryForObject(sqlReceita, Double.class);
            indicadores.put("receita_total", receitaTotal != null ? receitaTotal : 0.0);

            // Ticket médio
            Double ticketMedio = (totalPedidos != null && totalPedidos > 0)
                    ? receitaTotal / totalPedidos
                    : 0.0;
            indicadores.put("ticket_medio", ticketMedio);

            // Total de produtos
            String sqlProdutos = "SELECT COUNT(*) as total FROM produtos";
            Integer totalProdutos = jdbcTemplate.queryForObject(sqlProdutos, Integer.class);
            indicadores.put("total_produtos", totalProdutos != null ? totalProdutos : 0);

            // Total de eventos
            String sqlEventos = "SELECT COUNT(*) as total FROM eventos";
            Integer totalEventos = jdbcTemplate.queryForObject(sqlEventos, Integer.class);
            indicadores.put("total_eventos", totalEventos != null ? totalEventos : 0);

            // Produtos com estoque baixo
            String sqlEstoqueBaixo = "SELECT COUNT(*) as total FROM produtos WHERE estoque < 10";
            Integer produtosEstoqueBaixo = jdbcTemplate.queryForObject(sqlEstoqueBaixo, Integer.class);
            indicadores.put("produtos_estoque_baixo", produtosEstoqueBaixo != null ? produtosEstoqueBaixo : 0);

        } catch (Exception e) {
            System.err.println("❌ Erro ao obter indicadores gerais: " + e.getMessage());
            e.printStackTrace();
            // Retorna valores padrão em caso de erro
            indicadores.put("total_clientes", 0);
            indicadores.put("total_pedidos", 0);
            indicadores.put("receita_total", 0.0);
            indicadores.put("ticket_medio", 0.0);
            indicadores.put("total_produtos", 0);
            indicadores.put("total_eventos", 0);
            indicadores.put("produtos_estoque_baixo", 0);
        }

        return indicadores;
    }

    // Vendas por mês
    public List<Map<String, Object>> obterVendasPorMes() {
        String sql = "SELECT " +
                "    DATE_FORMAT(data_hora, '%Y-%m') as mes, " +
                "    CASE MONTH(data_hora) " +
                "        WHEN 1 THEN 'Janeiro' " +
                "        WHEN 2 THEN 'Fevereiro' " +
                "        WHEN 3 THEN 'Março' " +
                "        WHEN 4 THEN 'Abril' " +
                "        WHEN 5 THEN 'Maio' " +
                "        WHEN 6 THEN 'Junho' " +
                "        WHEN 7 THEN 'Julho' " +
                "        WHEN 8 THEN 'Agosto' " +
                "        WHEN 9 THEN 'Setembro' " +
                "        WHEN 10 THEN 'Outubro' " +
                "        WHEN 11 THEN 'Novembro' " +
                "        WHEN 12 THEN 'Dezembro' " +
                "    END as mes_nome, " +
                "    COUNT(*) as quantidade_vendas, " +
                "    COALESCE(SUM(total), 0) as valor_total " +
                "FROM pedidos " +
                "GROUP BY DATE_FORMAT(data_hora, '%Y-%m'), MONTH(data_hora) " +
                "ORDER BY mes DESC " +
                "LIMIT 12";

        try {
            return jdbcTemplate.queryForList(sql);
        } catch (Exception e) {
            System.err.println("❌ Erro ao obter vendas por mês: " + e.getMessage());
            e.printStackTrace();
            return List.of(); // Retorna lista vazia
        }
    }

    // Top produtos mais vendidos
    public List<Map<String, Object>> obterProdutosMaisVendidos(int limite) {
        String sql = "SELECT " +
                "    p.id_produto, " +
                "    p.nome, " +
                "    p.tipo, " +
                "    p.preco, " +
                "    COALESCE(SUM(pp.quantidade), 0) as quantidade_vendida, " +
                "    COALESCE(SUM(pp.quantidade * p.preco), 0) as receita_gerada " +
                "FROM produtos p " +
                "LEFT JOIN pedido_produto pp ON p.id_produto = pp.id_produto " +
                "LEFT JOIN pedidos ped ON pp.id_pedido = ped.id_pedido " +
                "GROUP BY p.id_produto, p.nome, p.tipo, p.preco " +
                "ORDER BY quantidade_vendida DESC " +
                "LIMIT ?";

        try {
            return jdbcTemplate.queryForList(sql, limite);
        } catch (Exception e) {
            System.err.println("❌ Erro ao obter produtos mais vendidos: " + e.getMessage());
            e.printStackTrace();
            return List.of();
        }
    }

    // Clientes por faixa etária
    public List<Map<String, Object>> obterClientesPorFaixaEtaria() {
        String sql = "SELECT " +
                "    CASE " +
                "        WHEN TIMESTAMPDIFF(YEAR, data_nascimento, CURDATE()) < 20 THEN 'Menos de 20' " +
                "        WHEN TIMESTAMPDIFF(YEAR, data_nascimento, CURDATE()) BETWEEN 20 AND 29 THEN '20-29 anos' " +
                "        WHEN TIMESTAMPDIFF(YEAR, data_nascimento, CURDATE()) BETWEEN 30 AND 39 THEN '30-39 anos' " +
                "        WHEN TIMESTAMPDIFF(YEAR, data_nascimento, CURDATE()) BETWEEN 40 AND 49 THEN '40-49 anos' " +
                "        WHEN TIMESTAMPDIFF(YEAR, data_nascimento, CURDATE()) >= 50 THEN '50+ anos' " +
                "        ELSE 'Não informado' " +
                "    END as faixa_etaria, " +
                "    COUNT(*) as quantidade " +
                "FROM clientes " +
                "WHERE data_nascimento IS NOT NULL " +
                "GROUP BY faixa_etaria " +
                "ORDER BY " +
                "    CASE faixa_etaria " +
                "        WHEN 'Menos de 20' THEN 1 " +
                "        WHEN '20-29 anos' THEN 2 " +
                "        WHEN '30-39 anos' THEN 3 " +
                "        WHEN '40-49 anos' THEN 4 " +
                "        WHEN '50+ anos' THEN 5 " +
                "        ELSE 6 " +
                "    END";

        try {
            return jdbcTemplate.queryForList(sql);
        } catch (Exception e) {
            System.err.println("❌ Erro ao obter clientes por faixa etária: " + e.getMessage());
            e.printStackTrace();
            return List.of();
        }
    }

    // Eventos por mês
    public List<Map<String, Object>> obterEventosPorMes() {
        String sql = "SELECT " +
                "    DATE_FORMAT(data, '%Y-%m') as mes, " +
                "    CASE MONTH(data) " +
                "        WHEN 1 THEN 'Janeiro' " +
                "        WHEN 2 THEN 'Fevereiro' " +
                "        WHEN 3 THEN 'Março' " +
                "        WHEN 4 THEN 'Abril' " +
                "        WHEN 5 THEN 'Maio' " +
                "        WHEN 6 THEN 'Junho' " +
                "        WHEN 7 THEN 'Julho' " +
                "        WHEN 8 THEN 'Agosto' " +
                "        WHEN 9 THEN 'Setembro' " +
                "        WHEN 10 THEN 'Outubro' " +
                "        WHEN 11 THEN 'Novembro' " +
                "        WHEN 12 THEN 'Dezembro' " +
                "    END as mes_nome, " +
                "    COUNT(*) as quantidade_eventos, " +
                "    COALESCE(SUM(valor_ingresso * publico_estimado), 0) as receita_estimada " +
                "FROM eventos " +
                "GROUP BY DATE_FORMAT(data, '%Y-%m'), MONTH(data) " +
                "ORDER BY mes DESC";

        try {
            return jdbcTemplate.queryForList(sql);
        } catch (Exception e) {
            System.err.println("❌ Erro ao obter eventos por mês: " + e.getMessage());
            e.printStackTrace();
            return List.of();
        }
    }

    // Status do estoque
    public Map<String, Object> obterStatusEstoque() {
        Map<String, Object> status = new HashMap<>();

        try {
            String sqlDisponivel = "SELECT COUNT(*) FROM produtos WHERE estoque > 10";
            Integer disponivel = jdbcTemplate.queryForObject(sqlDisponivel, Integer.class);
            status.put("estoque_ok", disponivel != null ? disponivel : 0);

            String sqlBaixo = "SELECT COUNT(*) FROM produtos WHERE estoque BETWEEN 1 AND 10";
            Integer baixo = jdbcTemplate.queryForObject(sqlBaixo, Integer.class);
            status.put("estoque_baixo", baixo != null ? baixo : 0);

            String sqlZerado = "SELECT COUNT(*) FROM produtos WHERE estoque = 0";
            Integer zerado = jdbcTemplate.queryForObject(sqlZerado, Integer.class);
            status.put("estoque_zerado", zerado != null ? zerado : 0);

        } catch (Exception e) {
            System.err.println("❌ Erro ao obter status do estoque: " + e.getMessage());
            e.printStackTrace();
            status.put("estoque_ok", 0);
            status.put("estoque_baixo", 0);
            status.put("estoque_zerado", 0);
        }

        return status;
    }
}