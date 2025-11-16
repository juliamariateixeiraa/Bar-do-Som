package br.com.bardosom.api.dao;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ClienteDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> listarTodos() {
        String sql = "SELECT id_cliente, nome, email, data_nascimento, telefone FROM clientes";
        return jdbcTemplate.queryForList(sql);
    }

    public List<Map<String, Object>> listarClientesComDadosDePedidos() {
        String sql = "SELECT " +
                "    c.id_cliente, " +
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
                "    pedidos p ON c.id_cliente = p.id_cliente " +
                "GROUP BY " +
                "    c.id_cliente, c.nome, c.email, c.telefone, c.data_nascimento " +
                "ORDER BY " +
                "    c.nome";
        return jdbcTemplate.queryForList(sql);
    }

    public void inserirCliente(String nome, String email, String dataNascimento, String telefone) {
        String sql = "INSERT INTO clientes (nome, email, data_nascimento, telefone) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, nome, email, dataNascimento, telefone);
    }

    public void atualizarCliente(int id, String nome, String email, String dataNascimento, String telefone) {
        String sql = "UPDATE clientes SET nome = ?, email = ?, data_nascimento = ?, telefone = ? WHERE id_cliente = ?";
        jdbcTemplate.update(sql, nome, email, dataNascimento, telefone, id);
    }

    public void deletarCliente(int id) {
        String sql = "DELETE FROM clientes WHERE id_cliente = ?";
        jdbcTemplate.update(sql, id);
    }

    public List<Map<String, Object>> buscarPorNome(String nome) {
        String sql = "SELECT " +
                "    c.id_cliente, " +
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
                "    pedidos p ON c.id_cliente = p.id_cliente " +
                "WHERE " +
                "    c.nome LIKE ? " +
                "GROUP BY " +
                "    c.id_cliente, c.nome, c.email, c.telefone, c.data_nascimento " +
                "ORDER BY " +
                "    c.nome";

        String termoDeBusca = "%" + nome + "%";
        return jdbcTemplate.queryForList(sql, termoDeBusca);
    }

    public List<Map<String, Object>> listarClientesQueGastaramAcimaDe(double valorMinimo) {
        String sql = "SELECT " +
                "    c.id_cliente, " +
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
                "    pedidos p ON c.id_cliente = p.id_cliente " +
                "GROUP BY " +
                "    c.id_cliente, c.nome, c.email, c.telefone, c.data_nascimento " +
                "HAVING " +
                "    SUM(CASE WHEN p.status = 'concluído' THEN p.total ELSE 0 END) > ? " +
                "ORDER BY " +
                "    total_gasto DESC";

        return jdbcTemplate.queryForList(sql, valorMinimo);
    }

    public List<Map<String, Object>> findClientesInativos() {
        String sql = "SELECT c.id_cliente, c.nome, c.email, c.telefone " +
                "FROM clientes c " +
                "LEFT JOIN pedidos p ON c.id_cliente = p.id_cliente " +
                "WHERE p.id_pedido IS NULL";
        return jdbcTemplate.queryForList(sql);
    }

    public List<Map<String, Object>> listarClientesComIdade() {
        String sql = "SELECT " +
                "    c.id_cliente, " +
                "    c.nome, " +
                "    c.email, " +
                "    c.data_nascimento, " +
                "    CalcularIdadeCliente(c.data_nascimento) AS idade " +
                "FROM " +
                "    clientes c " +
                "ORDER BY " +
                "    c.nome";
        return jdbcTemplate.queryForList(sql);
    }

    public List<Map<String, Object>> contarClientesPorMesNascimento() {
        String sql = "SELECT " +
                "    mes_numero, " +
                "    CASE mes_numero " +
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
                "    END AS mes_nome, " +
                "    quantidade_clientes, " +
                "    nomes_clientes " +
                "FROM (" +
                "    SELECT " +
                "        MONTH(data_nascimento) AS mes_numero, " +
                "        COUNT(*) AS quantidade_clientes, " +
                "        GROUP_CONCAT(nome ORDER BY nome SEPARATOR ', ') AS nomes_clientes " +
                "    FROM clientes " +
                "    GROUP BY MONTH(data_nascimento)" +
                ") AS subquery " +
                "ORDER BY mes_numero";
        return jdbcTemplate.queryForList(sql);
    }

    public Map<String, Object> obterIdadePorId(int clienteId) {
        String sql = "SELECT " +
                "    c.nome, " +
                "    c.data_nascimento, " +
                "    CalcularIdadeCliente(c.data_nascimento) AS idade " +
                "FROM " +
                "    clientes c " +
                "WHERE " +
                "    c.id_cliente = ?";
        
        // queryForMap é usado para retornar um único objeto (cliente)
        return jdbcTemplate.queryForMap(sql, clienteId);
    }
}