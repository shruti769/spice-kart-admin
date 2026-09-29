import { useEffect, useRef } from 'react'
import { useBusinessSettings } from '../lib/businessSettings'
import { supabase } from '../lib/supabase'

const EVENTS = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart', 'visibilitychange']
const KEY = 'sk-admin-last-active'

/**
 * Settings → Security → Session timeout: signs the admin out after that many minutes without
 * using the console. Activity in any tab counts (shared through localStorage).
 */
export default function IdleLogout({ v }) {
  const minutes = useBusinessSettings().data?.session_timeout_minutes ?? 0
  const flash = useRef(v.flash)
  useEffect(() => { flash.current = v.flash })

  useEffect(() => {
    if (!minutes) return
    const limit = minutes * 60000
    const mark = () => {
      try { localStorage.setItem(KEY, String(Date.now())) } catch { /* private mode: this tab only */ }
      last = Date.now()
    }
    let last = Date.now()
    mark()
    let throttle = 0
    const onActivity = () => {
      if (Date.now() - throttle < 5000) return
      throttle = Date.now()
      mark()
    }
    for (const e of EVENTS) window.addEventListener(e, onActivity, { passive: true })
    const timer = setInterval(async () => {
      let shared = last
      try { shared = Math.max(last, Number(localStorage.getItem(KEY)) || 0) } catch { /* ignore */ }
      if (Date.now() - shared < limit) return
      clearInterval(timer)
      await supabase.auth.signOut()
      flash.current(`Signed out after ${minutes} minutes without activity`)
    }, 20000)
    return () => {
      for (const e of EVENTS) window.removeEventListener(e, onActivity)
      clearInterval(timer)
    }
  }, [minutes])

  return null
}
