package br.com.bardosom.api.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.bardosom.api.dao.MesaDAO;

@RestController
@RequestMapping("/mesas")
@CrossOrigin(origins = "http://localhost:5173")
public class MesaController {

    @Autowired
    private MesaDAO mesaDAO;

    @GetMapping
    public List<Map<String, Object>> listarMesas() {
        return mesaDAO.listarTodas();
    }

    //endpoint para atualizar o status da mesa
    @PutMapping("/status/{id}")
    public ResponseEntity<String> atualizarStatus(
            @PathVariable("id") int mesaId,
            @RequestBody StatusMesaRequest request) {

        if (request.getStatus() == null || request.getStatus().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Status é obrigatório.");
        }

        try {
            mesaDAO.atualizarStatusMesa(mesaId, request.getStatus());
            return ResponseEntity.ok("Status da mesa " + mesaId + " atualizado para '" + request.getStatus() + "' com sucesso!");
        } catch (Exception e) {
            System.err.println("Erro ao atualizar status da mesa: " + e.getMessage());
            return ResponseEntity.internalServerError().body("Erro ao atualizar status da mesa: " + e.getMessage());
        }
    }

    private static class StatusMesaRequest {
        private String status;
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }
}