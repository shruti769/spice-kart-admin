import { useMemo, useState } from 'react'
import { Modal } from '../components/content/ui'
import { BORDER, DANGER, DIVIDER, FONT, INK, MUTED, btnPrimary, btnSecondary, ellipsis, errorText, hintText, inputStyle, labelStyle } from '../components/content/styles'
import { assignDriver, driverInitials, phoneLabel, saveDriver, setDriverStatus, useDeliveryBoard } from '../lib/drivers'
import { statusLabel } from '../lib/orders'

const EMPTY = { name: '', phone: '', vehicle: '', zone: '' }
const linkBtn = { border: '0', background: 'transparent', padding: '4px 2px', font: `600 11px/1.2 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap', flex: 'none' }

/**
 * Assign a driver to one or more open orders, and add / (de)activate drivers.
 * Props: `orders` (candidate open orders), `drivers`, `load` ({ driverId: open orders }),
 * `preselect` (order ids ticked at start; default all), `preselectDriver` (driver id picked at start), `onClose`, `onAssigned`, `onDriversChanged`, `flash`.
 * Rendered with only `v` (legacy global modal), it loads the board itself and offers the unassigned orders.
 */
export default function AssignDriverModal(props) {
  if (!props.drivers) return props.v ? <SelfLoaded v={props.v} /> : null
  return <AssignDriver {...props} />
}

function SelfLoaded({ v }) {
  const board = useDeliveryBoard()
  const d = board.data
  const load = useMemo(() => {
    const m = {}
    for (const o of d?.open ?? []) if (o.driver_id) m[o.driver_id] = (m[o.driver_id] || 0) + 1
    return m
  }, [d])
  if (!d) {
    return (
      <Modal title="Assign a driver" sub={board.error || (board.status === 'off' ? 'Supabase keys are missing · add them to .env.' : 'Loading drivers…')} onClose={v.closeModal} footer={<button type="button" onClick={v.closeModal} style={{ ...btnSecondary, marginLeft: 'auto' }}>Close</button>} />
    )
  }
  return <AssignDriver orders={d.open.filter((o) => !o.driver_id)} drivers={d.drivers} load={load} onClose={v.closeModal} onDriversChanged={board.refetch} onAssigned={board.refetch} flash={v.flash} />
}

function AssignDriver({ orders = [], drivers, load = {}, preselect, preselectDriver, onClose, onAssigned, onDriversChanged, flash }) {
  const [checked, setChecked] = useState(() => preselect ?? orders.map((o) => o.id))
  const [picked, setPicked] = useState(preselectDriver ?? null)
  const [added, setAdded] = useState([])
  const [statusOverride, setStatusOverride] = useState({})
  const [form, setForm] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const list = useMemo(() => {
    const all = [...drivers, ...added.filter((a) => !drivers.some((d) => d.id === a.id))]
      .map((d) => (statusOverride[d.id] ? { ...d, status: statusOverride[d.id] } : d))
    // Active first, least busy first, then by name.
    return all.sort((a, b) => (a.status === b.status ? (load[a.id] || 0) - (load[b.id] || 0) || a.name.localeCompare(b.name) : a.status === 'active' ? -1 : 1))
  }, [drivers, added, statusOverride, load])

  const chosen = list.find((d) => d.id === picked && d.status === 'active') ?? null
  const ids = checked.filter((id) => orders.some((o) => o.id === id))
  const allAssigned = ids.length > 0 && ids.every((id) => orders.find((o) => o.id === id)?.driver_id)
  const toggle = (id) => setChecked((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]))

  const run = async (fn) => {
    setBusy(true)
    setError('')
    try {
      await fn()
    } catch (e) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }

  const assign = () => run(async () => {
    const n = await assignDriver(ids, chosen.id)
    flash?.(`${n} order${n === 1 ? '' : 's'} assigned to ${chosen.name}`)
    onAssigned?.()
    onClose()
  })

  const addDriver = () => {
    if (!form.name.trim()) return setError('Enter the driver’s name')
    run(async () => {
      const row = await saveDriver(null, { ...form, status: 'active' })
      setAdded((cur) => [...cur, row])
      setPicked(row.id)
      setForm(null)
      flash?.(`${row.name} added as a driver`)
      onDriversChanged?.()
    })
  }

  const flip = (d) => run(async () => {
    const next = d.status === 'active' ? 'inactive' : 'active'
    await setDriverStatus(d.id, next)
    setStatusOverride((cur) => ({ ...cur, [d.id]: next }))
    if (next === 'inactive' && picked === d.id) setPicked(null)
    flash?.(`${d.name} ${next === 'active' ? 'reactivated' : 'deactivated'}`)
    onDriversChanged?.()
  })

  const activeCount = list.filter((d) => d.status === 'active').length
  const sub = orders.length
    ? `${orders.length === 1 ? `Order #${orders[0].number}` : `${orders.length} orders`} · ${activeCount} active driver${activeCount === 1 ? '' : 's'}`
    : `No orders are waiting for a driver · ${activeCount} active driver${activeCount === 1 ? '' : 's'}`

  return (
    <Modal
      title={orders.length === 1 && orders[0].driver_id ? 'Reassign driver' : 'Assign a driver'}
      sub={sub}
      width={520}
      busy={busy}
      onClose={onClose}
      footer={(
        <>
          <span style={{ ...errorText, flex: '1', minWidth: '0' }}>{error}</span>
          <button type="button" onClick={onClose} disabled={busy} style={btnSecondary}>{orders.length ? 'Cancel' : 'Done'}</button>
          {orders.length > 0 && (
            <button type="button" onClick={assign} disabled={busy || !chosen || !ids.length} style={{ ...btnPrimary, opacity: busy || !chosen || !ids.length ? 0.45 : 1, cursor: busy || !chosen || !ids.length ? 'default' : 'pointer' }}>
              {busy ? 'Saving…' : `${allAssigned ? 'Reassign' : 'Assign'} ${ids.length || ''} order${ids.length === 1 ? '' : 's'}`}
            </button>
          )}
        </>
      )}
    >
      {orders.length > 0 && (
        <span style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
          <span style={labelStyle}>Orders to assign</span>
          <div className="ad-scroll" style={{ border: `1px solid ${BORDER}`, borderRadius: '9px', maxHeight: '170px', overflowY: 'auto' }}>
            {orders.map((o, i) => (
              <label key={o.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', borderTop: i ? `1px solid ${DIVIDER}` : '0', cursor: 'pointer' }}>
                <input type="checkbox" checked={checked.includes(o.id)} onChange={() => toggle(o.id)} style={{ width: '15px', height: '15px', margin: '0', accentColor: '#0B3D1F', flex: 'none' }} />
                <span style={{ font: `700 12px/1.2 ${FONT}`, color: INK, flex: 'none' }}>#{o.number}</span>
                <span style={{ font: `400 11.5px/1.2 ${FONT}`, color: MUTED, ...ellipsis }}>
                  {[o.address_area || o.address_line, statusLabel(o.status), o.driver_id ? 'has a driver' : 'unassigned'].filter(Boolean).join(' · ')}
                </span>
              </label>
            ))}
          </div>
        </span>
      )}

      <span style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <span style={labelStyle}>Drivers</span>
          {!form && (
            <button type="button" onClick={() => { setForm(EMPTY); setError('') }} disabled={busy} style={{ ...linkBtn, marginLeft: 'auto', color: '#0B6B33' }}>+ Add driver</button>
          )}
        </span>

        {form && (
          <div style={{ border: `1px solid #C7E88A`, background: '#F7FCEE', borderRadius: '9px', padding: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '9px' }}>
            <input autoFocus value={form.name} maxLength={80} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name *" style={inputStyle} />
            <input value={form.phone} maxLength={20} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Mobile, e.g. 0412 345 678" inputMode="tel" style={inputStyle} />
            <input value={form.vehicle} maxLength={60} onChange={(e) => setForm({ ...form, vehicle: e.target.value })} placeholder="Vehicle, e.g. Car · ABC123" style={inputStyle} />
            <input value={form.zone} maxLength={60} onChange={(e) => setForm({ ...form, zone: e.target.value })} placeholder="Zone, e.g. Richmond" style={inputStyle} />
            <span style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button type="button" onClick={() => setForm(null)} disabled={busy} style={btnSecondary}>Cancel</button>
              <button type="button" onClick={addDriver} disabled={busy} style={{ ...btnPrimary, opacity: busy ? 0.45 : 1 }}>{busy ? 'Saving…' : 'Add driver'}</button>
            </span>
          </div>
        )}

        {list.length === 0 && !form && (
          <span style={{ ...hintText, padding: '14px', textAlign: 'center', border: `1px dashed ${BORDER}`, borderRadius: '9px' }}>No drivers yet — add one to start assigning orders.</span>
        )}

        <div className="ad-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '300px', overflowY: 'auto' }}>
          {list.map((d) => {
            const on = chosen?.id === d.id
            const inactive = d.status !== 'active'
            const n = load[d.id] || 0
            return (
              <span key={d.id} onClick={() => !inactive && orders.length && setPicked(d.id)} style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '10px 11px', border: `1px solid ${on ? '#C7E88A' : BORDER}`, background: on ? '#F7FCEE' : '#fff', borderRadius: '9px', cursor: inactive || !orders.length ? 'default' : 'pointer', opacity: inactive ? 0.6 : 1 }}>
                {orders.length > 0 && (
                  <span style={{ width: '16px', height: '16px', borderRadius: '8px', border: `2px solid ${on ? '#8BE000' : '#C9D0C8'}`, background: on ? '#8BE000' : 'transparent', display: 'block', flex: 'none', boxSizing: 'border-box' }} />
                )}
                <span style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#F6F7F4', border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', font: `600 10.5px/1.2 ${FONT}`, color: '#4A564E', flex: 'none' }}>
                  {driverInitials(d.name)}
                </span>
                <span style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: '0', flex: '1' }}>
                  <span style={{ font: `600 12.5px/1.2 ${FONT}`, color: INK, ...ellipsis }}>{d.name}</span>
                  <span style={{ font: `400 10.5px/1.2 ${FONT}`, color: MUTED, ...ellipsis }}>
                    {[inactive ? 'Inactive' : `${n} open order${n === 1 ? '' : 's'}`, d.zone, d.vehicle, phoneLabel(d.phone)].filter(Boolean).join(' · ')}
                  </span>
                </span>
                <button type="button" onClick={(e) => { e.stopPropagation(); flip(d) }} disabled={busy} style={{ ...linkBtn, color: inactive ? '#0B6B33' : DANGER }}>
                  {inactive ? 'Reactivate' : 'Deactivate'}
                </button>
              </span>
            )
          })}
        </div>
      </span>
    </Modal>
  )
}
