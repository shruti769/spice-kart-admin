import { useState } from 'react'
import { num } from '../../lib/customers'
import { TOPICS, deleteCannedReply, saveCannedReply, topicLabel, useCannedReplies } from '../../lib/support'
import { isSupabaseConfigured } from '../../lib/supabase'
import { FONT, INK, MUTED, btnPrimary, btnSecondary, ellipsis, iconBtn, inputStyle, labelStyle } from '../content/styles'
import { Dropdown, Modal, PencilIcon, Row, Table, TrashIcon } from '../content/ui'

const COLS = 'minmax(160px,1.1fr) 2.6fr .8fr .7fr 76px'

function CannedReplyModal({ reply, flash, onClose }) {
  const [title, setTitle] = useState(reply?.title ?? '')
  const [topic, setTopic] = useState(reply?.topic ?? 'general')
  const [body, setBody] = useState(reply?.body ?? '')
  const [saving, setSaving] = useState(false)
  const ready = !!title.trim() && !!body.trim()

  const save = async () => {
    if (saving || !ready) return
    if (!isSupabaseConfigured) return flash('Supabase keys are missing · add them to .env and restart the dev server')
    setSaving(true)
    try {
      await saveCannedReply(reply?.id, { title: title.trim(), topic, body: body.trim() })
      flash(reply ? 'Canned reply saved' : 'Canned reply created · agents can insert it now')
      onClose()
    } catch (e) {
      setSaving(false)
      flash(e.message)
    }
  }

  return (
    <Modal
      title={reply ? 'Edit canned reply' : 'New canned reply'}
      sub="Available to every agent in the inbox composer."
      width={520}
      busy={saving}
      onClose={onClose}
      footer={(
        <span style={{ marginLeft: 'auto', display: 'flex', gap: '9px' }}>
          <button type="button" onClick={onClose} disabled={saving} style={btnSecondary}>Cancel</button>
          <button type="button" onClick={save} disabled={saving || !ready} style={{ ...btnPrimary, background: ready ? btnPrimary.background : '#9DB7A3', cursor: ready && !saving ? 'pointer' : 'default', opacity: saving ? 0.7 : 1 }}>
            {saving ? 'Saving…' : reply ? 'Save changes' : 'Create reply'}
          </button>
        </span>
      )}
    >
      <div className="r-stack-sm" style={{ display: 'grid', gridTemplateColumns: '1fr 150px', gap: '11px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '7px', minWidth: '0' }}>
          <span style={labelStyle}>Title</span>
          <input autoFocus value={title} maxLength={80} placeholder="e.g. Missing item – refund issued" onChange={(e) => setTitle(e.target.value)} style={inputStyle} />
        </label>
        <span style={{ display: 'flex', flexDirection: 'column', gap: '7px', minWidth: '0' }}>
          <span style={labelStyle}>Topic</span>
          <Dropdown label="Topic" value={topic} options={TOPICS} onChange={setTopic} />
        </span>
      </div>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
        <span style={labelStyle}>Message</span>
        <textarea value={body} maxLength={2000} rows={5} placeholder="Write the reply agents will insert…" onChange={(e) => setBody(e.target.value)} style={{ ...inputStyle, height: 'auto', minHeight: '108px', padding: '10px 11px', font: `400 12.5px/1.5 ${FONT}`, resize: 'vertical' }} />
      </label>
    </Modal>
  )
}

export default function CannedRepliesTab({ v, adding, setAdding }) {
  const list = useCannedReplies()
  const [editing, setEditing] = useState(null)
  const [busy, setBusy] = useState(null)
  const rows = list.data ?? []

  const remove = async (r) => {
    if (!window.confirm(`Delete “${r.title}”? Agents won’t be able to insert it any more.`)) return
    setBusy(r.id)
    try {
      await deleteCannedReply(r.id)
      v.flash('Canned reply deleted')
    } catch (e) {
      v.flash(e.message)
    } finally {
      setBusy(null)
    }
  }

  let empty = null
  if (list.status === 'off') empty = 'Supabase keys are missing · add them to .env to load canned replies.'
  else if (list.loading) empty = 'Loading canned replies…'
  else if (list.status === 'error' && !rows.length) empty = list.error
  else if (!rows.length) empty = 'No canned replies yet · add your first one.'

  return (
    <div className="ad-scroll sk-page" style={{ flex: '1', minHeight: '0', overflowY: 'auto', padding: '18px 26px 30px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <span style={{ font: `400 12.5px/1.5 ${FONT}`, color: MUTED, maxWidth: '640px' }}>
        Saved answers agents can insert from the inbox composer. Keep them short and friendly — agents edit before sending.
      </span>
      <Table cols={COLS} head={['Title', 'Message', 'Topic', 'Used', { label: 'Actions', right: true }]} empty={empty}>
        {rows.map((r, i) => (
          <Row key={r.id} cols={COLS} last={i === rows.length - 1}>
            <span style={{ font: `600 12.5px/1.3 ${FONT}`, color: INK, ...ellipsis }}>{r.title}</span>
            <span style={{ font: `400 12px/1.4 ${FONT}`, color: '#4A564E', ...ellipsis }} title={r.body}>{r.body}</span>
            <span style={{ font: `500 12px/1.2 ${FONT}`, color: INK }}>{topicLabel(r.topic)}</span>
            <span style={{ font: `400 12px/1.2 ${FONT}`, color: MUTED }}>{num(r.use_count)} {r.use_count === 1 ? 'time' : 'times'}</span>
            <span style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
              <button type="button" className="hv1" aria-label={`Edit ${r.title}`} onClick={() => setEditing(r)} style={iconBtn}><PencilIcon /></button>
              <button type="button" className="hv1" aria-label={`Delete ${r.title}`} disabled={busy === r.id} onClick={() => remove(r)} style={{ ...iconBtn, borderColor: '#F0D5CF' }}><TrashIcon /></button>
            </span>
          </Row>
        ))}
      </Table>
      {(adding || editing) && (
        <CannedReplyModal reply={editing} flash={v.flash} onClose={() => { setEditing(null); setAdding(false) }} />
      )}
    </div>
  )
}
