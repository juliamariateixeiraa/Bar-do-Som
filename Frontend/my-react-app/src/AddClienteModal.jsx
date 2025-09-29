import React, { useState } from 'react';
import './EditClienteModal.css'; // Reutilizando o mesmo CSS do modal de edição

const AddClienteModal = ({ onClose, onSave }) => {
    const [novoCliente, setNovoCliente] = useState({
        nome: '',
        email: '',
        telefone: '',
        dataNascimento: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNovoCliente(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(novoCliente);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>Cadastrar Novo Cliente</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nome:</label>
                        <input type="text" name="nome" value={novoCliente.nome} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" name="email" value={novoCliente.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Telefone:</label>
                        <input type="text" name="telefone" value={novoCliente.telefone} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Data de Nascimento:</label>
                        <input type="date" name="dataNascimento" value={novoCliente.dataNascimento} onChange={handleChange} required />
                    </div>
                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn-cancelar">Cancelar</button>
                        <button type="submit" className="btn-salvar">Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddClienteModal;