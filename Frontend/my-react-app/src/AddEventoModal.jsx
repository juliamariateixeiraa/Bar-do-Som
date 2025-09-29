import React, { useState } from 'react';
import './EditClienteModal.css'; // Reutilizando o mesmo CSS

const AddEventoModal = ({ onClose, onSave }) => {
    const [novoEvento, setNovoEvento] = useState({
        nome: '',
        data: '',
        hora: '',
        valorIngresso: '',
        publicoEstimado: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNovoEvento(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(novoEvento);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>Cadastrar Novo Evento</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nome:</label>
                        <input type="text" name="nome" value={novoEvento.nome} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Data:</label>
                        <input type="date" name="data" value={novoEvento.data} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Hora:</label>
                        <input type="time" name="hora" value={novoEvento.hora} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Valor do Ingresso (R$):</label>
                        <input type="number" step="0.01" name="valorIngresso" value={novoEvento.valorIngresso} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Público Estimado:</label>
                        <input type="number" name="publicoEstimado" value={novoEvento.publicoEstimado} onChange={handleChange} required />
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

export default AddEventoModal;