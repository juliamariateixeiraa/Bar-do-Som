// src/ClientesPage.jsx
import React from 'react';
import './ClientesPage.css'; // Importando o CSS que vamos criar

// Dados de exemplo (mock) que virão do back-end no futuro
const mockClientes = [
  { id_cliente: 1, nome: 'Ana Carolina', email: 'ana.carolina@email.com', telefone: '(81) 98877-6655', data_nascimento: '1995-03-15' },
  { id_cliente: 2, nome: 'Bruno Santos', email: 'bruno.santos@email.com', telefone: '(81) 99988-7766', data_nascimento: '1990-07-22' },
  { id_cliente: 3, nome: 'Carla Dias', email: 'carla.dias@email.com', telefone: '(81) 98765-4321', data_nascimento: '2001-11-10' },
  { id_cliente: 4, nome: 'Daniel Oliveira', email: 'daniel.oliveira@email.com', telefone: '(81) 99123-4567', data_nascimento: '1988-01-30' },
];

function ClientesPage() {
  return (
    // Envolvemos a página em um layout similar ao do Dashboard para consistência
    <div className="page-container">
      <header className="page-header">
        <h1>Gerenciamento de Clientes</h1>
        <button className="add-button">Adicionar Novo Cliente</button>
      </header>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {mockClientes.map((cliente) => (
              <tr key={cliente.id_cliente}>
                <td>{cliente.id_cliente}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefone}</td>
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