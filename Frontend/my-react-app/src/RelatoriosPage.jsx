import React, { useState, useEffect } from 'react';
// 1. Importa os componentes de gráfico
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// 2. Registra os componentes necessários do Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// CSS (Pode colocar no seu arquivo .css se preferir)
const styles = {
    pageContainer: {
        padding: '20px',
    },
    chartContainer: {
        width: '80%',
        maxWidth: '900px',
        height: '450px',
        margin: '40px auto', // Centraliza o gráfico
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    },
    tablesContainer: {
        marginTop: '50px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    },
    th: {
        backgroundColor: '#f4f4f4',
        padding: '10px',
        border: '1px solid #ddd',
    },
    td: {
        padding: '10px',
        border: '1px solid #ddd',
        textAlign: 'center',
    }
};

function RelatoriosPage() {

    // --- ESTADOS PARA OS DADOS ---

    // Estado para o gráfico dinâmico
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });
    const [loadingChart, setLoadingChart] = useState(true);

    // Estados para as tabelas (dos seus endpoints antigos)
    const [detalhesVendas, setDetalhesVendas] = useState([]);
    const [maiorPedido, setMaiorPedido] = useState([]);

    // --- BUSCA DE DADOS (useEffect) ---

    useEffect(() => {
        // 1. Busca dados para o GRÁFICO
        fetch('http://localhost:8080/relatorios/vendas-mensais')
            .then(response => response.json())
            .then(dadosDoBackend => {
                // 'dadosDoBackend' é { "Janeiro": 1200.50, ... }
                const labels = Object.keys(dadosDoBackend); // Pega os meses
                const data = Object.values(dadosDoBackend); // Pega os valores

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Vendas Mensais (R$)',
                            data: data,
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
                setLoadingChart(false);
            })
            .catch(error => {
                console.error('Erro ao buscar dados do gráfico:', error);
                setLoadingChart(false);
            });

        // 2. Busca dados para a TABELA 1
        fetch('http://localhost:8080/relatorios/detalhes-vendas')
            .then(res => res.json())
            .then(data => setDetalhesVendas(data))
            .catch(error => console.error('Erro ao buscar detalhes vendas:', error));

        // 3. Busca dados para a TABELA 2
        fetch('http://localhost:8080/relatorios/maior-pedido')
            .then(res => res.json())
            .then(data => setMaiorPedido(data))
            .catch(error => console.error('Erro ao buscar maior pedido:', error));

    }, []); // O array vazio [] faz isso rodar só uma vez

    // --- OPÇÕES DO GRÁFICO ---
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false, // Permite o gráfico preencher o container
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Desempenho de Vendas Mensais',
                font: {
                    size: 18,
                }
            },
        },
    };

    // --- RENDERIZAÇÃO ---
    return (
        <div style={styles.pageContainer}>
            <h1>Dashboard de Relatórios</h1>

            {/* --- Seção do Gráfico Dinâmico --- */}
            <div style={styles.chartContainer}>
                {loadingChart ? (
                    <p>Carregando gráfico...</p>
                ) : (
                    <Bar options={chartOptions} data={chartData} />
                )}
            </div>

            {/* --- Seção das Tabelas (mantendo seus relatórios antigos) --- */}
            <div style={styles.tablesContainer}>
                <h2>Relatórios Detalhados</h2>

                <h3>Detalhes de Vendas</h3>
                <table style={styles.table}>
                    <thead>
                    <tr>
                        <th style={styles.th}>Cliente</th>
                        <th style={styles.th}>Produto</th>
                        <th style={styles.th}>Quantidade</th>
                        <th style={styles.th}>Valor Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {detalhesVendas.map((item, index) => (
                        <tr key={index}>
                            <td style={styles.td}>{item.nome_cliente}</td>
                            <td style={styles.td}>{item.nome_produto}</td>
                            <td style={styles.td}>{item.quantidade}</td>
                            <td style={styles.td}>R$ {item.valor_total}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <h3 style={{ marginTop: '30px' }}>Cliente com Maior Pedido</h3>
                <table style={styles.table}>
                    <thead>
                    <tr>
                        <th style={styles.th}>Cliente</th>
                        <th style={styles.th}>Valor do Pedido</th>
                    </tr>
                    </thead>
                    <tbody>
                    {maiorPedido.map((item, index) => (
                        <tr key={index}>
                            <td style={styles.td}>{item.nome_cliente}</td>
                            <td style={styles.td}>R$ {item.total_pedido}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RelatoriosPage;
