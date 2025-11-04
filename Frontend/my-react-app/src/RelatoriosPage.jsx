import React, { useState, useEffect } from 'react';
// 1. Importa os componentes de gráfico (Barra e Linha)
import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,    // Para gráfico de Barras
    LineElement,   // Para gráfico de Linha
    PointElement,  // Para gráfico de Linha
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// 2. Registra todos os componentes necessários
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

// CSS (Pode colocar no seu arquivo .css se preferir)
const styles = {
    pageContainer: {
        padding: '20px',
    },
    // NOVO: Container para colocar os gráficos lado a lado
    chartsRow: {
        display: 'flex',
        flexWrap: 'wrap', // Permite quebrar em telas menores
        gap: '20px',
        justifyContent: 'center',
        marginBottom: '40px',
    },
    // NOVO: Caixa individual para cada gráfico
    chartBox: {
        width: '100%',
        maxWidth: '600px', // Tamanho máximo de cada gráfico
        minHeight: '400px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
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

    // Gráfico 1: Vendas Mensais (Barras)
    const [vendasChartData, setVendasChartData] = useState({ labels: [], datasets: [] });
    const [loadingVendasChart, setLoadingVendasChart] = useState(true);

    // Gráfico 2: Movimento de Clientes (Linha)
    const [movimentoChartData, setMovimentoChartData] = useState({ labels: [], datasets: [] });
    const [loadingMovimentoChart, setLoadingMovimentoChart] = useState(true);

    // Tabelas
    const [detalhesVendas, setDetalhesVendas] = useState([]);
    const [maiorPedido, setMaiorPedido] = useState([]);

    // --- BUSCA DE DADOS (useEffect) ---
    useEffect(() => {
        // 1. Busca dados para o GRÁFICO DE VENDAS (Barras)
        fetch('http://localhost:8080/relatorios/vendas-mensais')
            .then(response => response.json())
            .then(dadosDoBackend => {
                const labels = Object.keys(dadosDoBackend);
                const data = Object.values(dadosDoBackend);
                setVendasChartData({
                    labels: labels,
                    datasets: [{
                        label: 'Vendas Mensais (R$)',
                        data: data,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                    }],
                });
                setLoadingVendasChart(false);
            })
            .catch(error => setLoadingVendasChart(false));

        // 2. Busca dados para o GRÁFICO DE MOVIMENTO (Linha)
        fetch('http://localhost:8080/relatorios/pedidos-por-mes')
            .then(response => response.json())
            .then(dadosDoBackend => {
                const labels = Object.keys(dadosDoBackend);
                const data = Object.values(dadosDoBackend);
                setMovimentoChartData({
                    labels: labels,
                    datasets: [{
                        label: 'Número de Pedidos (Movimento)',
                        data: data,
                        fill: false,
                        borderColor: 'rgba(255, 99, 132, 0.8)', // Cor diferente
                        backgroundColor: 'rgba(255, 99, 132, 0.8)',
                        tension: 0.1
                    }],
                });
                setLoadingMovimentoChart(false);
            })
            .catch(error => setLoadingMovimentoChart(false));

        // 3. Busca dados para as TABELAS
        fetch('http://localhost:8080/relatorios/detalhes-vendas')
            .then(res => res.json()).then(data => setDetalhesVendas(data));
        fetch('http://localhost:8080/relatorios/maior-pedido')
            .then(res => res.json()).then(data => setMaiorPedido(data));

    }, []); // O array vazio [] faz isso rodar só uma vez

    // --- OPÇÕES DOS GRÁFICOS ---
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, font: { size: 18 } }
        },
    };

    // --- RENDERIZAÇÃO ---
    return (
        <div style={styles.pageContainer}>
            <h1>Dashboard de Relatórios</h1>

            {/* --- Seção dos Gráficos Dinâmicos --- */}
            <div style={styles.chartsRow}>

                {/* Gráfico 1: Vendas */}
                <div style={styles.chartBox}>
                    {loadingVendasChart ? <p>Carregando gráfico de vendas...</p> : (
                        <Bar
                            options={{ ...options, plugins: { ...options.plugins, title: { ...options.plugins.title, text: 'Desempenho de Vendas (R$)' } } }}
                            data={vendasChartData}
                        />
                    )}
                </div>

                {/* Gráfico 2: Movimento */}
                <div style={styles.chartBox}>
                    {loadingMovimentoChart ? <p>Carregando gráfico de movimento...</p> : (
                        <Line
                            options={{ ...options, plugins: { ...options.plugins, title: { ...options.plugins.title, text: 'Movimento de Clientes (Nº de Pedidos)' } } }}
                            data={movimentoChartData}
                        />
                    )}
                </div>
            </div>

            {/* --- Seção das Tabelas (mantendo seus relatórios antigos) --- */}
            <div style={styles.tablesContainer}>
                <h2>Relatórios Detalhados</h2>
                {/* ... (O código das suas tabelas de Detalhes de Vendas e Maior Pedido) ... */}

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
