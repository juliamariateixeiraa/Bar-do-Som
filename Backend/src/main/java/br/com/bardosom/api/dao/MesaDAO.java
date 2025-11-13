package br.com.bardosom.api.dao;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class MesaDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    //atualizar o status da mesa
    public void atualizarStatusMesa(int mesaId, String novoStatus) {
        // Chamada à Stored Procedure usando CALL
        String sql = "CALL AtualizarStatusMesa(?, ?)";
        jdbcTemplate.update(sql, mesaId, novoStatus);
    }
    
    // Adicione um método simples para listar todas as mesas e verificação (opcional)
    public List<Map<String, Object>> listarTodas() {
        String sql = "SELECT id_mesa, numero, status, capacidade FROM mesas";
        return jdbcTemplate.queryForList(sql);
    }
}