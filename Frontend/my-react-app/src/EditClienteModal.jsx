import React, { useState, useEffect } from 'react';
import './EditClienteModal.css';

const EditClienteModal = ({ cliente, onClose, onSave }) => {
    const [formData, setFormData] = useState({ ...cliente });

    // Garante que o formulário atualize se o cliente selecionado mudar
    useEffect(() => {
        setFormData({ ...cliente });
    }, [cliente]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!cliente) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>Editar Cliente</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nome:</label>
                        <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Telefone:</label>
                        <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Data de Nascimento:</label>
                        <input type="date" name="data_nascimento" value={formData.data_nascimento} onChange={handleChange} required />
                    </div>
                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn-cancelar">Cancelar</button>
                        <button type="submit" className="btn-salvar">Salvar Alterações</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditClienteModal;