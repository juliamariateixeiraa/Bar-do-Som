import React, { useState, useEffect } from 'react';
import './EditEventoModal.css'; // Usa o CSS que acabamos de criar

const EditEventoModal = ({ evento, onClose, onSave }) => {
    const [formData, setFormData] = useState({ ...evento });

    useEffect(() => {
        setFormData({ ...evento });
    }, [evento]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!evento) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>Editar Evento</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nome:</label>
                        <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Data:</label>
                        <input type="date" name="data" value={formData.data} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Hora:</label>
                        <input type="time" name="hora" value={formData.hora} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Valor do Ingresso:</label>
                        <input type="number" step="0.01" name="valor_ingresso" value={formData.valor_ingresso} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Público Estimado:</label>
                        <input type="number" name="publico_estimado" value={formData.publico_estimado} onChange={handleChange} required />
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

export default EditEventoModal;