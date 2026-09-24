import { useCategoryNames } from '../lib/categories'
import { statusPill, stockPill, timeAgo } from '../lib/products'

const PRODUCT_GRID = '2.1fr 1fr 1fr .7fr .6fr minmax(96px,1fr) .9fr 120px'
const INVENTORY_GRID = '1.8fr 1fr .7fr .7fr .8fr .8fr minmax(104px,1.1fr) .9fr 90px'

const cell = { minWidth: '0', display: 'flex', alignItems: 'center', gap: '8px' }
const muted = { font: '400 11px/1.2 Inter,system-ui,sans-serif', color: '#7C8A81', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
const strong = (weight) => ({ font: `${weight} 12.5px/1.2 Inter,system-ui,sans-serif`, color: '#17201A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' })
const pill = (fg, bg) => ({ font: '600 10.5px/1.2 Inter,system-ui,sans-serif', color: fg, background: bg, padding: '5px 8px', borderRadius: '5px', whiteSpace: 'nowrap', display: 'inline-block' })
const smallBtn = { height: '26px', padding: '0 9px', border: '1px solid #E4E7E2', borderRadius: '6px', background: '#fff', font: '600 11px/1.2 Inter,system-ui,sans-serif', color: '#17201A', cursor: 'pointer', whiteSpace: 'nowrap' }
const money = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' })
const rowStyle = (grid, last) => ({ display: 'grid', gridTemplateColumns: grid, gap: '14px', padding: '13px 16px', borderBottom: last ? '0' : '1px solid #EFF1ED', alignItems: 'center', cursor: 'pointer' })

/** Click / Enter / Space on the row itself (not on a button inside it) runs `action`. */
const rowProps = (action) => ({
  role: 'button',
  tabIndex: 0,
  onClick: action,
  onKeyDown: (e) => { if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); action() } },
})
/** Button handler that doesn't also trigger the row's click. */
const only = (fn) => (e) => { e.stopPropagation(); fn() }

/** Loading / error / empty placeholder for a product list; null when there are rows to show. */
function listPlaceholder({ v, products, rows, emptyTitle, emptyText }) {
  if (products.status !== 'ready') {
    const msg = {
      loading: 'Loading products from Supabase…',
      error: `Couldn't load products from Supabase · ${products.error}`,
      off: 'Supabase is not configured · add the project URL and key to .env',
    }[products.status]
    return (
      <div style={{ padding: '13px 16px' }}>
        <span style={{ ...muted, whiteSpace: 'normal', color: products.status === 'loading' ? '#7C8A81' : '#B3402F' }}>{msg}</span>
      </div>
    )
  }
  if (rows.length) return null
  const none = products.rows.length === 0
  return (
    <div style={{ padding: '34px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textAlign: 'center' }}>
      <span style={{ font: '600 13.5px/1.2 Inter,system-ui,sans-serif', color: '#17201A' }}>{none ? 'No products yet' : emptyTitle}</span>
      <span style={{ font: '400 12px/1.45 Inter,system-ui,sans-serif', color: '#7C8A81', maxWidth: '360px' }}>
        {none ? 'Products you add appear here and in the customer app.' : emptyText}
      </span>
      {none && (
        <button onClick={v.nav_addproduct} style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '7px', height: '34px', padding: '0 13px', border: '0', borderRadius: '8px', background: '#0B3D1F', color: '#fff', font: '600 12.5px/1.2 Inter,system-ui,sans-serif', cursor: 'pointer', whiteSpace: 'nowrap' }}>
          <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
            <path d="M10 4.4v11.2M4.4 10h11.2" stroke="#8BE000" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          Add product
        </button>
      )}
    </div>
  )
}

/** "Showing n of total …" footer, rendered only when there are rows. */
export function ListFooter({ shown, total, noun }) {
  if (!shown) return null
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderTop: '1px solid #E4E7E2', background: '#fff' }}>
      <span style={{ font: '400 11.5px/1.2 Inter,system-ui,sans-serif', color: '#7C8A81', whiteSpace: 'nowrap' }}>
        Showing {shown.toLocaleString('en-AU')} of {total.toLocaleString('en-AU')} {noun}
      </span>
    </div>
  )
}

/**
 * Products-tab rows. `products` is the useProducts() state (for loading / error), `rows` the
 * filtered list to show. Clicking a row (or Edit) opens the edit form; "⋯" opens its actions.
 */
export default function LiveProductRows({ v, products, rows, emptyTitle, emptyText }) {
  const categoryNames = useCategoryNames()
  const placeholder = listPlaceholder({ v, products, rows, emptyTitle, emptyText })
  if (placeholder) return placeholder

  return rows.map((p, i) => {
    const [label, fg, bg] = statusPill(p)
    return (
      <div key={p.id} className="hv3" {...rowProps(() => v.editProduct(p))} style={rowStyle(PRODUCT_GRID, i === rows.length - 1)}>
        <span style={cell}>
          <span style={{ width: '15px', height: '15px', border: '1.5px solid #E4E7E2', borderRadius: '4px', background: '#fff', display: 'block', flex: 'none' }} />
          <span style={{ width: '30px', height: '30px', borderRadius: '7px', overflow: 'hidden', background: '#F6F7F4', border: '1px solid #E4E7E2', flex: 'none', display: 'block', position: 'relative' }}>
            {p.image_url && <img src={p.image_url} alt="" loading="lazy" style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover' }} />}
          </span>
          <span style={strong(600)}>{p.name}</span>
        </span>
        <span style={cell}><span style={muted}>{p.sku || '—'}</span></span>
        <span style={cell}><span style={muted}>{categoryNames[p.category_id] || p.category_id}</span></span>
        <span style={cell}><span style={strong(700)}>{money.format(Number(p.price))}</span></span>
        <span style={cell}><span style={strong(600)}>{p.track_inventory ? p.stock_qty : '—'}</span></span>
        <span style={cell}><span style={pill(fg, bg)}>{label}</span></span>
        <span style={cell}><span style={muted}>{timeAgo(p.updated_at || p.created_at)}</span></span>
        <span style={cell}>
          <span style={{ position: 'relative', marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button onClick={only(() => v.editProduct(p))} style={smallBtn}>Edit</button>
            <button onClick={only(() => v.openProductActions(p))} aria-label={`More actions for ${p.name}`} style={{ width: '26px', height: '26px', border: '1px solid #E4E7E2', borderRadius: '6px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
                <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
              </svg>
            </button>
          </span>
        </span>
      </div>
    )
  })
}

/** Inventory-tab rows. There is no reservation data yet, so Reserved is 0 and Available = on hand. */
export function InventoryRows({ v, products, rows, emptyTitle, emptyText }) {
  const categoryNames = useCategoryNames()
  const placeholder = listPlaceholder({ v, products, rows, emptyTitle, emptyText })
  if (placeholder) return placeholder

  return rows.map((p, i) => {
    const [label, fg, bg] = stockPill(p)
    return (
      <div key={p.id} className="hv3" {...rowProps(() => v.editProduct(p))} style={rowStyle(INVENTORY_GRID, i === rows.length - 1)}>
        <span style={cell}>
          <span style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: '0' }}>
            <span style={strong(600)}>{p.name}</span>
            <span style={muted}>{p.sku || '—'}</span>
          </span>
        </span>
        <span style={cell}><span style={muted}>{categoryNames[p.category_id] || p.category_id}</span></span>
        <span style={cell}><span style={strong(700)}>{p.stock_qty}</span></span>
        <span style={cell}><span style={muted}>0</span></span>
        <span style={cell}><span style={strong(600)}>{Math.max(0, p.stock_qty)}</span></span>
        <span style={cell}><span style={muted}>{p.min_stock != null ? `min ${p.min_stock}` : '—'}</span></span>
        <span style={cell}><span style={pill(fg, bg)}>{label}</span></span>
        <span style={cell}><span style={muted}>{timeAgo(p.updated_at || p.created_at)}</span></span>
        <span style={cell}>
          <span style={{ marginLeft: 'auto' }}>
            <button onClick={only(() => v.openStockAdjust(p))} style={smallBtn}>Adjust</button>
          </span>
        </span>
      </div>
    )
  })
}
