import { useEffect, useRef } from 'react'
import { isSupabaseConfigured, supabase } from './supabase'

// A sound and a toast when a new paid order arrives, from the `order:new:<id>` alert the database
// raises (see the app repo's new_order_alerts migration). Browsers only allow sound after the page
// has been clicked once, so the audio is unlocked on the first click after opening the panel.

let audio = null

function unlock() {
  const Ctx = window.AudioContext || window.webkitAudioContext
  if (!Ctx) return
  audio ??= new Ctx()
  if (audio.state === 'suspended') audio.resume()
}

/** Two short rising beeps, played three times. */
function chime() {
  if (!audio || audio.state !== 'running') return
  const start = audio.currentTime
  for (let round = 0; round < 3; round++) {
    [660, 880].forEach((hz, i) => {
      const at = start + round * 0.8 + i * 0.2
      const osc = audio.createOscillator()
      const gain = audio.createGain()
      osc.frequency.value = hz
      gain.gain.setValueAtTime(0.0001, at)
      gain.gain.exponentialRampToValueAtTime(0.4, at + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.18)
      osc.connect(gain).connect(audio.destination)
      osc.start(at)
      osc.stop(at + 0.2)
    })
  }
}

/** While `enabled` (an admin is signed in), play the sound and show `flash` for each new order. */
export function useNewOrderAlert(enabled, flash) {
  const onAlert = useRef(flash)
  useEffect(() => { onAlert.current = flash })

  useEffect(() => {
    window.addEventListener('pointerdown', unlock)
    return () => window.removeEventListener('pointerdown', unlock)
  }, [])

  useEffect(() => {
    if (!enabled || !isSupabaseConfigured) return
    const ch = supabase
      .channel('admin-new-orders')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'admin_alerts' }, ({ new: alert }) => {
        if (!alert.dedup_key?.startsWith('order:new:')) return
        chime()
        onAlert.current?.(alert.title)
      })
      .subscribe()
    return () => { supabase.removeChannel(ch) }
  }, [enabled])
}
