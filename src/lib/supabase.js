import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

/** False until `.env` has the project URL and publishable key. */
export const isSupabaseConfigured = Boolean(url && key);

if (!isSupabaseConfigured) {
  console.warn('Supabase is not configured: add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to .env and restart the dev server.');
}

/**
 * Shared Supabase client (same project as the mobile app). Admin writes will go through
 * Supabase Auth + Row Level Security, so only the publishable key is ever used here.
 */
export const supabase = createClient(url || 'https://placeholder.supabase.co', key || 'placeholder-key');

/** Dev helper: resolves to a short status message confirming the URL and key are valid. */
export async function checkSupabaseConnection() {
  if (!isSupabaseConfigured) return 'Supabase: not configured';
  try {
    // /auth/v1/settings rejects an invalid key (401), so this validates both URL and key.
    const res = await fetch(`${url}/auth/v1/settings`, { headers: { apikey: key } });
    return res.ok ? 'Supabase: connected' : `Supabase: responded ${res.status} (check the URL and key)`;
  } catch {
    return 'Supabase: unreachable (check the URL / network)';
  }
}
