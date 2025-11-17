import React, { useState, useEffect } from 'react';

import './ReservasPage.css';

function ReservasPage () {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await fetch('http://localhost:8080/reservas'); 
        
        if (!response.ok) {
          throw new Error('Erro ao buscar as reservas.');
        }

        const data = await response.json();
        setReservas(data); 
      } catch (err) {
        console.error("Erro na requisição:", err);
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchReservas();
  }, []); 

  if (loading) {
    return <div>Carregando reservas... ⏳</div>;
  }

  if (error) {
    return <div>Erro ao carregar os dados: **{error}** 🚨</div>;
  }

  return (
    <div className="reservas-container">
      <h1>Gerenciamento de Reservas 🗓️</h1>
      <p>Total de Reservas encontradas: {reservas.length}</p>

      {reservas.length === 0 ? (
        <div className="reservas-vazio">Não há reservas cadastradas.</div>
      ) : (
        <div className="reservas-table-wrapper">
          <table className="reservas-table">
            <thead>
              <tr>
                <th>ID Reserva</th>
                <th>Cliente</th>
                <th>Mesa</th>
                <th>Evento</th>
                <th>Data da Reserva</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map(reserva => (
                <tr key={reserva.id_reserva}>
                  <td>{reserva.id_reserva}</td>
                  <td>{reserva.nome_cliente}</td>
                  <td>{reserva.numero_mesa}</td>
                  <td>{reserva.nome_evento}</td>
                  <td>{new Date(reserva.data_reserva).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

}

const tableHeaderStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
  fontWeight: 'bold',
};

const tableCellStyle = {
  border: '1px solid #ddd',
  padding: '8px',
};

export default ReservasPage;
