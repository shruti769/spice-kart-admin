import { useState } from 'react'
import AnnouncementModal from '../../modals/AnnouncementModal'
import { announcementStatus, audienceLabel, deleteAnnouncement, placementLabel, typeMeta, updateAnnouncement, useAnnouncements } from '../../lib/announcements'
import { FONT, INK, MUTED, btnSecondary, ellipsis, iconBtn, shortDate } from './styles'
import { PencilIcon, Row, SectionHead, Table, Toggle, TrashIcon } from './ui'

const COLS = 'minmax(0,2.6fr) 1fr 1.2fr 1.2fr 70px 80px'

function period(a) {
  if (a.starts_on && a.ends_on) return `${shortDate(a.starts_on)} – ${shortDate(a.ends_on)}`
  if (a.starts_on) return `${shortDate(a.starts_on)} · ongoing`
  if (a.ends_on) return `Until ${shortDate(a.ends_on)}`
  return 'Ongoing'
}

const STATUS_NOTE = { scheduled: 'Scheduled', expired: 'Ended' }

/** Content › Announcements: in-app notices (top bar or popup). */
export default function AnnouncementsTab({ v, adding, setAdding }) {
  const announcements = useAnnouncements()
  const [editing, setEditing] = useState(null)
  const [busy, setBusy] = useState(null)

  const run = async (id, task, msg) => {
    setBusy(id)
    try {
      await task()
      if (msg) v.flash(msg)
    } catch (e) {
      v.flash(e.message)
    } finally {
      setBusy(null)
    }
  }
  const remove = (a) => {
    if (!window.confirm(`Delete “${a.title}”? It disappears from the app straight away.`)) return
    run(a.id, () => deleteAnnouncement(a.id), 'Announcement deleted')
  }

  let empty = null
  if (announcements.status === 'off') empty = 'Supabase keys are missing · add them to .env to manage announcements.'
  else if (announcements.loading) empty = 'Loading…'
  else if (announcements.status === 'error' && !announcements.rows.length) empty = `Couldn’t load announcements · ${announcements.error}`
  else if (!announcements.rows.length) empty = 'No announcements yet · use “New announcement” to add one.'

  const rows = announcements.rows
  return (
    <>
      <SectionHead
        title="Announcements"
        sub="In-app notices shown as a slim bar on the home screen, or a one-time popup. For push messages use Notifications."
        right={<button type="button" className="hv1" onClick={v.nav_notif} style={btnSecondary}>Push notifications</button>}
      />
      <Table cols={COLS} head={['Message', 'Placement', 'Audience', 'Period', 'Live', { label: 'Actions', right: true }]} empty={empty}>
        {rows.map((a, i) => {
          const status = announcementStatus(a)
          const note = STATUS_NOTE[status]
          const [, , dot] = typeMeta(a.type)
          return (
            <Row key={a.id} cols={COLS} dim={busy === a.id || status === 'expired'} last={i === rows.length - 1}>
              <span style={{ display: 'flex', gap: '10px', minWidth: '0' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '4px', background: dot, flex: 'none', marginTop: '5px' }} />
                <span style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '0' }}>
                  <span style={{ font: `600 13px/1.25 ${FONT}`, color: INK, ...ellipsis }}>{a.title || a.message}</span>
                  {a.title && a.message && <span style={{ font: `400 11.5px/1.3 ${FONT}`, color: MUTED, ...ellipsis }}>{a.message}</span>}
                </span>
              </span>
              <span style={{ font: `400 12.5px/1.2 ${FONT}`, color: '#4A564E' }}>{placementLabel(a.placement)}</span>
              <span style={{ font: `400 12.5px/1.2 ${FONT}`, color: MUTED, ...ellipsis }}>{audienceLabel(a.audience)}</span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: '0' }}>
                <span style={{ font: `400 12.5px/1.2 ${FONT}`, color: MUTED, ...ellipsis }}>{period(a)}</span>
                {a.active && note && <span style={{ font: `600 10.5px/1.2 ${FONT}`, color: status === 'expired' ? '#A93826' : '#8A6100' }}>{note}</span>}
              </span>
              <Toggle on={a.active} label={`${a.title} live`} disabled={busy === a.id} onChange={(on) => run(a.id, () => updateAnnouncement(a.id, { active: on }), on ? 'Announcement is live' : 'Announcement paused')} />
              <span style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                <button type="button" className="hv1" aria-label={`Edit ${a.title}`} onClick={() => setEditing(a)} style={iconBtn}><PencilIcon /></button>
                <button type="button" className="hv1" aria-label={`Delete ${a.title}`} disabled={busy === a.id} onClick={() => remove(a)} style={{ ...iconBtn, borderColor: '#F0D5CF' }}><TrashIcon /></button>
              </span>
            </Row>
          )
        })}
      </Table>
      {(adding || editing) && (
        <AnnouncementModal key={editing?.id ?? 'new'} v={v} announcement={editing} onClose={() => { setAdding(false); setEditing(null) }} />
      )}
    </>
  )
}
