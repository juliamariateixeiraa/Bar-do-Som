// ClienteController.java
package br.com.bardosom.api.controller;

import br.com.bardosom.api.dao.ClienteDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/clientes") // Rota base: http://localhost:8080/clientes
@CrossOrigin(origins = "http://localhost:5173") // Permite acesso do Front-end React
public class ClienteController {

    @Autowired
    private ClienteDAO clienteDAO;

    // Endpoint: POST http://localhost:8080/clientes/cadastrar
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
            // Retorna um status 400 (Bad Request) se houver falha na inserção
            return ResponseEntity.badRequest().body("Erro ao cadastrar cliente: " + e.getMessage());
        }
    }

    // Classe para mapear o JSON recebido do Frontend
    private static class ClienteRequest {
        private String nome;
        private String email;
        private String dataNascimento;
        private String telefone;

        // Getters e Setters (Obrigatórios para o Spring mapear o JSON)
        public String getNome() { return nome; }
        public void setNome(String nome) { this.nome = nome; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        // Nota: O nome do campo JSON deve ser camelCase (dataNascimento) para mapear
        public String getDataNascimento() { return dataNascimento; }
        public void setDataNascimento(String dataNascimento) { this.dataNascimento = dataNascimento; }
        public String getTelefone() { return telefone; }
        public void setTelefone(String telefone) { this.telefone = telefone; }
    }
}