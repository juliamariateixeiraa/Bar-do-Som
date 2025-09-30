import React, { useState, useEffect } from 'react';
import EditClienteModal from './EditClienteModal';
import AddClienteModal from './AddClienteModal';
import './ClientesPage.css';
import './EditClienteModal.css';

const ClientesPage = () => {
    const [clientes, setClientes] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [clienteSelecionado, setClienteSelecionado] = useState(null);
    const [busca, setBusca] = useState("");
    const [filtroAtivo, setFiltroAtivo] = useState('todos');

    const fetchClientes = () => {
        fetch('http://localhost:8080/clientes')
            .then(response => {
                if (!response.ok) throw new Error(`Erro HTTP! Status: ${response.status}`);
                return response.json();
            })
            .then(data => setClientes(Array.isArray(data) ? data : []))
            .catch(error => {
                console.error('Erro ao buscar clientes:', error);
                alert('Falha ao buscar clientes. Verifique o console.');
                setClientes([]);
            });
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    const handleSearch = () => {
        if (busca.trim() === "") {
            fetchClientes();
            setFiltroAtivo('todos');
        } else {
            fetch(`http://localhost:8080/clientes/buscar?nome=${encodeURIComponent(busca)}`)
                .then(response => {
                    if (!response.ok) throw new Error(`Erro HTTP! Status: ${response.status}`);
                    return response.json();
                })
                .then(data => setClientes(Array.isArray(data) ? data : []))
                .catch(error => {
                    console.error('Erro ao realizar a busca:', error);
                    alert('Falha ao buscar. Verifique o console.');
                    setClientes([]);
                });
        }
    };

    const handleFiltroChange = (event) => {
<<<<<<< HEAD
            const valorFiltro = event.target.value;
            setFiltroAtivo(valorFiltro); 
            setBusca("");
=======
        const valorFiltro = event.target.value;
        setFiltroAtivo(valorFiltro);
>>>>>>> a6223a802f1ea850ef4ec57db71387dafe5e05ab

            if (valorFiltro === 'todos') {
                fetchClientes(); 
            } else if (valorFiltro === 'gastos_100') {
                buscarPorGastoMinimo(100);
            } else if (valorFiltro === 'gastos_200') {
                buscarPorGastoMinimo(200);
            } else if (valorFiltro === 'gastos_300') {
                buscarPorGastoMinimo(300);
            }
        };

<<<<<<< HEAD
        const buscarPorGastoMinimo = (valor) => {
            fetch(`http://localhost:8080/clientes/gastos-acima-de?valor=${valor}`)
=======
        if (valorFiltro === 'todos') {
            fetchClientes();
        } else if (valorFiltro === 'gastos_100') {
            fetch('http://localhost:8080/clientes/gastos-acima-de?valor=100')
>>>>>>> a6223a802f1ea850ef4ec57db71387dafe5e05ab
                .then(response => {
                    if (!response.ok) throw new Error(`Erro HTTP! Status: ${response.status}`);
                    return response.json();
                })
                .then(data => setClientes(Array.isArray(data) ? data : []))
                .catch(error => {
                    console.error('Erro ao filtrar clientes:', error);
                    alert('Falha ao aplicar o filtro. Verifique o console.');
                    setClientes([]);
                });
    };

    const handleCadastroCliente = (novoCliente) => {
        fetch('http://localhost:8080/clientes/cadastrar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoCliente)
        })
        .then(response => {
            if (response.ok) {
                alert('Cliente cadastrado com sucesso!');
                fetchClientes();
                setIsAddModalOpen(false);
            } else {
                alert('Erro ao cadastrar cliente.');
            }
        })
        .catch(error => console.error('Erro ao cadastrar cliente:', error));
    };

    const handleDeleteCliente = (id_cliente) => { // CORRIGIDO: id -> id_cliente
        if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
            fetch(`http://localhost:8080/clientes/deletar/${id_cliente}`, { method: 'DELETE' }) // CORRIGIDO: id -> id_cliente
            .then(response => {
                if (response.ok) {
                    alert('Cliente excluído com sucesso!');
                    fetchClientes();
                } else {
                    alert('Erro ao excluir cliente.');
                }
            })
            .catch(error => console.error('Erro ao deletar cliente:', error));
        }
    };

    const handleEditClick = (cliente) => {
        setClienteSelecionado(cliente);
        setIsEditModalOpen(true);
    };

    const handleSaveCliente = (clienteAtualizado) => {
        // O backend espera dataNascimento, então ajustamos o objeto
        const dadosParaApi = { ...clienteAtualizado, dataNascimento: clienteAtualizado.data_nascimento };
        delete dadosParaApi.data_nascimento; // Remove a chave antiga
        
        fetch(`http://localhost:8080/clientes/atualizar/${clienteAtualizado.id_cliente}`, { // CORRIGIDO: id -> id_cliente
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosParaApi),
        })
        .then(response => {
            if (response.ok) {
                alert('Cliente atualizado com sucesso!');
                fetchClientes();
                setIsEditModalOpen(false);
                setClienteSelecionado(null);
            } else {
                alert('Erro ao atualizar cliente.');
            }
        })
        .catch(error => console.error('Erro ao atualizar cliente:', error));
    };

    return (
        <div className="clientes-container">
            <div className="page-header">
                <h1>Gestão de Clientes</h1>
                <button onClick={() => setIsAddModalOpen(true)} className="btn-adicionar">
                    + Adicionar Cliente
                </button>
            </div>

            <div className="barra-pesquisa">
                <input
                    type="text"
                    placeholder="Pesquisar cliente por nome..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                />
                <button onClick={handleSearch}>Buscar</button>
<<<<<<< HEAD
                
                <select 
                    value={filtroAtivo} 
                    onChange={handleFiltroChange} 
                    className="filtro-select"
                    >
=======

                <select value={filtroAtivo} onChange={handleFiltroChange} className="filtro-select">
>>>>>>> a6223a802f1ea850ef4ec57db71387dafe5e05ab
                    <option value="todos">Filtrar por...</option>
                    <option value="gastos_100">Clientes que gastaram {'>'} R$ 100</option>
                    <option value="gastos_200">Clientes que gastaram {'>'} R$ 200</option>
                    <option value="gastos_300">Clientes que gastaram {'>'} R$ 300</option>
                </select>
            </div>

            <div className="lista-clientes">
                <h2>Clientes Cadastrados</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Telefone</th>
                            <th>Qtd. Pedidos</th>
                            <th>Total Gasto (R$)</th>
                            <th>Último Pedido</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map(cliente => (
                            <tr key={cliente.id_cliente}>
                                <td>{cliente.id_cliente}</td>
                                <td>{cliente.nome}</td>
                                <td>{cliente.telefone}</td>
                                <td>{cliente.quantidade_pedidos}</td>
                                <td>{Number(cliente.total_gasto).toFixed(2)}</td>
                                <td>
                                    {cliente.ultimo_pedido
                                        ? new Date(cliente.ultimo_pedido).toLocaleString('pt-BR')
                                        : 'Nenhum pedido'}
                                </td>
                                <td className="acoes">
                                    <button onClick={() => handleEditClick(cliente)} className="btn-editar">Editar</button>
                                    <button onClick={() => handleDeleteCliente(cliente.id_cliente)} className="btn-excluir">Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isAddModalOpen && (
                <AddClienteModal
                    onClose={() => setIsAddModalOpen(false)}
                    onSave={handleCadastroCliente}
                />
            )}

            {isEditModalOpen && (
                <EditClienteModal
                    cliente={clienteSelecionado}
                    onClose={() => setIsEditModalOpen(false)}
                    onSave={handleSaveCliente}
                />
            )}
        </div>
    );
};

export default ClientesPage;