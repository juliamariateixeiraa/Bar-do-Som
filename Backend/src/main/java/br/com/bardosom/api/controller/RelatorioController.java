package br.com.bardosom.api.controller;

import br.com.bardosom.api.dao.RelatorioDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    // === ENDPOINT DO GRÁFICO DE VENDAS (JÁ EXISTE) ===
    // ===================================================================
    @GetMapping("/vendas-mensais")
    public Map<String, Double> getVendasMensais() {
        return relatorioDAO.getVendasMensais();
    }

    // ===================================================================
    // === NOVO ENDPOINT PARA O GRÁFICO DE CLIENTES ===
    // ===================================================================
    @GetMapping("/pedidos-por-mes")
    public Map<String, Long> getPedidosPorMes() {
        return relatorioDAO.getPedidosPorMes();
    }
}
