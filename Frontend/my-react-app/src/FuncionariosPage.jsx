import React, { useState, useEffect } from 'react';
import './FuncionariosPage.css';

const API_BASE = 'http://localhost:8080';

function FuncionariosPage() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const buscarFuncionarios = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/funcionarios`);

      if (!response.ok) {
        throw new Error(`Erro ao buscar funcionários: ${response.statusText || response.status}`);
      }

      const data = await response.json();

      setFuncionarios(data);
      setError(null);

    } catch (err) {
      console.error("Falha ao carregar funcionários:", err);
      setError("Não foi possível carregar a lista de funcionários. Verifique se a API está em execução.");
      setFuncionarios([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarFuncionarios();
  }, []);

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

      {!loading && !error && funcionarios.length === 0 && (
        <div className="empty-box-func">
          <p>Nenhum funcionário encontrado no banco de dados.</p>
        </div>
      )}

      {!loading && !error && funcionarios.length > 0 && (
        <div className="table-container-func">
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
              {funcionarios.map((funcionario, index) => {
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
    </div>
  );
}

export default FuncionariosPage;
