// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import DashboardPage from './DashboardPage';
import DashboardContent from './DashboardContent'; // Importe o novo componente
import ClientesPage from './ClientesPage';
import EventosPage from './EventosPage';
import ProdutosPage from './ProdutosPage';
import ReservasPage from './ReservasPage';
import FuncionariosPage from './FuncionariosPage';
import RelatoriosPage from './RelatoriosPage';
import FuncoesProcedures from './FuncoesProcedures';
import ConsultasViews from './ConsultasViews';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Rota "pai" que usa o layout do DashboardPage */}
      <Route path="/" element={<DashboardPage />}>
        {/* Redireciona a rota raiz para o dashboard */}
        <Route index element={<Navigate to="/dashboard" replace />} />
        
        {/* Rotas "filhas" que serão renderizadas dentro do <Outlet> */}
        <Route path="dashboard" element={<DashboardContent />} />
        <Route path="clientes" element={<ClientesPage />} />
        <Route path="eventos" element={<EventosPage />} />
        <Route path="produtos" element={<ProdutosPage />} />
        <Route path="reservas" element={<ReservasPage />} />
        <Route path="funcionarios" element={<FuncionariosPage />} />
        <Route path="relatorios" element={<RelatoriosPage />} /><Route path="/funcoes-procedures" element={<FuncoesProcedures />} /><Route path="/consultas-views" element={<ConsultasViews />} />
      </Route>
    </Routes>
  );
}

export default App;