import { useMemo, useState } from 'react'
import { OOS_OPTIONS, featuredProducts, updateContentSettings, useContentSettings } from '../../lib/content'
import { isLowStock, isOutOfStock, useProducts } from '../../lib/products'
import { BORDER, DANGER, FONT, INK, MUTED, ellipsis, inputStyle, labelStyle, money, selectStyle } from './styles'
import { OrderRemove, PickerModal, Row, SectionHead, Table, Thumb, Toggle } from './ui'

const COLS = '50px minmax(0,2.4fr) 90px 130px 90px 120px'

function stockLabel(p) {
  if (!p.track_inventory) return ['Not tracked', MUTED]
  if (isOutOfStock(p)) return ['Out of stock', DANGER]
  if (isLowStock(p)) return [`${p.stock_qty} · low`, '#8A6100']
  return [`${p.stock_qty} in stock`, '#4A564E']
}

/** Rail title + out-of-stock behaviour; the title saves on blur / Enter. */
function RailSettings({ v }) {
  const settings = useContentSettings()
  const saved = settings.data.featured_products_title
  // Typed-but-unsaved title; null shows the saved one.
  const [draft, setDraft] = useState(null)
  const title = draft ?? saved
  const [err, setErr] = useState('')

  const save = async (patch, msg) => {
    try {
      await updateContentSettings(patch)
      v.flash(msg)
    } catch (e) {
      v.flash(`Could not save · ${e.message}`)
    }
  }
  const saveTitle = () => {
    const t = title.trim()
    if (!t) return setErr('The rail needs a title')
    setErr('')
    if (t === saved) return setDraft(null)
    save({ featured_products_title: t }, `Rail renamed to “${t}”`).finally(() => setDraft(null))
  }

  return (
    <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '16px 18px', display: 'grid', gridTemplateColumns: '1fr 240px', gap: '14px' }}>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
        <span style={labelStyle}>Rail title in app</span>
        <input value={title} maxLength={40} onChange={(e) => { setDraft(e.target.value); setErr('') }} onBlur={saveTitle} onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur() }} style={{ ...inputStyle, ...(err ? { borderColor: DANGER } : null) }} />
        {err && <span style={{ font: `400 11px/1.3 ${FONT}`, color: DANGER }}>{err}</span>}
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
        <span style={labelStyle}>When out of stock</span>
        <select
          value={settings.data.featured_products_oos}
          onChange={(e) => save({ featured_products_oos: e.target.value }, `Out-of-stock products: ${OOS_OPTIONS.find(([k]) => k === e.target.value)[1].toLowerCase()}`)}
          style={selectStyle}
        >
          {OOS_OPTIONS.map(([k, label]) => <option key={k} value={k}>{label}</option>)}
        </select>
      </label>
    </div>
  )
}

/** Content › Featured products: the product rail on the app's home screen. */
export default function FeaturedProductsTab({ v, adding, setAdding }) {
  const featured = featuredProducts.useRows()
  const products = useProducts()
  const settings = useContentSettings()
  const [busy, setBusy] = useState(false)

  const byId = useMemo(() => Object.fromEntries(products.rows.map((p) => [p.id, p])), [products.rows])
  const rows = featured.rows.filter((r) => byId[r.product_id])

  const run = async (task, msg) => {
    setBusy(true)
    try {
      await task()
      if (msg) v.flash(msg)
      return true
    } catch (e) {
      v.flash(e.message)
      return false
    } finally {
      setBusy(false)
    }
  }

  const available = products.rows
    .filter((p) => !featured.rows.some((r) => r.product_id === p.id))
    .map((p) => ({ id: p.id, title: p.name, sub: `${money(p.price)} · ${stockLabel(p)[0].toLowerCase()}${p.published === false ? ' · unpublished' : ''}`, image: p.image_url }))

  let empty = null
  if (featured.status === 'off') empty = 'Supabase keys are missing · add them to .env to manage home content.'
  else if (featured.loading || products.status === 'loading') empty = 'Loading…'
  else if (featured.status === 'error') empty = `Couldn’t load featured products · ${featured.error}`
  else if (!rows.length) empty = 'No featured products yet · use “Add products” to pick some.'

  return (
    <>
      <SectionHead title="Featured products" sub="A horizontal product rail on the home screen. Rename the rail and pick the products customers see first." />
      <RailSettings v={v} />
      <Table cols={COLS} head={['#', 'Product', 'Price', 'Stock', 'Visible', { label: 'Order · remove', right: true }]} empty={empty}>
        {rows.map((r, i) => {
          const p = byId[r.product_id]
          const [stock, stockColor] = stockLabel(p)
          return (
            <Row key={r.product_id} cols={COLS} dim={!r.visible} last={i === rows.length - 1}>
              <span style={{ font: `700 11.5px/1.2 ${FONT}`, color: MUTED }}>{i + 1}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '0' }}>
                <Thumb src={p.image_url} />
                <span style={{ font: `500 13px/1.2 ${FONT}`, color: INK, ...ellipsis }}>{p.name}</span>
              </span>
              <span style={{ font: `600 12.5px/1.2 ${FONT}`, color: INK }}>{money(p.price)}</span>
              <span style={{ font: `500 12.5px/1.2 ${FONT}`, color: stockColor, ...ellipsis }}>{stock}</span>
              <Toggle on={r.visible} label={`Show ${p.name}`} disabled={busy} onChange={(on) => run(() => featuredProducts.setVisible(r.product_id, on))} />
              <OrderRemove
                label={p.name}
                first={i === 0}
                last={i === rows.length - 1}
                busy={busy}
                onUp={() => run(() => featuredProducts.move(rows, i, -1))}
                onDown={() => run(() => featuredProducts.move(rows, i, 1))}
                onRemove={() => run(() => featuredProducts.remove(r.product_id), `${p.name} removed from the rail`)}
              />
            </Row>
          )
        })}
      </Table>
      {adding && (
        <PickerModal
          title="Add featured products"
          sub={`Pick products for the “${settings.data.featured_products_title}” rail.`}
          searchPlaceholder="Search products…"
          emptyText="Every product is already in the rail."
          items={available}
          onClose={() => setAdding(false)}
          onAdd={(ids) => run(() => featuredProducts.add(ids, featured.rows), `${ids.length} product${ids.length === 1 ? '' : 's'} added to the rail`)}
        />
      )}
    </>
  )
}
