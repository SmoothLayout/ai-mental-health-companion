import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vnzrdhljbiwahoajzqyc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZuenJkaGxqYml3YWhvYWp6cXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyODEyMTksImV4cCI6MjA5ODg1NzIxOX0.bJWNYYGlWR6_mgs09j53GKYZ-i8OsE0RleNjo3zGVVM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
});
