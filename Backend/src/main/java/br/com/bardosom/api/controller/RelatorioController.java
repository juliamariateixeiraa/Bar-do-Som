package br.com.bardosom.api.controller;

import br.com.bardosom.api.dao.RelatorioDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap; // <-- IMPORTANTE: Adicione este import
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/relatorios")
@CrossOrigin(origins = "http://localhost:5173")
public class RelatorioController {

    @Autowired
    private RelatorioDAO relatorioDAO;

    @GetMapping("/detalhes-vendas")
    public List<Map<String, Object>> getDetalhesVendas() {
        return relatorioDAO.listarDetalhesPedidos();
    }

    @GetMapping("/maior-pedido")
    public List<Map<String, Object>> getClienteDoMaiorPedido() {
        return relatorioDAO.encontrarClienteDoMaiorPedido();
    }

    @GetMapping("/produtos-sem-vendas")
    public List<Map<String, Object>> getProdutosSemVendas() {
        return relatorioDAO.findProdutosSemVendas();
    }

    @GetMapping("/clientes-reservas")
    public List<Map<String, Object>> getClientesReservas() {
        return relatorioDAO.listarClientesReservasFullJoin();
    }

    // ===================================================================
    // === NOVO ENDPOINT PARA O GRÁFICO ===
    // ===================================================================
    @GetMapping("/vendas-mensais")
    public Map<String, Double> getVendasMensais() {

        // Apagamos os dados falsos e agora
        // chamamos diretamente o DAO, que busca no banco de dados!
        return relatorioDAO.getVendasMensais();
    }}
