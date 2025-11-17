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

import br.com.bardosom.api.dao.ReservaDAO;

@RestController
@RequestMapping("/reservas")
@CrossOrigin(origins = "http://localhost:5173")
public class ReservaController {

    @Autowired
    private ReservaDAO reservaDAO;

 
    @GetMapping
    public List<Map<String, Object>> listarTodasReservas() {
        return reservaDAO.listarTodasReservas();
    }

    private static class ReservaRequest {
        private int idCliente;
        private int idMesa;
        private int idEvento;
        private String dataReserva;

        public int getIdCliente() { return idCliente; }
        public void setIdCliente(int idCliente) { this.idCliente = idCliente; }
        public int getIdMesa() { return idMesa; }
        public void setIdMesa(int idMesa) { this.idMesa = idMesa; }
        public int getIdEvento() { return idEvento; }
        public void setIdEvento(int idEvento) { this.idEvento = idEvento; }
        public String getDataReserva() { return dataReserva; }
        public void setDataReserva(String dataReserva) { this.dataReserva = dataReserva; }
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrarReserva(@RequestBody ReservaRequest reservaRequest) {
        try {
            reservaDAO.inserirReserva(
                    reservaRequest.getIdCliente(),
                    reservaRequest.getIdMesa(),
                    reservaRequest.getIdEvento(),
                    reservaRequest.getDataReserva()
            );
            return ResponseEntity.ok("Reserva cadastrada com sucesso!");
        } catch (Exception e) {
            System.err.println("Erro ao cadastrar reserva: " + e.getMessage());
            return ResponseEntity.badRequest().body("Erro ao cadastrar reserva: " + e.getMessage());
        }
    }
}