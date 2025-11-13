package br.com.bardosom.api.dao;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

@Repository
public class PedidoDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public int inserirNovoPedido(int idCliente, double total, String status) {
        String sqlPedido = "INSERT INTO pedidos (id_cliente, data_hora, total, status) VALUES (?, NOW(), ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sqlPedido, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, idCliente);
            ps.setDouble(2, total);
            ps.setString(3, status);
            return ps;
        }, keyHolder);

        return keyHolder.getKey() != null ? keyHolder.getKey().intValue() : -1;
    }

    public void adicionarProdutoAoPedido(int idPedido, int idProduto, int quantidade) {
        String sqlItem = "INSERT INTO pedido_produto (id_pedido, id_produto, quantidade) VALUES (?, ?, ?)";
        jdbcTemplate.update(sqlItem, idPedido, idProduto, quantidade);
    }
    
    public List<Map<String, Object>> listarLogsDePedidos() {
        String sql = "SELECT * FROM log_operacoes WHERE tabela_afetada = 'pedidos' ORDER BY data_hora DESC LIMIT 10";
        return jdbcTemplate.queryForList(sql);
    }
}