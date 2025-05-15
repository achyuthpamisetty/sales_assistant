import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Using localStorage to persist auth state across reloads
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('auth_token');
  });

  const login = async (username: string, password: string) => {
    // Replace this with real API call
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('auth_token', 'dummy_token');
      setIsAuthenticated(true);
    } else {
      throw new Error('Invalid username or password');
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
  };

  const register = async (username: string, password: string) => {
    // Replace this with real registration API call
    if (username && password) {
      // For demo, just accept any non-empty username/password and login
      localStorage.setItem('auth_token', 'dummy_token');
      setIsAuthenticated(true);
    } else {
      throw new Error('Registration failed: username and password required');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
