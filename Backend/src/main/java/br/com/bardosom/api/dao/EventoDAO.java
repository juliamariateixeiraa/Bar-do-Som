// Em: src/main/java/br/com/bardosom/api/dao/EventoDAO.java
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

    public void inserirEvento(String nome, String data, String hora, double valorIngresso, int publicoEstimado) {
        String sql = "INSERT INTO evento (nome, data, hora, valor_ingresso, publico_estimado) VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, nome, data, hora, valorIngresso, publicoEstimado);
    }

    // --- MÉTODOS DE CONSULTA CORRIGIDOS ---

    public List<Map<String, Object>> listarTodos() {
        // ALTERAÇÃO AQUI: Trocamos 'ORDER BY data' por 'ORDER BY id_evento'
        String sql = "SELECT id_evento, nome, DATE_FORMAT(data, '%d/%m/%Y') as data, " +
                "TIME_FORMAT(hora, '%H:%i') as hora, valor_ingresso, publico_estimado " +
                "FROM evento ORDER BY id_evento";
        return jdbcTemplate.queryForList(sql);
    }

    public List<Map<String, Object>> listarPorPeriodo(String dataInicio, String dataFim) {
        // ALTERAÇÃO AQUI: Trocamos 'ORDER BY data' por 'ORDER BY id_evento'
        String sql = "SELECT id_evento, nome, DATE_FORMAT(data, '%d/%m/%Y') as data, " +
                "TIME_FORMAT(hora, '%H:%i') as hora, valor_ingresso, publico_estimado " +
                "FROM evento WHERE data BETWEEN ? AND ? ORDER BY id_evento";
        return jdbcTemplate.queryForList(sql, dataInicio, dataFim);
    }

    public List<Map<String, Object>> contarEventosPorMes() {
        String sql = "SELECT MONTHNAME(data) as mes, COUNT(*) as total " +
                "FROM evento GROUP BY mes, MONTH(data) ORDER BY MONTH(data)";
        return jdbcTemplate.queryForList(sql);
    }

    public List<Map<String, Object>> listarClientesEmEventos() {
        // CORREÇÃO AQUI: Trocamos 'Cliente' por 'cliente' e 'Evento' por 'evento'
        String sql = "SELECT c.nome as nome_cliente, e.nome as nome_evento, DATE_FORMAT(e.data, '%d/%m/%Y') as data_evento " +
                "FROM cliente c " +
                "JOIN cliente_evento ce ON c.id_cliente = ce.cliente_id " + // Garante que usa id_cliente
                "JOIN evento e ON e.id_evento = ce.evento_id " + // Garante que usa id_evento
                "ORDER BY e.data, c.nome";
        return jdbcTemplate.queryForList(sql);
    }
}