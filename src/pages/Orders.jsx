import { useMemo, useState } from 'react'
import {
  PAYMENT_LABEL, PAYMENT_STATUS_PILL, STATUSES, STATUS_PILL, customerName, initials, itemCount, mobileLabel, money, placedLabel,
  statusLabel, useOrderCounts, useOrders,
} from '../lib/orders'

const FONT = 'Inter,system-ui,sans-serif'
const INK = '#17201A'
const MUTED = '#7C8A81'
const BORDER = '#E4E7E2'
const PAGE = 50
const COLS = '110px minmax(0,1.8fr) 70px 90px 1.1fr 1fr 130px 130px 70px'

const head = { font: `600 10.5px/1.2 ${FONT}`, letterSpacing: '.5px', color: MUTED, textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
const cell = { font: `400 12.5px/1.2 ${FONT}`, color: '#4A564E', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
const pill = (fg, bg) => ({ font: `600 10.5px/1.2 ${FONT}`, color: fg, background: bg, padding: '4px 8px', borderRadius: '5px', whiteSpace: 'nowrap', display: 'inline-block' })
const selectBox = { height: '32px', padding: '0 10px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', font: `500 12px/1.2 ${FONT}`, color: INK, cursor: 'pointer' }

export default function Orders({ v }) {
  const [limit, setLimit] = useState(PAGE)
  const [tab, setTab] = useState('all')
  const [q, setQ] = useState('')
  const [type, setType] = useState('all')
  const [pay, setPay] = useState('all')
  const orders = useOrders(limit)
  const counts = useOrderCounts()

  const rows = useMemo(() => {
    const t = q.trim().toLowerCase().replace(/^#/, '')
    return orders.rows.filter((o) => {
      if (tab !== 'all' && o.status !== tab) return false
      if (type !== 'all' && o.delivery_type !== type) return false
      if (pay !== 'all' && o.payment_status !== pay) return false
      if (!t) return true
      return `${o.number} ${customerName(o.customer)} ${o.customer?.mobile ?? ''}`.toLowerCase().includes(t)
    })
  }, [orders.rows, tab, type, pay, q])

  const filtered = tab !== 'all' || type !== 'all' || pay !== 'all' || q.trim()
  let message = null
  if (orders.status === 'off') message = 'Supabase keys are missing · add them to .env to load orders.'
  else if (orders.loading) message = 'Loading orders…'
  else if (orders.status === 'error' && !orders.rows.length) message = orders.error
  else if (!rows.length) message = orders.rows.length ? 'No orders match these filters.' : 'No orders yet · orders placed in the app appear here instantly.'

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '18px', padding: '24px 26px 2px' }}>
        <span style={{ display: 'flex', flexDirection: 'column', gap: '5px', minWidth: '0' }}>
          <span style={{ font: `700 20px/1.2 ${FONT}`, color: INK, whiteSpace: 'nowrap' }}>Orders</span>
          <span style={{ font: `400 12.5px/1.2 ${FONT}`, color: MUTED, whiteSpace: 'nowrap' }}>
            {counts ? `${counts.all} order${counts.all === 1 ? '' : 's'} · ` : ''}new orders from the app appear live
          </span>
        </span>
        <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '34px', width: '260px', padding: '0 11px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff' }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}><circle cx="9" cy="9" r="6" stroke={MUTED} strokeWidth="1.6" /><path d="M13.4 13.4L18 18" stroke={MUTED} strokeWidth="1.6" strokeLinecap="round" /></svg>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search order #, customer, mobile…" style={{ border: '0', outline: 'none', background: 'transparent', font: `400 12.5px/1.2 ${FONT}`, color: INK, width: '100%' }} />
          </span>
        </span>
      </div>
      <div className="ad-scroll" style={{ flex: '1', minHeight: '0', overflowY: 'auto', padding: '20px 26px 30px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div className="ad-scroll" style={{ display: 'flex', gap: '2px', borderBottom: `1px solid ${BORDER}`, overflowX: 'auto', flex: 'none' }}>
          {[['all', 'All'], ...STATUSES].map(([k, label]) => {
            const on = tab === k
            const n = counts?.[k]
            return (
              <button key={k} onClick={() => setTab(k)} style={{ border: '0', background: 'transparent', padding: '0 12px 10px', font: `600 12.5px/1.2 ${FONT}`, color: on ? '#0B3D1F' : MUTED, borderBottom: `2px solid ${on ? '#0B3D1F' : 'transparent'}`, cursor: 'pointer', whiteSpace: 'nowrap', marginBottom: '-1px' }}>
                {label}{n ? ` · ${n}` : ''}
              </button>
            )
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <select value={type} onChange={(e) => setType(e.target.value)} style={selectBox} aria-label="Delivery type">
            <option value="all">Type: All</option>
            <option value="express">Express</option>
            <option value="scheduled">Scheduled</option>
          </select>
          <select value={pay} onChange={(e) => setPay(e.target.value)} style={selectBox} aria-label="Payment status">
            <option value="all">Payment: All</option>
            {Object.entries(PAYMENT_STATUS_PILL).map(([k, [label]]) => <option key={k} value={k}>{label}</option>)}
          </select>
          {filtered && (
            <button className="hv1" onClick={() => { setTab('all'); setType('all'); setPay('all'); setQ('') }} style={{ ...selectBox, font: `600 12px/1.2 ${FONT}` }}>Clear filters</button>
          )}
          <span style={{ marginLeft: 'auto', font: `400 11.5px/1.2 ${FONT}`, color: MUTED }}>Showing the latest {Math.min(limit, orders.rows.length)} orders</span>
        </div>

        <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: COLS, gap: '12px', padding: '11px 16px', background: '#F6F7F4', borderBottom: `1px solid ${BORDER}` }}>
            {['Order', 'Customer', 'Items', 'Value', 'Delivery', 'Payment', 'Status', 'Placed'].map((h) => <span key={h} style={head}>{h}</span>)}
            <span style={{ ...head, textAlign: 'right' }}>Actions</span>
          </div>
          {message ? (
            <div style={{ padding: '32px 16px', textAlign: 'center', font: `400 12.5px/1.5 ${FONT}`, color: MUTED }}>{message}</div>
          ) : rows.map((o, i) => {
            const [sfg, sbg] = STATUS_PILL[o.status] ?? STATUS_PILL.placed
            const [pl, pfg, pbg] = PAYMENT_STATUS_PILL[o.payment_status] ?? PAYMENT_STATUS_PILL.pending
            const n = itemCount(o)
            return (
              <div key={o.id} className="hv3" onClick={() => v.openOrder(o)} style={{ display: 'grid', gridTemplateColumns: COLS, gap: '12px', padding: '12px 16px', borderTop: i ? '1px solid #EFF1ED' : '0', alignItems: 'center', cursor: 'pointer' }}>
                <span style={{ ...cell, font: `700 12.5px/1.2 ${FONT}`, color: INK }}>#{o.number}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '9px', minWidth: '0' }}>
                  <span style={{ width: '28px', height: '28px', borderRadius: '7px', background: '#F1F9DF', color: '#0B3D1F', font: `700 10.5px/28px ${FONT}`, textAlign: 'center', flex: 'none' }}>{initials(o.customer)}</span>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: '0' }}>
                    <span style={{ ...cell, color: INK, fontWeight: 600 }}>{customerName(o.customer)}</span>
                    <span style={{ ...cell, font: `400 11px/1.2 ${FONT}`, color: MUTED }}>{mobileLabel(o.customer?.mobile) || o.address_area}</span>
                  </span>
                </span>
                <span style={cell}>{n}</span>
                <span style={{ ...cell, color: INK, fontWeight: 600 }}>{money(o.total)}</span>
                <span style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: '0' }}>
                  <span style={cell}>{o.delivery_type === 'express' ? 'Express' : 'Scheduled'}</span>
                  {o.slot_label && <span style={{ ...cell, font: `400 11px/1.2 ${FONT}`, color: MUTED }}>{o.slot_label}</span>}
                </span>
                <span style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-start', minWidth: '0' }}>
                  <span style={pill(pfg, pbg)}>{pl}</span>
                  <span style={{ ...cell, font: `400 11px/1.2 ${FONT}`, color: MUTED }}>{PAYMENT_LABEL[o.payment_method] ?? o.payment_method}</span>
                </span>
                <span><span style={pill(sfg, sbg)}>{statusLabel(o.status)}</span></span>
                <span style={cell}>{placedLabel(o.placed_at)}</span>
                <span style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="hv1" onClick={(e) => { e.stopPropagation(); v.openOrder(o) }} style={{ height: '28px', padding: '0 10px', border: `1px solid ${BORDER}`, borderRadius: '7px', background: '#fff', font: `600 11.5px/1.2 ${FONT}`, color: INK, cursor: 'pointer' }}>View</button>
                </span>
              </div>
            )
          })}
        </div>
        {!message && orders.rows.length >= limit && (
          <button className="hv1" onClick={() => setLimit((n) => n + PAGE)} style={{ alignSelf: 'center', height: '34px', padding: '0 14px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', font: `600 12.5px/1.2 ${FONT}`, color: INK, cursor: 'pointer' }}>
            Load older orders
          </button>
        )}
      </div>
    </>
  )
}
