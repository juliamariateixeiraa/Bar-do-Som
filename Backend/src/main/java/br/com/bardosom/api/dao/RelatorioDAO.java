package br.com.bardosom.api.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.LinkedHashMap; // Importante
import java.util.List;
import java.util.Map;

@Repository
public class RelatorioDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // --- CORRIGIDO ---
    // Usando 'pedido_produto' e os 'id' corretos
    public List<Map<String, Object>> listarDetalhesPedidos() {
        String sql = "SELECT c.nome as nome_cliente, pr.nome as nome_produto, pp.quantidade, (pr.preco * pp.quantidade) as valor_total " +
                "FROM pedido_produto pp " +
                "JOIN produtos pr ON pp.id_produto = pr.id_produto " +
                "JOIN pedidos p ON pp.id_pedido = p.id_pedido " +
                "JOIN clientes c ON p.id_cliente = c.id_cliente";
        return jdbcTemplate.queryForList(sql);
    }

    // --- CORRIGIDO ---
    // Usando a lógica do seu SQL e a coluna 'total' da tabela 'pedidos'
    public List<Map<String, Object>> encontrarClienteDoMaiorPedido() {
        String sql = "SELECT " +
                "  c.nome AS nome_cliente, " +
                "  p.total AS total_pedido " +
                "FROM clientes c " +
                "JOIN pedidos p ON c.id_cliente = p.id_cliente " +
                "WHERE p.total = (SELECT MAX(total) FROM pedidos) " +
                "LIMIT 1"; // Adicionado LIMIT 1 por segurança
        return jdbcTemplate.queryForList(sql);
    }

    // --- CORRIGIDO ---
    // Usando 'pedido_produto' e a lógica 'NOT IN' do seu SQL
    public List<Map<String, Object>> findProdutosSemVendas() {
        String sql = "SELECT p.nome " +
                "FROM produtos p " +
                "WHERE p.id_produto NOT IN ( " +
                "  SELECT DISTINCT id_produto FROM pedido_produto " +
                ")";
        return jdbcTemplate.queryForList(sql);
    }

    // --- CORRIGIDO ---
    // Usando a lógica de UNION do seu SQL e os 'id_cliente' corretos
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
    // === MÉTODO DO GRÁFICO DINÂMICO --- CORRIGIDO ===
    // ===================================================================
    public Map<String, Double> getVendasMensais() {

        // SQL corrigido para usar 'data_hora' e 'total' da tabela 'pedidos'
        String sql = "SELECT " +
                "  MONTHNAME(data_hora) as mes, " +
                "  SUM(total) as total " +
                "FROM " +
                "  pedidos " +
                "WHERE " +
                "  YEAR(data_hora) = YEAR(CURDATE()) " + // Filtra apenas o ano atual
                "GROUP BY " +
                "  mes, MONTH(data_hora) " + // Agrupa pelo nome e número do mês
                "ORDER BY " +
                "  MONTH(data_hora);"; // Ordena pelo número do mês (Jan, Fev, Mar...)

        List<Map<String, Object>> listaResultados = jdbcTemplate.queryForList(sql);

        // Usamos LinkedHashMap para garantir que os meses fiquem em ordem
        Map<String, Double> dadosGrafico = new LinkedHashMap<>();

        for (Map<String, Object> linha : listaResultados) {
            String mes = (String) linha.get("mes");
            Double total = ((Number) linha.get("total")).doubleValue();

            dadosGrafico.put(mes, total);
        }

        return dadosGrafico;
    }
}
