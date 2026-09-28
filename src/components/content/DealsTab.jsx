import { useMemo, useState } from 'react'
import { useCategoryNames } from '../../lib/categories'
import { couponStatus, discountSummary, useCoupons } from '../../lib/coupons'
import { featuredDeals } from '../../lib/content'
import { FONT, INK, MUTED, PILL, btnSecondary, ellipsis, shortDate } from './styles'
import { OrderRemove, Pill, PickerModal, Row, SectionHead, Table } from './ui'

const COLS = '50px minmax(0,2.4fr) 1.1fr 1fr 100px 120px'
const STATUS = { live: PILL.live, scheduled: PILL.scheduled, paused: PILL.paused, expired: PILL.expired }

/** Content › Deals: which coupons appear in the app's "Today's deals" rail. */
export default function DealsTab({ v, adding, setAdding }) {
  const featured = featuredDeals.useRows()
  const coupons = useCoupons()
  const categoryNames = useCategoryNames()
  const [busy, setBusy] = useState(false)

  const byId = useMemo(() => Object.fromEntries(coupons.rows.map((c) => [c.id, c])), [coupons.rows])
  const rows = featured.rows.filter((r) => byId[r.coupon_id])
  const detail = (c) => [discountSummary(c), c.category_id ? categoryNames[c.category_id] ?? 'Deleted category' : 'all products'].join(' · ')

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

  const available = coupons.rows
    .filter((c) => !featured.rows.some((r) => r.coupon_id === c.id) && couponStatus(c) !== 'expired')
    .map((c) => ({ id: c.id, title: c.title, sub: `${c.code} · ${detail(c)}${couponStatus(c) === 'paused' ? ' · paused' : ''}` }))

  let empty = null
  if (featured.status === 'off') empty = 'Supabase keys are missing · add them to .env to manage home content.'
  else if (featured.loading || coupons.loading) empty = 'Loading…'
  else if (featured.status === 'error') empty = `Couldn’t load deals · ${featured.error}`
  else if (!rows.length) empty = 'No deals on home yet · use “Add deal to home” to feature a promotion.'

  return (
    <>
      <SectionHead
        title="Deals on home"
        sub="Choose which promotions appear in the “Today’s deals” rail. Discounts, codes and rules are managed in Promotions. Paused or expired ones are hidden in the app automatically."
        right={(
          <button type="button" className="hv1" onClick={v.nav_promo} style={btnSecondary}>
            Manage promotions
            <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M8 5.5l4.5 4.5L8 14.5" stroke={INK} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        )}
      />
      <Table cols={COLS} head={['#', 'Promotion', 'Code', 'Ends', 'Status', { label: 'Order · remove', right: true }]} empty={empty}>
        {rows.map((r, i) => {
          const c = byId[r.coupon_id]
          const status = couponStatus(c)
          return (
            <Row key={r.coupon_id} cols={COLS} dim={status === 'paused' || status === 'expired'} last={i === rows.length - 1}>
              <span style={{ font: `700 11.5px/1.2 ${FONT}`, color: MUTED }}>{i + 1}</span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '0' }}>
                <span style={{ font: `600 13px/1.2 ${FONT}`, color: INK, ...ellipsis }}>{c.title}</span>
                <span style={{ font: `400 11.5px/1.2 ${FONT}`, color: MUTED, ...ellipsis }}>{detail(c)}</span>
              </span>
              <span>
                <span style={{ font: `700 11px/1.2 ui-monospace,Menlo,monospace`, letterSpacing: '.5px', color: '#0B3D1F', background: '#F1F9DF', border: '1px dashed #B9DE7A', padding: '4px 7px', borderRadius: '5px', whiteSpace: 'nowrap' }}>{c.code}</span>
              </span>
              <span style={{ font: `400 12.5px/1.2 ${FONT}`, color: MUTED }}>{c.ends_at ? shortDate(new Date(c.ends_at).toLocaleDateString('en-CA')) : 'Ongoing'}</span>
              <span><Pill pill={STATUS[status]} /></span>
              <OrderRemove
                label={c.title}
                first={i === 0}
                last={i === rows.length - 1}
                busy={busy}
                onUp={() => run(() => featuredDeals.move(rows, i, -1))}
                onDown={() => run(() => featuredDeals.move(rows, i, 1))}
                onRemove={() => run(() => featuredDeals.remove(r.coupon_id), `${c.title} removed from home`)}
              />
            </Row>
          )
        })}
      </Table>
      {adding && (
        <PickerModal
          title="Add deals to home"
          sub="Only promotions from the Promotions module can be featured."
          searchPlaceholder="Search promotions…"
          emptyText="No other live or scheduled promotions · create one in Promotions."
          items={available}
          onClose={() => setAdding(false)}
          onAdd={(ids) => run(() => featuredDeals.add(ids, featured.rows), `${ids.length} deal${ids.length === 1 ? '' : 's'} added to home`)}
        />
      )}
    </>
  )
}
