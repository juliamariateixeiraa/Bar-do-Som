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
        // CORRETO: Usa id_evento
        String sql = "SELECT id_evento, nome, data, hora, valor_ingresso, publico_estimado FROM eventos";
        return jdbcTemplate.queryForList(sql);
    }

    public void inserirEvento(String nome, String data, String hora, double valorIngresso, int publicoEstimado) {
        String sql = "INSERT INTO eventos (nome, data, hora, valor_ingresso, publico_estimado) VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, nome, data, hora, valorIngresso, publicoEstimado);
    }

    public void atualizarEvento(int id_evento, String nome, String data, String hora, double valorIngresso, int publicoEstimado) {
        // CORRIGIDO: Usa id_evento no WHERE
        String sql = "UPDATE eventos SET nome = ?, data = ?, hora = ?, valor_ingresso = ?, publico_estimado = ? WHERE id_evento = ?";
        jdbcTemplate.update(sql, nome, data, hora, valorIngresso, publicoEstimado, id_evento);
    }

    public void deletarEvento(int id_evento) {
        // CORRIGIDO: Usa id_evento no WHERE
        String sql = "DELETE FROM eventos WHERE id_evento = ?";
        jdbcTemplate.update(sql, id_evento);
    }

    public List<Map<String, Object>> listarPorPeriodo(String inicio, String fim) {
        // Assumindo que sua tabela tem todas as colunas, usar '*' pode ser ok aqui,
        // mas é sempre mais seguro listar as colunas explicitamente.
        String sql = "SELECT id_evento, nome, data, hora, valor_ingresso, publico_estimado FROM eventos WHERE data BETWEEN ? AND ?";
        return jdbcTemplate.queryForList(sql, inicio, fim);
    }

    public List<Map<String, Object>> contarEventosPorMes() {
        String sql = "SELECT DATE_FORMAT(data, '%Y-%m') as mes, COUNT(*) as quantidade FROM eventos GROUP BY mes ORDER BY mes";
        return jdbcTemplate.queryForList(sql);
    }

    public List<Map<String, Object>> listarClientesEmEventos() {
        // Este método ainda está vazio.
        return new java.util.ArrayList<>();
    }

    public List<Map<String, Object>> listarPublicosEstimadosDistintos() {
        String sql = "SELECT DISTINCT publico_estimado FROM eventos WHERE publico_estimado % 2 = 0 ORDER BY publico_estimado ASC";
        return jdbcTemplate.queryForList(sql);
    }

    public List<Map<String, Object>> listarPorPublicoExato(int publico) {
        // CORRIGIDO: Seleciona id_evento
        String sql = "SELECT id_evento, nome, data, hora, valor_ingresso, publico_estimado FROM eventos WHERE publico_estimado = ?";
        return jdbcTemplate.queryForList(sql, publico);
    }

    public Map<String, Object> encontrarMesComMaiorPotencial() {
        String sql = "SELECT " +
                "    CASE MONTH(MAX(data)) " +
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
                "    END AS mes, " +
                "    SUM(valor_ingresso * publico_estimado) AS renda_potencial_total " +
                "FROM " +
                "    eventos " +
                "GROUP BY " +
                "    YEAR(data), MONTH(data) " +
                "ORDER BY " +
                "    renda_potencial_total DESC " +
                "LIMIT 1";

        List<Map<String, Object>> resultados = jdbcTemplate.queryForList(sql);
        if (resultados.isEmpty()) {
            return null;
        }
        return resultados.get(0);
    }
}