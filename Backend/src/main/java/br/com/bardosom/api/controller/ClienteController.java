package br.com.bardosom.api.controller;

import br.com.bardosom.api.dao.ClienteDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/clientes")
@CrossOrigin(origins = "http://localhost:5173")
public class ClienteController {

    @Autowired
    private ClienteDAO clienteDAO;

    @GetMapping
    public List<Map<String, Object>> listarTodosClientes() {
        return clienteDAO.listarClientesComDadosDePedidos();
    }

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

    @GetMapping("/buscar")
    public List<Map<String, Object>> buscarClientes(@RequestParam(required = false) String nome) {
        if (nome == null || nome.trim().isEmpty()) {
            return new ArrayList<>();
        }
        return clienteDAO.buscarPorNome(nome);
    }

    @GetMapping("/gastos-acima-de")
    public List<Map<String, Object>> listarClientesComGastosAcima(@RequestParam double valor) {
        return clienteDAO.listarClientesQueGastaramAcimaDe(valor);
    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<String> atualizarCliente(@PathVariable int id, @RequestBody ClienteRequest clienteRequest) {
        try {
            clienteDAO.atualizarCliente(
                    id,
                    clienteRequest.getNome(),
                    clienteRequest.getEmail(),
                    clienteRequest.getDataNascimento(),
                    clienteRequest.getTelefone()
            );
            return ResponseEntity.ok("Cliente atualizado com sucesso!");
        } catch (Exception e) {
            System.err.println("Erro ao atualizar cliente: " + e.getMessage());
            return ResponseEntity.badRequest().body("Erro ao atualizar cliente: " + e.getMessage());
        }
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<String> deletarCliente(@PathVariable int id) {
        try {
            clienteDAO.deletarCliente(id);
            return ResponseEntity.ok("Cliente deletado com sucesso!");
        } catch (Exception e) {
            System.err.println("Erro ao deletar cliente: " + e.getMessage());
            return ResponseEntity.badRequest().body("Erro ao deletar cliente: " + e.getMessage());
        }
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