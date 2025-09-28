// EventoDAO.java
package br.com.bardosom.api.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class EventoDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    /**
     * Executa o INSERT INTO na tabela 'Evento'.
     * Colunas: nome, data, hora, valor_ingresso, publico_estimado.
     */
    public void inserirEvento(String nome, String data, String hora, double valorIngresso, int publicoEstimado) {
        String sql = "INSERT INTO Evento (nome, data, hora, valor_ingresso, publico_estimado) VALUES (?, ?, ?, ?, ?)";
        // O método 'update' do JdbcTemplate executa INSERT, passando os parâmetros em ordem.
        jdbcTemplate.update(sql, nome, data, hora, valorIngresso, publicoEstimado);
    }
}