package br.com.bardosom.api.controller;

import br.com.bardosom.api.dao.DashboardDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
}