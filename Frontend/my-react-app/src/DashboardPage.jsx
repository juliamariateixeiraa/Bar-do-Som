// src/DashboardPage.jsx
import React from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import './DashboardPage.css';
import logoImage from './assets/logo.png'; // Importa a imagem do logo

function DashboardPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          {/* O <h3> foi substituído pela imagem do logo */}
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
          </ul>
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </aside>
      
      <main className="main-content">
        {/* O Outlet renderiza o componente da rota filha aqui */}
        <Outlet /> 
      </main>
    </div>
  );
}

export default DashboardPage;