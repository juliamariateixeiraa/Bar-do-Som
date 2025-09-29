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

    public List<Map<String, Object>> listarMaioresDe30() {
        String sql = "SELECT * FROM clientes WHERE TIMESTAMPDIFF(YEAR, data_nascimento, CURDATE()) > 30";
        return jdbcTemplate.queryForList(sql);
    }

    public List<Map<String, Object>> contarPorFaixaEtaria() {
        String sql = "SELECT CASE " +
                "WHEN TIMESTAMPDIFF(YEAR, data_nascimento, CURDATE()) < 18 THEN 'Menor de 18' " +
                "WHEN TIMESTAMPDIFF(YEAR, data_nascimento, CURDATE()) BETWEEN 18 AND 30 THEN '18-30 anos' " +
                "WHEN TIMESTAMPDIFF(YEAR, data_nascimento, CURDATE()) BETWEEN 31 AND 50 THEN '31-50 anos' " +
                "ELSE 'Maior de 50' END as faixa_etaria, COUNT(*) as quantidade " +
                "FROM clientes GROUP BY faixa_etaria";
        return jdbcTemplate.queryForList(sql);
    }
    
}