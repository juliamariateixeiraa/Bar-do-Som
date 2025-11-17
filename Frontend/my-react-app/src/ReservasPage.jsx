import React, { useState, useEffect } from 'react';

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
    <div style={{ padding: '20px' }}>
      <h1>Gerenciamento de Reservas 🗓️</h1>
      <p>Total de Reservas encontradas: **{reservas.length}**</p>

      {reservas.length === 0 ? (
        <p>Não há reservas cadastradas.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={tableHeaderStyle}>ID Reserva</th>
              <th style={tableHeaderStyle}>Cliente</th>
              <th style={tableHeaderStyle}>Mesa</th>
              <th style={tableHeaderStyle}>Evento</th>
              <th style={tableHeaderStyle}>Data da Reserva</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva.id_reserva}>
                <td style={tableCellStyle}>{reserva.id_reserva}</td>
                <td style={tableCellStyle}>**{reserva.nome_cliente}**</td>
                <td style={tableCellStyle}>{reserva.numero_mesa}</td>
                <td style={tableCellStyle}>{reserva.nome_evento}</td>
                <td style={tableCellStyle}>{new Date(reserva.data_reserva).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
