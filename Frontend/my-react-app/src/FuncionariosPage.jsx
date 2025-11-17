import React, { useState, useEffect } from 'react';

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
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-2">👥 Meus Funcionários</h1>

      {loading && (
        <p className="text-center text-xl text-blue-600 mt-8">Carregando funcionários...</p>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4 shadow-lg" role="alert">
          <strong className="font-bold">🚨 Erro de Conexão:</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      )}

      {!loading && !error && funcionarios.length === 0 && (
        <div className="text-center bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-8 rounded-lg mt-8 shadow-lg">
          <p className="text-lg font-medium">Nenhum funcionário encontrado no banco de dados.</p>
        </div>
      )}

      {!loading && !error && funcionarios.length > 0 && (
        <div className="overflow-x-auto shadow-xl rounded-lg mt-8">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Cargo</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Telefone</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">ID Gerente</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {funcionarios.map((funcionario, index) => (
                <tr key={funcionario.id_funcionario || index} className="hover:bg-blue-50 transition duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {funcionario.id_funcionario}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {funcionario.nome}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${funcionario.cargo === 'Gerente' ? 'bg-indigo-100 text-indigo-800' :
                      funcionario.cargo.includes('Cozinheir') ? 'bg-yellow-100 text-yellow-800' :
                      funcionario.cargo === 'Barman' ? 'bg-purple-100 text-purple-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {funcionario.cargo}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {funcionario.telefone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {funcionario.id_gerente || 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default FuncionariosPage;