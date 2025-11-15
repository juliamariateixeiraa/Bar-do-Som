// src/DashboardPage.jsx
import React from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import './DashboardPage.css';
import logoImage from './assets/logo.png';
import DashboardContent from './DashboardContent'; // Importa o componente

function DashboardPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  // Verifica se está na rota principal do dashboard
  const isDashboardHome = location.pathname === '/dashboard';

  return (
      <div className="dashboard-container">
        <aside className="sidebar">
          <div className="sidebar-header">
            <img src={logoImage} alt="Bar do Som Logo" className="sidebar-logo" />
          </div>
          <nav className="sidebar-nav">
            <ul>
              <li className={location.pathname === '/dashboard' ? 'active' : ''}>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className={location.pathname.startsWith('/clientes') ? 'active' : ''}>
                <Link to="/clientes">Clientes</Link>
              </li>
              <li className={location.pathname.startsWith('/eventos') ? 'active' : ''}>
                <Link to="/eventos">Eventos</Link>
              </li>
              <li className={location.pathname.startsWith('/produtos') ? 'active' : ''}>
                <Link to="/produtos">Produtos</Link>
              </li>
              <li className={location.pathname.startsWith('/reservas') ? 'active' : ''}>
                <Link to="/reservas">Reservas</Link>
              </li>
              <li className={location.pathname.startsWith('/funcionarios') ? 'active' : ''}>
                <Link to="/funcionarios">Funcionários</Link>
              </li>
              <li className={location.pathname.startsWith('/relatorios') ? 'active' : ''}>
                <Link to="/relatorios">Relatórios</Link>
              </li>
              <li className={location.pathname.startsWith('/funcoes-procedures') ? 'active' : ''}>
                <Link to="/funcoes-procedures">Funções & Procedures</Link>
              </li>
              <li className={location.pathname.startsWith('/consultas-views') ? 'active' : ''}>
                <Link to="/consultas-views">Consultas & Views</Link>
              </li>
            </ul>
          </nav>
          <div className="sidebar-footer">
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </aside>

        <main className="main-content">
          {/* Se estiver na rota /dashboard, mostra o DashboardContent */}
          {isDashboardHome ? <DashboardContent /> : <Outlet />}
        </main>
      </div>
  );
}

export default DashboardPage;