import React, { useState } from 'react';
import { loginUser } from '../services/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      alert('Login successful!');
      // Redirect user to protected page here
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        required
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        required
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
