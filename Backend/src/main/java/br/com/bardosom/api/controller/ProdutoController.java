package br.com.bardosom.api.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.bardosom.api.dao.ProdutoDAO;

@RestController
@RequestMapping("/produtos")
@CrossOrigin(origins = "http://localhost:5173")
public class ProdutoController {

    @Autowired
    private ProdutoDAO produtoDAO;

    @GetMapping
    public List<Map<String, Object>> listarProdutosComStatus() {
        return produtoDAO.listarProdutosComStatusEstoque();
    }

    @GetMapping("/status/{id}")
    public Map<String, Object> obterStatusPorId(@PathVariable int id) {
        return produtoDAO.obterStatusPorId(id);
    }
}