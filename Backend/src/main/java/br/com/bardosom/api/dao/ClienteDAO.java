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

    public List<Map<String, Object>> listarTodos() {
        String sql = "SELECT id, nome, email, data_nascimento, telefone FROM clientes";
        return jdbcTemplate.queryForList(sql);
    }

    public List<Map<String, Object>> listarClientesComDadosDePedidos() {
        String sql = "SELECT " +
                "    c.id, " +
                "    c.nome, " +
                "    c.email, " +
                "    c.telefone, " +
                "    c.data_nascimento, " +
                // Conta apenas pedidos que não estão com status 'cancelado'
                "    COUNT(CASE WHEN p.status != 'cancelado' THEN p.id_pedido END) AS quantidade_pedidos, " +
                // Soma o total apenas de pedidos com status 'concluído'
                "    COALESCE(SUM(CASE WHEN p.status = 'concluído' THEN p.total ELSE 0 END), 0) AS total_gasto, " +
                // Pega a data e hora do último pedido, independente do status
                "    MAX(p.data_hora) AS ultimo_pedido " +
                "FROM " +
                "    clientes c " +
                "LEFT JOIN " +
                // Usando os nomes corretos da sua tabela e colunas
                "    pedido p ON c.id = p.id_cliente " +
                "GROUP BY " +
                "    c.id, c.nome, c.email, c.telefone, c.data_nascimento " +
                "ORDER BY " +
                "    c.nome";
        return jdbcTemplate.queryForList(sql);
    }

    public void inserirCliente(String nome, String email, String dataNascimento, String telefone) {
        String sql = "INSERT INTO clientes (nome, email, data_nascimento, telefone) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, nome, email, dataNascimento, telefone);
    }

    public void atualizarCliente(int id, String nome, String email, String dataNascimento, String telefone) {
        String sql = "UPDATE clientes SET nome = ?, email = ?, data_nascimento = ?, telefone = ? WHERE id = ?";
        jdbcTemplate.update(sql, nome, email, dataNascimento, telefone, id);
    }

    public void deletarCliente(int id) {
        String sql = "DELETE FROM clientes WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

    public List<Map<String, Object>> buscarPorNome(String nome) {
        String sql = "SELECT " +
                "    c.id, " +
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
                "    pedido p ON c.id = p.id_cliente " +
                "WHERE " +
                "    c.nome LIKE ? " + // AQUI ADICIONAMOS O FILTRO DA BUSCA
                "GROUP BY " +
                "    c.id, c.nome, c.email, c.telefone, c.data_nascimento " +
                "ORDER BY " +
                "    c.nome";

        String termoDeBusca = "%" + nome + "%";
        return jdbcTemplate.queryForList(sql, termoDeBusca);
    }

    public List<Map<String, Object>> listarClientesQueGastaramAcimaDe(double valorMinimo) {
        String sql = "SELECT " +
                "    c.id, " +
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
                "    pedido p ON c.id = p.id_cliente " +
                "GROUP BY " +
                "    c.id, c.nome, c.email, c.telefone, c.data_nascimento " +
                "HAVING " +
                "    SUM(CASE WHEN p.status = 'concluído' THEN p.total ELSE 0 END) > ? " +
                "ORDER BY " +
                "    total_gasto DESC";

        return jdbcTemplate.queryForList(sql, valorMinimo);
    }
}