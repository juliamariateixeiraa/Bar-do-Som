// src/ClientesPage.jsx
import React, { useState, useEffect } from 'react';
import './ClientesPage.css';

const API_URL = 'http://localhost:8080/clientes';

function ClientesPage() {
  const [clientes, setClientes] = useState([]);

  const fetchTodosClientes = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      alert("Falha ao buscar clientes. Verifique o console para mais detalhes.");
    }
  };

  // ALTERADO: Nome da função e URL
  const fetchClientesMaiores30 = async () => {
    try {
      const response = await fetch(`${API_URL}/maiores30`); // URL alterada
       if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error("Erro ao buscar clientes maiores de 30:", error); // Mensagem de erro alterada
      alert("Falha ao buscar clientes filtrados. Verifique o console para mais detalhes.");
    }
  };

  useEffect(() => {
    fetchTodosClientes();
  }, []);

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Gerenciamento de Clientes</h1>
        <div>
          <button className="add-button">Adicionar Novo Cliente</button>
          <button className="filter-button" onClick={fetchTodosClientes}>Listar Todos</button>
          {/* ALTERADO: Texto do botão e função onClick */}
          <button className="filter-button" onClick={fetchClientesMaiores30}>Listar Maiores de 30</button>
        </div>
      </header>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Nascimento</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id_cliente}> 
                <td>{cliente.id_cliente}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.data_nascimento}</td>
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

export default ClientesPage;