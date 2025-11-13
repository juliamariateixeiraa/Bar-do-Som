package br.com.bardosom.api.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.bardosom.api.dao.PedidoDAO;

@RestController
@RequestMapping("/pedidos")
@CrossOrigin(origins = "http://localhost:5173")
public class PedidoController {

    @Autowired
    private PedidoDAO pedidoDAO;

    @PostMapping("/checkout")
    public ResponseEntity<String> realizarCheckout(@RequestBody CheckoutRequest request) {
        try {
            int idNovoPedido = pedidoDAO.inserirNovoPedido(request.getIdCliente(), request.getTotal(), "concluído");

            if (idNovoPedido < 0) {
                throw new RuntimeException("Falha ao obter ID do novo pedido.");
            }

            for (ItemRequest item : request.getItens()) {
                pedidoDAO.adicionarProdutoAoPedido(idNovoPedido, item.getIdProduto(), item.getQuantidade());
            }

            return ResponseEntity.ok("Pedido " + idNovoPedido + " realizado com sucesso! Estoque atualizado.");
        } catch (Exception e) {
            System.err.println("Erro ao realizar checkout: " + e.getMessage());
            return ResponseEntity.badRequest().body("Erro ao realizar checkout: " + e.getMessage());
        }
    }
    
    @GetMapping("/logs")
    public List<Map<String, Object>> listarLogs() {
        return pedidoDAO.listarLogsDePedidos();
    }


    private static class CheckoutRequest {
        private int idCliente;
        private double total;
        private List<ItemRequest> itens;

        public int getIdCliente() { return idCliente; }
        public double getTotal() { return total; }
        public List<ItemRequest> getItens() { return itens; }
    }

    private static class ItemRequest {
        private int idProduto;
        private int quantidade;
        public int getIdProduto() { return idProduto; }
        public int getQuantidade() { return quantidade; }
    }
}