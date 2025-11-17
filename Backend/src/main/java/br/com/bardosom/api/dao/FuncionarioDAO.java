package br.com.bardosom.api.dao;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class FuncionarioDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> listarTodosFuncionarios() {
        String sql = "SELECT id_funcionario, nome, cargo, telefone, id_gerente FROM funcionarios ORDER BY nome";
        return jdbcTemplate.queryForList(sql);
    }
}