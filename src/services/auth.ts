import { supabase } from './supabaseClient';

export async function registerUser(firstName: string, lastName: string, email: string, password: string) {
  // Check if user already registered (profile exists)
  const { data: existingProfile, error: fetchError } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', email)
    .single();

  if (existingProfile) {
    throw new Error('User already registered');
  }

  // Sign up user via Supabase auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { first_name: firstName, last_name: lastName },
    },
  });

  if (error) throw error;

  // Insert user profile linked to auth user id
  if (data.user) {
    const { error: insertError } = await supabase
      .from('profiles')
      .insert([{ id: data.user.id, first_name: firstName, last_name: lastName }]);

    if (insertError) throw insertError;
  }

  // Supabase automatically sends verification email
  return data.user;
}

export async function loginUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  if (!data.user?.email_confirmed_at) {
    throw new Error('Please verify your email before logging in');
  }

  return data.user;
}
