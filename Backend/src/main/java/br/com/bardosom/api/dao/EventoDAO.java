package br.com.bardosom.api.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class EventoDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> listarTodos() {
        String sql = "SELECT id, nome, data, hora, valor_ingresso, publico_estimado FROM eventos";
        return jdbcTemplate.queryForList(sql);
    }

    public void inserirEvento(String nome, String data, String hora, double valorIngresso, int publicoEstimado) {
        String sql = "INSERT INTO eventos (nome, data, hora, valor_ingresso, publico_estimado) VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, nome, data, hora, valorIngresso, publicoEstimado);
    }

    public void atualizarEvento(int id, String nome, String data, String hora, double valorIngresso, int publicoEstimado) {
        String sql = "UPDATE eventos SET nome = ?, data = ?, hora = ?, valor_ingresso = ?, publico_estimado = ? WHERE id = ?";
        jdbcTemplate.update(sql, nome, data, hora, valorIngresso, publicoEstimado, id);
    }

    public void deletarEvento(int id) {
        String sql = "DELETE FROM eventos WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

    public List<Map<String, Object>> listarPorPeriodo(String inicio, String fim) {
        String sql = "SELECT * FROM eventos WHERE data BETWEEN ? AND ?";
        return jdbcTemplate.queryForList(sql, inicio, fim);
    }

    public List<Map<String, Object>> contarEventosPorMes() {
        String sql = "SELECT DATE_FORMAT(data, '%Y-%m') as mes, COUNT(*) as quantidade FROM eventos GROUP BY mes ORDER BY mes";
        return jdbcTemplate.queryForList(sql);
    }

    public List<Map<String, Object>> listarClientesEmEventos() {
        return new java.util.ArrayList<>();
    }
}