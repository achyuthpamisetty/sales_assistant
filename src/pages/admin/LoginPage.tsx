import React, { useState } from 'react';
import { loginUser } from './auth'; // your auth.ts file
import { useAuth } from './context/AuthContext'; // or wherever your auth context is

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    try {
      await loginUser(email, password);
      // Or if you use context login method: await login(email, password);
      // Redirect or do whatever after login success
    } catch (error: any) {
      // Show error message to user
      setErrorMsg(error.message || 'Invalid login credentials');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {errorMsg && (
          <div className="error-message text-red-600 my-2">
            {errorMsg}
          </div>
        )}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
