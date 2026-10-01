import { useEffect, useMemo, useRef, useState } from 'react'
import { useNow } from '../../lib/customers'
import { customerName, initials, money, statusLabel, STATUS_PILL as ORDER_PILL } from '../../lib/orders'
import { useStaff } from '../../lib/staff'
import {
  CHANNEL_LABEL, PRIORITIES, PRIORITY_TEXT, STATUSES, STATUS_PILL, ago, countCannedUse, msgTime, sendMessage, shortDay,
  topicLabel, updateTicket, useCannedReplies, useMessages, useTicket, useTicketContext, useTickets,
} from '../../lib/support'
import RefundModal from '../../modals/RefundModal'
import { BORDER, DIVIDER, FONT, INK, MUTED, ellipsis, labelStyle } from '../content/styles'

const FOREST = '#0B3D1F'
const CHIPS = [...STATUSES, ['all', 'All']]

const pill = (fg, bg) => ({ font: `600 10.5px/1.2 ${FONT}`, color: fg, background: bg, padding: '4px 7px', borderRadius: '5px', whiteSpace: 'nowrap', display: 'inline-block' })
const card = { background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '12px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }
const outlineBtn = { flex: '1', height: '34px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', font: `600 12px/1.2 ${FONT}`, color: INK, cursor: 'pointer', whiteSpace: 'nowrap' }
const plainSelect = { height: '34px', padding: '0 28px 0 11px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', appearance: 'none', WebkitAppearance: 'none', font: `600 12px/1.2 ${FONT}`, color: INK, cursor: 'pointer', maxWidth: '100%' }

function Avatar({ c, size = 34 }) {
  return (
    <span style={{ width: `${size}px`, height: `${size}px`, borderRadius: '50%', background: FOREST, color: '#8BE000', display: 'flex', alignItems: 'center', justifyContent: 'center', font: `700 ${size > 30 ? 11.5 : 10}px/1 ${FONT}`, flex: 'none' }}>
      {initials(c)}
    </span>
  )
}

function Stat({ label, value }) {
  return (
    <span style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', font: `400 12px/1.3 ${FONT}` }}>
      <span style={{ color: MUTED }}>{label}</span>
      <span style={{ color: INK, fontWeight: 500, ...ellipsis }}>{value}</span>
    </span>
  )
}

// ─── Left column: ticket list ────────────────────────────────────────────────────────────
function TicketList({ status, setStatus, counts, input, setInput, list, selectedId, onSelect, now }) {
  const rows = list.data ?? []
  let message = null
  if (list.status === 'off') message = 'Supabase keys are missing · add them to .env to load support chats.'
  else if (list.loading) message = 'Loading chats…'
  else if (list.status === 'error' && !rows.length) message = list.error
  else if (!rows.length) message = input.trim() ? 'No chats match your search.' : status === 'open' ? 'Inbox zero · no open chats right now.' : 'Nothing here yet.'

  return (
    <div className="r-full" style={{ width: '300px', flex: 'none', borderRight: `1px solid ${BORDER}`, background: '#fff', display: 'flex', flexDirection: 'column', minHeight: '0' }}>
      <div style={{ padding: '12px 12px 10px', display: 'flex', flexDirection: 'column', gap: '10px', borderBottom: `1px solid ${DIVIDER}` }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '34px', padding: '0 11px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff' }}>
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
            <circle cx="9" cy="9" r="6" stroke={MUTED} strokeWidth="1.6" />
            <path d="M13.4 13.4L18 18" stroke={MUTED} strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search name, ticket or order…" aria-label="Search chats" style={{ border: '0', outline: 'none', background: 'transparent', font: `400 12.5px/1.2 ${FONT}`, color: INK, width: '100%', minWidth: '0' }} />
        </span>
        <span style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {CHIPS.map(([k, label]) => {
            const on = status === k
            const n = counts?.[k]
            return (
              <button key={k} type="button" onClick={() => setStatus(k)} style={{ height: '26px', padding: '0 10px', borderRadius: '13px', border: `1px solid ${on ? FOREST : BORDER}`, background: on ? FOREST : '#fff', color: on ? '#fff' : INK, font: `600 11px/1 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                {label}{n != null ? ` · ${n}` : ''}
              </button>
            )
          })}
        </span>
      </div>
      <div className="ad-scroll" style={{ flex: '1', minHeight: '0', overflowY: 'auto' }}>
        {message ? (
          <div style={{ padding: '28px 16px', textAlign: 'center', font: `400 12px/1.5 ${FONT}`, color: MUTED }}>{message}</div>
        ) : rows.map((t) => {
          const on = t.id === selectedId
          const [sl, sfg, sbg] = STATUS_PILL[t.status] ?? STATUS_PILL.open
          const pr = PRIORITY_TEXT[t.priority]
          return (
            <button key={t.id} type="button" onClick={() => onSelect(t.id)} className={on ? undefined : 'hv3'} style={{ width: '100%', display: 'flex', gap: '10px', padding: '12px', border: '0', borderBottom: `1px solid ${DIVIDER}`, borderLeft: `3px solid ${on ? '#8BE000' : 'transparent'}`, background: on ? '#F4F8EA' : '#fff', textAlign: 'left', cursor: 'pointer' }}>
              <Avatar c={t.customer} size={30} />
              <span style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '0', flex: '1' }}>
                <span style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ font: `700 12.5px/1.25 ${FONT}`, color: INK, flex: '1', ...ellipsis }}>{customerName(t.customer)}</span>
                  <span style={{ font: `400 10.5px/1.2 ${FONT}`, color: MUTED, flex: 'none' }}>{ago(t.last_message_at, now)}</span>
                </span>
                <span style={{ font: `500 12px/1.3 ${FONT}`, color: INK, ...ellipsis }}>{t.subject}</span>
                <span style={{ font: `400 11.5px/1.3 ${FONT}`, color: MUTED, ...ellipsis }}>{t.last_sender === 'agent' ? 'You: ' : ''}{t.last_message_preview || '—'}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '7px', marginTop: '2px' }}>
                  <span style={pill(sfg, sbg)}>{sl}</span>
                  {pr && <span style={{ font: `600 11px/1 ${FONT}`, color: pr[1] }}>{pr[0]}</span>}
                  <span style={{ marginLeft: 'auto', font: `400 11px/1 ${FONT}`, color: MUTED }}>{topicLabel(t.topic)}</span>
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Middle column: thread and composer ──────────────────────────────────────────────────
/** Full-size customer photo over the page. Closes on ×, Esc or a click outside the photo. */
function PhotoViewer({ url, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <div role="dialog" aria-modal="true" aria-label="Photo from the customer" onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(10,14,11,0.82)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
      <img src={url} alt="Photo from the customer" onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '10px', objectFit: 'contain', boxShadow: '0 12px 40px rgba(0,0,0,0.45)', cursor: 'default' }} />
      <button type="button" onClick={onClose} aria-label="Close photo" title="Close (Esc)"
        style={{ position: 'absolute', top: '16px', right: '16px', width: '38px', height: '38px', borderRadius: '50%', border: 0, background: '#fff', color: INK, font: `500 22px/1 ${FONT}`, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
        ×
      </button>
      <a href={url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
        style={{ position: 'absolute', bottom: '16px', font: `600 12px/1 ${FONT}`, color: '#fff', background: 'rgba(255,255,255,0.14)', padding: '9px 13px', borderRadius: '8px', textDecoration: 'none' }}>
        Open in new tab
      </a>
    </div>
  )
}
function Bubble({ m, now }) {
  const agent = m.sender === 'agent'
  const note = m.internal
  const bg = note ? '#FBF1DE' : agent ? FOREST : '#fff'
  const fg = note ? '#5E4300' : agent ? '#fff' : INK
  const [zoomed, setZoomed] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: agent ? 'flex-end' : 'flex-start', gap: '5px' }}>
      {zoomed && <PhotoViewer url={m.image_url} onClose={() => setZoomed(false)} />}
      <span style={{ font: `500 10.5px/1.2 ${FONT}`, color: MUTED }}>
        {note ? 'Internal note · ' : ''}{m.author_name || (agent ? 'Spice Kart Support' : 'Customer')} · {msgTime(m.created_at, now)}
      </span>
      <div style={{ maxWidth: '72%', background: bg, color: fg, border: agent && !note ? '0' : `1px solid ${note ? '#F0DDB0' : BORDER}`, borderRadius: '10px', padding: '9px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {m.image_path && (m.image_url ? (
          <button type="button" onClick={() => setZoomed(true)} title="View full size" style={{ padding: 0, border: 0, background: 'none', cursor: 'zoom-in' }}>
            <img src={m.image_url} alt="Photo from the customer" style={{ display: 'block', maxWidth: '240px', maxHeight: '240px', borderRadius: '7px', objectFit: 'cover' }} />
          </button>
        ) : <span style={{ font: `400 12px/1.4 ${FONT}`, color: MUTED }}>Photo unavailable</span>)}
        {m.body && <span style={{ font: `400 12.5px/1.5 ${FONT}`, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{m.body}</span>}
      </div>
    </div>
  )
}

function Composer({ ticket, flash }) {
  const [mode, setMode] = useState('reply')
  const [text, setText] = useState('')
  const [busy, setBusy] = useState('')
  const canned = useCannedReplies()
  const note = mode === 'note'
  const first = ticket.customer?.first_name?.trim() || ''
  const empty = !text.trim()

  const insert = (id) => {
    const c = (canned.data ?? []).find((r) => r.id === id)
    if (!c) return
    const body = c.body.replace(/\{first_name\}/g, first || 'there')
    setText((cur) => (cur.trim() ? `${cur.trimEnd()}\n\n${body}` : body))
    countCannedUse(c.id)
  }

  const send = async (resolve) => {
    if (busy || empty) return
    setBusy(resolve ? 'resolve' : 'send')
    try {
      await sendMessage(ticket.id, text, note)
      if (resolve) await updateTicket(ticket.id, { status: 'resolved' })
      setText('')
      flash(note ? 'Internal note added' : resolve ? `Reply sent · ${ticket.number} resolved` : 'Reply sent · customer notified')
    } catch (e) {
      flash(e.message)
    } finally {
      setBusy('')
    }
  }

  const tab = (k, label) => (
    <button type="button" onClick={() => setMode(k)} style={{ height: '28px', padding: '0 12px', border: '0', borderRadius: '6px', background: mode === k ? '#fff' : 'transparent', boxShadow: mode === k ? '0 1px 2px rgba(0,0,0,.1)' : 'none', font: `600 12px/1 ${FONT}`, color: mode === k ? INK : MUTED, cursor: 'pointer' }}>{label}</button>
  )

  return (
    <div style={{ borderTop: `1px solid ${BORDER}`, background: '#fff', padding: '12px 16px 14px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 'none' }}>
      <span className="r-wrap" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ display: 'flex', gap: '2px', padding: '3px', background: '#EEF0EC', borderRadius: '8px' }}>
          {tab('reply', 'Reply')}
          {tab('note', 'Internal note')}
        </span>
        <select value="" onChange={(e) => insert(e.target.value)} aria-label="Insert canned reply" disabled={!canned.data?.length} className="r-full" style={{ ...plainSelect, marginLeft: 'auto', width: '220px' }}>
          <option value="">{canned.data?.length ? 'Insert canned reply…' : 'No canned replies yet'}</option>
          {(canned.data ?? []).map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
        </select>
      </span>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); send(false) } }}
        rows={3}
        maxLength={4000}
        placeholder={note ? 'Add a note for your team — the customer won’t see it' : `Reply to ${first || 'the customer'}…`}
        style={{ width: '100%', boxSizing: 'border-box', minHeight: '76px', padding: '10px 12px', border: `1px solid ${note ? '#F0DDB0' : BORDER}`, borderRadius: '9px', background: note ? '#FFFCF4' : '#fff', font: `400 12.5px/1.5 ${FONT}`, color: INK, outline: 'none', resize: 'vertical' }}
      />
      <span className="r-wrap" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ font: `400 11px/1.3 ${FONT}`, color: MUTED, flex: '1', minWidth: '0', ...ellipsis }}>
          {note ? 'Only visible to your team' : `Sent via ${CHANNEL_LABEL[ticket.channel]?.toLowerCase() ?? 'in-app chat'}} · status stays ${STATUS_PILL[ticket.status]?.[0] ?? ticket.status} · ⌘↵ to send`}
        </span>
        {!note && (
          <button type="button" onClick={() => send(true)} disabled={!!busy || empty} style={{ height: '34px', padding: '0 13px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', font: `600 12px/1 ${FONT}`, color: empty ? MUTED : INK, cursor: empty || busy ? 'default' : 'pointer', whiteSpace: 'nowrap' }}>
            {busy === 'resolve' ? 'Sending…' : 'Send & resolve'}
          </button>
        )}
        <button type="button" onClick={() => send(false)} disabled={!!busy || empty} style={{ height: '34px', padding: '0 15px', border: '0', borderRadius: '8px', background: empty || busy ? '#9DB7A3' : FOREST, font: `600 12px/1 ${FONT}`, color: '#fff', cursor: empty || busy ? 'default' : 'pointer', whiteSpace: 'nowrap' }}>
          {busy === 'send' ? 'Sending…' : note ? 'Add note' : 'Send reply'}
        </button>
      </span>
    </div>
  )
}

function Thread({ ticket, staff, flash, now }) {
  const messages = useMessages(ticket.id)
  const scroller = useRef(null)
  const rows = messages.data ?? []
  const lastId = rows[rows.length - 1]?.id

  // Stick to the newest message.
  useEffect(() => {
    const el = scroller.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lastId, ticket.id])

  const change = async (patch, msg) => {
    try {
      await updateTicket(ticket.id, patch)
      flash(msg)
    } catch (e) {
      flash(e.message)
    }
  }
  const assignees = (staff.rows ?? []).filter((s) => s.status === 'active' || s.user_id === ticket.assignee_id)

  return (
    <div style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column', minHeight: '0', borderRight: `1px solid ${BORDER}` }}>
      <div className="r-wrap" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', background: '#fff', borderBottom: `1px solid ${BORDER}`, flex: 'none' }}>
        <span style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '0', flex: '1' }}>
          <span style={{ font: `700 14px/1.25 ${FONT}`, color: INK, ...ellipsis }} title={ticket.subject}>{ticket.subject}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', font: `400 11px/1.3 ${FONT}`, color: MUTED, minWidth: '0' }}>
            <span style={ellipsis}>{ticket.number} · {CHANNEL_LABEL[ticket.channel] ?? ticket.channel} · {topicLabel(ticket.topic)} ·</span>
            <select value={ticket.priority} onChange={(e) => change({ priority: e.target.value }, `Priority set to ${PRIORITIES.find(([k]) => k === e.target.value)?.[1]}`)} aria-label="Priority" title="Priority" style={{ border: '0', background: 'transparent', font: `600 11px/1.3 ${FONT}`, color: PRIORITY_TEXT[ticket.priority]?.[1] ?? MUTED, cursor: 'pointer', padding: '0', outline: 'none' }}>
              {PRIORITIES.map(([k, l]) => <option key={k} value={k}>{l} priority</option>)}
            </select>
          </span>
        </span>
        <select value={ticket.assignee_id ?? ''} onChange={(e) => change({ assignee_id: e.target.value || null }, e.target.value ? `Assigned to ${assignees.find((s) => s.user_id === e.target.value)?.name ?? 'teammate'}` : 'Unassigned')} aria-label="Assignee" style={{ ...plainSelect, width: '150px' }}>
          <option value="">Unassigned</option>
          {assignees.map((s) => <option key={s.user_id} value={s.user_id}>{s.name}</option>)}
        </select>
        <span role="radiogroup" aria-label="Status" style={{ display: 'flex', gap: '2px', padding: '3px', background: '#EEF0EC', borderRadius: '9px', flex: 'none' }}>
          {STATUSES.map(([k, label]) => {
            const on = ticket.status === k
            return (
              <button key={k} type="button" role="radio" aria-checked={on} onClick={() => !on && change({ status: k }, `${ticket.number} marked ${label.toLowerCase()}`)} style={{ height: '28px', padding: '0 11px', border: '0', borderRadius: '7px', background: on ? '#fff' : 'transparent', boxShadow: on ? '0 1px 2px rgba(0,0,0,.12)' : 'none', font: `600 12px/1 ${FONT}`, color: on ? INK : MUTED, cursor: on ? 'default' : 'pointer' }}>{label}</button>
            )
          })}
        </span>
      </div>
      <div ref={scroller} className="ad-scroll" style={{ flex: '1', minHeight: '0', overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px', background: '#F6F7F4' }}>
        {messages.loading && !rows.length ? (
          <span style={{ margin: 'auto', font: `400 12px/1.4 ${FONT}`, color: MUTED }}>Loading messages…</span>
        ) : messages.status === 'error' && !rows.length ? (
          <span style={{ margin: 'auto', font: `400 12px/1.4 ${FONT}`, color: '#B3402F' }}>{messages.error}</span>
        ) : rows.map((m) => <Bubble key={m.id} m={m} now={now} />)}
        {ticket.status === 'resolved' && rows.length > 0 && (
          <span style={{ alignSelf: 'center', font: `500 11px/1.3 ${FONT}`, color: '#0B6B33', background: '#E9F6E3', padding: '6px 11px', borderRadius: '14px' }}>
            Resolved{ticket.resolved_at ? ` · ${msgTime(ticket.resolved_at, now)}` : ''}{ticket.csat ? ` · customer rated ${ticket.csat}/5` : ''}
          </span>
        )}
      </div>
      <Composer key={ticket.id} ticket={ticket} flash={flash} />
    </div>
  )
}

// ─── Right column: customer, linked order, earlier tickets ───────────────────────────────
function Sidebar({ v, ticket, now, onSelect, onRefund }) {
  const ctx = useTicketContext(ticket)
  const d = ctx.data
  const c = ticket.customer
  const o = d?.order
  const [linking, setLinking] = useState(false)

  const link = async (orderId) => {
    setLinking(true)
    try {
      await updateTicket(ticket.id, { order_id: orderId || null })
      v.flash(orderId ? 'Order linked to this chat' : 'Order unlinked')
    } catch (e) {
      v.flash(e.message)
    } finally {
      setLinking(false)
    }
  }

  const deliveredLabel = (ord) => {
    const when = ord.delivered_at ?? ord.placed_at
    const day = new Date(now).toDateString() === new Date(when).toDateString() ? 'Today' : shortDay(when)
    const time = new Date(when).toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit' })
    return ord.status === 'delivered' ? `${day} · delivered ${time}` : `${day} · placed ${new Date(ord.placed_at).toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit' })}`
  }

  return (
    <div className="ad-scroll r-full" style={{ width: '280px', flex: 'none', overflowY: 'auto', padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px', background: '#F6F7F4' }}>
      <div style={card}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '0' }}>
          <span style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#F1F9DF', color: FOREST, display: 'flex', alignItems: 'center', justifyContent: 'center', font: `700 12px/1 ${FONT}`, flex: 'none' }}>{initials(c)}</span>
          <span style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: '0' }}>
            <span style={{ font: `700 13px/1.2 ${FONT}`, color: INK, ...ellipsis }}>{customerName(c)}</span>
            <span style={{ font: `400 11.5px/1.2 ${FONT}`, color: MUTED, ...ellipsis }}>{c?.email || 'No email'}</span>
          </span>
        </span>
        <Stat label="Phone" value={c?.mobile ? `+61 ${c.mobile.slice(0, 3)} ${c.mobile.slice(3, 6)} ${c.mobile.slice(6)}` : '—'} />
        <Stat label="Orders" value={d?.stats ? d.stats.orders : '—'} />
        <Stat label="Lifetime spend" value={d?.stats ? money(d.stats.total_spend) : '—'} />
        <Stat label="Customer since" value={d?.stats ? new Date(d.stats.created_at).toLocaleDateString('en-AU', { month: 'short', year: 'numeric' }) : '—'} />
        <Stat label="Open tickets" value={d ? d.openTickets : '—'} />
        <button type="button" className="hv1" onClick={() => v.openCustomer(ticket.customer_id)} style={{ ...outlineBtn, flex: 'none' }}>View customer</button>
      </div>

      <div style={card}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={labelStyle}>Linked order</span>
          {o && <span style={{ ...pill(...(ORDER_PILL[o.status] ?? ORDER_PILL.placed)), marginLeft: 'auto' }}>{statusLabel(o.status)}</span>}
        </span>
        {o ? (
          <>
            <span style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ font: `700 14px/1.2 ${FONT}`, color: INK }}>#{o.number}</span>
              <span style={{ font: `400 11.5px/1.2 ${FONT}`, color: MUTED }}>{deliveredLabel(o)}</span>
            </span>
            <span style={{ height: '1px', background: DIVIDER, display: 'block' }} />
            {(o.order_items ?? []).map((i) => (
              <span key={i.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', font: `400 12px/1.3 ${FONT}`, color: INK }}>
                <span style={ellipsis}>{i.qty} × {i.name}</span>
                <span style={{ flex: 'none' }}>{money(i.line_total)}</span>
              </span>
            ))}
            <span style={{ height: '1px', background: DIVIDER, display: 'block' }} />
            <span style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', font: `400 12px/1.3 ${FONT}` }}>
              <span style={{ color: MUTED }}>Total</span>
              <span style={{ color: INK, fontWeight: 600 }}>{money(o.total)}{Number(o.delivery_fee) > 0 ? ' incl. delivery' : ''}</span>
            </span>
            {o.refunded > 0 && <span style={{ font: `400 11px/1.3 ${FONT}`, color: MUTED }}>{money(o.refunded)} already refunded</span>}
            <span style={{ display: 'flex', gap: '8px' }}>
              <button type="button" className="hv1" onClick={() => v.openOrder(o)} style={outlineBtn}>View order</button>
              <button type="button" onClick={() => onRefund(o)} style={{ ...outlineBtn, background: '#F1F9DF', borderColor: '#C7E88A', color: FOREST }}>Issue refund</button>
            </span>
            <button type="button" disabled={linking} onClick={() => link(null)} style={{ border: '0', background: 'transparent', padding: '0', font: `500 11px/1.2 ${FONT}`, color: MUTED, cursor: 'pointer', alignSelf: 'flex-start' }}>Unlink order</button>
          </>
        ) : (
          <>
            <span style={{ font: `400 12px/1.45 ${FONT}`, color: MUTED }}>{ticket.order_id && ctx.loading ? 'Loading…' : 'This chat isn’t about a specific order.'}</span>
            {!!d?.orders?.length && (
              <select value="" disabled={linking} onChange={(e) => e.target.value && link(e.target.value)} aria-label="Link an order" style={{ ...plainSelect, width: '100%' }}>
                <option value="">Link an order…</option>
                {d.orders.map((x) => <option key={x.id} value={x.id}>#{x.number} · {statusLabel(x.status)} · {shortDay(x.placed_at)}</option>)}
              </select>
            )}
          </>
        )}
      </div>

      {!!d?.previous?.length && (
        <div style={{ ...card, gap: '12px' }}>
          <span style={labelStyle}>Previous tickets</span>
          {d.previous.map((t) => (
            <button key={t.id} type="button" onClick={() => onSelect(t.id)} style={{ border: '0', background: 'transparent', padding: '0', textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span style={{ font: `600 12px/1.3 ${FONT}`, color: INK, ...ellipsis, maxWidth: '100%' }}>{t.subject}</span>
              <span style={{ font: `400 11px/1.2 ${FONT}`, color: MUTED }}>{STATUS_PILL[t.status]?.[0] ?? t.status} · {shortDay(t.resolved_at ?? t.created_at)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function InboxTab({ v, summary }) {
  const now = useNow(30000)
  const [status, setStatus] = useState('open')
  const [input, setInput] = useState('')
  const [q, setQ] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [refund, setRefund] = useState(null)
  const staff = useStaff()

  useEffect(() => {
    const t = setTimeout(() => setQ(input), 300)
    return () => clearTimeout(t)
  }, [input])

  const filters = useMemo(() => ({ status, q }), [status, q])
  const list = useTickets(filters)
  const rows = list.data ?? []
  // Keep the selection when it leaves the list (e.g. just resolved); otherwise default to the first chat.
  const inList = rows.find((t) => t.id === selectedId)
  const single = useTicket(selectedId && !inList ? selectedId : null)
  const ticket = inList ?? single.data ?? (selectedId ? null : rows[0] ?? null)

  const s = summary.data
  const counts = s ? { open: s.open, pending: s.pending, resolved: s.resolved, all: s.all } : null

  return (
    <div className="r-flex-stack" style={{ flex: '1', minHeight: '0', display: 'flex', borderTop: `1px solid ${BORDER}` }}>
      <TicketList status={status} setStatus={setStatus} counts={counts} input={input} setInput={setInput} list={list} selectedId={ticket?.id} onSelect={setSelectedId} now={now} />
      {ticket ? (
        <>
          <Thread ticket={ticket} staff={staff} flash={v.flash} now={now} />
          <Sidebar v={v} ticket={ticket} now={now} onSelect={setSelectedId} onRefund={setRefund} />
        </>
      ) : (
        <div style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F6F7F4', font: `400 12.5px/1.5 ${FONT}`, color: MUTED, padding: '20px', textAlign: 'center' }}>
          {selectedId && single.loading ? 'Loading chat…' : 'Pick a chat on the left. New chats from the app appear here instantly.'}
        </div>
      )}
      {refund && (
        <RefundModal
          order={refund}
          onClose={() => setRefund(null)}
          onDone={(msg) => v.flash(msg)}
        />
      )}
    </div>
  )
}
