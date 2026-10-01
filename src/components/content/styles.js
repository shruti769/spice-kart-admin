// Shared look for the Content tabs (matches the rest of the admin's inline styles).

export const FONT = 'Inter,system-ui,sans-serif'
export const INK = '#17201A'
export const MUTED = '#7C8A81'
export const BORDER = '#E4E7E2'
export const DIVIDER = '#EFF1ED'
export const DANGER = '#B3402F'

export const ellipsis = { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
export const labelStyle = { font: `600 10.5px/1.2 ${FONT}`, letterSpacing: '.4px', color: MUTED, textTransform: 'uppercase', whiteSpace: 'nowrap' }
export const headCell = { ...labelStyle, letterSpacing: '.5px', ...ellipsis }
export const inputStyle = { height: '36px', padding: '0 11px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', font: `500 12.5px/1.2 ${FONT}`, color: INK, outline: 'none', width: '100%', minWidth: '0', boxSizing: 'border-box' }
export const selectStyle = { ...inputStyle, appearance: 'none', WebkitAppearance: 'none', paddingRight: '30px', background: '#fff', cursor: 'pointer' }
export const withError = (style, err) => (err ? { ...style, borderColor: DANGER } : style)
export const errorText = { font: `400 11px/1.3 ${FONT}`, color: DANGER }
export const hintText = { font: `400 11px/1.3 ${FONT}`, color: MUTED }

export const btnSecondary = { display: 'flex', alignItems: 'center', gap: '7px', height: '34px', padding: '0 12px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', color: INK, font: `600 12.5px/1.2 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap' }
export const btnPrimary = { display: 'flex', alignItems: 'center', gap: '7px', height: '34px', padding: '0 13px', border: '0', borderRadius: '8px', background: '#0B3D1F', color: '#fff', font: `600 12.5px/1.2 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap' }
export const iconBtn = { width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${BORDER}`, borderRadius: '7px', background: '#fff', cursor: 'pointer', padding: '0' }

/** [label, fg, bg] status pills. */
export const PILL = {
  live: ['Live', '#0B6B33', '#E9F6E3'],
  scheduled: ['Scheduled', '#8A6100', '#FBF1DE'],
  paused: ['Paused', '#5F6B62', '#EEF0EC'],
  ended: ['Ended', '#5F6B62', '#EEF0EC'],
  expired: ['Expired', '#A93826', '#FAEDEA'],
}

/** Today in Melbourne as 'YYYY-MM-DD' — the clock the read policies use. */
export const todayMelbourne = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Australia/Melbourne' })

const toDate = (iso) => {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number)
  return new Date(y, m - 1, d)
}
/** "28 Sep", "5 Oct 2027" */
export const shortDate = (iso) => {
  const d = toDate(iso)
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', ...(d.getFullYear() === new Date().getFullYear() ? {} : { year: 'numeric' }) })
}
export const money = (n) => `$${Number(n || 0).toFixed(2)}`
