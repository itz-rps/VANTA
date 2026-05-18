import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Lazy initialization if keys are missing initially
let supabaseClient: any = null;

export function getSupabase() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase keys are missing. Some features might not work.");
    return null;
  }
  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseClient;
}
