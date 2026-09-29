import { createClient } from '@supabase/supabase-js'
import { useCallback, useEffect, useState } from 'react'
import { isSupabaseConfigured, supabase } from './supabase'
import { useRealtime } from './notifications'

// Settings → Delivery minimum, Payments & tax, Notifications, Store hours, Security.
// One row of `public.business_settings` (schema + enforcement: supabase/business_settings.sql).

export const CARD_BRANDS = [['visa', 'Visa'], ['mastercard', 'Mastercard'], ['amex', 'Amex']]
export const WALLETS = [['accept_apple_pay', 'Apple Pay'], ['accept_google_pay', 'Google Pay'], ['accept_payid', 'PayID']]
export const TIMEOUTS = [[0, 'Off'], [15, '15 minutes'], [30, '30 minutes'], [60, '1 hour'], [120, '2 hours'], [480, '8 hours']]

function friendly(error) {
  if (error.code === '42P01' || error.code === 'PGRST205' || error.code === 'PGRST202') {
    return new Error('These settings aren’t set up yet · run supabase/business_settings.sql in the Supabase SQL Editor')
  }
  if (error.code === '42501') return new Error('You don’t have permission to change settings')
  return error instanceof Error ? error : new Error(error.message || 'Unknown error')
}

/** The settings row: `{ status, data, error, loading, refetch }`, live. */
export function useBusinessSettings() {
  const [state, setState] = useState(() => ({ status: isSupabaseConfigured ? 'loading' : 'off', data: null, error: '' }))
  const [version, setVersion] = useState(0)
  const refetch = useCallback(() => setVersion((n) => n + 1), [])
  useRealtime(['business_settings'], refetch)
  useEffect(() => {
    if (!isSupabaseConfigured) return
    let cancelled = false
    supabase.from('business_settings').select('*').maybeSingle().then(({ data, error }) => {
      if (cancelled) return
      if (error) setState((st) => ({ status: 'error', data: st.data, error: friendly(error).message }))
      else setState({ status: data ? 'ready' : 'error', data, error: data ? '' : 'No settings row · run supabase/business_settings.sql' })
    })
    return () => { cancelled = true }
  }, [version])
  return { ...state, loading: state.status === 'loading', refetch }
}

export async function updateBusinessSettings(patch) {
  const { data, error } = await supabase.from('business_settings').update(patch).eq('id', true).select()
  if (error) throw friendly(error)
  if (!data?.length) throw new Error('Couldn’t save settings · you may not have admin access from this device')
  return data[0]
}

/** Public config (works signed out): `{ open_now, hours, allow_google_sso, … }` or null. */
export async function fetchStoreConfig() {
  if (!isSupabaseConfigured) return null
  const { data, error } = await supabase.rpc('store_config')
  return error ? null : data
}

/** `{ is_admin_row, ip, ip_allowed, require_2fa, aal, session_timeout_minutes }` or null before the SQL runs. */
export async function fetchAccessStatus() {
  const { data, error } = await supabase.rpc('admin_access_status')
  return error ? null : data
}

/** Email / SMS / Slack queue over the last 7 days, live. */
export function useOutboundSummary() {
  const [data, setData] = useState(null)
  const [version, setVersion] = useState(0)
  useRealtime(['outbound_messages'], () => setVersion((n) => n + 1))
  useEffect(() => {
    if (!isSupabaseConfigured) return
    let cancelled = false
    const since = new Date(Date.now() - 7 * 864e5).toISOString()
    supabase.from('outbound_messages').select('channel, status, error, created_at').gte('created_at', since).order('created_at', { ascending: false }).limit(500)
      .then(({ data: rows, error }) => {
        if (cancelled || error) return
        const by = {}
        for (const r of rows) {
          const c = (by[r.channel] ||= { sent: 0, failed: 0, pending: 0, lastError: null })
          if (r.status === 'sent') c.sent++
          else if (r.status === 'failed') { c.failed++; c.lastError ||= r.error }
          else c.pending++
        }
        setData(by)
      })
    return () => { cancelled = true }
  }, [version])
  return data
}

// ─── Account security (Supabase Auth) ────────────────────────────────────────────────────
/** Checks `password` without touching the current session (a throwaway client). */
async function passwordIsCorrect(email, password) {
  const probe = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false, storageKey: 'sk-password-check' },
  })
  const { error } = await probe.auth.signInWithPassword({ email, password })
  if (!error) await probe.auth.signOut({ scope: 'local' })
  return !error
}

export async function changePassword(current, next) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.email) throw new Error('Sign in again to change your password')
  if (!(await passwordIsCorrect(user.email, current))) throw new Error('Your current password is wrong')
  const { error } = await supabase.auth.updateUser({ password: next })
  if (error) throw error
  await supabase.auth.signOut({ scope: 'others' })
}

/** This admin's login sessions, newest first. */
export async function fetchMySessions() {
  const { data, error } = await supabase.rpc('my_sessions')
  if (error) throw friendly(error)
  return data ?? []
}

export async function signOutOtherSessions() {
  const { error } = await supabase.auth.signOut({ scope: 'others' })
  if (error) throw error
}

// ─── Two-factor (TOTP authenticator app) ─────────────────────────────────────────────────
export async function listTotpFactors() {
  const { data, error } = await supabase.auth.mfa.listFactors()
  if (error) throw error
  return data?.totp ?? []
}

/** Starts enrolment: `{ id, qr, secret }` (qr is an SVG data URL). Clears unfinished attempts first. */
export async function startTotpEnrollment() {
  const { data: factors } = await supabase.auth.mfa.listFactors()
  for (const f of factors?.all ?? []) {
    if (f.factor_type === 'totp' && f.status === 'unverified') await supabase.auth.mfa.unenroll({ factorId: f.id })
  }
  const { data, error } = await supabase.auth.mfa.enroll({ factorType: 'totp', friendlyName: `Spice Kart admin ${new Date().toISOString().slice(0, 10)}` })
  if (error) throw error
  return { id: data.id, qr: data.totp.qr_code, secret: data.totp.secret }
}

/** Verifies a 6-digit code for `factorId` (finishes enrolment or signs in to aal2). */
export async function verifyTotp(factorId, code) {
  const { error } = await supabase.auth.mfa.challengeAndVerify({ factorId, code })
  if (error) throw new Error(/invalid|expired/i.test(error.message) ? 'That code didn’t work · check your authenticator app and try again' : error.message)
}

export async function removeTotp(factorId) {
  const { error } = await supabase.auth.mfa.unenroll({ factorId })
  if (error) throw new Error(/aal2/i.test(error.message) ? 'Sign in with your authenticator code first, then remove it' : error.message)
}

/**
 * After a password / Google sign-in: what the admin must do next.
 * 'ok' | 'mfa' (verify a code) | 'enroll' (2FA required but not set up) | { blocked: message }
 */
export async function nextSignInStep() {
  const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
  const access = await fetchAccessStatus()
  if (access && !access.ip_allowed) return { blocked: `Admin access isn’t allowed from this network (${access.ip || 'unknown IP'}) · ask another admin to add it to the IP allowlist` }
  if (aal?.nextLevel === 'aal2' && aal.currentLevel !== 'aal2') return 'mfa'
  if (access?.require_2fa && aal?.currentLevel !== 'aal2') return 'enroll'
  return 'ok'
}
