import React, { useState, useEffect } from 'react';
import './FuncionariosPage.css';

const API_BASE = 'http://localhost:8080';

function FuncionariosPage() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [filteredFuncionarios, setFilteredFuncionarios] = useState([]); // Lista para renderização após filtro
  const [searchTerm, setSearchTerm] = useState(''); // Termo digitado na busca
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const buscarFuncionarios = async () => {
    try {
      setLoading(true);
      // Busca todos os funcionários do backend
      const response = await fetch(`${API_BASE}/funcionarios`);

      if (!response.ok) {
        throw new Error(`Erro ao buscar funcionários: ${response.statusText || response.status}`);
      }

      const data = await response.json();

      setFuncionarios(data);
      setFilteredFuncionarios(data); // Exibe todos inicialmente
      setError(null);

    } catch (err) {
      console.error("Falha ao carregar funcionários:", err);
      setError("Não foi possível carregar a lista de funcionários. Verifique se a API está em execução.");
      setFuncionarios([]);
      setFilteredFuncionarios([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarFuncionarios();
  }, []);

  // Lógica de filtragem no frontend (Client-side filtering)
  useEffect(() => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    
    // Filtra a lista completa de funcionários pelo nome
    const results = funcionarios.filter(funcionario =>
      (funcionario.nome || '').toLowerCase().includes(lowerCaseSearch)
    );

    setFilteredFuncionarios(results);
  }, [searchTerm, funcionarios]); // Re-executa sempre que o termo de busca ou a lista completa mudar

  return (
    <div className="container-func">
      <h1 className="title-func">👥 Meus Funcionários</h1>

      {loading && (
        <p className="loading-func">Carregando funcionários...</p>
      )}

      {error && (
        <div className="error-box-func">
          <strong>🚨 Erro de Conexão:</strong>
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Search Bar com Estilo Melhorado */}
          <div className="search-wrapper">
             <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Pesquisar por nome do Funcionário..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {filteredFuncionarios.length === 0 && !searchTerm ? (
            <div className="empty-box-func">
              <p>Nenhum funcionário encontrado no banco de dados.</p>
            </div>
          ) : filteredFuncionarios.length === 0 && searchTerm ? (
            <div className="empty-box-func">
              <p>Nenhum funcionário encontrado para "{searchTerm}".</p>
            </div>
          ) : (
            <div className="table-container-func">
              <p style={{ marginBottom: '15px', color: '#666' }}>
                  Total de Funcionários encontrados: {filteredFuncionarios.length}
              </p>
              <table className="table-func">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Cargo</th>
                    <th>Telefone</th>
                    <th>ID Gerente</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Renderiza a lista filtrada */}
                  {filteredFuncionarios.map((funcionario, index) => {
                    const cargoClass = funcionario.cargo
                      ? funcionario.cargo
                          .toLowerCase()
                          .normalize("NFD")
                          .replace(/[\u0300-\u036f]/g, "") 
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/(^-|-$)/g, "") 
                      : "outros";

                    return (
                      <tr key={funcionario.id_funcionario || index}>
                        <td>{funcionario.id_funcionario}</td>
                        <td>{funcionario.nome}</td>
                        <td>
                          <span className={`tag-cargo ${cargoClass}`}>
                            {funcionario.cargo}
                          </span>
                        </td>
                        <td>{funcionario.telefone}</td>
                        <td>{funcionario.id_gerente || 'N/A'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default FuncionariosPage;