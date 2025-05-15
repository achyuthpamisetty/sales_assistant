import React, { useState } from 'react';
import { loginUser } from './auth'; // Your auth.ts file
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await loginUser(email, password);
      navigate('/'); // or wherever you want to redirect
    } catch (err: any) {
      console.error('Login error:', err);
      const message =
        err?.message ||
        err?.error_description ||
        'Invalid email or password';
      setError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        placeholder="Email" 
        required 
      />
      <input 
        type="password" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
        placeholder="Password" 
        required 
      />
      <button type="submit">Login</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default LoginPage;
