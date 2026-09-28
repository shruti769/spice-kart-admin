import { useMemo, useState } from 'react'
import { useCategories } from '../../lib/categories'
import { FEATURED_CATEGORY_SLOTS, featuredCategories } from '../../lib/content'
import { useProducts } from '../../lib/products'
import { FONT, INK, MUTED, ellipsis } from './styles'
import { OrderRemove, PickerModal, Row, SectionHead, Table, Thumb, Toggle } from './ui'

const COLS = '50px minmax(0,2.4fr) 1fr 90px 120px'
const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`

/** Content › Featured categories: the round shortcuts on the app's home screen. */
export default function FeaturedCategoriesTab({ v, adding, setAdding }) {
  const featured = featuredCategories.useRows()
  const categories = useCategories()
  const products = useProducts()
  const [busy, setBusy] = useState(false)

  const byId = useMemo(() => Object.fromEntries(categories.rows.map((c) => [c.id, c])), [categories.rows])
  const counts = useMemo(() => {
    const out = {}
    for (const p of products.rows) out[p.category_id] = (out[p.category_id] || 0) + 1
    return out
  }, [products.rows])
  const rows = featured.rows.filter((r) => byId[r.category_id])
  const visibleCount = rows.filter((r) => r.visible).length
  // Only worth mentioning once the app's limit is reached.
  const slotNote = visibleCount > FEATURED_CATEGORY_SLOTS
    ? [`Only the first ${FEATURED_CATEGORY_SLOTS} of ${visibleCount} visible show in the app`, '#8A6100']
    : visibleCount === FEATURED_CATEGORY_SLOTS ? [`All ${FEATURED_CATEGORY_SLOTS} slots filled`, INK] : null

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

  const available = categories.rows
    .filter((c) => !featured.rows.some((r) => r.category_id === c.id))
    .map((c) => ({ id: c.id, title: c.name, sub: `${plural(counts[c.id] || 0, 'product')}${c.enabled === false ? ' · hidden in catalogue' : ''}`, image: c.image_url }))

  let empty = null
  if (featured.status === 'off') empty = 'Supabase keys are missing · add them to .env to manage home content.'
  else if (featured.loading || categories.loading) empty = 'Loading…'
  else if (featured.status === 'error') empty = `Couldn’t load featured categories · ${featured.error}`
  else if (!rows.length) empty = 'No featured categories yet · use “Add categories” to pick some.'

  return (
    <>
      <SectionHead
        title="Featured categories"
        sub={`The round category shortcuts under the banners on the home screen. First ${FEATURED_CATEGORY_SLOTS} visible ones are shown; hidden ones keep their place.`}
        right={slotNote && <span style={{ font: `600 12.5px/1.2 ${FONT}`, color: slotNote[1], whiteSpace: 'nowrap' }}>{slotNote[0]}</span>}
      />
      <Table cols={COLS} head={['#', 'Category', 'Products', 'Visible', { label: 'Order · remove', right: true }]} empty={empty}>
        {rows.map((r, i) => {
          const c = byId[r.category_id]
          return (
            <Row key={r.category_id} cols={COLS} dim={!r.visible} last={i === rows.length - 1}>
              <span style={{ font: `700 11.5px/1.2 ${FONT}`, color: MUTED }}>{i + 1}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '0' }}>
                <Thumb src={c.image_url} />
                <span style={{ font: `500 13px/1.2 ${FONT}`, color: INK, ...ellipsis }}>{c.name}</span>
              </span>
              <span style={{ font: `400 12.5px/1.2 ${FONT}`, color: MUTED }}>{products.status === 'ready' ? plural(counts[c.id] || 0, 'product') : '–'}</span>
              <Toggle on={r.visible} label={`Show ${c.name}`} disabled={busy} onChange={(on) => run(() => featuredCategories.setVisible(r.category_id, on))} />
              <OrderRemove
                label={c.name}
                first={i === 0}
                last={i === rows.length - 1}
                busy={busy}
                onUp={() => run(() => featuredCategories.move(rows, i, -1))}
                onDown={() => run(() => featuredCategories.move(rows, i, 1))}
                onRemove={() => run(() => featuredCategories.remove(r.category_id), `${c.name} removed from home`)}
              />
            </Row>
          )
        })}
      </Table>
      {adding && (
        <PickerModal
          title="Add featured categories"
          sub="Pick catalogue categories to show as home shortcuts."
          searchPlaceholder="Search categories…"
          emptyText="Every category is already featured."
          items={available}
          onClose={() => setAdding(false)}
          onAdd={(ids) => run(() => featuredCategories.add(ids, featured.rows), `${ids.length} ${ids.length === 1 ? 'category' : 'categories'} added to home`)}
        />
      )}
    </>
  )
}
