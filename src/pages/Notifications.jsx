import { useEffect, useMemo, useState } from 'react'
import {
  audienceLabel, campaignStatus, campaignTypeLabel, dateTime, deleteCampaign, sendCampaignNow, useAutomatedStats, useCampaigns,
} from '../lib/notifications'

const FONT = 'Inter,system-ui,sans-serif'
const INK = '#17201A'
const MUTED = '#7C8A81'
const BORDER = '#E4E7E2'
const COLS = 'minmax(0,2.2fr) 1fr 1.1fr 90px 90px 80px 1.1fr 90px 150px'

const btn = { display: 'flex', alignItems: 'center', gap: '7px', height: '34px', padding: '0 12px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', color: INK, font: `600 12.5px/1.2 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap' }
const smallBtn = { height: '28px', padding: '0 9px', border: `1px solid ${BORDER}`, borderRadius: '7px', background: '#fff', color: INK, font: `600 11.5px/1.2 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap' }
const head = { font: `600 10.5px/1.2 ${FONT}`, letterSpacing: '.5px', color: MUTED, textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
const cell = { font: `400 12.5px/1.2 ${FONT}`, color: '#4A564E', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }

const STATUS = {
  draft: ['Draft', '#5F6B62', '#EEF0EC'],
  scheduled: ['Scheduled', '#8A6100', '#FBF1DE'],
  sending: ['Sending', '#2F4F9E', '#EEF2FB'],
  sent: ['Sent', '#0B6B33', '#E9F6E3'],
  cancelled: ['Cancelled', '#A93826', '#FAEDEA'],
}
const TYPE_PILL = { promotional: ['#6A3FA0', '#F2ECFA'], order_update: ['#2F4F9E', '#EEF2FB'], system: ['#5F6B62', '#EEF0EC'] }

const TABS = [
  ['all', 'All campaigns'],
  ['promotional', 'Promotional'],
  ['order_update', 'Order updates'],
  ['system', 'System'],
  ['scheduled', 'Scheduled'],
  ['draft', 'Drafts'],
]
const pct = (n, d) => (d ? `${Math.round((n / d) * 1000) / 10}%` : '–')
const num = (n) => (n == null ? '–' : n.toLocaleString('en-AU'))

function Stat({ label, value, note }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '15px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <span style={{ font: `500 11.5px/1.2 ${FONT}`, color: MUTED }}>{label}</span>
      <span style={{ font: `700 23px/1.2 ${FONT}`, color: INK, letterSpacing: '-.4px' }}>{value}</span>
      <span style={{ font: `400 11px/1.3 ${FONT}`, color: MUTED }}>{note}</span>
    </div>
  )
}

export default function Notifications({ v }) {
  const campaigns = useCampaigns()
  const automated = useAutomatedStats()
  const [tab, setTab] = useState('all')
  const [q, setQ] = useState('')
  const [busy, setBusy] = useState(null)
  // Clock for "Sending" (due) states and the 30-day window; ticks so due campaigns flip on time.
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30000)
    return () => clearInterval(t)
  }, [])

  const all = useMemo(() => campaigns.data ?? [], [campaigns.data])
  const rows = useMemo(() => {
    const t = q.trim().toLowerCase()
    return all.filter((c) => {
      const st = campaignStatus(c, now)
      const tabOk = tab === 'all' || (tab === 'scheduled' ? st === 'scheduled' || st === 'sending' : tab === 'draft' ? st === 'draft' : c.type === tab)
      return tabOk && (!t || `${c.title} ${c.message}`.toLowerCase().includes(t))
    })
  }, [all, tab, q, now])

  // Headline numbers over campaigns sent in the last 30 days.
  const since = now - 30 * 864e5
  const recent = all.filter((c) => c.status === 'sent' && new Date(c.sent_at).getTime() >= since)
  const totals = recent.reduce((t, c) => ({
    recipients: t.recipients + (c.stats?.recipients ?? 0),
    pushed: t.pushed + (c.stats?.pushed ?? 0),
    opened: t.opened + (c.stats?.opened ?? 0),
  }), { recipients: 0, pushed: 0, opened: 0 })
  const next = all.filter((c) => c.status === 'scheduled' && new Date(c.scheduled_at).getTime() > now)
    .sort((a, b) => a.scheduled_at.localeCompare(b.scheduled_at))[0]

  const run = async (id, task, msg) => {
    setBusy(id)
    try {
      const r = await task()
      v.flash(typeof msg === 'function' ? msg(r) : msg)
    } catch (e) {
      v.flash(e.message)
    } finally {
      setBusy(null)
    }
  }
  const sendNow = (c) => {
    if (!window.confirm(`Send “${c.title}” to ${audienceLabel(c.audience).toLowerCase()} now? This can’t be undone.`)) return
    run(c.id, () => sendCampaignNow(c.id), (n) => (n ? `Sent to ${n} customer${n === 1 ? '' : 's'} · push notifications go out within a minute` : 'Sent · no customers matched the audience'))
  }
  const remove = (c) => {
    if (!window.confirm(c.status === 'sent' ? `Delete “${c.title}” from the list? Customers keep it in their inbox.` : `Delete “${c.title}”?`)) return
    run(c.id, () => deleteCampaign(c.id), 'Campaign deleted')
  }
  const duplicate = (c) => v.editCampaign({ ...c, id: '', status: 'draft', scheduled_at: null, sent_at: null, recipients: null })

  let message = null
  if (campaigns.status === 'off') message = 'Supabase keys are missing · add them to .env to load campaigns.'
  else if (campaigns.loading) message = 'Loading campaigns…'
  else if (campaigns.status === 'error' && !campaigns.data) message = campaigns.error
  else if (!rows.length) message = all.length ? 'No campaigns match.' : 'No campaigns yet · use “Create notification” to send your first one.'

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '18px', padding: '24px 26px 2px' }}>
        <span style={{ display: 'flex', flexDirection: 'column', gap: '5px', minWidth: '0' }}>
          <span style={{ font: `700 20px/1.2 ${FONT}`, color: INK, whiteSpace: 'nowrap' }}>Notifications</span>
          <span style={{ font: `400 12.5px/1.2 ${FONT}`, color: MUTED, whiteSpace: 'nowrap' }}>Push campaigns to the Spice Kart app · live</span>
        </span>
        <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '34px', width: '220px', padding: '0 11px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff' }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}><circle cx="9" cy="9" r="6" stroke={MUTED} strokeWidth="1.6" /><path d="M13.4 13.4L18 18" stroke={MUTED} strokeWidth="1.6" strokeLinecap="round" /></svg>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search campaigns…" style={{ border: '0', outline: 'none', background: 'transparent', font: `400 12.5px/1.2 ${FONT}`, color: INK, width: '100%' }} />
          </span>
          <button className="hv1" onClick={v.nav_notifcentre} style={btn}>Back to notification centre</button>
          <button className="hv2" onClick={v.openNotifNew} style={{ ...btn, border: '0', background: '#0B3D1F', color: '#fff' }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none"><path d="M10 4.4v11.2M4.4 10h11.2" stroke="#8BE000" strokeWidth="1.8" strokeLinecap="round" /></svg>
            Create notification
          </button>
        </span>
      </div>
      <div className="ad-scroll" style={{ flex: '1', minHeight: '0', overflowY: 'auto', padding: '20px 26px 30px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
          <Stat label="Notifications sent · 30 days" value={num(totals.recipients)} note={`Across ${recent.length} campaign${recent.length === 1 ? '' : 's'}`} />
          <Stat label="Push delivered" value={pct(totals.pushed, totals.recipients)} note="Reached a device (others are in-app only)" />
          <Stat label="Open rate" value={pct(totals.opened, totals.recipients)} note="Tapped in the app or on the phone" />
          <Stat label="Next scheduled" value={next ? dateTime(next.scheduled_at) : 'None'} note={next ? next.title : `Auto order updates · ${num(automated.data?.total ?? null)} in 30 days`} />
        </div>

        <div style={{ display: 'flex', gap: '2px', borderBottom: `1px solid ${BORDER}` }}>
          {TABS.map(([k, label]) => {
            const on = tab === k
            return (
              <button key={k} onClick={() => setTab(k)} style={{ border: '0', background: 'transparent', padding: '0 12px 10px', font: `600 12.5px/1.2 ${FONT}`, color: on ? '#0B3D1F' : MUTED, borderBottom: `2px solid ${on ? '#0B3D1F' : 'transparent'}`, cursor: 'pointer', whiteSpace: 'nowrap', marginBottom: '-1px' }}>
                {label}
              </button>
            )
          })}
        </div>

        <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: COLS, gap: '12px', padding: '11px 16px', background: '#F6F7F4', borderBottom: `1px solid ${BORDER}` }}>
            {['Campaign', 'Type', 'Audience', 'Recipients', 'Delivered', 'Opened', 'Schedule', 'Status'].map((h) => <span key={h} style={head}>{h}</span>)}
            <span style={{ ...head, textAlign: 'right' }}>Actions</span>
          </div>
          {message ? (
            <div style={{ padding: '30px 16px', textAlign: 'center', font: `400 12.5px/1.5 ${FONT}`, color: MUTED }}>{message}</div>
          ) : rows.map((c, i) => {
            const st = campaignStatus(c, now)
            const [sl, sfg, sbg] = STATUS[st]
            const [tfg, tbg] = TYPE_PILL[c.type]
            const s = c.stats
            const editable = st === 'draft' || st === 'scheduled'
            return (
              <div key={c.id} className="hv3" style={{ display: 'grid', gridTemplateColumns: COLS, gap: '12px', padding: '12px 16px', borderTop: i ? '1px solid #EFF1ED' : '0', alignItems: 'center', opacity: busy === c.id ? 0.5 : 1 }}>
                <span style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '0' }}>
                  <span style={{ ...cell, font: `600 13px/1.2 ${FONT}`, color: INK }}>{c.title}</span>
                  <span style={{ ...cell, font: `400 11.5px/1.2 ${FONT}`, color: MUTED }}>{c.message}</span>
                </span>
                <span><span style={{ font: `600 10.5px/1.2 ${FONT}`, color: tfg, background: tbg, padding: '4px 8px', borderRadius: '5px', whiteSpace: 'nowrap' }}>{campaignTypeLabel(c.type)}</span></span>
                <span style={cell}>{audienceLabel(c.audience)}</span>
                <span style={{ ...cell, color: INK, fontWeight: 600 }}>{st === 'sent' ? num(s?.recipients ?? c.recipients ?? 0) : '–'}</span>
                <span style={cell}>{st === 'sent' ? pct(s?.pushed ?? 0, s?.recipients ?? 0) : '–'}</span>
                <span style={cell}>{st === 'sent' ? pct(s?.opened ?? 0, s?.recipients ?? 0) : '–'}</span>
                <span style={cell}>{st === 'sent' ? `Sent ${dateTime(c.sent_at)}` : c.scheduled_at ? dateTime(c.scheduled_at) : st === 'draft' ? 'Not scheduled' : '–'}</span>
                <span><span style={{ font: `600 10.5px/1.2 ${FONT}`, color: sfg, background: sbg, padding: '4px 8px', borderRadius: '5px', whiteSpace: 'nowrap' }}>{sl}</span></span>
                <span style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                  {editable && <button className="hv1" onClick={() => v.editCampaign(c)} disabled={!!busy} style={smallBtn}>Edit</button>}
                  {editable && <button className="hv1" onClick={() => sendNow(c)} disabled={!!busy} style={{ ...smallBtn, background: '#0B3D1F', color: '#fff', borderColor: '#0B3D1F' }}>Send</button>}
                  {!editable && <button className="hv1" onClick={() => duplicate(c)} disabled={!!busy} style={smallBtn}>Duplicate</button>}
                  <button className="hv1" aria-label={`Delete ${c.title}`} onClick={() => remove(c)} disabled={!!busy || st === 'sending'} style={{ ...smallBtn, color: '#A93826', borderColor: '#F0D5CF' }}>✕</button>
                </span>
              </div>
            )
          })}
        </div>
        <span style={{ font: `400 11.5px/1.5 ${FONT}`, color: MUTED }}>
          Order updates (confirmed, picking, packed, on the way, delivered) are sent automatically when an order’s status changes · {num(automated.data?.total ?? null)} in the last 30 days, {pct(automated.data?.opened ?? 0, automated.data?.total ?? 0)} opened.
          Promotional campaigns only reach customers who opted in to marketing.
        </span>
      </div>
    </>
  )
}
