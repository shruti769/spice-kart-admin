import { useState } from 'react'
import OfferTileModal from '../modals/OfferTileModal'
import { useCategories } from '../lib/categories'
import { STATUS_PILL, couponStatus, periodLabel, periodTitle } from '../lib/coupons'
import { useDeliverySettings } from '../lib/delivery'
import { deleteOfferTile, setOfferTileActive, tileImageSrc, tileText, updateOfferTile, useOfferTiles } from '../lib/offerTiles'

const FONT = 'Inter,system-ui,sans-serif'
const INK = '#17201A'
const MUTED = '#7C8A81'
const BORDER = '#E4E7E2'

const iconBtn = { width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${BORDER}`, borderRadius: '7px', background: '#fff', cursor: 'pointer', padding: '0', flex: 'none' }
const smallBtn = { height: '28px', padding: '0 10px', border: `1px solid ${BORDER}`, borderRadius: '7px', background: '#fff', font: `600 11.5px/1.2 ${FONT}`, color: INK, cursor: 'pointer', whiteSpace: 'nowrap' }

const Arrow = ({ up }) => (
  <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
    <path d={up ? 'M5.5 12l4.5-4.5 4.5 4.5' : 'M5.5 8l4.5 4.5L14.5 8'} stroke={INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const SECTIONS = [
  ['deal', 'Shop the deals', 'Image tiles in a 2-column grid. Tapping one opens its category.', 'Add deal'],
  ['bank', 'Bank & payment offers', 'Rows under the deals, with an icon and a small badge.', 'Add bank offer'],
]

/** Admin for the app's Offers screen: deal tiles and bank & payment offers (`public.offer_tiles`). */
export default function OfferTilesCard({ v }) {
  const tiles = useOfferTiles()
  const { rows: categories } = useCategories()
  const { data: delivery } = useDeliverySettings()
  const [modal, setModal] = useState(null) // null | { kind, tile }
  const [busyId, setBusyId] = useState(null)
  const [confirmId, setConfirmId] = useState(null)
  const catName = (id) => categories.find((c) => c.id === id)?.name
  const freeOver = delivery.free_delivery_over

  const run = async (id, task, msg) => {
    if (busyId) return
    setBusyId(id)
    try {
      await task()
      v.flash(msg)
    } catch (e) {
      v.flash(e.message)
    } finally {
      setBusyId(null)
    }
  }

  const move = (list, i, dir) => {
    const j = i + dir
    if (j < 0 || j >= list.length) return
    const order = [...list]
    ;[order[i], order[j]] = [order[j], order[i]]
    run(list[i].id, () => Promise.all(order.map((t, k) => (t.sort === k + 1 ? null : updateOfferTile(t.id, { sort: k + 1 })))), 'Order updated')
  }

  const remove = (t) => {
    if (confirmId !== t.id) return setConfirmId(t.id)
    setConfirmId(null)
    run(t.id, () => deleteOfferTile(t), `Deleted “${tileText(t.title, freeOver)}”`)
  }

  const add = (kind) => {
    const list = tiles.rows.filter((t) => t.kind === kind)
    setModal({ kind, tile: null, sort: Math.max(0, ...list.map((t) => t.sort)) + 1 })
  }

  return (
    <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 'none' }}>
      <span style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <span style={{ font: `600 14px/1.2 ${FONT}`, color: INK }}>Offers screen</span>
        <span style={{ font: `400 11.5px/1.4 ${FONT}`, color: MUTED }}>
          Everything below the coupons on the app’s Offers screen. Changes show in the app straight away.
          {tiles.status === 'error' && <span style={{ color: '#B3402F' }}> Couldn’t load · {tiles.error}</span>}
        </span>
      </span>

      {SECTIONS.map(([kind, title, sub, addLabel]) => {
        const list = tiles.rows.filter((t) => t.kind === kind)
        return (
          <div key={kind} style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
            <span className="r-wrap" style={{ display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
              <span style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, minWidth: 0 }}>
                <span style={{ font: `600 12.5px/1.2 ${FONT}`, color: INK }}>{title}</span>
                <span style={{ font: `400 11px/1.3 ${FONT}`, color: MUTED }}>{sub}</span>
              </span>
              <button className="hv1" onClick={() => add(kind)} style={smallBtn}>+ {addLabel}</button>
            </span>
            <div style={{ border: `1px solid ${BORDER}`, borderRadius: '9px', overflow: 'hidden' }}>
              {list.map((t, i) => {
                const status = couponStatus(t)
                const [pill, fg, bg] = STATUS_PILL[status]
                const busy = busyId === t.id
                const img = tileImageSrc(t.image_url)
                return (
                  <span key={t.id} className="r-wrap" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '9px 12px', borderTop: i ? '1px solid #EFF1ED' : '0', opacity: busy ? 0.6 : 1 }}>
                    <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <button aria-label="Move up" disabled={!i} onClick={() => move(list, i, -1)} style={{ ...iconBtn, width: '22px', height: '16px', border: 0, opacity: i ? 1 : 0.25 }}><Arrow up /></button>
                      <button aria-label="Move down" disabled={i === list.length - 1} onClick={() => move(list, i, 1)} style={{ ...iconBtn, width: '22px', height: '16px', border: 0, opacity: i === list.length - 1 ? 0.25 : 1 }}><Arrow /></button>
                    </span>
                    {kind === 'deal' && (
                      <span style={{ width: '72px', height: '36px', borderRadius: '6px', background: '#F6F7F4', overflow: 'hidden', flex: 'none', border: `1px solid ${BORDER}` }}>
                        {img && <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
                      </span>
                    )}
                    <span className="r-full" style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, minWidth: 0 }}>
                      <span style={{ font: `600 12.5px/1.2 ${FONT}`, color: INK, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tileText(t.title, freeOver)}</span>
                      <span style={{ font: `400 11px/1.2 ${FONT}`, color: MUTED, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {[tileText(t.subtitle, freeOver), kind === 'deal' ? `Opens ${catName(t.category_id) ?? 'Categories tab'}` : t.badge && `Badge: ${t.badge}`].filter(Boolean).join(' · ')}
                      </span>
                    </span>
                    <span title={periodTitle(t)} style={{ font: `400 11px/1.2 ${FONT}`, color: MUTED, whiteSpace: 'nowrap' }}>{periodLabel(t)}</span>
                    <span style={{ padding: '4px 8px', borderRadius: '6px', background: bg, color: fg, font: `600 10.5px/1.2 ${FONT}`, whiteSpace: 'nowrap' }}>{pill}</span>
                    <span style={{ display: 'flex', gap: '6px' }}>
                      <button className="hv1" onClick={() => setModal({ kind, tile: t })} style={smallBtn}>Edit</button>
                      <button className="hv1" onClick={() => run(t.id, () => setOfferTileActive(t.id, !t.active), t.active ? 'Paused · hidden from the app' : 'Activated')} style={smallBtn}>
                        {t.active ? 'Pause' : 'Activate'}
                      </button>
                      <button className="hv1" onClick={() => remove(t)} onBlur={() => setConfirmId(null)} style={{ ...smallBtn, borderColor: '#F0D5CF', color: '#B3402F' }}>
                        {confirmId === t.id ? 'Confirm' : 'Delete'}
                      </button>
                    </span>
                  </span>
                )
              })}
              {!list.length && (
                <span style={{ display: 'block', padding: '16px', textAlign: 'center', font: `400 12px/1.3 ${FONT}`, color: MUTED }}>
                  {tiles.loading ? 'Loading…' : `Nothing here · the app hides “${title}” until you add one.`}
                </span>
              )}
            </div>
          </div>
        )
      })}

      {modal && (
        <OfferTileModal
          tile={modal.tile}
          kind={modal.kind}
          categories={categories}
          freeOver={freeOver}
          sort={modal.sort}
          onClose={() => setModal(null)}
          onSaved={(msg) => { setModal(null); v.flash(msg) }}
        />
      )}
    </div>
  )
}
