// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vqdqcgzbnbwusedlmere.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxZHFjZ3pibmJ3dXNlZGxtZXJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2ODY0MjcsImV4cCI6MjA2MjI2MjQyN30.4hQCHvlq5fnPxOFly_Eu6BIUSG1Xd1TlRs5r2MNCn1A';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
