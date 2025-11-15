// src/ConsultasViews.jsx
import React, { useState, useEffect } from 'react';
import './ConsultasViews.css';

function ConsultasViews() {
    const [consultas, setConsultas] = useState({
        'anti-join': [],
        'full-outer-join': [],
        'subconsulta1': [],
        'subconsulta2': [],
        'view1': [],
        'view2': []
    });
    const [loading, setLoading] = useState(false);
    const [filtros, setFiltros] = useState({});

    const API_BASE = 'http://localhost:8080';

    const executarConsulta = async (tipo, params = {}) => {
        setLoading(true);
        try {
            const queryString = new URLSearchParams(params).toString();
            const response = await fetch(`${API_BASE}/relatorios/consultas/${tipo}?${queryString}`);
            if (!response.ok) {
                console.warn(`Endpoint /consultas/${tipo} não disponível`);
                setConsultas(prev => ({ ...prev, [tipo]: [] }));
                setLoading(false);
                return;
            }

            const data = await response.json();
            const resultado = Array.isArray(data) ? data : (data?.data && Array.isArray(data.data) ? data.data : []);
            setConsultas(prev => ({ ...prev, [tipo]: resultado }));
        } catch (error) {
            console.error(`Erro ao executar consulta ${tipo}:`, error);
            setConsultas(prev => ({ ...prev, [tipo]: [] }));
        }
        setLoading(false);
    };

    useEffect(() => {
        executarConsulta('anti-join');
        executarConsulta('full-outer-join');
        executarConsulta('subconsulta1');
        executarConsulta('subconsulta2');
        executarConsulta('view1');
        executarConsulta('view2');
    }, []);

    return (
        <div className="consultas-container">
            <h1>Consultas Avançadas e Views</h1>

            {/* Anti Join */}
            <section className="consulta-section">
                <div className="consulta-header">
                    <h2>🔍 Consulta com ANTI JOIN</h2>
                    <p className="consulta-desc">Clientes que nunca fizeram pedidos</p>
                </div>

                <div className="tabela-container">
                    {loading ? (
                        <div className="loading"><div className="loading-spinner"></div><p>Carregando...</p></div>
                    ) : consultas['anti-join'].length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#718096' }}>
                            <p>Nenhum resultado encontrado ou endpoint não disponível</p>
                        </div>
                    ) : (
                        <table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Telefone</th>
                                <th>Data Cadastro</th>
                            </tr>
                            </thead>
                            <tbody>
                            {consultas['anti-join'].map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.nome}</td>
                                    <td>{item.email}</td>
                                    <td>{item.telefone}</td>
                                    <td>{item.data_cadastro ? new Date(item.data_cadastro).toLocaleDateString('pt-BR') : '-'}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>

            {/* Full Outer Join */}
            <section className="consulta-section">
                <div className="consulta-header">
                    <h2>🔗 Consulta com FULL OUTER JOIN</h2>
                    <p className="consulta-desc">Todos os clientes e todos os eventos (incluindo não relacionados)</p>
                </div>

                <div className="tabela-container">
                    {consultas['full-outer-join'].length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#718096' }}>
                            <p>Nenhum resultado encontrado ou endpoint não disponível</p>
                        </div>
                    ) : (
                        <table>
                            <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Evento</th>
                                <th>Data Evento</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {consultas['full-outer-join'].map((item, index) => (
                                <tr key={index}>
                                    <td>{item.nome_cliente || '-'}</td>
                                    <td>{item.nome_evento || '-'}</td>
                                    <td>{item.data_evento ? new Date(item.data_evento).toLocaleDateString('pt-BR') : '-'}</td>
                                    <td>
                      <span className={`status-badge ${(item.status || '').toLowerCase()}`}>
                        {item.status || 'N/A'}
                      </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>

            {/* Subconsulta 1 */}
            <section className="consulta-section">
                <div className="consulta-header">
                    <h2>📊 Subconsulta 1</h2>
                    <p className="consulta-desc">Produtos com preço acima da média</p>
                </div>

                <div className="cards-grid">
                    {consultas['subconsulta1'].length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#718096', gridColumn: '1 / -1' }}>
                            <p>Nenhum resultado encontrado ou endpoint não disponível</p>
                        </div>
                    ) : (
                        consultas['subconsulta1'].map((item, index) => (
                            <div key={index} className="produto-card">
                                <h3>{item.nome}</h3>
                                <div className="produto-info">
                  <span className="preco">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.preco || 0)}
                  </span>
                                    <span className="categoria">{item.categoria}</span>
                                </div>
                                <small>Estoque: {item.estoque || 0} unidades</small>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* Subconsulta 2 */}
            <section className="consulta-section">
                <div className="consulta-header">
                    <h2>🎯 Subconsulta 2</h2>
                    <p className="consulta-desc">Clientes com mais de 5 pedidos</p>

                    <div className="filtros">
                        <input
                            type="number"
                            placeholder="Mínimo de pedidos"
                            onChange={(e) => setFiltros({ ...filtros, minPedidos: e.target.value })}
                        />
                        <button onClick={() => executarConsulta('subconsulta2', filtros)}>
                            Filtrar
                        </button>
                    </div>
                </div>

                <div className="tabela-container">
                    {consultas['subconsulta2'].length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#718096' }}>
                            <p>Nenhum resultado encontrado ou endpoint não disponível</p>
                        </div>
                    ) : (
                        <table>
                            <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Total de Pedidos</th>
                                <th>Valor Total Gasto</th>
                                <th>Ticket Médio</th>
                            </tr>
                            </thead>
                            <tbody>
                            {consultas['subconsulta2'].map((item, index) => (
                                <tr key={index}>
                                    <td>{item.nome_cliente}</td>
                                    <td><strong>{item.total_pedidos}</strong></td>
                                    <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor_total || 0)}</td>
                                    <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.ticket_medio || 0)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>

            {/* View 1 */}
            <section className="consulta-section view-section">
                <div className="consulta-header">
                    <h2>👁️ VIEW 1: Resumo de Vendas por Produto</h2>
                    <p className="consulta-desc">Visão consolidada com dados de produtos, pedidos e clientes (3+ joins)</p>
                </div>

                <div className="tabela-container">
                    {consultas['view1'].length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#718096' }}>
                            <p>Nenhum resultado encontrado ou endpoint não disponível</p>
                        </div>
                    ) : (
                        <table>
                            <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Categoria</th>
                                <th>Qtd. Vendida</th>
                                <th>Receita Total</th>
                                <th>Nº Clientes</th>
                            </tr>
                            </thead>
                            <tbody>
                            {consultas['view1'].map((item, index) => (
                                <tr key={index}>
                                    <td><strong>{item.nome_produto}</strong></td>
                                    <td>{item.categoria}</td>
                                    <td>{item.quantidade_vendida}</td>
                                    <td className="destaque">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.receita_total || 0)}
                                    </td>
                                    <td>{item.num_clientes}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>

            {/* View 2 */}
            <section className="consulta-section view-section">
                <div className="consulta-header">
                    <h2>👁️ VIEW 2: Análise de Eventos e Reservas</h2>
                    <p className="consulta-desc">Visão com eventos, reservas, clientes e produtos (3+ joins)</p>
                </div>

                <div className="tabela-container">
                    {consultas['view2'].length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#718096' }}>
                            <p>Nenhum resultado encontrado ou endpoint não disponível</p>
                        </div>
                    ) : (
                        <table>
                            <thead>
                            <tr>
                                <th>Evento</th>
                                <th>Data</th>
                                <th>Reservas</th>
                                <th>Receita Estimada</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {consultas['view2'].map((item, index) => (
                                <tr key={index}>
                                    <td><strong>{item.nome_evento}</strong></td>
                                    <td>{item.data_evento ? new Date(item.data_evento).toLocaleDateString('pt-BR') : '-'}</td>
                                    <td>{item.total_reservas}</td>
                                    <td className="destaque">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.receita_estimada || 0)}
                                    </td>
                                    <td>
                      <span className={`status-badge ${(item.status || '').toLowerCase()}`}>
                        {item.status || 'N/A'}
                      </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>
        </div>
    );
}

export default ConsultasViews;