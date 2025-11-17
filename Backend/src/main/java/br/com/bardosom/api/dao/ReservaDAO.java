package br.com.bardosom.api.dao;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ReservaDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> listarTodasReservas() {
        String sql = "SELECT " +
                "    r.id_reserva, " +
                "    r.data_reserva, " +
                "    c.nome AS nome_cliente, " +
                "    m.numero AS numero_mesa, " +
                "    e.nome AS nome_evento " +
                "FROM " +
                "    reservas r " +
                "JOIN " +
                "    clientes c ON r.id_cliente = c.id_cliente " +
                "JOIN " +
                "    mesas m ON r.id_mesa = m.id_mesa " +
                "JOIN " +
                "    eventos e ON r.id_evento = e.id_evento " +
                "ORDER BY " +
                "    r.data_reserva DESC";
        return jdbcTemplate.queryForList(sql);
    }

    public void inserirReserva(int idCliente, int idMesa, int idEvento, String dataReserva) {
        String sql = "INSERT INTO reservas (id_cliente, id_mesa, id_evento, data_reserva) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, idCliente, idMesa, idEvento, dataReserva);
    }
}