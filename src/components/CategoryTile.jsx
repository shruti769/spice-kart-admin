import { DEFAULT_BG, isValidHex } from '../lib/categories'

const FONT = 'Inter,system-ui,sans-serif'

/** Category tile preview: the image when there is one, else the tile colour with the first letter. */
export default function CategoryTile({ name, bg, src, size = 30, radius = 7 }) {
  return (
    <span style={{ width: `${size}px`, height: `${size}px`, borderRadius: `${radius}px`, overflow: 'hidden', background: isValidHex(bg || '') ? bg : DEFAULT_BG, border: '1px solid #E4E7E2', flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxSizing: 'border-box' }}>
      {src ? (
        <img src={src} alt="" loading="lazy" style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <span style={{ font: `700 ${Math.round(size * 0.42)}px/1 ${FONT}`, color: '#0B3D1F' }}>{(name || '?').trim().charAt(0).toUpperCase() || '?'}</span>
      )}
    </span>
  )
}
