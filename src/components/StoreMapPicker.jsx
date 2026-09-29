import { useState } from 'react'
import { mapEmbedUrl, mapLink, searchAddress } from '../lib/geocode'

const FONT = 'Inter,system-ui,sans-serif'
const INK = '#17201A'
const MUTED = '#7C8A81'
const BORDER = '#E4E7E2'
const btn = { display: 'flex', alignItems: 'center', gap: '7px', height: '34px', padding: '0 12px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', color: INK, font: `600 12.5px/1.2 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap' }

/**
 * "Find on map" for the store address (OpenStreetMap). `form` holds the address fields plus
 * latitude / longitude as strings; `onChange(patch)` applies picked fields to the form.
 */
export default function StoreMapPicker({ form, onChange, disabled }) {
  const [busy, setBusy] = useState(false)
  const [results, setResults] = useState(null) // null = no search yet
  const [error, setError] = useState('')

  const query = [form.address_line, form.suburb, form.state, form.postcode].map((s) => s.trim()).filter(Boolean).join(', ')
  const lat = form.latitude === '' ? null : Number(form.latitude)
  const lon = form.longitude === '' ? null : Number(form.longitude)
  const hasPin = Number.isFinite(lat) && Number.isFinite(lon) && lat !== null

  const find = async () => {
    if (!form.address_line.trim()) return setError('Type the street address first')
    setBusy(true)
    setError('')
    try {
      const found = await searchAddress(query)
      setResults(found)
      if (!found.length) setError('No match on OpenStreetMap · check the spelling, or try without the unit number')
    } catch (e) {
      setError(e.message)
      setResults(null)
    } finally {
      setBusy(false)
    }
  }

  const pick = (r) => {
    onChange({
      address_line: r.address_line || form.address_line,
      suburb: r.suburb || form.suburb,
      state: ['VIC', 'NSW', 'QLD', 'SA', 'WA', 'TAS', 'ACT', 'NT'].includes(r.state) ? r.state : form.state,
      postcode: /^\d{4}$/.test(r.postcode) ? r.postcode : form.postcode,
      latitude: String(r.lat),
      longitude: String(r.lon),
    })
    setResults(null)
  }

  return (
    <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '4px' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <button type="button" className="hv1" onClick={find} disabled={busy || disabled} style={{ ...btn, opacity: busy ? 0.7 : 1 }}>
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M10 17.5s5.4-4.7 5.4-8.6A5.4 5.4 0 004.6 8.9c0 3.9 5.4 8.6 5.4 8.6z" stroke="#4A564E" strokeWidth="1.5" /><circle cx="10" cy="8.6" r="1.9" stroke="#4A564E" strokeWidth="1.5" /></svg>
          {busy ? 'Searching…' : hasPin ? 'Find again on map' : 'Find on map'}
        </button>
        <span style={{ font: `400 11.5px/1.4 ${FONT}`, color: error ? '#B3402F' : MUTED }}>
          {error || (hasPin ? `Pinned at ${lat.toFixed(5)}, ${lon.toFixed(5)}` : 'Looks up the address above and pins it on the map')}
        </span>
        {hasPin && (
          <button type="button" onClick={() => onChange({ latitude: '', longitude: '' })} disabled={disabled} style={{ marginLeft: 'auto', border: '0', background: 'transparent', font: `600 12px/1.2 ${FONT}`, color: '#B3402F', cursor: 'pointer' }}>
            Remove pin
          </button>
        )}
      </span>

      {results?.length > 0 && (
        <div style={{ border: `1px solid ${BORDER}`, borderRadius: '9px', overflow: 'hidden' }}>
          <span style={{ display: 'block', padding: '8px 12px', background: '#F6F7F4', font: `600 11px/1.2 ${FONT}`, color: MUTED }}>Pick the right place</span>
          {results.map((r, i) => (
            <button key={`${r.lat},${r.lon}`} type="button" className="hv3" onClick={() => pick(r)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 12px', border: '0', borderTop: i ? '1px solid #EFF1ED' : '0', background: '#fff', font: `500 12.5px/1.4 ${FONT}`, color: INK, cursor: 'pointer' }}>
              {r.label}
            </button>
          ))}
        </div>
      )}

      {hasPin && (
        <span style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <iframe
            title="Store location"
            src={mapEmbedUrl(lat, lon)}
            loading="lazy"
            style={{ width: '100%', height: '220px', border: `1px solid ${BORDER}`, borderRadius: '9px' }}
          />
          <span style={{ display: 'flex', gap: '10px', font: `400 11px/1.3 ${FONT}`, color: MUTED }}>
            <span style={{ flex: '1' }}>Changed the address? Press “Find again on map” so the pin moves too. Save settings to keep it.</span>
            <a href={mapLink(lat, lon)} target="_blank" rel="noreferrer" style={{ color: '#1B5E30' }}>Open larger map</a>
            <span>© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer" style={{ color: MUTED }}>OpenStreetMap</a></span>
          </span>
        </span>
      )}
    </div>
  )
}
