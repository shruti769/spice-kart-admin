import { useEffect, useMemo, useState } from 'react'
import { BORDER, DANGER, DIVIDER, FONT, INK, MUTED, btnSecondary, ellipsis, headCell, inputStyle } from './styles'

export function Toggle({ on, onChange, label, disabled }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} disabled={disabled} onClick={() => onChange(!on)} style={{ width: '38px', height: '22px', borderRadius: '11px', background: on ? '#1B5E30' : '#DCDDD8', position: 'relative', flex: 'none', display: 'block', border: '0', padding: '0', cursor: disabled ? 'default' : 'pointer', transition: 'background .15s', opacity: disabled ? 0.6 : 1 }}>
      <span style={{ position: 'absolute', top: '2.5px', left: on ? '18px' : '2.5px', width: '17px', height: '17px', borderRadius: '9px', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,.2)', display: 'block', transition: 'left .15s' }} />
    </button>
  )
}

export function Pill({ pill }) {
  const [label, fg, bg] = pill
  return <span style={{ font: `600 10.5px/1.2 ${FONT}`, color: fg, background: bg, padding: '5px 8px', borderRadius: '5px', whiteSpace: 'nowrap', display: 'inline-block' }}>{label}</span>
}

export function Thumb({ src, size = 34 }) {
  return (
    <span style={{ width: `${size}px`, height: `${size}px`, borderRadius: '7px', overflow: 'hidden', background: '#F6F7F4', border: `1px solid ${BORDER}`, flex: 'none', display: 'block', position: 'relative' }}>
      {src && <img src={src} alt="" loading="lazy" style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover' }} />}
    </span>
  )
}

const Chevron = ({ up }) => (
  <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d={up ? 'M5.5 12.5L10 8l4.5 4.5' : 'M5.5 8L10 12.5 14.5 8'} stroke={INK} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
export const TrashIcon = () => (
  <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M4.5 6h11M8 6V4.5h4V6M6 6l.7 9.5h6.6L14 6" stroke={DANGER} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
export const PencilIcon = () => (
  <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M12.8 4.2l3 3L8 15H5v-3l7.8-7.8z" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" /></svg>
)

const sq = { width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${BORDER}`, borderRadius: '7px', background: '#fff', padding: '0', cursor: 'pointer' }
const off = { opacity: 0.35, cursor: 'default' }

/** Move up / move down / remove buttons for an ordered row. */
export function OrderRemove({ first, last, onUp, onDown, onRemove, busy, label }) {
  return (
    <span style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
      <button type="button" aria-label={`Move ${label} up`} disabled={first || busy} onClick={onUp} style={{ ...sq, ...(first || busy ? off : null) }}><Chevron up /></button>
      <button type="button" aria-label={`Move ${label} down`} disabled={last || busy} onClick={onDown} style={{ ...sq, ...(last || busy ? off : null) }}><Chevron /></button>
      <button type="button" aria-label={`Remove ${label}`} disabled={busy} onClick={onRemove} style={{ ...sq, borderColor: '#F0D5CF', ...(busy ? off : null) }}><TrashIcon /></button>
    </span>
  )
}

export function SectionHead({ title, sub, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px' }}>
      <span style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: '1', minWidth: '0' }}>
        <span style={{ font: `600 14.5px/1.2 ${FONT}`, color: INK }}>{title}</span>
        <span style={{ font: `400 12.5px/1.45 ${FONT}`, color: MUTED }}>{sub}</span>
      </span>
      {right}
    </div>
  )
}

/** Bordered table with a header row; `cols` is a CSS grid template. */
export function Table({ cols, head, children, empty }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: cols, gap: '14px', padding: '11px 16px', background: '#F6F7F4', borderBottom: `1px solid ${BORDER}` }}>
        {head.map((h, i) => <span key={i} style={{ ...headCell, ...(i === head.length - 1 && h.right ? { textAlign: 'right' } : null) }}>{h.label ?? h}</span>)}
      </div>
      {empty ? <div style={{ padding: '26px 16px', textAlign: 'center', font: `400 12.5px/1.5 ${FONT}`, color: MUTED }}>{empty}</div> : children}
    </div>
  )
}

export function Row({ cols, children, dim, last }) {
  return (
    <div className="hv3" style={{ display: 'grid', gridTemplateColumns: cols, gap: '14px', padding: '12px 16px', borderBottom: last ? '0' : `1px solid ${DIVIDER}`, alignItems: 'center', opacity: dim ? 0.55 : 1 }}>
      {children}
    </div>
  )
}

/** Modal shell: overlay, card, header, scrollable body, footer. */
export function Modal({ title, sub, width = 480, onClose, busy, footer, children }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && !busy) onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, busy])
  return (
    <div onClick={() => !busy && onClose()} style={{ position: 'fixed', inset: '0', zIndex: '90', background: 'rgba(14,22,16,.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: `${width}px`, maxWidth: '100%', maxHeight: '100%', background: '#fff', borderRadius: '14px', boxShadow: '0 26px 60px rgba(10,18,12,.3)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '17px 20px 14px', borderBottom: `1px solid ${DIVIDER}`, display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <span style={{ font: `700 15px/1.2 ${FONT}`, color: INK }}>{title}</span>
          {sub && <span style={{ font: `400 12px/1.45 ${FONT}`, color: MUTED }}>{sub}</span>}
        </div>
        <div className="ad-scroll" style={{ padding: '16px 20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '13px' }}>{children}</div>
        <div style={{ padding: '13px 20px 16px', display: 'flex', alignItems: 'center', gap: '9px', borderTop: `1px solid ${DIVIDER}`, background: '#F6F7F4' }}>{footer}</div>
      </div>
    </div>
  )
}

/**
 * Search + multi-select list. `items`: [{ id, title, sub, image }].
 * Calls `onAdd(ids)` (async); the modal stays open while it runs.
 */
export function PickerModal({ title, sub, items, searchPlaceholder, emptyText, onAdd, onClose }) {
  const [q, setQ] = useState('')
  const [picked, setPicked] = useState([])
  const [busy, setBusy] = useState(false)
  const shown = useMemo(() => {
    const t = q.trim().toLowerCase()
    return t ? items.filter((i) => `${i.title} ${i.sub ?? ''}`.toLowerCase().includes(t)) : items
  }, [items, q])
  const toggle = (id) => setPicked((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]))
  const add = async () => {
    if (!picked.length || busy) return
    setBusy(true)
    const ok = await onAdd(picked)
    if (ok) onClose()
    else setBusy(false)
  }
  return (
    <Modal
      title={title}
      sub={sub}
      width={560}
      busy={busy}
      onClose={onClose}
      footer={(
        <>
          <span style={{ font: `500 12px/1.2 ${FONT}`, color: picked.length ? INK : MUTED, flex: '1' }}>{picked.length ? `${picked.length} selected` : 'Nothing selected yet'}</span>
          <button type="button" onClick={onClose} disabled={busy} style={btnSecondary}>Cancel</button>
          <button type="button" onClick={add} disabled={!picked.length || busy} style={{ ...btnSecondary, border: '0', background: '#0B3D1F', color: '#fff', opacity: !picked.length || busy ? 0.45 : 1, cursor: !picked.length || busy ? 'default' : 'pointer' }}>
            {busy ? 'Adding…' : 'Add'}
          </button>
        </>
      )}
    >
      <span style={{ position: 'relative', display: 'block' }}>
        <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ position: 'absolute', left: '11px', top: '11px' }}>
          <circle cx="9" cy="9" r="6" stroke={MUTED} strokeWidth="1.6" /><path d="M13.4 13.4L18 18" stroke={MUTED} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder={searchPlaceholder} style={{ ...inputStyle, paddingLeft: '34px' }} />
      </span>
      <div className="ad-scroll" style={{ border: `1px solid ${BORDER}`, borderRadius: '9px', maxHeight: '340px', overflowY: 'auto' }}>
        {shown.length === 0 && <div style={{ padding: '22px 14px', textAlign: 'center', font: `400 12.5px/1.4 ${FONT}`, color: MUTED }}>{items.length ? 'No matches' : emptyText}</div>}
        {shown.map((i, ix) => (
          <label key={i.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', borderTop: ix ? `1px solid ${DIVIDER}` : '0', cursor: 'pointer' }}>
            <input type="checkbox" checked={picked.includes(i.id)} onChange={() => toggle(i.id)} style={{ width: '16px', height: '16px', margin: '0', accentColor: '#0B3D1F', flex: 'none' }} />
            <Thumb src={i.image} size={38} />
            <span style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '0' }}>
              <span style={{ font: `600 12.5px/1.2 ${FONT}`, color: INK, ...ellipsis }}>{i.title}</span>
              {i.sub && <span style={{ font: `400 11px/1.2 ${FONT}`, color: MUTED, ...ellipsis }}>{i.sub}</span>}
            </span>
          </label>
        ))}
      </div>
    </Modal>
  )
}
