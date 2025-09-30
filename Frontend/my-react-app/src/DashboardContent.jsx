// src/DashboardContent.jsx
import React from 'react';
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
  // Valores fixos para os cards de resumo
  const totalClientes = '--';
  const eventosAgendados = '--';
  const reservasHoje = '--';
  const estoqueBaixo = '--';

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
  { imagem: grafico12, legenda: 'Relaciona o gasto por noite de clientes que frequentam o bar 2 a 3 vezes por mês.' }, // <-- Substitua pela legenda correta
  { imagem: grafico13, legenda: 'Mostra o tipo de companhia preferido por clientes que frequentam o bar uma vez por mês.' }, // <-- Substitua pela legenda correta
  { imagem: grafico14, legenda: 'Mostra a distribuição da preferência musical entre as diferentes faixas etárias.' }, // <-- Substitua pela legenda correta
  { imagem: grafico15, legenda: 'Distribuição dos fatores que mais atraem o público masculino ao bar.' }  // <-- Substitua pela legenda correta
];


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
          <p className="card-value">{totalClientes}</p>
        </div>
        <div className="card">
          <h4>Eventos Agendados</h4>
          <p className="card-value">{eventosAgendados}</p>
        </div>
        <div className="card">
          <h4>Reservas para Hoje</h4>
          <p className="card-value">{reservasHoje}</p>
        </div>
        <div className="card card-alert">
          <h4>Itens com Estoque Baixo</h4>
          <p className="card-value">{estoqueBaixo}</p>
        </div>
      </div>

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