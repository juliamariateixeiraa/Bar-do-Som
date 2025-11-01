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

    public List<Map<String, Object>> listarDetalhesPedidos() {
        String sql = "SELECT * FROM VisaoDetalhesPedidos";
        return jdbcTemplate.queryForList(sql);
    }

    public List<Map<String, Object>> encontrarClienteDoMaiorPedido() {
        String sql = "SELECT c.nome AS nome_cliente_do_maior_pedido, p.total AS maior_valor_pedido, p.data_hora " +
                "FROM clientes c " +
                "JOIN pedidos p ON c.id_cliente = p.id_cliente " +
                "WHERE p.total = (SELECT MAX(total) FROM pedidos)";
        return jdbcTemplate.queryForList(sql);
    }

    public List<Map<String, Object>> findProdutosSemVendas() {
        String sql = "SELECT p.id_produto, p.nome, p.tipo, p.preco, p.estoque " +
                "FROM produtos p " +
                "WHERE p.id_produto NOT IN (" +
                "    SELECT DISTINCT id_produto FROM pedido_produto" +
                ")";
        return jdbcTemplate.queryForList(sql);
    }


    public List<Map<String, Object>> listarClientesReservasFullJoin() {
        String sql = "(" +
                "    SELECT c.nome AS nome_cliente, r.id_reserva, r.data_reserva, 'Tem Reserva' AS status_reserva " +
                "    FROM clientes c LEFT JOIN reservas r ON c.id_cliente = r.id_cliente" +
                ")" +
                "UNION" +
                "(" +
                "    SELECT 'Cliente Excluído/Sem Nome' AS nome_cliente, r.id_reserva, r.data_reserva, 'Reserva Órfã' AS status_reserva " +
                "    FROM reservas r LEFT JOIN clientes c ON r.id_cliente = c.id_cliente WHERE c.id_cliente IS NULL" +
                ")";
        return jdbcTemplate.queryForList(sql);
    }
}