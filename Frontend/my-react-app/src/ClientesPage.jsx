import React, { useState, useEffect } from 'react';
import EditClienteModal from './EditClienteModal';
import AddClienteModal from './AddClienteModal'; // Importa o novo modal de cadastro
import './ClientesPage.css';
import './EditClienteModal.css';

const ClientesPage = () => {
    const [clientes, setClientes] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Estado para o modal de cadastro
    const [clienteSelecionado, setClienteSelecionado] = useState(null);

    const fetchClientes = () => {
        fetch('http://localhost:8080/clientes')
            .then(response => response.json())
            .then(data => setClientes(data))
            .catch(error => console.error('Erro ao buscar clientes:', error));
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    const handleCadastroCliente = (novoCliente) => {
        fetch('http://localhost:8080/clientes/cadastrar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoCliente)
        })
        .then(response => {
            if (response.ok) {
                alert('Cliente cadastrado com sucesso!');
                fetchClientes(); // Atualiza a lista
                setIsAddModalOpen(false); // Fecha o modal de cadastro
            } else {
                alert('Erro ao cadastrar cliente.');
            }
        })
        .catch(error => console.error('Erro ao cadastrar cliente:', error));
    };
    
    // ... (as funções handleDeleteCliente, handleEditClick, handleSaveCliente continuam aqui, sem alterações)
    const handleDeleteCliente = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
            fetch(`http://localhost:8080/clientes/deletar/${id}`, { method: 'DELETE' })
            .then(response => { if (response.ok) { alert('Cliente excluído com sucesso!'); fetchClientes(); } else { alert('Erro ao excluir cliente.'); } })
            .catch(error => console.error('Erro ao deletar cliente:', error));
        }
    };
    const handleEditClick = (cliente) => { setClienteSelecionado(cliente); setIsEditModalOpen(true); };
    const handleSaveCliente = (clienteAtualizado) => {
        const dadosParaApi = { ...clienteAtualizado, dataNascimento: clienteAtualizado.data_nascimento };
        delete dadosParaApi.data_nascimento;
        fetch(`http://localhost:8080/clientes/atualizar/${clienteAtualizado.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosParaApi),
        })
        .then(response => { if (response.ok) { alert('Cliente atualizado com sucesso!'); fetchClientes(); setIsEditModalOpen(false); setClienteSelecionado(null); } else { alert('Erro ao atualizar cliente.'); } })
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

            <div className="lista-clientes">
                <h2>Clientes Cadastrados</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th><th>Nome</th><th>Email</th><th>Telefone</th><th>Data de Nascimento</th><th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map(cliente => (
                            <tr key={cliente.id}>
                                <td>{cliente.id}</td><td>{cliente.nome}</td><td>{cliente.email}</td><td>{cliente.telefone}</td><td>{cliente.data_nascimento}</td>
                                <td className="acoes">
                                    <button onClick={() => handleEditClick(cliente)} className="btn-editar">Editar</button>
                                    <button onClick={() => handleDeleteCliente(cliente.id)} className="btn-excluir">Excluir</button>
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