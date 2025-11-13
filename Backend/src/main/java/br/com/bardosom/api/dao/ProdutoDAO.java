package br.com.bardosom.api.dao;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ProdutoDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> listarProdutosComStatusEstoque() {
        String sql = "SELECT " +
                "    id_produto, " +
                "    nome, " +
                "    preco, " +
                "    estoque, " +
                "    VerificarStatusEstoque(id_produto) AS status_estoque " + // Usando a Função SQL
                "FROM " +
                "    produtos " +
                "ORDER BY " +
                "    nome";
        return jdbcTemplate.queryForList(sql);
    }

    public Map<String, Object> obterStatusPorId(int idProduto) {
        String sql = "SELECT " +
                "    id_produto, " +
                "    nome, " +
                "    estoque, " +
                "    VerificarStatusEstoque(id_produto) AS status_estoque " +
                "FROM " +
                "    produtos " +
                "WHERE " +
                "    id_produto = ?";
        // queryForMap é seguro se você tem certeza que apenas um resultado será retornado
        return jdbcTemplate.queryForMap(sql, idProduto);
    }
}