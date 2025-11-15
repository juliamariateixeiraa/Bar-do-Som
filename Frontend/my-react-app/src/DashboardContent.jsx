// src/DashboardContent.jsx
import React, { useState, useEffect } from 'react';
import './DashboardContent.css';

// Importe as imagens dos seus gráficos
import grafico1 from './assets/grafico1.png';
import grafico2 from './assets/grafico2.png';
import grafico3 from './assets/grafico3.png';
import grafico4 from './assets/grafico4.png';
import grafico5 from './assets/grafico5.png';
import grafico6 from './assets/grafico6.png';
import grafico7 from './assets/grafico7.png';
import grafico8 from './assets/grafico8.png';
import grafico9 from './assets/grafico9.png';
import grafico10 from './assets/grafico10.png';
import grafico11 from './assets/grafico11.png';
import grafico12 from './assets/grafico12.png';
import grafico13 from './assets/grafico13.png';
import grafico14 from './assets/grafico14.png';
import grafico15 from './assets/grafico15.png';

function DashboardContent() {
  // Estados para armazenar dados da API
  const [indicadores, setIndicadores] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE = 'http://localhost:8080/dashboard';

  // Buscar dados da API ao carregar o componente
  useEffect(() => {
    fetchIndicadores();
  }, []);

  const fetchIndicadores = async () => {
    try {
      console.log('🔍 Buscando dados da API...'); // Debug
      const response = await fetch(`${API_BASE}/indicadores-gerais`);
      console.log('📡 Response status:', response.status); // Debug

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Dados recebidos:', data); // Debug
      setIndicadores(data);
      setLoading(false);
    } catch (error) {
      console.error('❌ Erro ao buscar indicadores:', error);
      setLoading(false);
      // Define valores padrão em caso de erro
      setIndicadores({
        total_clientes: 0,
        total_eventos: 0,
        total_pedidos: 0,
        produtos_estoque_baixo: 0,
        receita_total: 0,
        ticket_medio: 0,
        total_produtos: 0
      });
    }
  };

  // Valores dos cards (agora vêm da API)
  const totalClientes = loading ? '...' : (indicadores?.total_clientes || 0);
  const eventosAgendados = loading ? '...' : (indicadores?.total_eventos || 0);
  const totalPedidos = loading ? '...' : (indicadores?.total_pedidos || 0);
  const estoqueBaixo = loading ? '...' : (indicadores?.produtos_estoque_baixo || 0);

  // Estrutura de dados para os gráficos
  const graficosComLegenda = [
    { imagem: grafico1, legenda: 'Mostra a contagem de gastos por gênero em faixas de valor.' },
    { imagem: grafico2, legenda: 'Compara a frequência de visitas por faixa etária e período do dia.' },
    { imagem: grafico3, legenda: 'Ilustra a distribuição percentual da preferência por tipo de bebida.' },
    { imagem: grafico4, legenda: 'Compara a frequência de visitas por gênero e tipo de companhia.' },
    { imagem: grafico5, legenda: 'Mostra a frequência de visitas por dia da semana e faixa etária.' },
    { imagem: grafico6, legenda: 'Mostra a preferência musical por faixa etária.' },
    { imagem: grafico7, legenda: 'Distribuição percentual do horário preferido para ir ao bar pelo gênero masculino.' },
    { imagem: grafico8, legenda: 'Frequência de visitas ao bar para a faixa etária de 45-54 anos.' },
    { imagem: grafico9, legenda: 'Mostra a preferência musical (tipo de show) do gênero feminino.' },
    { imagem: grafico10, legenda: 'Mostra se o público de 18-24 anos frequenta o bar pela música.' },
    { imagem: grafico11, legenda: 'Mostra o gasto por noite da faixa etária de 45-54 anos.' },
    { imagem: grafico12, legenda: 'Relaciona o gasto por noite de clientes que frequentam o bar 2 a 3 vezes por mês.' },
    { imagem: grafico13, legenda: 'Mostra o tipo de companhia preferido por clientes que frequentam o bar uma vez por mês.' },
    { imagem: grafico14, legenda: 'Mostra a distribuição da preferência musical entre as diferentes faixas etárias.' },
    { imagem: grafico15, legenda: 'Distribuição dos fatores que mais atraem o público masculino ao bar.' }
  ];

  return (
      <>
        <header className="main-header" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2>Olá, Administrador! 👋</h2>
            <p>Aqui está um resumo do seu estabelecimento hoje.</p>
          </div>
        </header>

        {/* Cards com dados da API */}
        <div className="cards-container">
          <div className="card">
            <h4>Total de Clientes</h4>
            <p className="card-value">{totalClientes}</p>
            {!loading && <small style={{ color: '#888', fontSize: '0.85rem' }}>Clientes cadastrados</small>}
          </div>
          <div className="card">
            <h4>Eventos Agendados</h4>
            <p className="card-value">{eventosAgendados}</p>
            {!loading && <small style={{ color: '#888', fontSize: '0.85rem' }}>Eventos futuros</small>}
          </div>
          <div className="card">
            <h4>Total de Pedidos</h4>
            <p className="card-value">{totalPedidos}</p>
            {!loading && <small style={{ color: '#888', fontSize: '0.85rem' }}>Pedidos realizados</small>}
          </div>
          <div className="card card-alert">
            <h4>Itens com Estoque Baixo</h4>
            <p className="card-value">{estoqueBaixo}</p>
            {!loading && estoqueBaixo > 0 && (
                <small style={{ color: '#ff6b6b', fontSize: '0.85rem' }}>⚠️ Requer atenção</small>
            )}
          </div>
        </div>

        {/* Seção de Estatísticas Adicionais (NOVA) */}
        {!loading && indicadores && (
            <div className="stats-section" style={{
              marginTop: '2rem',
              marginBottom: '2rem',
              padding: '1.5rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              color: 'white',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem'
            }}>
              <div style={{ textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', opacity: 0.9 }}>Receita Total</h4>
                <p style={{ margin: 0, fontSize: '1.8rem', fontWeight: 'bold' }}>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(indicadores.receita_total || 0)}
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', opacity: 0.9 }}>Ticket Médio</h4>
                <p style={{ margin: 0, fontSize: '1.8rem', fontWeight: 'bold' }}>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(indicadores.ticket_medio || 0)}
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', opacity: 0.9 }}>Total de Produtos</h4>
                <p style={{ margin: 0, fontSize: '1.8rem', fontWeight: 'bold' }}>
                  {indicadores.total_produtos || 0}
                </p>
              </div>
            </div>
        )}

        {/* Seção de Gráficos (mantida igual) */}
        <div className="graficos-container">
          {graficosComLegenda.map((grafico, index) => (
              <div key={index} className="grafico-card">
                <img src={grafico.imagem} alt={grafico.legenda} />
                <h5>{grafico.legenda}</h5>
              </div>
          ))}
        </div>
      </>
  );
}

export default DashboardContent;