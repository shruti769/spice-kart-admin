import { useCallback, useEffect, useState } from 'react'
import { isSupabaseConfigured, supabase } from './supabase'

// Announcements live in `public.announcements` (admins: full CRUD). The customer app reads
// active announcements whose dates include today. Schema: supabase/announcements.sql.

export const AUDIENCES = [
  ['all', 'All customers'],
  ['new', 'New customers'],
  ['frequent', 'Frequent customers'],
]
export const audienceLabel = (a) => AUDIENCES.find(([k]) => k === a)?.[1] ?? a

/** [key, label, dot colour, preview background] */
export const TYPES = [
  ['info', 'Info', '#2F4F9E', '#EEF2FB'],
  ['promo', 'Promo', '#2E7D32', '#EEF7EA'],
  ['alert', 'Alert', '#B26A00', '#FDF3E3'],
]
export const typeMeta = (t) => TYPES.find(([k]) => k === t) ?? TYPES[0]

export const PLACEMENTS = [
  ['top_bar', 'Top bar'],
  ['popup', 'Popup'],
]
export const placementLabel = (p) => PLACEMENTS.find(([k]) => k === p)?.[1] ?? p

/** Screens a tap can open (stored as 'page:<name>'); categories are 'category:<id>'. */
export const LINK_PAGES = ['Offers page', 'Wallet', 'Delivery slots']

const todayMelbourne = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Australia/Melbourne' })

/** 'paused' | 'scheduled' | 'expired' | 'live' */
export function announcementStatus(a, today = todayMelbourne()) {
  if (!a.active) return 'paused'
  if (a.starts_on && a.starts_on > today) return 'scheduled'
  if (a.ends_on && a.ends_on < today) return 'expired'
  return 'live'
}

/** [label, fg, bg] for a status pill. */
export const STATUS_PILL = {
  live: ['Live', '#0B6B33', '#E9F6E3'],
  scheduled: ['Scheduled', '#8A6100', '#FBF1DE'],
  paused: ['Paused', '#5F6B62', '#EEF0EC'],
  expired: ['Expired', '#A93826', '#FAEDEA'],
}

// ─── Change notifications: every mounted useAnnouncements() refetches after a write ──────
const listeners = new Set()
let cache = null
export function notifyAnnouncementsChanged() {
  listeners.forEach((fn) => fn())
}

function friendly(error) {
  if (error.code === '42P01' || error.code === 'PGRST205') return new Error('The announcements table doesn’t exist yet · run supabase/announcements.sql in the Supabase SQL Editor')
  if (error.code === '23514') return new Error('Some values aren’t allowed · check the message and dates')
  if (error.code === '42501') return new Error('You don’t have permission to change announcements')
  return error instanceof Error ? error : new Error(error.message || 'Unknown error')
}

export async function fetchAnnouncements() {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw friendly(error)
  return data ?? []
}

/**
 * All announcements: `{ status, rows, error, loading, refetch }`. `status` is
 * 'off' | 'loading' | 'error' | 'ready'; `rows` keeps the last good data while refetching.
 */
export function useAnnouncements() {
  const [state, setState] = useState(() => (
    isSupabaseConfigured
      ? { status: cache ? 'ready' : 'loading', rows: cache ?? [], error: '' }
      : { status: 'off', rows: [], error: '' }
  ))
  const [version, setVersion] = useState(0)
  const refetch = useCallback(() => setVersion((n) => n + 1), [])

  useEffect(() => {
    listeners.add(refetch)
    return () => { listeners.delete(refetch) }
  }, [refetch])

  useEffect(() => {
    if (!isSupabaseConfigured) return
    let cancelled = false
    fetchAnnouncements()
      .then((rows) => {
        cache = rows
        if (!cancelled) setState({ status: 'ready', rows, error: '' })
      })
      .catch((e) => {
        if (!cancelled) setState((st) => ({ status: 'error', rows: st.rows, error: e?.message || 'Unknown error' }))
      })
    return () => { cancelled = true }
  }, [version])

  return { ...state, loading: state.status === 'loading', refetch }
}

// ─── Writes ──────────────────────────────────────────────────────────────────────────────
export async function createAnnouncement(row) {
  try {
    const { data, error } = await supabase.from('announcements').insert(row).select().single()
    if (error) throw friendly(error)
    return data
  } finally {
    notifyAnnouncementsChanged()
  }
}

export async function updateAnnouncement(id, patch) {
  try {
    const { data, error } = await supabase.from('announcements').update(patch).eq('id', id).select()
    if (error) throw friendly(error)
    if (!data?.length) throw new Error('This announcement no longer exists or you don’t have permission to change it')
    return data[0]
  } finally {
    notifyAnnouncementsChanged()
  }
}

export async function deleteAnnouncement(id) {
  try {
    const { data, error } = await supabase.from('announcements').delete().eq('id', id).select('id')
    if (error) throw friendly(error)
    if (!data?.length) throw new Error('This announcement no longer exists or you don’t have permission to delete it')
  } finally {
    notifyAnnouncementsChanged()
  }
}
