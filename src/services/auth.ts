// src/services/auth.ts
import { supabase } from '../supabaseClient';

export async function registerUser(firstName: string, lastName: string, email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
      emailRedirectTo: `${window.location.origin}/auth/callback` // handle redirect after verification
    },
  });

  if (error) throw error;

  // Supabase auto-sends verification email.
  return data;
}
