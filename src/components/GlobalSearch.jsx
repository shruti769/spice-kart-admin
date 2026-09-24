import { useEffect, useMemo, useRef, useState } from 'react'
import { searchConsole } from '../data/searchIndex'

const font = (weight, size, line = 1.2) => `${weight} ${size}px/${line} Inter,system-ui,sans-serif`

/**
 * Search box with a results dropdown over orders, products, customers, drivers,
 * categories and pages. Picking a result opens its screen.
 * `align` sets which edge of the box the dropdown lines up with.
 */
export default function GlobalSearch({ v, placeholder, width, background = '#fff', align = 'left' }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const root = useRef(null)
  const input = useRef(null)
  const results = useMemo(() => searchConsole(query), [query])

  useEffect(() => {
    if (!open) return
    const close = (e) => { if (!root.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  const pick = (r) => {
    setOpen(false)
    setQuery('')
    input.current?.blur()
    v[r.go]()
  }
  const onKeyDown = (e) => {
    if (e.key === 'Escape') { setOpen(false); input.current?.blur() }
    if (!results.length) return
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => (a + 1) % results.length) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => (a - 1 + results.length) % results.length) }
    else if (e.key === 'Enter') pick(results[Math.min(active, results.length - 1)])
  }

  const showPanel = open && query.trim().length > 0
  return (
    <span ref={root} style={{ position: 'relative', display: 'flex', flex: 'none' }}>
      <span className="sk-search" style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '34px', width, padding: '0 11px', border: '1px solid #E4E7E2', borderRadius: '8px', background, boxSizing: 'border-box', cursor: 'text' }} onClick={() => input.current?.focus()}>
        <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
          <circle cx="9" cy="9" r="6" stroke="#7C8A81" strokeWidth="1.6" />
          <path d="M13.4 13.4L18 18" stroke="#7C8A81" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <input
          ref={input}
          className="sk-search-input"
          type="search"
          value={query}
          placeholder={placeholder}
          aria-label={placeholder}
          aria-expanded={showPanel}
          onChange={(e) => { setQuery(e.target.value); setActive(0); setOpen(true) }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          style={{ flex: '1', minWidth: '0', border: '0', outline: 'none', background: 'transparent', padding: '0', font: font(400, 12.5), color: '#17201A' }}
        />
        {query && (
          <button type="button" aria-label="Clear search" onClick={() => { setQuery(''); input.current?.focus() }} style={{ border: '0', background: 'transparent', padding: '0', display: 'flex', cursor: 'pointer', flex: 'none' }}>
            <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke="#7C8A81" strokeWidth="1.8" strokeLinecap="round" /></svg>
          </button>
        )}
      </span>
      {showPanel && (
        <span className="ad-scroll" style={{ position: 'absolute', top: '40px', [align]: '0', zIndex: 80, width: '380px', maxHeight: '440px', overflowY: 'auto', background: '#fff', border: '1px solid #E4E7E2', borderRadius: '11px', boxShadow: '0 16px 38px rgba(16,24,16,.18)', display: 'flex', flexDirection: 'column', padding: '4px 0' }}>
          {results.length === 0 && (
            <span style={{ padding: '18px 14px', font: font(400, 12, 1.5), color: '#7C8A81' }}>
              No results for “{query.trim()}”. Try an order ID, product, SKU, customer or driver.
            </span>
          )}
          {results.map((r, i) => (
            <SearchRow key={r.group + r.title} r={r} first={i === 0 || results[i - 1].group !== r.group} active={i === active} onHover={() => setActive(i)} onPick={() => pick(r)} />
          ))}
        </span>
      )}
    </span>
  )
}

function SearchRow({ r, first, active, onHover, onPick }) {
  return (
    <>
      {first && (
        <span style={{ padding: '10px 13px 5px', font: font(600, 10), letterSpacing: '.6px', color: '#7C8A81', textTransform: 'uppercase' }}>{r.group}</span>
      )}
      <button
        type="button"
        onMouseEnter={onHover}
        onMouseDown={(e) => e.preventDefault()}
        onClick={onPick}
        style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', border: '0', background: active ? '#F7FCEE' : '#fff', padding: '8px 13px', cursor: 'pointer', textAlign: 'left' }}
      >
        <span style={{ width: '30px', height: '30px', borderRadius: '7px', background: '#F6F7F4', border: '1px solid #E4E7E2', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', overflow: 'hidden', font: font(600, 10), color: '#4A564E', boxSizing: 'border-box' }}>
          {r.image ? <img src={r.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : r.badge || r.title[0]}
        </span>
        <span style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: '0', flex: '1' }}>
          <span style={{ font: font(600, 12.5), color: '#17201A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.title}</span>
          <span style={{ font: font(400, 11), color: '#7C8A81', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.subtitle}</span>
        </span>
        {r.meta && <span style={{ font: font(600, 11), color: '#4A564E', whiteSpace: 'nowrap', flex: 'none' }}>{r.meta}</span>}
      </button>
    </>
  )
}
