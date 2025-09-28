// ClienteDAO.java
package br.com.bardosom.api.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ClienteDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    /**
     * Executa o INSERT INTO na tabela 'Cliente'.
     * Colunas: nome, email, data_nascimento, telefone.
     */
    public void inserirCliente(String nome, String email, String dataNascimento, String telefone) {
        String sql = "INSERT INTO Cliente (nome, email, data_nascimento, telefone) VALUES (?, ?, ?, ?)";
        // O método 'update' do JdbcTemplate executa INSERT, passando os parâmetros em ordem.
        jdbcTemplate.update(sql, nome, email, dataNascimento, telefone);
    }
}