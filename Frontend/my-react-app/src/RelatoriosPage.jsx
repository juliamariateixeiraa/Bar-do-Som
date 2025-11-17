import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './RelatoriosPage.css';

function RelatoriosPage() {
    const [clientesPorMes, setClientesPorMes] = useState([]);

    const [vendasPorTipo, setVendasPorTipo] = useState([]);
    const [eventosPorEstilo, setEventosPorEstilo] = useState([]);
    const [clientesFaixaEtaria, setClientesFaixaEtaria] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mesDetalhes, setMesDetalhes] = useState(null);
    const [detalhesModal, setDetalhesModal] = useState(null);

    const COLORS = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
        '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
        '#F8B739', '#52B788', '#E76F51', '#2A9D8F'
    ];

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            setLoading(true);

            const [resMes, resVendas, resEventos, resFaixaEtaria] = await Promise.all([
                fetch('http://localhost:8080/clientes/por-mes-nascimento'),
                fetch('http://localhost:8080/relatorios/vendas-por-tipo'),
                fetch('http://localhost:8080/relatorios/eventos-por-estilo'),
                fetch('http://localhost:8080/relatorios/clientes-faixa-etaria')
            ]);

            if (!resMes.ok || !resVendas.ok || !resEventos.ok || !resFaixaEtaria.ok) {
                throw new Error('Erro ao buscar dados');
            }

            const [dataMes, dataVendas, dataEventos, dataFaixaEtaria] = await Promise.all([
                resMes.json(),
                resVendas.json(),
                resEventos.json(),
                resFaixaEtaria.json()
            ]);

            setClientesPorMes(dataMes);
            setVendasPorTipo(dataVendas);
            setEventosPorEstilo(dataEventos);
            setClientesFaixaEtaria(dataFaixaEtaria);
            setError(null);
        } catch (err) {
            console.error('Erro ao carregar dados:', err);
            setError('Não foi possível carregar os dados. Verifique se o backend está rodando.');
        } finally {
            setLoading(false);
        }
    };

    const formatarMoeda = (valor) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    };

    const handleBarClick = (data) => {
        setMesDetalhes(data);
    };

    const handleChartClick = (data, tipo) => {
        setDetalhesModal({ data, tipo });
    };

    const fecharDetalhes = () => {
        setMesDetalhes(null);
    };

    const fecharDetalhesModal = () => {
        setDetalhesModal(null);
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="custom-tooltip">
                    <p className="tooltip-titulo">{data.mes_nome}</p>
                    <p className="tooltip-valor">
                        <strong>{data.quantidade_clientes}</strong> {data.quantidade_clientes === 1 ? 'cliente' : 'clientes'}
                    </p>
                    <p className="tooltip-info">Clique para ver detalhes</p>
                </div>
            );
        }
        return null;
    };

    const CustomTooltipVendas = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="custom-tooltip">
                    <p className="tooltip-titulo">{data.tipo}</p>
                    <p className="tooltip-valor">Vendas: {data.quantidade_vendida}</p>
                    <p className="tooltip-valor">Valor: {formatarMoeda(data.valor_total)}</p>
                    <p className="tooltip-info">Pedidos: {data.total_pedidos}</p>
                </div>
            );
        }
        return null;
    };

    const CustomTooltipEventos = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="custom-tooltip">
                    <p className="tooltip-titulo">{data.estilo}</p>
                    <p className="tooltip-valor">Eventos: {data.total_eventos}</p>
                    <p className="tooltip-valor">Receita: {formatarMoeda(data.receita_estimada)}</p>
                    <p className="tooltip-info">Público médio: {Math.round(data.media_publico)}</p>
                </div>
            );
        }
        return null;
    };

    if (loading) {
        return (
            <div className="relatorios-container">
                <div className="loading">
                    <div className="loading-spinner"></div>
                    <p>Carregando relatórios...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="relatorios-container">
                <div className="error-message">
                    <h2>⚠️ Erro</h2>
                    <p>{error}</p>
                    <button onClick={carregarDados} className="btn-recarregar">
                        Tentar Novamente
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="relatorios-container">
            <header className="relatorios-header">
                <h1>📊 Relatórios e Análises</h1>
                <button onClick={carregarDados} className="btn-atualizar">
                    🔄 Atualizar Dados
                </button>
            </header>

            <div className="secao-titulo">
                <h2>👥 Análise de Clientes</h2>
            </div>

            <div className="dashboard-grid">
                <div className="card card-resumo">
                    <h3>Resumo Geral - Clientes</h3>
                    <div className="resumo-stats">
                        <div className="stat-item">
                            <span className="stat-numero">{clientesPorMes.reduce((acc, m) => acc + m.quantidade_clientes, 0)}</span>
                            <span className="stat-label">Total de Clientes</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-numero">{clientesPorMes.length}</span>
                            <span className="stat-label">Meses com Aniversários</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-numero">
                                {clientesPorMes.length > 0
                                    ? Math.max(...clientesPorMes.map(m => m.quantidade_clientes))
                                    : 0}
                            </span>
                            <span className="stat-label">Mês com Mais Clientes</span>
                        </div>
                    </div>
                </div>

                <div className="card card-grafico">
                    <h3>📊 Clientes por Mês de Nascimento (Gráfico de Barras)</h3>
                    <p className="card-subtitle">Clique nas barras para ver detalhes dos clientes</p>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={clientesPorMes} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis
                                dataKey="mes_nome"
                                angle={-45}
                                textAnchor="end"
                                height={100}
                                style={{ fontSize: '12px' }}
                            />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar
                                dataKey="quantidade_clientes"
                                name="Quantidade de Clientes"
                                onClick={handleBarClick}
                                cursor="pointer"
                            >
                                {clientesPorMes.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="card card-grafico">
                    <h3>📈 Tendência ao Longo do Ano (Gráfico de Linha)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={clientesPorMes} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis
                                dataKey="mes_nome"
                                angle={-45}
                                textAnchor="end"
                                height={100}
                                style={{ fontSize: '12px' }}
                            />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="quantidade_clientes"
                                stroke="#8884d8"
                                strokeWidth={3}
                                name="Quantidade de Clientes"
                                dot={{ fill: '#8884d8', r: 6 }}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="card card-grafico">
                    <h3>🎂 Distribuição de Aniversários (Gráfico de Pizza)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={clientesPorMes}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ mes_nome, percent }) => `${mes_nome} (${(percent * 100).toFixed(0)}%)`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="quantidade_clientes"
                            >
                                {clientesPorMes.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="card card-grafico card-destaque card-full-width">
                    <h3>👥 Perfil Demográfico - Clientes por Faixa Etária</h3>
                    <p className="card-subtitle">Análise detalhada do perfil dos clientes do Bar do Som</p>
                    <div className="stats-row">
                        <div className="stat-card">
                            <span className="stat-icon">👤</span>
                            <span className="stat-numero-card">
                                {clientesFaixaEtaria.reduce((acc, f) => acc + f.quantidade_clientes, 0)}
                            </span>
                            <span className="stat-label-card">Total de Clientes</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-icon">🎯</span>
                            <span className="stat-numero-card">
                                {clientesFaixaEtaria.length > 0
                                    ? clientesFaixaEtaria.reduce((max, f) =>
                                        f.quantidade_clientes > max.quantidade_clientes ? f : max
                                    ).faixa_etaria
                                    : '-'}
                            </span>
                            <span className="stat-label-card">Faixa Predominante</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-icon">💰</span>
                            <span className="stat-numero-card">
                                {formatarMoeda(
                                    clientesFaixaEtaria.reduce((acc, f) => acc + f.valor_gasto_total, 0)
                                )}
                            </span>
                            <span className="stat-label-card">Receita Total</span>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart
                            data={clientesFaixaEtaria}
                            layout="vertical"
                            margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis type="number" />
                            <YAxis
                                dataKey="faixa_etaria"
                                type="category"
                                style={{ fontSize: '13px' }}
                            />
                            <Tooltip
                                formatter={(value, name) => {
                                    if (name === 'valor_gasto_total') return formatarMoeda(value);
                                    return value;
                                }}
                            />
                            <Legend />
                            <Bar
                                dataKey="quantidade_clientes"
                                name="Quantidade de Clientes"
                                onClick={(data) => handleChartClick(data, 'faixa')}
                                cursor="pointer"
                            >
                                {clientesFaixaEtaria.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                            <Bar
                                dataKey="total_pedidos"
                                name="Total de Pedidos"
                                fill="#82ca9d"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="card card-tabela">
                    <h3>📋 Dados Detalhados - Aniversariantes por Mês</h3>
                    <div className="tabela-scroll">
                        <table className="tabela-dados">
                            <thead>
                            <tr>
                                <th>Mês</th>
                                <th>Quantidade</th>
                                <th>Ação</th>
                            </tr>
                            </thead>
                            <tbody>
                            {clientesPorMes.map((mes, index) => (
                                <tr key={index}>
                                    <td>
                                        <span className="mes-badge" style={{ backgroundColor: COLORS[index % COLORS.length] }}>
                                            {mes.mes_nome}
                                        </span>
                                    </td>
                                    <td className="td-quantidade">{mes.quantidade_clientes}</td>
                                    <td>
                                        <button
                                            className="btn-detalhes"
                                            onClick={() => handleBarClick(mes)}
                                        >
                                            Ver Clientes
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="secao-titulo">
                <h2>💰 Análise de Vendas</h2>
            </div>

            <div className="dashboard-grid">
                <div className="card card-grafico card-destaque">
                    <h3>🍕 Vendas por Tipo de Produto</h3>
                    <p className="card-subtitle">Distribuição entre Bebidas e Comidas - Clique nos segmentos</p>
                    <div className="stats-row">
                        {vendasPorTipo.map((item, index) => (
                            <div key={index} className="stat-item-inline">
                                <span className="stat-color" style={{ backgroundColor: COLORS[index] }}></span>
                                <span className="stat-label">{item.tipo}</span>
                                <span className="stat-numero">{formatarMoeda(item.valor_total)}</span>
                            </div>
                        ))}
                    </div>
                    <ResponsiveContainer width="100%" height={350}>
                        <PieChart>
                            <Pie
                                data={vendasPorTipo}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ tipo, valor_total, percent }) =>
                                    `${tipo}: ${(percent * 100).toFixed(1)}%`
                                }
                                outerRadius={120}
                                fill="#8884d8"
                                dataKey="valor_total"
                                onClick={(data) => handleChartClick(data, 'vendas')}
                                cursor="pointer"
                            >
                                {vendasPorTipo.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltipVendas />} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="secao-titulo">
                <h2>🎵 Análise de Eventos Musicais</h2>
            </div>

            <div className="dashboard-grid">
                <div className="card card-grafico card-destaque card-full-width">
                    <h3>🎵 Análise de Eventos por Estilo Musical</h3>
                    <p className="card-subtitle">Receita estimada e quantidade de eventos por estilo</p>
                    <ResponsiveContainer width="100%" height={400}>
                        <RadarChart data={eventosPorEstilo}>
                            <PolarGrid stroke="#e0e0e0" />
                            <PolarAngleAxis
                                dataKey="estilo"
                                style={{ fontSize: '12px' }}
                            />
                            <PolarRadiusAxis angle={90} domain={[0, 'dataMax']} />
                            <Radar
                                name="Receita Estimada (R$)"
                                dataKey="receita_estimada"
                                stroke="#8884d8"
                                fill="#8884d8"
                                fillOpacity={0.6}
                            />
                            <Radar
                                name="Total de Eventos"
                                dataKey="total_eventos"
                                stroke="#82ca9d"
                                fill="#82ca9d"
                                fillOpacity={0.6}
                            />
                            <Tooltip content={<CustomTooltipEventos />} />
                            <Legend />
                        </RadarChart>
                    </ResponsiveContainer>

                    <div className="tabela-mini-scroll">
                        <table className="tabela-mini">
                            <thead>
                            <tr>
                                <th>Estilo Musical</th>
                                <th>Total Eventos</th>
                                <th>Receita Estimada</th>
                                <th>Público Médio</th>
                            </tr>
                            </thead>
                            <tbody>
                            {eventosPorEstilo.slice(0, 8).map((item, index) => (
                                <tr key={index}>
                                    <td>
                                            <span
                                                className="estilo-badge"
                                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                            >
                                                {item.estilo}
                                            </span>
                                    </td>
                                    <td className="td-numero">{item.total_eventos}</td>
                                    <td className="td-valor">{formatarMoeda(item.receita_estimada)}</td>
                                    <td className="td-numero">{Math.round(item.media_publico)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {mesDetalhes && (
                <div className="modal-overlay" onClick={fecharDetalhes}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Clientes nascidos em {mesDetalhes.mes_nome}</h2>
                            <button className="btn-fechar" onClick={fecharDetalhes}>✕</button>
                        </div>
                        <div className="modal-body">
                            <div className="modal-stat">
                                <span className="modal-stat-numero">{mesDetalhes.quantidade_clientes}</span>
                                <span className="modal-stat-label">
                                    {mesDetalhes.quantidade_clientes === 1 ? 'cliente' : 'clientes'}
                                </span>
                            </div>
                            <div className="lista-clientes">
                                <h4>📝 Lista de Clientes:</h4>
                                <ul>
                                    {mesDetalhes.nomes_clientes.split(', ').map((nome, index) => (
                                        <li key={index}>{nome}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {detalhesModal && (
                <div className="modal-overlay" onClick={fecharDetalhesModal}>
                    <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>
                                {detalhesModal.tipo === 'vendas' && `📊 Detalhes: ${detalhesModal.data.tipo}`}
                                {detalhesModal.tipo === 'faixa' && `👥 Faixa: ${detalhesModal.data.faixa_etaria}`}
                            </h2>
                            <button className="btn-fechar" onClick={fecharDetalhesModal}>✕</button>
                        </div>
                        <div className="modal-body">
                            {detalhesModal.tipo === 'vendas' && (
                                <div className="modal-stats-grid">
                                    <div className="modal-stat-card">
                                        <span className="modal-stat-icon">📦</span>
                                        <span className="modal-stat-numero">{detalhesModal.data.quantidade_vendida}</span>
                                        <span className="modal-stat-label">Unidades Vendidas</span>
                                    </div>
                                    <div className="modal-stat-card">
                                        <span className="modal-stat-icon">🛒</span>
                                        <span className="modal-stat-numero">{detalhesModal.data.total_pedidos}</span>
                                        <span className="modal-stat-label">Pedidos</span>
                                    </div>
                                    <div className="modal-stat-card">
                                        <span className="modal-stat-icon">💰</span>
                                        <span className="modal-stat-numero">
                                            {formatarMoeda(detalhesModal.data.valor_total)}
                                        </span>
                                        <span className="modal-stat-label">Receita Total</span>
                                    </div>
                                </div>
                            )}

                            {detalhesModal.tipo === 'faixa' && (
                                <div className="modal-stats-grid">
                                    <div className="modal-stat-card">
                                        <span className="modal-stat-icon">👤</span>
                                        <span className="modal-stat-numero">{detalhesModal.data.quantidade_clientes}</span>
                                        <span className="modal-stat-label">Clientes</span>
                                    </div>
                                    <div className="modal-stat-card">
                                        <span className="modal-stat-icon">📋</span>
                                        <span className="modal-stat-numero">{detalhesModal.data.total_pedidos}</span>
                                        <span className="modal-stat-label">Pedidos Realizados</span>
                                    </div>
                                    <div className="modal-stat-card">
                                        <span className="modal-stat-icon">💵</span>
                                        <span className="modal-stat-numero">
                                            {formatarMoeda(detalhesModal.data.valor_gasto_total)}
                                        </span>
                                        <span className="modal-stat-label">Valor Total</span>
                                    </div>
                                    <div className="modal-stat-card">
                                        <span className="modal-stat-icon">🎯</span>
                                        <span className="modal-stat-numero">
                                            {detalhesModal.data.total_pedidos > 0
                                                ? formatarMoeda(detalhesModal.data.valor_gasto_total / detalhesModal.data.total_pedidos)
                                                : 'R$ 0,00'
                                            }
                                        </span>
                                        <span className="modal-stat-label">Ticket Médio</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RelatoriosPage;