import React, { useState, useEffect } from 'react';
import EditEventoModal from './EditEventoModal';
import AddEventoModal from './AddEventoModal';
import './ClientesPage.css';
import './EditClienteModal.css';

const EventosPage = () => {
    const [eventos, setEventos] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [eventoSelecionado, setEventoSelecionado] = useState(null);
    const [opcoesPublico, setOpcoesPublico] = useState([]);
    const [filtroPublico, setFiltroPublico] = useState('todos');
    const [melhorMes, setMelhorMes] = useState(null);

    const fetchEventos = () => {
        fetch('http://localhost:8080/eventos')
            .then(response => response.json())
            .then(data => setEventos(data))
            .catch(error => console.error('Erro ao buscar eventos:', error));
    };

    useEffect(() => {
        fetchEventos();

        fetch('http://localhost:8080/eventos/publicos-distintos')
            .then(response => response.json())
            .then(data => setOpcoesPublico(data))
            .catch(error => console.error('Erro ao buscar opções de público:', error));

        fetch('http://localhost:8080/eventos/stats/melhor-mes')
            .then(response => response.json())
            .then(data => setMelhorMes(data))
            .catch(error => console.error('Erro ao buscar estatísticas do mês:', error));
    }, []);

    const handleFiltroChange = (event) => {
        const valorFiltro = event.target.value;
        setFiltroPublico(valorFiltro);

        if (valorFiltro === 'todos') {
            fetchEventos();
        } else {
            fetch(`http://localhost:8080/eventos/por-publico?valor=${valorFiltro}`)
                .then(response => response.json())
                .then(data => setEventos(data))
                .catch(error => console.error('Erro ao filtrar eventos:', error));
        }
    };

    const handleCadastroEvento = (novoEvento) => {
        fetch('http://localhost:8080/eventos/cadastrar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoEvento)
        })
        .then(response => {
            if (response.ok) {
                alert('Evento cadastrado com sucesso!');
                fetchEventos();
                window.location.reload(); 
                setIsAddModalOpen(false);
            } else {
                alert('Erro ao cadastrar evento.');
            }
        })
        .catch(error => console.error('Erro ao cadastrar evento:', error));
    };

    const handleDeleteEvento = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este evento?')) {
            fetch(`http://localhost:8080/eventos/deletar/${id}`, { method: 'DELETE' })
            .then(response => { 
                if (response.ok) { 
                    alert('Evento excluído com sucesso!'); 
                    fetchEventos();
                    window.location.reload(); 
                } else { 
                    alert('Erro ao excluir evento.'); 
                }
            })
            .catch(error => console.error('Erro ao deletar evento:', error));
        }
    };

    const handleEditClick = (evento) => { 
        setEventoSelecionado(evento); 
        setIsEditModalOpen(true); 
    };

    const handleSaveEvento = (eventoAtualizado) => {
        const dadosParaApi = {
            nome: eventoAtualizado.nome,
            data: eventoAtualizado.data,
            hora: eventoAtualizado.hora,
            valorIngresso: eventoAtualizado.valor_ingresso,
            publicoEstimado: eventoAtualizado.publico_estimado
        };

        fetch(`http://localhost:8080/eventos/atualizar/${eventoAtualizado.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosParaApi),
        })
        .then(response => {
            if (response.ok) {
                alert('Evento atualizado com sucesso!');
                fetchEventos();
                window.location.reload(); 
                setIsEditModalOpen(false);
                setEventoSelecionado(null);
            } else {
                alert('Erro ao atualizar evento.');
            }
        })
        .catch(error => console.error('Erro ao atualizar evento:', error));
    };

    return (
        <div className="clientes-container">
            <div className="page-header">
                <h1>Gestão de Eventos</h1>
                <button onClick={() => setIsAddModalOpen(true)} className="btn-adicionar">
                    + Adicionar Evento
                </button>
            </div>

            <div className="barra-pesquisa">
                <select value={filtroPublico} onChange={handleFiltroChange} className="filtro-select">
                    <option value="todos">Filtrar por público...</option>
                    {opcoesPublico.map(opcao => (
                        <option key={opcao.publico_estimado} value={opcao.publico_estimado}>
                            Público de {opcao.publico_estimado}
                        </option>
                    ))}
                </select>

                {melhorMes && (
                    <div className="info-box">
                        <strong>🏆 Mês de Maior Potencial:</strong>
                        <span className="info-mes">{melhorMes.mes}</span>
                        <span className="info-valor">R$ {Number(melhorMes.renda_potencial_total).toFixed(2)}</span>
                    </div>
                )}
            </div>

            <div className="lista-clientes">
                <h2>Eventos Cadastrados</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th><th>Nome</th><th>Data</th><th>Hora</th><th>Ingresso (R$)</th><th>Público Est.</th><th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventos.map(evento => (
                            <tr key={evento.id}>
                                <td>{evento.id}</td>
                                <td>{evento.nome}</td>
                                <td>{evento.data}</td>
                                <td>{evento.hora}</td>
                                <td>{evento.valor_ingresso}</td>
                                <td>{evento.publico_estimado}</td>
                                <td className="acoes">
                                    <button onClick={() => handleEditClick(evento)} className="btn-editar">Editar</button>
                                    <button onClick={() => handleDeleteEvento(evento.id)} className="btn-excluir">Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isAddModalOpen && (
                <AddEventoModal
                    onClose={() => setIsAddModalOpen(false)}
                    onSave={handleCadastroEvento}
                />
            )}

            {isEditModalOpen && (
                <EditEventoModal
                    evento={eventoSelecionado}
                    onClose={() => setIsEditModalOpen(false)}
                    onSave={handleSaveEvento}
                />
            )}
        </div>
    );
};

export default EventosPage;