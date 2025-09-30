package br.com.bardosom.api.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ClienteDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Método não utilizado, mas corrigido por segurança.
    public List<Map<String, Object>> listarTodos() {
        String sql = "SELECT id_cliente, nome, email, data_nascimento, telefone FROM clientes";
        return jdbcTemplate.queryForList(sql);
    }

    public List<Map<String, Object>> listarClientesComDadosDePedidos() {
        String sql = "SELECT " +
                "    c.id_cliente, " + // CORRIGIDO: id -> id_cliente
                "    c.nome, " +
                "    c.email, " +
                "    c.telefone, " +
                "    c.data_nascimento, " +
                "    COUNT(CASE WHEN p.status != 'cancelado' THEN p.id_pedido END) AS quantidade_pedidos, " +
                "    COALESCE(SUM(CASE WHEN p.status = 'concluído' THEN p.total ELSE 0 END), 0) AS total_gasto, " +
                "    MAX(p.data_hora) AS ultimo_pedido " +
                "FROM " +
                "    clientes c " +
                "LEFT JOIN " +
                "    pedidos p ON c.id_cliente = p.id_cliente " + // CORRIGIDO: pedido -> pedidos e c.id -> c.id_cliente
                "GROUP BY " +
                "    c.id_cliente, c.nome, c.email, c.telefone, c.data_nascimento " + // CORRIGIDO: id -> id_cliente
                "ORDER BY " +
                "    c.nome";
        return jdbcTemplate.queryForList(sql);
    }

    public void inserirCliente(String nome, String email, String dataNascimento, String telefone) {
        String sql = "INSERT INTO clientes (nome, email, data_nascimento, telefone) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, nome, email, dataNascimento, telefone);
    }

    // No frontend, lembre-se de que a propriedade agora é 'id_cliente'
    public void atualizarCliente(int id, String nome, String email, String dataNascimento, String telefone) {
        String sql = "UPDATE clientes SET nome = ?, email = ?, data_nascimento = ?, telefone = ? WHERE id_cliente = ?"; // CORRIGIDO: id -> id_cliente
        jdbcTemplate.update(sql, nome, email, dataNascimento, telefone, id);
    }

    // No frontend, lembre-se de que a propriedade agora é 'id_cliente'
    public void deletarCliente(int id) {
        String sql = "DELETE FROM clientes WHERE id_cliente = ?"; // CORRIGIDO: id -> id_cliente
        jdbcTemplate.update(sql, id);
    }

    public List<Map<String, Object>> buscarPorNome(String nome) {
        String sql = "SELECT " +
                "    c.id_cliente, " + // CORRIGIDO: id -> id_cliente
                "    c.nome, " +
                "    c.email, " +
                "    c.telefone, " +
                "    c.data_nascimento, " +
                "    COUNT(CASE WHEN p.status != 'cancelado' THEN p.id_pedido END) AS quantidade_pedidos, " +
                "    COALESCE(SUM(CASE WHEN p.status = 'concluído' THEN p.total ELSE 0 END), 0) AS total_gasto, " +
                "    MAX(p.data_hora) AS ultimo_pedido " +
                "FROM " +
                "    clientes c " +
                "LEFT JOIN " +
                "    pedidos p ON c.id_cliente = p.id_cliente " + // CORRIGIDO: pedido -> pedidos e c.id -> c.id_cliente
                "WHERE " +
                "    c.nome LIKE ? " +
                "GROUP BY " +
                "    c.id_cliente, c.nome, c.email, c.telefone, c.data_nascimento " + // CORRIGIDO: id -> id_cliente
                "ORDER BY " +
                "    c.nome";

        String termoDeBusca = "%" + nome + "%";
        return jdbcTemplate.queryForList(sql, termoDeBusca);
    }

    public List<Map<String, Object>> listarClientesQueGastaramAcimaDe(double valorMinimo) {
        String sql = "SELECT " +
                "    c.id_cliente, " + // CORRIGIDO: id -> id_cliente
                "    c.nome, " +
                "    c.email, " +
                "    c.telefone, " +
                "    c.data_nascimento, " +
                "    COUNT(CASE WHEN p.status != 'cancelado' THEN p.id_pedido END) AS quantidade_pedidos, " +
                "    COALESCE(SUM(CASE WHEN p.status = 'concluído' THEN p.total ELSE 0 END), 0) AS total_gasto, " +
                "    MAX(p.data_hora) AS ultimo_pedido " +
                "FROM " +
                "    clientes c " +
                "LEFT JOIN " +
                "    pedidos p ON c.id_cliente = p.id_cliente " + // CORRIGIDO: pedido -> pedidos e c.id -> c.id_cliente
                "GROUP BY " +
                "    c.id_cliente, c.nome, c.email, c.telefone, c.data_nascimento " + // CORRIGIDO: id -> id_cliente
                "HAVING " +
                "    SUM(CASE WHEN p.status = 'concluído' THEN p.total ELSE 0 END) > ? " +
                "ORDER BY " +
                "    total_gasto DESC";

        return jdbcTemplate.queryForList(sql, valorMinimo);
    }
}