// src/FuncoesProcedures.jsx
import React, { useState, useEffect } from 'react';
import './FuncoesProcedures.css';

function FuncoesProcedures() {
    const [loading, setLoading] = useState(false);
    const [resultado, setResultado] = useState(null);
    const [logs, setLogs] = useState([]);
    const [logsDisponiveis, setLogsDisponiveis] = useState(true);

    const API_BASE = 'http://localhost:8080';

    const buscarLogs = async () => {
        try {
            const response = await fetch(`${API_BASE}/dashboard/triggers/logs`);

            if (!response.ok) {
                setLogsDisponiveis(false);
                setLogs([]);
                return;
            }

            const data = await response.json();

            // Garante array
            if (Array.isArray(data)) {
                setLogs(data);
                setLogsDisponiveis(true);
            } else if (data?.logs && Array.isArray(data.logs)) {
                setLogs(data.logs);
                setLogsDisponiveis(true);
            } else {
                setLogs([]);
                setLogsDisponiveis(true);
            }
        } catch (error) {
            setLogsDisponiveis(false);
            setLogs([]);
        }
    };

    useEffect(() => {
        buscarLogs();
    }, []);

    return (
        <div className="funcoes-container">
            <h1>Funções, Procedures e Triggers</h1>

            <section className="funcao-section">
                <h2>📊 Funções do Banco</h2>

                <div className="funcao-card">
                    <h3>Calcular Ticket Médio do Cliente</h3>
                    <p>Retorna o valor médio gasto por um cliente específico</p>
                    <div className="funcao-form">
                        <input type="number" placeholder="ID do Cliente" id="clienteId" />
                        <button onClick={() => {
                            const id = document.getElementById('clienteId').value;
                            if (!id) return;
                            setLoading(true);
                            fetch(`${API_BASE}/dashboard/funcoes/ticket-medio/${id}`)
                                .then(res => res.json())
                                .then(data => { setResultado(data); setLoading(false); })
                                .catch(err => { setResultado({ erro: err.message }); setLoading(false); });
                        }}>
                            Executar Função
                        </button>
                    </div>
                </div>

                <div className="funcao-card">
                    <h3>Verificar Status do Estoque</h3>
                    <p>Verifica se um produto está com estoque baixo (condicional)</p>
                    <div className="funcao-form">
                        <input type="number" placeholder="ID do Produto" id="produtoId" />
                        <button onClick={() => {
                            const id = document.getElementById('produtoId').value;
                            if (!id) return;
                            setLoading(true);
                            fetch(`${API_BASE}/dashboard/funcoes/verificar-estoque/${id}`)
                                .then(res => res.json())
                                .then(data => { setResultado(data); setLoading(false); })
                                .catch(err => { setResultado({ erro: err.message }); setLoading(false); });
                        }}>
                            Verificar Estoque
                        </button>
                    </div>
                </div>
            </section>

            <section className="funcao-section">
                <h2>⚙️ Procedures (Procedimentos)</h2>

                <div className="funcao-card">
                    <h3>Atualizar Status da Mesa 🪑</h3>
                    <p>Define o status de disponibilidade (Ex: 'OCUPADA', 'DISPONIVEL')</p>
                    <div className="funcao-form">
                        <input type="number" placeholder="ID da Mesa" id="procMesaId" />
                        <input type="text" placeholder="Novo Status (Ex: OCUPADA)" id="procNovoStatus" />
                        <button onClick={() => {
                            const mesaId = document.getElementById('procMesaId').value;
                            const novoStatus = document.getElementById('procNovoStatus').value;

                            if (!mesaId || !novoStatus) return;

                            setLoading(true);
                            
                            fetch(`${API_BASE}/mesas/status/${mesaId}`, {
                                method: 'PUT', 
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ status: novoStatus })
                            })
                                .then(res => {
                                    if (res.ok) {
                                        return res.text();
                                    }
                                    return res.text().then(text => { throw new Error(text); });
                                })
                                .then(data => {
                                    setResultado({ sucesso: data, mesaId: mesaId, novoStatus: novoStatus });
                                    setLoading(false);
                                })
                                .catch(err => { 
                                    setResultado({ erro: err.message, mesaId: mesaId, novoStatus: novoStatus }); 
                                    setLoading(false); 
                                });
                        }}>
                            Atualizar Status
                        </button>
                    </div>
                </div>

                <div className="funcao-card">
                    <h3>Ajustar Público Estimado dos Eventos 📈</h3>
                    <p>Executa a lógica de cursor para recalcular o público estimado com base no número de artistas.</p>
                    <button onClick={() => {
                        setLoading(true);
                        fetch(`${API_BASE}/eventos/ajustar-publico`, { 
                            method: 'POST' 
                        })
                            .then(res => {
                                if (res.ok) {
                                    return res.text();
                                }
                                return res.text().then(text => { throw new Error(text); });
                            })
                            .then(data => { 
                                setResultado({ mensagem: data, sucesso: true }); 
                                setLoading(false); 
                            })
                            .catch(err => { 
                                setResultado({ erro: err.message }); 
                                setLoading(false); 
                            });
                    }}>
                        Ajustar Público
                    </button>
                </div>
            </section>

            <section className="funcao-section">
                <h2>🔔 Triggers e Logs</h2>

                <div className="logs-container">
                    <div className="logs-header">
                        <h3>Histórico de Ações (Trigger de Log)</h3>
                        <button onClick={buscarLogs} className="refresh-btn">🔄 Atualizar</button>
                    </div>

                    {!logsDisponiveis ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#718096', background: '#f7fafc', borderRadius: '10px', margin: '1rem 0' }}>
                            <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>📋 Tabela de logs não encontrada</p>
                            <small>Crie a tabela <code>logs_auditoria</code> no banco de dados</small>
                        </div>
                    ) : logs.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#718096', background: '#f7fafc', borderRadius: '10px', margin: '1rem 0' }}>
                            <p>Nenhum log registrado ainda</p>
                        </div>
                    ) : (
                        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            <table className="logs-table">
                                <thead>
                                <tr>
                                    <th>Data/Hora</th>
                                    <th>Ação</th>
                                    <th>Tabela</th>
                                    <th>Usuário</th>
                                    <th>Detalhes</th>
                                </tr>
                                </thead>
                                <tbody>
                                {logs.map((log, idx) => (
                                    <tr key={idx}>
                                        <td>{log.data_hora ? new Date(log.data_hora).toLocaleString('pt-BR') : '-'}</td>
                                        <td><span className={`badge ${(log.acao || '').toLowerCase()}`}>{log.acao || 'N/A'}</span></td>
                                        <td>{log.tabela || '-'}</td>
                                        <td>{log.usuario || '-'}</td>
                                        <td>{log.detalhes || '-'}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </section>

            {resultado && (
                <div className="resultado-box">
                    <h3>✅ Resultado da Execução</h3>
                    <pre>{JSON.stringify(resultado, null, 2)}</pre>
                    <button onClick={() => setResultado(null)} style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#e53e3e', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                        Fechar
                    </button>
                </div>
            )}

            {loading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <p>Executando...</p>
                </div>
            )}
        </div>
    );
}

export default FuncoesProcedures;