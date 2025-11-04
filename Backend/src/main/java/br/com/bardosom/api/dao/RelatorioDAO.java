package br.com.bardosom.api.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Repository
public class RelatorioDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // --- CORRIGIDO ---
    public List<Map<String, Object>> listarDetalhesPedidos() {
        String sql = "SELECT c.nome as nome_cliente, pr.nome as nome_produto, pp.quantidade, (pr.preco * pp.quantidade) as valor_total " +
                "FROM pedido_produto pp " +
                "JOIN produtos pr ON pp.id_produto = pr.id_produto " +
                "JOIN pedidos p ON pp.id_pedido = p.id_pedido " +
                "JOIN clientes c ON p.id_cliente = c.id_cliente";
        return jdbcTemplate.queryForList(sql);
    }

    // --- CORRIGIDO ---
    public List<Map<String, Object>> encontrarClienteDoMaiorPedido() {
        String sql = "SELECT " +
                "  c.nome AS nome_cliente, " +
                "  p.total AS total_pedido " +
                "FROM clientes c " +
                "JOIN pedidos p ON c.id_cliente = c.id_cliente " +
                "WHERE p.total = (SELECT MAX(total) FROM pedidos) " +
                "LIMIT 1";
        return jdbcTemplate.queryForList(sql);
    }

    // --- CORRIGIDO ---
    public List<Map<String, Object>> findProdutosSemVendas() {
        String sql = "SELECT p.nome " +
                "FROM produtos p " +
                "WHERE p.id_produto NOT IN ( " +
                "  SELECT DISTINCT id_produto FROM pedido_produto " +
                ")";
        return jdbcTemplate.queryForList(sql);
    }

    // --- CORRIGIDO ---
    public List<Map<String, Object>> listarClientesReservasFullJoin() {
        String sql = "( " +
                "  SELECT " +
                "    c.nome AS cliente_nome, " +
                "    r.data_reserva, " +
                "    r.id_mesa " +
                "  FROM clientes c " +
                "  LEFT JOIN reservas r ON c.id_cliente = r.id_cliente " +
                ") " +
                "UNION " +
                "( " +
                "  SELECT " +
                "    'Cliente Excluído/Desconhecido' AS cliente_nome, " +
                "    r.data_reserva, " +
                "    r.id_mesa " +
                "  FROM reservas r " +
                "  LEFT JOIN clientes c ON r.id_cliente = c.id_cliente " +
                "  WHERE c.id_cliente IS NULL " +
                ")";
        return jdbcTemplate.queryForList(sql);
    }

    // ===================================================================
    // === MÉTODO DO GRÁFICO DE VENDAS (JÁ EXISTE) ===
    // ===================================================================
    public Map<String, Double> getVendasMensais() {
        String sql = "SELECT " +
                "  MONTHNAME(data_hora) as mes, " +
                "  SUM(total) as total " +
                "FROM " +
                "  pedidos " +
                "WHERE " +
                "  YEAR(data_hora) = YEAR(CURDATE()) " +
                "GROUP BY " +
                "  mes, MONTH(data_hora) " +
                "ORDER BY " +
                "  MONTH(data_hora);";

        List<Map<String, Object>> listaResultados = jdbcTemplate.queryForList(sql);
        Map<String, Double> dadosGrafico = new LinkedHashMap<>();

        for (Map<String, Object> linha : listaResultados) {
            String mes = (String) linha.get("mes");
            Double total = ((Number) linha.get("total")).doubleValue();
            dadosGrafico.put(mes, total);
        }
        return dadosGrafico;
    }

    // ===================================================================
    // === NOVO MÉTODO PARA O GRÁFICO DE CLIENTES ===
    // ===================================================================
    public Map<String, Long> getPedidosPorMes() { // Usamos Long para COUNT

        // SQL para contar o NÚMERO de pedidos por mês
        String sql = "SELECT " +
                "  MONTHNAME(data_hora) as mes, " +
                "  COUNT(id_pedido) as total_pedidos " + // MUDANÇA: Usando COUNT() em vez de SUM()
                "FROM " +
                "  pedidos " +
                "WHERE " +
                "  YEAR(data_hora) = YEAR(CURDATE()) " +
                "GROUP BY " +
                "  mes, MONTH(data_hora) " +
                "ORDER BY " +
                "  MONTH(data_hora);";

        List<Map<String, Object>> listaResultados = jdbcTemplate.queryForList(sql);
        Map<String, Long> dadosGrafico = new LinkedHashMap<>();

        for (Map<String, Object> linha : listaResultados) {
            String mes = (String) linha.get("mes");
            // COUNT retorna Long (ou BigInteger), então (Number).longValue() é seguro
            Long total = ((Number) linha.get("total_pedidos")).longValue();
            dadosGrafico.put(mes, total);
        }
        return dadosGrafico;
    }
}
