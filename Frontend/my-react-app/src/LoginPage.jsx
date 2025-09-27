import React, { useState } from 'react';
import './LoginPage.css'; // VERIFIQUE: Deve corresponder ao novo nome do arquivo CSS
import { useNavigate } from 'react-router-dom';


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault(); // Impede que a página recarregue

    const adminEmail = 'admin@bardosom.com';
    const adminPassword = 'senhaforte123';

    if (email === adminEmail && password === adminPassword) {
      // Se o login for bem-sucedido, redireciona para o dashboard
      navigate('/dashboard');
    } else {
      alert('Email ou senha incorretos. Tente novamente.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-art-section">      </div>
      <div className="login-form-section">
        <div className="form-wrapper">
          <h2>Bem-vindo ao Bar do Som!</h2>
          <p>Por favor, entre na sua conta para começar.</p>
          
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required // Adiciona validação básica para não deixar o campo em branco
              />
            </div>
            <div className="input-group">
              <div className="label-wrapper">
                <label htmlFor="password">Senha</label>
                <a href="#" className="forgot-password">Esqueceu a senha?</a>
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required // Adiciona validação básica
              />
            </div>
            <div className="remember-me-group">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Lembrar-me</label>
            </div>
            <button type="submit" className="login-button">
              LOGIN
            </button>
          </form>

          <div className="test-credentials">
            <p><strong>Para teste (Admin):</strong></p>
            <p><strong>Email:</strong> admin@bardosom.com</p>
            <p><strong>Senha:</strong> senhaforte123</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LoginPage;