package br.com.bardosom.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class TesteConexao implements CommandLineRunner {

    // O Spring vai injetar o JdbcTemplate automaticamente
    // se a conexão no application.properties estiver correta.
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) throws Exception {
        try {
            // Executa um comando SQL muito simples que não faz nada,
            // apenas testa a comunicação com o banco.
            jdbcTemplate.execute("SELECT 1");
            System.out.println("✅ CONEXÃO COM O BANCO DE DADOS BEM-SUCEDIDA!");
        } catch (Exception e) {
            System.err.println("❌ FALHA AO CONECTAR COM O BANCO DE DADOS: " + e.getMessage());
        }
    }
}