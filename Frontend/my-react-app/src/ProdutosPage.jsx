import React, { useState, useEffect } from 'react';
import './ProdutosPage.css'; 
function ProdutosPage() {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_BASE = 'http://localhost:8080';

    const buscarProdutos = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE}/produtos`);

            if (!response.ok) {
                throw new Error(`Erro ao buscar dados: ${response.statusText}`);
            }

            const data = await response.json();
            setProdutos(data);
            setError(null);

        } catch (err) {
            console.error("Falha ao carregar produtos:", err);
            setError("Não foi possível carregar a lista de produtos. Verifique a API.");
            setProdutos([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        buscarProdutos();
    }, []);

    const getStatusStyle = (status) => {
        const s = status ? status.toLowerCase() : '';
        if (s.includes('em estoque')) return { color: '#38A169', fontWeight: 'bold' };
        if (s.includes('baixo')) return { color: '#DD6B20', fontWeight: 'bold' };
        if (s.includes('fora')) return { color: '#E53E3E', fontWeight: 'bold' };
        return { color: '#4A5568' };
    };

    return (
        <div className="produtos-container">
            <h1>📦 Produtos Disponíveis</h1>
            
            {loading && <p style={{ textAlign: 'center', marginTop: '20px' }}>Carregando produtos...</p>}

            {error && (
                <div className="error-message">
                    <p>{error}</p>
                </div>
            )}

            {!loading && !error && produtos.length === 0 && (
                <div className="no-data">
                    <p>Nenhum produto encontrado no banco de dados.</p>
                </div>
            )}

            {!loading && !error && produtos.length > 0 && (
                <div className="produtos-tabela-wrapper">
                    <table className="produtos-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Preço</th>
                                <th>Estoque</th>
                                <th>Status (Função SQL)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos.map((produto) => (
                                <tr key={produto.id_produto}>
                                    <td>{produto.id_produto}</td>
                                    <td>{produto.nome}</td>
                                    <td>R$ {parseFloat(produto.preco).toFixed(2).replace('.', ',')}</td>
                                    <td>{produto.estoque} un.</td>
                                    <td>
                                        <span style={getStatusStyle(produto.status_estoque)}>
                                            {produto.status_estoque}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ProdutosPage;