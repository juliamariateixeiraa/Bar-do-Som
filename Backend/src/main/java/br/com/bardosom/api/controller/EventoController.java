// EventoController.java
package br.com.bardosom.api.controller;

import br.com.bardosom.api.dao.EventoDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController // ⚠️ Garante que a classe lida com requisições REST
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
            // Retorna um status 400 (Bad Request) se houver falha na inserção
            return ResponseEntity.badRequest().body("Erro ao cadastrar evento: " + e.getMessage());
        }
    }

    // Classe para mapear o JSON recebido do Frontend (DTO)
    private static class EventoRequest {
        private String nome;
        private String data;
        private String hora;
        private double valorIngresso; // Deve ser double para aceitar 50.00
        private int publicoEstimado; // Deve ser int

        // Getters e Setters (Obrigatórios para o Spring mapear o JSON)
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
}