import { useState } from 'react'
import { useCategoryNames } from '../lib/categories'
import { STATUS_PILL, bannerStatus, deleteBanner, destinationLabel, periodLabel, placementLabel, useBanners } from '../lib/banners'

const FONT = 'Inter,system-ui,sans-serif'
const MUTED = '#7C8A81'

const smallBtn = { height: '26px', padding: '0 9px', border: '1px solid #E4E7E2', borderRadius: '6px', background: '#fff', font: `600 11px/1.2 ${FONT}`, color: '#17201A', cursor: 'pointer', whiteSpace: 'nowrap' }
const dangerBtn = { ...smallBtn, border: '1px solid #EEDAD5', background: '#FDF7F5', color: '#A93826' }
const ellipsis = { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }

function Message({ children }) {
  return (
    <div style={{ padding: '28px 16px', border: '1px dashed #D5DAD2', borderRadius: '10px', background: '#fff', textAlign: 'center', font: `400 12.5px/1.5 ${FONT}`, color: MUTED }}>
      {children}
    </div>
  )
}

/** Content › Banners: every banner in `public.banners`, with edit and remove. */
export default function BannerGrid({ v }) {
  const banners = useBanners()
  const categoryNames = useCategoryNames()
  const [removing, setRemoving] = useState(null)

  const remove = async (b) => {
    if (removing || !window.confirm(`Delete the banner “${b.title}”? It disappears from the app straight away.`)) return
    setRemoving(b.id)
    try {
      await deleteBanner(b)
      v.flash(`Banner “${b.title}” deleted`)
    } catch (err) {
      v.flash(`Could not delete banner · ${err?.message || 'unknown error'}`)
    } finally {
      setRemoving(null)
    }
  }

  if (banners.status === 'off') return <Message>Supabase keys are missing · add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to .env to load banners.</Message>
  if (banners.loading) return <Message>Loading banners…</Message>
  if (banners.status === 'error' && !banners.rows.length) {
    return (
      <Message>
        Couldn’t load banners · {banners.error}
        <br />
        <button onClick={banners.refetch} style={{ ...smallBtn, marginTop: '10px' }}>Try again</button>
      </Message>
    )
  }
  if (!banners.rows.length) {
    return (
      <Message>
        No banners yet. Banners you create show here and, once published, in the app.
        <br />
        <button onClick={v.openBannerNew} style={{ ...smallBtn, marginTop: '10px' }}>Create banner</button>
      </Message>
    )
  }

  return (
    <div className="r-stack-sm" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px' }}>
      {banners.rows.map((b) => {
        const [label, fg, bg] = STATUS_PILL[bannerStatus(b)]
        return (
          <div key={b.id} style={{ background: '#fff', border: '1px solid #E4E7E2', borderRadius: '10px', overflow: 'hidden', display: 'flex', flexDirection: 'column', opacity: removing === b.id ? 0.5 : 1 }}>
            <span style={{ position: 'relative', height: '118px', background: '#F6F7F4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {b.image_url
                ? <img src={b.image_url} alt="" loading="lazy" style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover' }} />
                : <span style={{ font: `400 11px/1.2 ${FONT}`, color: MUTED }}>No image</span>}
              <span style={{ position: 'absolute', top: '8px', right: '8px', font: `600 10.5px/1.2 ${FONT}`, color: fg, background: bg, padding: '5px 8px', borderRadius: '5px', whiteSpace: 'nowrap' }}>{label}</span>
            </span>
            <span style={{ padding: '12px 13px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ font: `600 13px/1.2 ${FONT}`, color: '#17201A', ...ellipsis }}>{b.title}</span>
              <span style={{ font: `400 11px/1.2 ${FONT}`, color: MUTED, ...ellipsis }}>{destinationLabel(b, categoryNames)}</span>
              <span style={{ font: `400 11px/1.2 ${FONT}`, color: MUTED, ...ellipsis }}>{placementLabel(b.placement)} · position {b.priority}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '7px', borderTop: '1px solid #EFF1ED', marginTop: '3px' }}>
                <span style={{ font: `400 11px/1.2 ${FONT}`, color: MUTED, ...ellipsis }}>{periodLabel(b)}</span>
                <span style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
                  <button onClick={() => v.editBanner(b)} style={smallBtn}>Edit</button>
                  <button onClick={() => remove(b)} disabled={!!removing} style={dangerBtn}>{removing === b.id ? 'Removing…' : 'Remove'}</button>
                </span>
              </span>
            </span>
          </div>
        )
      })}
    </div>
  )
}
