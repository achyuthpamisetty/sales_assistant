import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  verifyEmail: (code: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const { data: { user }, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName
          }
        }
      });

      if (error) throw error;

      if (user) {
        // Generate a 6-digit verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Store verification code in database
        const { error: dbError } = await supabase
          .from('user_verification')
          .insert({
            user_id: user.id,
            verification_code: verificationCode,
            expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours expiry
          });

        if (dbError) throw dbError;

        // Send verification email using Edge Function
        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-verification`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            code: verificationCode,
            firstName
          })
        });

        if (!response.ok) throw new Error('Failed to send verification email');

        navigate('/auth/verify');
      }
    } catch (error: any) {
      console.error('Registration error:', error.message);
      throw new Error(error.message);
    }
  };

  const verifyEmail = async (code: string) => {
    try {
      const { data, error } = await supabase
        .from('user_verification')
        .update({ verified: true })
        .match({ user_id: user?.id, verification_code: code })
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('Invalid verification code');

      navigate('/');
    } catch (error: any) {
      console.error('Verification error:', error.message);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // First check if the user exists
      const { data: existingUser, error: userError } = await supabase
        .from('user_verification')
        .select('user_id')
        .eq('user_id', user?.id)
        .single();

      if (!existingUser) {
        throw new Error('Invalid credentials');
      }

      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw new Error('Invalid credentials');
      }

      if (user) {
        // Check if email is verified
        const { data: verification, error: verificationError } = await supabase
          .from('user_verification')
          .select('verified')
          .eq('user_id', user.id)
          .single();

        if (verificationError) throw verificationError;

        if (!verification?.verified) {
          throw new Error('Please verify your email before logging in');
        }

        navigate('/');
      }
    } catch (error: any) {
      console.error('Login error:', error.message);
      throw error;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, register, verifyEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};