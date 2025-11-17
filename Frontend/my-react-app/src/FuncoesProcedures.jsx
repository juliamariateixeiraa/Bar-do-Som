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
    const [eventos, setEventos] = useState([]);

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

    const getStatusColor = (status) => {
        if (!status) return '#4A5568';
        const s = status.toLowerCase();
        if (s.includes('em estoque')) return '#38A169';
        if (s.includes('baixo')) return '#DD6B20'; 
        if (s.includes('fora')) return '#E53E3E'; 
        return '#4A5568';
    };

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
                                        type: 'idade', 
                                        nome: data.nome,
                                        idade: data.idade, 
                                        dataHoje: new Date().toLocaleDateString('pt-BR'),
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
                                        type: 'estoque', 
                                        nomeProduto: data.nome,
                                        estoqueAtual: data.estoque,
                                        statusEstoque: data.status_estoque,
                                        dataHoje: new Date().toLocaleDateString('pt-BR'),
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

                            const statusAntigoSimulado = "DESCONHECIDO"; 

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
                                    setResultado({ 
                                        type: 'statusMesa', 
                                        idMesa: mesaId,
                                        statusAntigo: statusAntigoSimulado,
                                        statusNovo: novoStatus.toUpperCase(),
                                        dataHora: new Date().toLocaleString('pt-BR'),
                                    });
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
                            if (!res.ok) {
                                return res.text().then(text => { 
                                    throw new Error("Erro da API: " + text); 
                                });
                            }
                            return res.json(); 
                        })
                        .then(eventosAtualizados => {
                            const totalEventosProcessados = eventosAtualizados.length;
                            
                            const publicoTotalFinal = eventosAtualizados.reduce((sum, evento) => {
                                return sum + (evento.publico_estimado || 0); 
                            }, 0);
                             
                            setEventos(eventosAtualizados); 

                            setResultado({ 
                                type: 'ajustePublico', 
                                mensagem: `Ajuste de Público Concluído (Processados: ${totalEventosProcessados})`, 
                                processo: "Procedure SQL com Cursors",
                                descricao: `A Procedure ajustou o público de ${totalEventosProcessados} eventos. O público total estimado final é de ${publicoTotalFinal} pessoas.`, 
                                dataHora: new Date().toLocaleString('pt-BR'),
                                
                                contagemAjustada: totalEventosProcessados, 
                                publicoAjustado: publicoTotalFinal, 
                            });
                            setLoading(false); 
                        })
                        .catch(err => { 
                            console.error(err);
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
                        <button onClick={async () => { 
                            const idCliente = parseInt(clienteIdPedido);
                            const idProduto = parseInt(produtoIdPedido);
                            const quantidade = parseInt(quantidadePedido);

                            if (!idCliente || !idProduto || !quantidade || quantidade <= 0) {
                                setResultado({ erro: "Preencha IDs válidos e quantidade maior que zero." });
                                return;
                            }

                            setLoading(true);

                            let produtoNome = `Produto ID ${idProduto}`;
                            let estoqueAnterior = -1;

                            try {
                                const statusRes = await fetch(`${API_BASE}/produtos/status/${idProduto}`);
                                if (statusRes.ok) {
                                    const statusData = await statusRes.json();
                                    produtoNome = statusData.nome;
                                    estoqueAnterior = statusData.estoque;
                                    
                                    if (estoqueAnterior < quantidade) {
                                        setResultado({ erro: `Estoque insuficiente! Apenas ${estoqueAnterior} em estoque.`, tipo: 'alerta' });
                                        setLoading(false);
                                        return;
                                    }
                                }
                            } catch (e) {
                                console.error("Erro ao buscar status anterior:", e);
                            }

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

                            try {
                                const res = await fetch(`${API_BASE}/pedidos/checkout`, {
                                    method: 'POST', 
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(checkoutData)
                                });

                                if (!res.ok) {
                                    const text = await res.text();
                                    throw new Error(text);
                                }
                                const data = await res.text();
                                
                                setResultado({ 
                                    type: 'baixaEstoque', 
                                    idPedido: data.match(/Pedido (\d+)/)?.[1] || 'N/A',
                                    nomeProduto: produtoNome,
                                    quantidadeRetirada: quantidade,
                                    estoqueAnterior: estoqueAnterior,
                                    estoqueNovo: estoqueAnterior - quantidade, 
                                    dataHora: new Date().toLocaleString('pt-BR'),
                                });
                                
                                setClienteIdPedido('');
                                setProdutoIdPedido('');
                                setQuantidadePedido('');
                                buscarLogs(); 
                                setLoading(false);

                            } catch (err) { 
                                setResultado({ erro: "Falha ao realizar pedido.", detalhes: err.message }); 
                                setLoading(false); 
                            }
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
                    
                    {resultado.type === 'idade' ? (
                        <div className="idade-resultado-card">
                            <h4 style={{ color: '#2C5282', marginBottom: '1rem' }}>🎉 Idade Calculada com Sucesso</h4>
                            <div className="idade-info-item">
                                <span className="idade-label">👤 Cliente:</span>
                                <span className="idade-value">{resultado.nome}</span>
                            </div>
                            <div className="idade-info-item">
                                <span className="idade-label">🎂 Idade Atual:</span>
                                <span className="idade-value destaque">{resultado.idade} anos</span>
                            </div>
                            <div className="idade-info-item">
                                <span className="idade-label">🗓️ Data do Cálculo:</span>
                                <span className="idade-value">{resultado.dataHoje}</span>
                            </div>
                        </div>
                    ) : 
                    resultado.type === 'estoque' ? (
                        <div className="estoque-resultado-card" style={{ borderColor: getStatusColor(resultado.statusEstoque) }}>
                            <h4 style={{ color: getStatusColor(resultado.statusEstoque), marginBottom: '1rem' }}>📦 Status de Estoque Verificado</h4>
                            <div className="estoque-info-item">
                                <span className="estoque-label">🏷️ Produto:</span>
                                <span className="estoque-value">{resultado.nomeProduto}</span>
                            </div>
                            <div className="estoque-info-item">
                                <span className="estoque-label">🔢 Estoque Atual:</span>
                                <span className="estoque-value">{resultado.estoqueAtual} unidades</span>
                            </div>
                            <div className="estoque-info-item">
                                <span className="estoque-label">🚨 Status:</span>
                                <span className="estoque-value destaque-status" style={{ color: getStatusColor(resultado.statusEstoque), fontWeight: '700' }}>
                                    {resultado.statusEstoque}
                                </span>
                            </div>
                            <div className="estoque-info-item">
                                <span className="estoque-label">🗓️ Data da Consulta:</span>
                                <span className="estoque-value">{resultado.dataHoje}</span>
                            </div>
                        </div>
                    ) : 
                    resultado.type === 'statusMesa' ? (
                        <div className="mesa-resultado-card">
                            <h4 style={{ color: '#805AD5', marginBottom: '1rem' }}>🪑 Status da Mesa Atualizado</h4>
                            <div className="mesa-info-item">
                                <span className="mesa-label">🆔 Número da Mesa:</span>
                                <span className="mesa-value">{resultado.idMesa}</span>
                            </div>
                            <div className="mesa-info-item">
                                <span className="mesa-label">✅ Novo Status:</span>
                                <span className="mesa-value destaque-mesa">{resultado.statusNovo}</span>
                            </div>
                            <div className="mesa-info-item">
                                <span className="mesa-label">⏱️ Data/Hora da Ação:</span>
                                <span className="mesa-value">{resultado.dataHora}</span>
                            </div>
                        </div>
                    ) : 
                    resultado.type === 'baixaEstoque' ? (
                        <div className="trigger-resultado-card">
                            <h4 style={{ color: '#48BB78', marginBottom: '1rem' }}>🛒 Pedido Processado (Trigger Ativado)</h4>
                            
                            <div className="trigger-info-item">
                                <span className="trigger-label"># Pedido:</span>
                                <span className="trigger-value" style={{ fontWeight: 'bold' }}>{resultado.idPedido}</span>
                            </div>

                            <div className="trigger-info-item">
                                <span className="trigger-label">🏷️ Produto Afetado:</span>
                                <span className="trigger-value">{resultado.nomeProduto}</span>
                            </div>

                            <div className="trigger-info-item">
                                <span className="trigger-label">➖ Quantidade Retirada:</span>
                                <span className="trigger-value destaque-retirada">-{resultado.quantidadeRetirada} un.</span>
                            </div>
                            <hr style={{ margin: '10px 0', borderColor: '#E2E8F0' }} />

                            <div className="trigger-info-item">
                                <span className="trigger-label">📦 Estoque Anterior:</span>
                                <span className="trigger-value">{resultado.estoqueAnterior} un.</span>
                            </div>

                            <div className="trigger-info-item">
                                <span className="trigger-label">✅ Novo Estoque:</span>
                                <span className="trigger-value destaque-novo">{resultado.estoqueNovo} un.</span>
                            </div>
                            
                            <p style={{ marginTop: '15px', fontSize: '0.9rem', color: '#4A5568' }}>
                                A baixa de estoque foi realizada pelo Trigger **`tg_before_insert_pedido_produto`** no banco de dados.
                            </p>
                        </div>
                    ) : 
                    resultado.type === 'ajustePublico' ? (
                        <div className="evento-resultado-card">
                            <h4 style={{ color: '#00B5AD', marginBottom: '1rem' }}>📈 Ajuste de Público Concluído</h4>
                            
                            
                            <div className="evento-info-item">
                                <span className="evento-label">🔢 Eventos Ajustados:</span>
                                <span className="evento-value destaque-evento-num">{resultado.contagemAjustada || 0}</span>
                            </div>
                            
                            <div className="evento-info-item">
                                <span className="evento-label">👥 Público Ajustado (Total):</span>
                                <span className="evento-value destaque-evento-num">{resultado.publicoAjustado || 0}</span>
                            </div>

                        </div>
                    ) : (
                        <pre>{JSON.stringify(resultado, null, 2)}</pre>
                    )}

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