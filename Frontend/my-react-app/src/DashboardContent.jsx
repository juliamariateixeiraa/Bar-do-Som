// src/DashboardContent.jsx
import React from 'react';

// Este componente é o conteúdo que você quer ver na página /dashboard
function DashboardContent() {
  return (
    <>
      <header className="main-header" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Olá, Administrador! 👋</h2>
          <p>Aqui está um resumo do seu estabelecimento hoje.</p>
        </div>
      </header>
      <div className="cards-container">
        <div className="card">
          <h4>Total de Clientes</h4>
          <p className="card-value">--</p>
        </div>
        <div className="card">
          <h4>Eventos Agendados</h4>
          <p className="card-value">--</p>
        </div>
        <div className="card">
          <h4>Reservas para Hoje</h4>
          <p className="card-value">--</p>
        </div>
        <div className="card card-alert">
          <h4>Itens com Estoque Baixo</h4>
          <p className="card-value">--</p>
        </div>
      </div>
    </>
  );
}

export default DashboardContent;