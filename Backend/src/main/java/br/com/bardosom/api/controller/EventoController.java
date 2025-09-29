package br.com.bardosom.api.controller;

import br.com.bardosom.api.dao.EventoDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/eventos") // Rota base: http://localhost:8080/eventos
@CrossOrigin(origins = "http://localhost:5173") // Permite acesso do Front-end React
public class EventoController {

    @Autowired
    private EventoDAO eventoDAO;

    // Endpoint: POST http://localhost:8080/eventos/cadastrar
    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrarEvento(@RequestBody EventoRequest eventoRequest) {
        try {
            eventoDAO.inserirEvento(
                    eventoRequest.getNome(),
                    eventoRequest.getData(),
                    eventoRequest.getHora(),
                    eventoRequest.getValorIngresso(),
                    eventoRequest.getPublicoEstimado()
            );
            return ResponseEntity.ok("Evento cadastrado com sucesso!");
        } catch (Exception e) {
            System.err.println("Erro ao cadastrar evento: " + e.getMessage());
            return ResponseEntity.badRequest().body("Erro ao cadastrar evento: " + e.getMessage());
        }
    }

    //endpoint: amanda
    @GetMapping
    public List<Map<String, Object>> listarTodosEventos() {
        return eventoDAO.listarTodos();
    }

    @GetMapping("/periodo")
    public List<Map<String, Object>> listarEventosPorPeriodo(@RequestParam String inicio, @RequestParam String fim) {
        return eventoDAO.listarPorPeriodo(inicio, fim);
    }

    @GetMapping("/stats/por-mes")
    public List<Map<String, Object>> getDadosGraficoEventosPorMes() {
        return eventoDAO.contarEventosPorMes();
    }

    @GetMapping("/com-clientes")
    public List<Map<String, Object>> getEventosComClientes() {
        return eventoDAO.listarClientesEmEventos();
    }


    // Classe para mapear o JSON recebido do Frontend (DTO)
    private static class EventoRequest {
        private String nome;
        private String data;
        private String hora;
        private double valorIngresso;
        private int publicoEstimado;

        // Getters e Setters
        public String getNome() { return nome; }
        public void setNome(String nome) { this.nome = nome; }
        public String getData() { return data; }
        public void setData(String data) { this.data = data; }
        public String getHora() { return hora; }
        public void setHora(String hora) { this.hora = hora; }
        public double getValorIngresso() { return valorIngresso; }
        public void setValorIngresso(double valorIngresso) { this.valorIngresso = valorIngresso; }
        public int getPublicoEstimado() { return publicoEstimado; }
        public void setPublicoEstimado(int publicoEstimado) { this.publicoEstimado = publicoEstimado; }
    }
    @PutMapping("/atualizar/{id}")
    public ResponseEntity<String> atualizarEvento(@PathVariable int id, @RequestBody EventoRequest eventoRequest) {
        try {
            eventoDAO.atualizarEvento(
                    id,
                    eventoRequest.getNome(),
                    eventoRequest.getData(),
                    eventoRequest.getHora(),
                    eventoRequest.getValorIngresso(),
                    eventoRequest.getPublicoEstimado()
            );
            return ResponseEntity.ok("Evento atualizado com sucesso!");
        } catch (Exception e) {
            System.err.println("Erro ao atualizar evento: " + e.getMessage());
            return ResponseEntity.badRequest().body("Erro ao atualizar evento: " + e.getMessage());
        }
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<String> deletarEvento(@PathVariable int id) {
        try {
            eventoDAO.deletarEvento(id);
            return ResponseEntity.ok("Evento deletado com sucesso!");
        } catch (Exception e) {
            System.err.println("Erro ao deletar evento: " + e.getMessage());
            return ResponseEntity.badRequest().body("Erro ao deletar evento: " + e.getMessage());
        }
    }
}