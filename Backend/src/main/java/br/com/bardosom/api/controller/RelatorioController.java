package br.com.bardosom.api.controller;

import br.com.bardosom.api.dao.RelatorioDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/relatorios")
@CrossOrigin(origins = "http://localhost:5173")
public class RelatorioController {

    @Autowired
    private RelatorioDAO relatorioDAO;

    // ========== ENDPOINTS ORIGINAIS ==========

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

    // ========== NOVOS ENDPOINTS PARA OS GRÁFICOS ==========

    @GetMapping("/vendas-por-tipo")
    public List<Map<String, Object>> getVendasPorTipoProduto() {
        return relatorioDAO.obterDistribuicaoPorTipoProduto();
    }

    @GetMapping("/eventos-por-estilo")
    public List<Map<String, Object>> getEventosPorEstilo() {
        return relatorioDAO.obterEventosPorEstilo();
    }

    @GetMapping("/clientes-faixa-etaria")
    public List<Map<String, Object>> getClientesPorFaixaEtaria() {
        return relatorioDAO.obterClientesPorFaixaEtaria();
    }

    // ========== CONSULTAS AVANÇADAS E VIEWS ==========

    @GetMapping("/consultas/anti-join")
    public List<Map<String, Object>> getClientesSemPedidos() {
        return relatorioDAO.clientesSemPedidos();
    }

    @GetMapping("/consultas/full-outer-join")
    public List<Map<String, Object>> getFullOuterJoin() {
        return relatorioDAO.fullOuterJoinClientesEventos();
    }

    @GetMapping("/consultas/subconsulta1")
    public List<Map<String, Object>> getProdutosAcimaDaMedia() {
        return relatorioDAO.produtosAcimaDaMedia();
    }

    @GetMapping("/consultas/subconsulta2")
    public List<Map<String, Object>> getClientesComMuitosPedidos(
            @RequestParam(required = false, defaultValue = "5") Integer minPedidos
    ) {
        return relatorioDAO.clientesComMuitosPedidos(minPedidos);
    }

    @GetMapping("/consultas/view1")
    public List<Map<String, Object>> getViewVendasPorProduto() {
        return relatorioDAO.consultarViewVendasPorProduto();
    }

    @GetMapping("/consultas/view2")
    public List<Map<String, Object>> getViewEventosReservas() {
        return relatorioDAO.consultarViewEventosReservas();
    }
}