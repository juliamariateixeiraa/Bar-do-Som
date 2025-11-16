import React, { useState } from 'react';

// O endpoint do PedidoController é /pedidos
const API_BASE = 'http://localhost:8080';

function PedidosPage() {
    // Estados para os campos do formulário
    const [idCliente, setIdCliente] = useState('');
    const [total, setTotal] = useState('');
    const [idProduto, setIdProduto] = useState(''); // Simplificação para teste
    const [quantidade, setQuantidade] = useState(''); // Simplificação para teste
    
    const [loading, setLoading] = useState(false);
    const [resultado, setResultado] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!idCliente || !total || !idProduto || !quantidade) {
            setResultado({ erro: 'Por favor, preencha todos os campos.' });
            return;
        }

        setLoading(true);
        setResultado(null);

        // Constrói o corpo da requisição conforme a classe CheckoutRequest do Controller
        const checkoutRequest = {
            idCliente: parseInt(idCliente),
            total: parseFloat(total),
            itens: [
                {
                    idProduto: parseInt(idProduto),
                    quantidade: parseInt(quantidade)
                }
            ]
        };

        try {
            const response = await fetch(`${API_BASE}/pedidos/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(checkoutRequest),
            });

            // O Controller retorna uma String de sucesso ou erro (ResponseEntity<String>)
            const data = await response.text(); 
            
            if (!response.ok) {
                throw new Error(data || "Erro desconhecido ao realizar checkout.");
            }

            // Sucesso: Trigger disparado!
            setResultado({ sucesso: true, mensagem: data });
            
            // Limpa os campos após o sucesso
            setIdCliente('');
            setTotal('');
            setIdProduto('');
            setQuantidade('');


        } catch (error) {
            setResultado({ erro: error.message || "Erro de rede/servidor." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pedidos-container p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
                Criar Novo Pedido (Teste de Trigger 🛒)
            </h1>
            <p className="text-gray-600 mb-8">
                Preencha os dados (usando IDs válidos de Cliente e Produto) para realizar o checkout e **disparar o Trigger de log**.
            </p>
            
            <form onSubmit={handleSubmit} className="pedido-form max-w-lg bg-white p-8 rounded-xl shadow-lg">
                
                <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Dados do Pedido</h2>
                <div className="space-y-4">
                    <input 
                        type="number" 
                        placeholder="ID do Cliente (Válido)" 
                        value={idCliente}
                        onChange={(e) => setIdCliente(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input 
                        type="number" 
                        placeholder="Total do Pedido (Ex: 37.00)" 
                        step="0.01"
                        value={total}
                        onChange={(e) => setTotal(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                
                <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-4 border-b pb-2">Item (Simplificado para Teste)</h2>
                <p className="text-sm text-gray-500 mb-4">Insira apenas um item para simplificar o teste de log.</p>
                <div className="space-y-4">
                    <input 
                        type="number" 
                        placeholder="ID do Produto (Válido)" 
                        value={idProduto}
                        onChange={(e) => setIdProduto(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input 
                        type="number" 
                        placeholder="Quantidade" 
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                
                <button 
                    type="submit" 
                    disabled={loading}
                    className={`mt-6 w-full py-3 px-4 font-semibold rounded-lg text-white transition duration-200 ${
                        loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 shadow-md'
                    }`}
                >
                    {loading ? 'Processando...' : 'Realizar Checkout e Disparar Trigger'}
                </button>
            </form>
            
            {/* Bloco de Resultado */}
            {resultado && (
                <div className={`mt-8 p-4 rounded-lg shadow-md ${resultado.sucesso ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-red-100 border border-red-400 text-red-700'}`}>
                    <h3 className="font-bold mb-1">{resultado.sucesso ? '✅ Sucesso!' : '❌ Falha!'}</h3>
                    <p className="whitespace-pre-wrap">{resultado.mensagem || resultado.erro}</p>
                    {resultado.erro && <small className="block mt-2">Verifique se o ID do Cliente/Produto existe e se o Backend está rodando.</small>}
                </div>
            )}
        </div>
    );
}

export default PedidosPage;