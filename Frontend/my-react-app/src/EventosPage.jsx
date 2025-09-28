// src/EventosPage.jsx
import React, { useState, useEffect } from 'react';
import './EventosPage.css'; // Supondo que você tenha um CSS para esta página

const API_URL = 'http://localhost:8080/eventos';

function EventosPage() {
    const [eventos, setEventos] = useState([]);
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');

    const fetchTodosEventos = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setEventos(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Erro ao buscar eventos:", error);
            setEventos([]);
            alert("Falha ao buscar eventos. Verifique o console.");
        }
    };

    const handleFiltrarPorData = async () => {
        if (!dataInicio || !dataFim) {
            alert("Por favor, selecione as duas datas para filtrar.");
            return;
        }
        try {
            const response = await fetch(`${API_URL}/periodo?inicio=${dataInicio}&fim=${dataFim}`);
            const data = await response.json();
            setEventos(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Erro ao filtrar eventos:", error);
            setEventos([]);
            alert("Falha ao filtrar eventos. Verifique o console.");
        }
    };

    useEffect(() => {
        fetchTodosEventos();
    }, []);

    return (
        <div className="page-container">
            <header className="page-header">
                <h1>Gerenciamento de Eventos</h1>
                <button className="add-button">Adicionar Novo Evento</button>
            </header>

            <div className="filtros-container" style={{ margin: '20px 0', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <label>Filtrar por data:</label>
                <input type="date" value={dataInicio} onChange={e => setDataInicio(e.target.value)} />
                <span>até</span>
                <input type="date" value={dataFim} onChange={e => setDataFim(e.target.value)} />
                <button className="filter-button" onClick={handleFiltrarPorData}>Filtrar</button>
                <button className="clear-button" onClick={fetchTodosEventos}>Limpar Filtro</button>
            </div>
            
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome do Evento</th>
                            <th>Data</th>
                            <th>Hora</th>
                            <th>Ingresso (R$)</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventos && eventos.map((evento) => (
                            // ===== CORREÇÃO FINAL AQUI =====
                            <tr key={evento.id_evento}>
                                <td>{evento.id_evento}</td>
                            {/* ============================= */}
                                <td>{evento.nome}</td>
                                <td>{evento.data}</td>
                                <td>{evento.hora}</td>
                                <td>
                                    {evento.valor_ingresso != null 
                                        ? evento.valor_ingresso.toFixed(2).replace('.', ',') 
                                        : 'N/A'}
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="edit-button">Alterar</button>
                                        <button className="delete-button">Excluir</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EventosPage;