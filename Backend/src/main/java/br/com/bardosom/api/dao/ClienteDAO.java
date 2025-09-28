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

    public void inserirCliente(String nome, String email, String dataNascimento, String telefone) {
        String sql = "INSERT INTO Cliente (nome, email, data_nascimento, telefone) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, nome, email, dataNascimento, telefone);
    }

    //buscar e retornar os clientes
    public List<Map<String, Object>> listarTodos() {
        // CORREÇÃO AQUI: Trocamos 'id' por 'id_cliente'
        String sql = "SELECT id_cliente, nome, email, DATE_FORMAT(data_nascimento, '%d/%m/%Y') as data_nascimento, telefone FROM Cliente";
        return jdbcTemplate.queryForList(sql);
    }

    //clientes maiores de 30
    public List<Map<String, Object>> listarMaioresDe30() {
        // ALTERADO: de > 18 para > 30
        String sql = "SELECT id_cliente, nome, email, DATE_FORMAT(data_nascimento, '%d/%m/%Y') as data_nascimento, telefone " +
                "FROM Cliente WHERE TIMESTAMPDIFF(YEAR, data_nascimento, CURDATE()) > 30";
        return jdbcTemplate.queryForList(sql);
    }

    //agrupar clientes por faixa etaria para grafico
    public List<Map<String, Object>> contarPorFaixaEtaria() {
        String sql = "SELECT CASE " +
                "WHEN TIMESTAMPDIFF(YEAR, data_nascimento, CURDATE()) <= 17 THEN 'Menor de 18' " +
                "WHEN TIMESTAMPDIFF(YEAR, data_nascimento, CURDATE()) BETWEEN 18 AND 30 THEN '18-30 anos' " +
                "WHEN TIMESTAMPDIFF(YEAR, data_nascimento, CURDATE()) BETWEEN 31 AND 50 THEN '31-50 anos' " +
                "ELSE 'Mais de 50' " +
                "END as faixa_etaria, COUNT(*) as total " +
                "FROM Cliente GROUP BY faixa_etaria";
        return jdbcTemplate.queryForList(sql);
    }
}