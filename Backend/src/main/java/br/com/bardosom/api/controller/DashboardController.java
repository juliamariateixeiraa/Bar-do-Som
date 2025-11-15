package br.com.bardosom.api.controller;

import br.com.bardosom.api.dao.DashboardDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5177", "http://localhost:5180"})
public class DashboardController {

    @Autowired
    private DashboardDAO dashboardDAO;

    // Indicadores gerais
    @GetMapping("/indicadores-gerais")
    public Map<String, Object> getIndicadoresGerais() {
        return dashboardDAO.obterIndicadoresGerais();
    }

    // Vendas por mês
    @GetMapping("/vendas-por-mes")
    public List<Map<String, Object>> getVendasPorMes() {
        return dashboardDAO.obterVendasPorMes();
    }

    // Top 5 produtos mais vendidos
    @GetMapping("/produtos-mais-vendidos")
    public List<Map<String, Object>> getProdutosMaisVendidos(
            @RequestParam(defaultValue = "5") int limite) {
        return dashboardDAO.obterProdutosMaisVendidos(limite);
    }

    // Distribuição de clientes por faixa etária
    @GetMapping("/clientes-por-faixa-etaria")
    public List<Map<String, Object>> getClientesPorFaixaEtaria() {
        return dashboardDAO.obterClientesPorFaixaEtaria();
    }

    // Eventos por mês
    @GetMapping("/eventos-por-mes")
    public List<Map<String, Object>> getEventosPorMes() {
        return dashboardDAO.obterEventosPorMes();
    }

    // Status do estoque
    @GetMapping("/status-estoque")
    public Map<String, Object> getStatusEstoque() {
        return dashboardDAO.obterStatusEstoque();
    }

    // ========== FUNÇÕES ==========

    @GetMapping("/funcoes/ticket-medio/{clienteId}")
    public Map<String, Object> calcularTicketMedio(@PathVariable Long clienteId) {
        return dashboardDAO.calcularTicketMedio(clienteId);
    }

    @GetMapping("/funcoes/verificar-estoque/{produtoId}")
    public Map<String, Object> verificarEstoque(@PathVariable Long produtoId) {
        return dashboardDAO.verificarEstoque(produtoId);
    }

    // ========== PROCEDURES ==========

    @PostMapping("/procedures/atualizar-estoque")
    public Map<String, Object> atualizarEstoque(@RequestBody Map<String, Object> params) {
        Long produtoId = Long.parseLong(params.get("produtoId").toString());
        Integer quantidade = Integer.parseInt(params.get("quantidade").toString());
        return dashboardDAO.atualizarEstoque(produtoId, quantidade);
    }

    @PostMapping("/procedures/processar-pedidos")
    public Map<String, Object> processarPedidos() {
        return dashboardDAO.processarPedidosComCursor();
    }

    // ========== TRIGGERS (LOGS) ==========

    @GetMapping("/triggers/logs")
    public List<Map<String, Object>> getLogs() {
        return dashboardDAO.buscarLogs();
    }
}