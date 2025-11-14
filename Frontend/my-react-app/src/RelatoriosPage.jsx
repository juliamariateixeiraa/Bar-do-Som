import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './RelatoriosPage.css';

function RelatoriosPage() {
    const [clientesPorMes, setClientesPorMes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mesDetalhes, setMesDetalhes] = useState(null);

    // Cores vibrantes para o gráfico
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
            const response = await fetch('http://localhost:8080/clientes/por-mes-nascimento');

            if (!response.ok) {
                throw new Error('Erro ao buscar dados');
            }

            const data = await response.json();
            setClientesPorMes(data);
            setError(null);
        } catch (err) {
            console.error('Erro ao carregar dados:', err);
            setError('Não foi possível carregar os dados. Verifique se o backend está rodando.');
        } finally {
            setLoading(false);
        }
    };

    const handleBarClick = (data) => {
        setMesDetalhes(data);
    };

    const fecharDetalhes = () => {
        setMesDetalhes(null);
    };

    // Tooltip customizado para mostrar informações detalhadas
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

            <div className="dashboard-grid">
                {/* Card de Resumo */}
                <div className="card card-resumo">
                    <h3>Resumo Geral</h3>
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

                {/* Gráfico de Barras */}
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

                {/* Gráfico de Linha */}
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

                {/* Gráfico de Pizza */}
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

                {/* Tabela de Dados */}
                <div className="card card-tabela">
                    <h3>📋 Dados Detalhados</h3>
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

            {/* Modal de Detalhes */}
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
        </div>
    );
}

export default RelatoriosPage;