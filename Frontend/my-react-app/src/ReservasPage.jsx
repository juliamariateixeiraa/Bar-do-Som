import React, { useState, useEffect } from 'react';

import './ReservasPage.css';

function ReservasPage () {
  const [reservas, setReservas] = useState([]);
  const [filteredReservas, setFilteredReservas] = useState([]); // Lista para renderização após filtro
  const [searchTerm, setSearchTerm] = useState(''); // Termo digitado na busca
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReservas = async () => {
    try {
      // Busca todas as reservas do backend
      const response = await fetch('http://localhost:8080/reservas'); 
      
      if (!response.ok) {
        throw new Error('Erro ao buscar as reservas.');
      }

      const data = await response.json();
      setReservas(data); 
      setFilteredReservas(data); // Exibe todos inicialmente
    } catch (err) {
      console.error("Erro na requisição:", err);
      setError(err.message); 
      setReservas([]);
      setFilteredReservas([]);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchReservas();
  }, []); 

  // Lógica de filtragem no frontend (Client-side filtering)
  useEffect(() => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    
    // Filtra a lista completa de reservas pelo nome do cliente
    const results = reservas.filter(reserva =>
      (reserva.nome_cliente || '').toLowerCase().includes(lowerCaseSearch)
    );

    setFilteredReservas(results);
  }, [searchTerm, reservas]); // Re-executa sempre que o termo de busca ou a lista completa mudar

  if (loading) {
    return <div>Carregando reservas... ⏳</div>;
  }

  if (error) {
    return <div>Erro ao carregar os dados: **{error}** 🚨</div>;
  }

  return (
    <div className="reservas-container">
      <h1>Gerenciamento de Reservas 🗓️</h1>
      
      {/* Search Bar com Estilo Melhorado */}
      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Pesquisar por nome do Cliente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input" 
        />
      </div>
      
      <p>Total de Reservas encontradas: {filteredReservas.length}</p>

      {filteredReservas.length === 0 && !searchTerm ? (
        <div className="reservas-vazio">Não há reservas cadastradas.</div>
      ) : filteredReservas.length === 0 && searchTerm ? (
        <div className="reservas-vazio">Nenhuma reserva encontrada para "{searchTerm}".</div>
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
              {/* Renderiza a lista filtrada */}
              {filteredReservas.map(reserva => (
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

export default ReservasPage;