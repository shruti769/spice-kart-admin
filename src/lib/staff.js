import { useCallback, useEffect, useRef, useState } from 'react'
import { isSupabaseConfigured, supabase } from './supabase'
import { useRealtime } from './notifications'

// Staff & admins (schema: supabase/admin_data.sql; invites: supabase/functions/invite-admin).
// Roles are labels only for now: every active admin can use the whole console.

export const ROLES = ['Super Admin', 'Operations Manager', 'Inventory Manager', 'Order Manager', 'Customer Support', 'Content Manager']

/** [label, fg, bg] per admins.status. */
export const STAFF_STATUS_PILL = {
  active: ['Active', '#0B6B33', '#E9F6E3'],
  inactive: ['Inactive', '#5F6B62', '#EEF0EC'],
  invited: ['Pending', '#8A6100', '#FBF1DE'],
}

export const NOT_DEPLOYED = 'Deploy the invite-admin function first — see supabase/NOTIFICATIONS_SETUP.md (step 8)'

function friendly(error) {
  const msg = error?.message || ''
  if (error.code === 'PGRST202' || error.code === '42883' || error.code === '42703' || error.code === 'PGRST204') {
    return new Error('Staff profiles aren’t set up yet · run supabase/admin_data.sql in the Supabase SQL Editor')
  }
  if (error.code === '23514' && /violates check constraint/.test(msg)) return new Error('That role or status isn’t allowed')
  if (error.code === '42501') return new Error('You don’t have permission to do that')
  return error instanceof Error ? error : new Error(msg || 'Unknown error')
}

/** Current time in ms, ticking every `ms`. */
export function useNow(ms = 30000) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), ms)
    return () => clearInterval(t)
  }, [ms])
  return now
}

/** staff_list() rows, live (admins table) + re-read every minute for last-active times. */
export function useStaff() {
  const [state, setState] = useState(() => ({ status: isSupabaseConfigured ? 'loading' : 'off', rows: [], error: '' }))
  const [version, setVersion] = useState(0)
  const refetch = useCallback(() => setVersion((n) => n + 1), [])
  const timer = useRef(null)
  useRealtime(['admins'], () => {
    clearTimeout(timer.current)
    timer.current = setTimeout(refetch, 300)
  })
  useEffect(() => () => clearTimeout(timer.current), [])
  useEffect(() => {
    if (!isSupabaseConfigured) return
    const t = setInterval(refetch, 60000)
    return () => clearInterval(t)
  }, [refetch])
  useEffect(() => {
    if (!isSupabaseConfigured) return
    let cancelled = false
    supabase.rpc('staff_list').then(({ data, error }) => {
      if (cancelled) return
      if (error) setState((st) => ({ status: 'error', rows: st.rows, error: friendly(error).message }))
      else setState({ status: 'ready', rows: data ?? [], error: '' })
    })
    return () => { cancelled = true }
  }, [version])
  return { ...state, loading: state.status === 'loading', refetch }
}

/** The signed-in admin's user id (null until known). */
export function useMyUserId() {
  const [id, setId] = useState(null)
  useEffect(() => {
    if (!isSupabaseConfigured) return
    let cancelled = false
    supabase.auth.getSession().then(({ data }) => { if (!cancelled) setId(data.session?.user?.id ?? null) })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => setId(session?.user?.id ?? null))
    return () => { cancelled = true; sub.subscription.unsubscribe() }
  }, [])
  return id
}

// ═══ Actions ═════════════════════════════════════════════════════════════════════════════
/** Invites (or re-invites) through the invite-admin Edge Function. Returns { ok, status: 'invited' | 'active' }. */
export async function inviteStaff({ email, name, role, department, resend = false }) {
  const { data, error } = await supabase.functions.invoke('invite-admin', {
    body: { email, name, role, department, redirectTo: `${window.location.origin}/`, ...(resend ? { resend: true } : null) },
  })
  if (error) {
    const res = error.context
    let msg = ''
    let code = ''
    if (res && typeof res.json === 'function') {
      try {
        const body = await res.clone().json()
        msg = body?.error || ''
        code = body?.code || ''
      } catch { /* not JSON */ }
      if (!msg && (res.status === 404 || code === 'NOT_FOUND')) throw new Error(NOT_DEPLOYED)
    } else if (error.name === 'FunctionsFetchError' || error.name === 'FunctionsRelayError') {
      throw new Error(NOT_DEPLOYED)
    }
    if (resend && /already on the team/i.test(msg)) {
      throw new Error('The deployed invite-admin function can’t resend invites yet · they already have a pending invite (ask them to check their inbox and spam folder)')
    }
    throw new Error(msg || error.message || 'Couldn’t send the invite')
  }
  if (data?.error) throw new Error(data.error)
  return data ?? { ok: true }
}

/** Updates name / role / department / status. The database refuses deactivating yourself or the last Super Admin. */
export async function updateStaff(userId, patch) {
  const { data, error } = await supabase.from('admins').update(patch).eq('user_id', userId).select('user_id')
  if (error) throw friendly(error)
  if (!data?.length) throw new Error('This team member no longer exists or you don’t have permission to change them')
}

/** Removes admin access (their login account stays). You can't remove yourself. */
export async function removeStaff(userId) {
  const { data, error } = await supabase.from('admins').delete().eq('user_id', userId).select('user_id')
  if (error) throw friendly(error)
  if (!data?.length) throw new Error('Couldn’t remove them · you can’t remove yourself, or they were already removed')
}

// ═══ Display ═════════════════════════════════════════════════════════════════════════════
export const staffInitials = (name, email) => {
  const src = (name || '').trim() || (email || '').split('@')[0]
  const parts = src.split(/[\s._-]+/).filter(Boolean)
  return ((parts.length > 1 ? parts[0][0] + parts[1][0] : src.slice(0, 2)) || '?').toUpperCase()
}

const startOfDay = (ms) => { const d = new Date(ms); d.setHours(0, 0, 0, 0); return d.getTime() }

/** When they last used the admin: staff_list().last_active_at, else last sign-in. */
export const lastActiveAt = (s) => s.last_active_at ?? s.last_sign_in_at ?? null

/** "Now", "12 min ago", "3 hrs ago", "Yesterday", "4 days ago", "2 weeks ago", "3 Aug 2026", "Never" */
export function lastActiveLabel(iso, now) {
  if (!iso) return 'Never'
  const t = new Date(iso).getTime()
  const mins = Math.max(0, (now - t) / 60000)
  if (mins < 5) return 'Now'
  if (mins < 60) return `${Math.floor(mins)} min ago`
  const today = startOfDay(now)
  if (t >= today) { const h = Math.floor(mins / 60); return `${h} hr${h === 1 ? '' : 's'} ago` }
  const days = Math.round((today - startOfDay(t)) / 864e5)
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  if (days < 35) { const w = Math.floor(days / 7); return `${w} week${w === 1 ? '' : 's'} ago` }
  return new Date(t).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
}

/** Headline numbers for the Staff cards. */
export function staffStats(rows, now) {
  const today = startOfDay(now)
  const d = new Date(now)
  const monthStart = new Date(d.getFullYear(), d.getMonth(), 1).getTime()
  return {
    total: rows.length,
    invitedThisMonth: rows.filter((s) => s.invited_at && new Date(s.invited_at).getTime() >= monthStart).length,
    activeToday: rows.filter((s) => s.status === 'active' && lastActiveAt(s) && new Date(lastActiveAt(s)).getTime() >= today).length,
    rolesInUse: new Set(rows.map((s) => s.role)).size,
    pending: rows.filter((s) => s.status === 'invited').length,
  }
}
