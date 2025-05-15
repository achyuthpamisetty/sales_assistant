import { supabase } from './supabaseClient'; // Your supabase client setup

export async function registerUser(firstName: string, lastName: string, email: string, password: string) {
  // First, check if user already exists (optional, but recommended)
  const { data: existingUser, error: fetchError } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', email)
    .single();

  if (existingUser) {
    throw new Error('User already registered');
  }

  // Sign up user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { firstName, lastName },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  // Insert user profile into 'profiles' table after sign up (if not already handled in signUp metadata)
  await supabase.from('profiles').insert([{ id: data.user?.id, first_name: firstName, last_name: lastName }]);

  // Supabase will send verification email automatically on signUp by default
  return data.user;
}

export async function loginUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw new Error('Invalid credentials or email not verified');
  }

  const user = data.user;
  if (!user?.email_confirmed_at) {
    throw new Error('Please verify your email before logging in.');
  }

  return user;
}


