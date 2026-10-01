import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

/**
 * 'invite' | 'recovery' when the page was opened from a Supabase invite or password-reset email
 * (read before the client consumes the link's #access_token…&type=…), else null.
 */
export const authLinkType = typeof window === 'undefined' ? null : (/[#&]type=(invite|recovery)\b/.exec(window.location.hash)?.[1] ?? null);

/** False until `.env` has the project URL and publishable key. */
export const isSupabaseConfigured = Boolean(url && key);

if (!isSupabaseConfigured) {
  console.warn('Supabase is not configured: add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to .env and restart the dev server.');
}

// ─── "Remember me for 30 days" ───────────────────────────────────────────────────────────
// Ticked: the session is kept in localStorage and ends 30 days after sign-in.
// Unticked: it's kept in sessionStorage, so closing the tab / browser signs the admin out.
const MODE_KEY = 'sk-admin-session-mode'; // 'remember' | 'session'
const UNTIL_KEY = 'sk-admin-remember-until';
const REMEMBER_DAYS = 30;

const read = (store, k) => { try { return store.getItem(k); } catch { return null; } };
const write = (store, k, val) => { try { store.setItem(k, val); } catch { /* private mode */ } };
const remove = (store, k) => { try { store.removeItem(k); } catch { /* private mode */ } };
const hasWindow = typeof window !== 'undefined';
const keepInTab = () => hasWindow && read(localStorage, MODE_KEY) === 'session';

/** Call just before signing in, with the checkbox value. */
export function setRememberMe(remember) {
  if (!hasWindow) return;
  write(localStorage, MODE_KEY, remember ? 'remember' : 'session');
  if (remember) write(localStorage, UNTIL_KEY, String(Date.now() + REMEMBER_DAYS * 864e5));
  else remove(localStorage, UNTIL_KEY);
}

/** True once a remembered session is past its 30 days. */
export function rememberExpired() {
  if (!hasWindow || keepInTab()) return false;
  const until = Number(read(localStorage, UNTIL_KEY));
  return until > 0 && Date.now() > until;
}

/** Auth storage that follows the remember-me choice (and clears the other store). */
const authStorage = hasWindow ? {
  getItem: (k) => read(keepInTab() ? sessionStorage : localStorage, k),
  setItem: (k, val) => {
    const [keep, drop] = keepInTab() ? [sessionStorage, localStorage] : [localStorage, sessionStorage];
    write(keep, k, val);
    remove(drop, k);
  },
  removeItem: (k) => { remove(localStorage, k); remove(sessionStorage, k); },
} : undefined;

/**
 * Shared Supabase client (same project as the mobile app). Admin writes will go through
 * Supabase Auth + Row Level Security, so only the publishable key is ever used here.
 */
export const supabase = createClient(url || 'https://placeholder.supabase.co', key || 'placeholder-key', {
  auth: { storage: authStorage },
});

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
