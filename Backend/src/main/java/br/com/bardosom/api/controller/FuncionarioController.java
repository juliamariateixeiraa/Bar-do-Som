package br.com.bardosom.api.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.bardosom.api.dao.FuncionarioDAO;

@RestController
@RequestMapping("/funcionarios")
@CrossOrigin(origins = "http://localhost:5173") 
public class FuncionarioController {

    @Autowired
    private FuncionarioDAO funcionarioDAO;

    @GetMapping
    public List<Map<String, Object>> listarTodosFuncionarios() {
        System.out.println("Requisição GET /funcionarios recebida.");
        try {
            return funcionarioDAO.listarTodosFuncionarios();
        } catch (Exception e) {
            System.err.println("Erro ao listar funcionários do DB: " + e.getMessage());
            return List.of(); 
        }
    }
}