package br.com.bardosom.api.controller;

import br.com.bardosom.api.dao.ClienteDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/clientes") // Rota base: http://localhost:8080/clientes
@CrossOrigin(origins = "http://localhost:5173") // Permite acesso do Front-end React
public class ClienteController {

    @Autowired
    private ClienteDAO clienteDAO;

    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrarCliente(@RequestBody ClienteRequest clienteRequest) {
        try {
            clienteDAO.inserirCliente(
                    clienteRequest.getNome(),
                    clienteRequest.getEmail(),
                    clienteRequest.getDataNascimento(),
                    clienteRequest.getTelefone()
            );
            return ResponseEntity.ok("Cliente cadastrado com sucesso!");
        } catch (Exception e) {
            System.err.println("Erro ao cadastrar cliente: " + e.getMessage());
            return ResponseEntity.badRequest().body("Erro ao cadastrar cliente: " + e.getMessage());
        }
    }

    //endpoint: amanda
    @GetMapping
    public List<Map<String, Object>> listarTodosClientes() {
        return clienteDAO.listarTodos();
    }

    @GetMapping("/maiores30")
    public List<Map<String, Object>> listarClientesMaioresDe30() {
        return clienteDAO.listarMaioresDe30();
    }

    @GetMapping("/stats/faixa-etaria")
    public List<Map<String, Object>> getDadosGraficoFaixaEtaria() {
        return clienteDAO.contarPorFaixaEtaria();
    }


    private static class ClienteRequest {
        private String nome;
        private String email;
        private String dataNascimento;
        private String telefone;

        // Getters e Setters
        public String getNome() { return nome; }
        public void setNome(String nome) { this.nome = nome; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getDataNascimento() { return dataNascimento; }
        public void setDataNascimento(String dataNascimento) { this.dataNascimento = dataNascimento; }
        public String getTelefone() { return telefone; }
        public void setTelefone(String telefone) { this.telefone = telefone; }
    }
}