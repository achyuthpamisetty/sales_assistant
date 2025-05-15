import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await auth.login(username.trim(), password);
      } else {
        await auth.register(username.trim(), password);
      }
      navigate('/'); // Redirect after successful login/register
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: 10 }}>
          <label htmlFor="username">Username</label><br />
          <input
            id="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            autoComplete="username"
            style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label htmlFor="password">Password</label><br />
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete={isLogin ? "current-password" : "new-password"}
            style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
          />
        </div>

        {error && (
          <p style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>{error}</p>
        )}

        <button type="submit" style={{ padding: '10px 20px' }}>
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      <p style={{ marginTop: 20 }}>
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button
          onClick={() => {
            setError('');
            setIsLogin(!isLogin);
          }}
          style={{
            color: 'blue',
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          {isLogin ? 'Register here' : 'Login here'}
        </button>
      </p>
    </div>
  );
};

export default AuthPage;
