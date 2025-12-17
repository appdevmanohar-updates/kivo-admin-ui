import { createClient } from '@supabase/supabase-js';

// Access import.meta.env directly. Vite replaces this string statically at build/serve time.
// @ts-ignore: Suppress TS error if vite-env.d.ts is missing
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// @ts-ignore: Suppress TS error if vite-env.d.ts is missing
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Admin features will fallback to sample data.');
}

export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder');