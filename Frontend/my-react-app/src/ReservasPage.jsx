import React, { useState, useEffect } from 'react';

function ReservasPage() {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_BASE = 'http://localhost:8080';

    const buscarReservas = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE}/reservas`);

            if (!response.ok) {
                throw new Error(`Erro ao buscar reservas: ${response.statusText}`);
            }

            const data = await response.json();
            setReservas(data);
            setError(null);

        } catch (err) {
            console.error("Falha ao carregar reservas:", err);
            setError("Não foi possível carregar a lista de reservas. Verifique a API.");
            setReservas([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        buscarReservas();
    }, []);

    const formatarData = (dataISO) => {
        if (!dataISO) return "N/A";
        const d = new Date(dataISO);
        return d.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="reservas-container">
            <h1>📅 Gerenciamento de Reservas</h1>

            <button onClick={buscarReservas} className="refresh-btn">🔄 Atualizar Lista</button>

            {loading && <p style={{ textAlign: 'center', marginTop: '20px' }}>Carregando reservas...</p>}

            {error && (
                <div className="error-message">
                    <p>{error}</p>
                </div>
            )}

            {!loading && !error && reservas.length === 0 && (
                <div className="no-data">
                    <p>Nenhuma reserva encontrada no banco de dados.</p>
                </div>
            )}

            {!loading && !error && reservas.length > 0 && (
                <div className="reservas-tabela-wrapper">
                    <table className="reservas-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>ID Cliente</th>
                                <th>ID Mesa</th>
                                <th>ID Evento</th>
                                <th>Data da Reserva</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservas.map((reserva) => (
                                <tr key={reserva.id_reserva}>
                                    <td>{reserva.id_reserva}</td>
                                    <td>{reserva.id_cliente}</td>
                                    <td>{reserva.id_mesa}</td>
                                    <td>{reserva.id_evento}</td>
                                    <td>{formatarData(reserva.data_reserva)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ReservasPage;
