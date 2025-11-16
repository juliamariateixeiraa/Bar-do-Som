import React, { useState, useEffect } from 'react';
import './FuncoesProcedures.css';

function FuncoesProcedures() {
    const [loading, setLoading] = useState(false);
    const [resultado, setResultado] = useState(null);
    const [logs, setLogs] = useState([]);
    const [logsDisponiveis, setLogsDisponiveis] = useState(true);
    const [clienteIdPedido, setClienteIdPedido] = useState('');
    const [produtoIdPedido, setProdutoIdPedido] = useState('');
    const [quantidadePedido, setQuantidadePedido] = useState('');

    const API_BASE = 'http://localhost:8080';

    const buscarLogs = async () => {
        try {
            const response = await fetch(`${API_BASE}/pedidos/logs`); 

            if (!response.ok) {
                setLogsDisponiveis(false);
                setLogs([]);
                return;
            }

            const data = await response.json();

            if (Array.isArray(data)) {
                setLogs(data);
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
                    <h3>Calcular Idade por ID 🎂</h3>
                    <p>Busca o nome e calcula a idade de um cliente específico.</p>
                    <div className="funcao-form">
                        <input 
                            type="number" 
                            placeholder="ID do Cliente" 
                            id="clienteIdBusca" 
                        />
                        <button onClick={() => {
                            const id = document.getElementById('clienteIdBusca').value;
                            
                            if (!id || isNaN(id)) return; 

                            setLoading(true);
                            
                            fetch(`${API_BASE}/clientes/idade/${id}`)
                                .then(res => {
                                    if (!res.ok) {
                                        return res.json().then(errorData => {
                                            throw new Error(JSON.stringify(errorData));
                                        });
                                    }
                                    return res.json();
                                })
                                .then(data => {
                                    setResultado({
                                        mensagem: `Idade de ${data.nome} calculada com sucesso.`,
                                        cliente: data
                                    });
                                    setLoading(false);
                                })
                                .catch(err => { 
                                    try {
                                        const errorObj = JSON.parse(err.message);
                                        setResultado({ 
                                            erro: `Falha na requisição. Status: ${errorObj.status} (${errorObj.error}).`, 
                                            detalhes: errorObj 
                                        });
                                    } catch (e) {
                                        setResultado({ erro: "Erro desconhecido na comunicação.", detalhes: err.message });
                                    }
                                    setLoading(false); 
                                });
                        }}>
                            Buscar Idade
                        </button>
                    </div>
                </div>

                <div className="funcao-card">
                    <h3>Verificar Status do Estoque</h3>
                    <p>Verifica o status do estoque (Em Estoque, Estoque Baixo, Fora de Estoque) de um produto específico.</p>
                    <div className="funcao-form">
                        <input 
                            type="number" 
                            placeholder="ID do Produto" 
                            id="produtoIdStatus" 
                        />
                        <button onClick={() => {
                            const id = document.getElementById('produtoIdStatus').value; 
                            if (!id || isNaN(id)) return;
                            setLoading(true);
                            
                            fetch(`${API_BASE}/produtos/status/${id}`)
                                .then(res => {
                                    if (!res.ok) {
                                        return res.json().then(errorData => {
                                            throw new Error(JSON.stringify(errorData));
                                        });
                                    }
                                    return res.json();
                                })
                                .then(data => { 
                                    setResultado({ 
                                        mensagem: `Status de Estoque para ${data.nome} (ID ${data.id_produto})`,
                                        detalhes: {
                                            Estoque: data.estoque,
                                            Status: data.status_estoque
                                        }
                                    }); 
                                    setLoading(false); 
                                })
                                .catch(err => { 
                                    try {
                                        const errorObj = JSON.parse(err.message);
                                        setResultado({ 
                                            erro: `Produto não encontrado ou erro. Status: ${errorObj.status}.`, 
                                            detalhes: errorObj 
                                        });
                                    } catch (e) {
                                        setResultado({ erro: err.message || "Erro desconhecido na comunicação." }); 
                                    }
                                    setLoading(false); 
                                });
                        }}>
                            Verificar Status
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

                <div className="funcao-card">
                    <h3>Realizar Pedido e Baixa de Estoque 🛒</h3>
                    <p>Insere um pedido e item. O Trigger reduz o estoque automaticamente.</p>
                    <div className="funcao-form">
                        <input 
                            type="number" 
                            placeholder="ID do Cliente (Ex: 1)" 
                            value={clienteIdPedido}
                            onChange={(e) => setClienteIdPedido(e.target.value)}
                        />
                        <input 
                            type="number" 
                            placeholder="ID do Produto" 
                            value={produtoIdPedido}
                            onChange={(e) => setProdutoIdPedido(e.target.value)}
                        />
                         <input 
                            type="number" 
                            placeholder="Quantidade" 
                            value={quantidadePedido}
                            onChange={(e) => setQuantidadePedido(e.target.value)}
                        />
                        <button onClick={() => {
                            const idCliente = parseInt(clienteIdPedido);
                            const idProduto = parseInt(produtoIdPedido);
                            const quantidade = parseInt(quantidadePedido);

                            if (!idCliente || !idProduto || !quantidade || quantidade <= 0) {
                                setResultado({ erro: "Preencha IDs válidos e quantidade maior que zero." });
                                return;
                            }

                            setLoading(true);

                            const checkoutData = {
                                idCliente: idCliente,
                                total: 10.0, 
                                itens: [
                                    {
                                        idProduto: idProduto,
                                        quantidade: quantidade
                                    }
                                ]
                            };

                            fetch(`${API_BASE}/pedidos/checkout`, {
                                method: 'POST', 
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(checkoutData)
                            })
                                .then(res => {
                                    if (!res.ok) {
                                        return res.text().then(text => { throw new Error(text); });
                                    }
                                    return res.text();
                                })
                                .then(data => {
                                    setResultado({ 
                                        sucesso: `Pedido realizado com sucesso!`,
                                        detalhes: data,
                                        aviso: `O Trigger de Estoque foi ativado no banco de dados. Verifique o estoque do Produto ID ${idProduto} na seção "Verificar Status do Estoque".`
                                    });
                                    setClienteIdPedido('');
                                    setProdutoIdPedido('');
                                    setQuantidadePedido('');
                                    buscarLogs(); 
                                    setLoading(false);
                                })
                                .catch(err => { 
                                    setResultado({ erro: "Falha ao realizar pedido.", detalhes: err.message }); 
                                    setLoading(false); 
                                });
                        }}>
                            Fazer Pedido
                        </button>
                    </div>
                </div>
                
                <div className="logs-container">
                    <div className="logs-header">
                        <h3>Histórico de Ações (Trigger de Log)</h3>
                        <button onClick={buscarLogs} className="refresh-btn">🔄 Atualizar</button>
                    </div>

                    {!logsDisponiveis ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#718096', background: '#f7fafc', borderRadius: '10px', margin: '1rem 0' }}>
                            <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>📋 Tabela de logs não encontrada</p>
                            <small>Crie a tabela <code>log_operacoes</code> no banco de dados</small>
                        </div>
                    ) : logs.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#718096', background: '#f7fafc', borderRadius: '10px', margin: '1rem 0' }}>
                            <p>Nenhum log de pedido registrado ainda</p>
                        </div>
                    ) : (
                        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            <table className="logs-table">
                                <thead>
                                <tr>
                                    <th>Data/Hora</th>
                                    <th>Tabela Afetada</th>
                                    <th>Operação</th>
                                    <th>Detalhes</th>
                                </tr>
                                </thead>
                                <tbody>
                                {logs.map((log, idx) => (
                                    <tr key={idx}>
                                        <td>{log.data_hora ? new Date(log.data_hora).toLocaleString('pt-BR') : '-'}</td>
                                        
                                        <td>{log.tabela_afetada || '-'}</td>
                                        
                                        <td><span className={`badge ${(log.operacao || '').toLowerCase()}`}>{log.operacao || 'N/A'}</span></td>
                                        
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