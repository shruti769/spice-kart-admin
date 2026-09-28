// Weekly delivery-slot schedule helpers. Dates are local 'YYYY-MM-DD' strings.

export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
export const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const fmtTime = (mins) => {
  const h = Math.floor(mins / 60), m = mins % 60
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 || h === 24 ? 'AM' : 'PM'}`
}

export const toISO = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
export const fromISO = (s) => {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}
export const todayISO = () => toISO(new Date())

// 'Mon' … 'Sun' for a date string.
export const weekdayOf = (iso) => DAYS[(fromISO(iso).getDay() + 6) % 7]

export const fmtDate = (iso, withYear = false) =>
  fromISO(iso).toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short', ...(withYear && { year: 'numeric' }) })
export const fmtShort = (iso) => fromISO(iso).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })

// Dates from today up to `windowDays` days ahead (both included) that fall on `day` — same rule as
// the customer app's checkout.
export const datesInWindow = (day, windowDays) => {
  const out = []
  const d = new Date()
  for (let i = 0; i <= windowDays; i++) {
    if (DAYS[(d.getDay() + 6) % 7] === day) out.push(toISO(d))
    d.setDate(d.getDate() + 1)
  }
  return out
}

// Next date (today included) that falls on `day`.
export const nextDateFor = (day) => {
  const d = new Date()
  while (DAYS[(d.getDay() + 6) % 7] !== day) d.setDate(d.getDate() + 1)
  return toISO(d)
}
