import { useMemo, useState } from 'react'
import { num } from '../../lib/customers'
import { HELP_PLACEHOLDERS, HELP_TOPICS, deleteHelpArticle, helpfulPct, saveHelpArticle, topicLabel, useHelpArticles } from '../../lib/support'
import { isSupabaseConfigured } from '../../lib/supabase'
import { BORDER, FONT, INK, MUTED, btnPrimary, btnSecondary, ellipsis, hintText, iconBtn, inputStyle, labelStyle } from '../content/styles'
import { Dropdown, Modal, PencilIcon, Pill, Row, Table, TrashIcon } from '../content/ui'

const COLS = 'minmax(220px,2.4fr) .9fr .7fr .7fr .9fr 76px'
const STATUS = { published: ['Published', '#0B6B33', '#E9F6E3'], draft: ['Draft', '#5F6B62', '#EEF0EC'] }
const textarea = (rows) => ({ ...inputStyle, height: 'auto', padding: '10px 11px', font: `400 12.5px/1.5 ${FONT}`, resize: 'vertical', minHeight: `${rows * 19 + 20}px` })

function HelpArticleModal({ article, defaultTopic, flash, onClose }) {
  const [topic, setTopic] = useState(article?.topic ?? defaultTopic ?? 'orders')
  const [title, setTitle] = useState(article?.title ?? '')
  const [subtitle, setSubtitle] = useState(article?.subtitle ?? '')
  const [body, setBody] = useState(article?.body ?? '')
  const [stepsTitle, setStepsTitle] = useState(article ? article.steps_title : 'HOW TO')
  const [steps, setSteps] = useState((article?.steps ?? []).join('\n'))
  const [note, setNote] = useState(article?.note ?? '')
  const [status, setStatus] = useState(article?.status ?? 'published')
  const [saving, setSaving] = useState(false)
  const ready = !!title.trim() && !!body.trim()
  const published = status === 'published'
  // Live values are mostly used in delivery answers; show the list there or once one is used.
  const usesPlaceholders = topic === 'delivery' || /\{\w+\}/.test(`${body} ${steps} ${note}`)

  const save = async () => {
    if (saving || !ready) return
    if (!isSupabaseConfigured) return flash('Supabase keys are missing · add them to .env and restart the dev server')
    setSaving(true)
    const stepList = steps.split('\n').map((x) => x.trim()).filter(Boolean)
    try {
      await saveHelpArticle(article?.id, {
        topic, title: title.trim(), subtitle: subtitle.trim(), body: body.trim(),
        steps_title: stepList.length ? stepsTitle.trim().toUpperCase() : '', steps: stepList, note: note.trim(),
        status,
      })
      flash(published ? 'Article published · live in the app’s Help centre' : 'Saved as a draft · hidden from the app')
      onClose()
    } catch (e) {
      setSaving(false)
      flash(e.message)
    }
  }

  const field = (label, control, extra) => (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '7px', minWidth: '0', ...extra }}>
      <span style={labelStyle}>{label}</span>
      {control}
    </label>
  )

  return (
    <Modal
      title={article ? 'Edit help article' : 'New help article'}
      sub="Published articles appear on the matching Help centre topic screen in the app."
      width={620}
      busy={saving}
      onClose={onClose}
      footer={(
        <span style={{ marginLeft: 'auto', display: 'flex', gap: '9px' }}>
          <button type="button" onClick={onClose} disabled={saving} style={btnSecondary}>Cancel</button>
          <button type="button" onClick={save} disabled={saving || !ready} style={{ ...btnPrimary, background: ready ? btnPrimary.background : '#9DB7A3', cursor: ready && !saving ? 'pointer' : 'default', opacity: saving ? 0.7 : 1 }}>
            {saving ? 'Saving…' : article ? 'Save changes' : published ? 'Publish' : 'Save draft'}
          </button>
        </span>
      )}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 150px', gap: '11px' }}>
        {field('Question / title', <input autoFocus value={title} maxLength={120} placeholder="e.g. Where is my order?" onChange={(e) => setTitle(e.target.value)} style={inputStyle} />)}
        <span style={{ display: 'flex', flexDirection: 'column', gap: '7px', minWidth: '0' }}>
          <span style={labelStyle}>Topic</span>
          <Dropdown label="Topic" value={topic} options={HELP_TOPICS} onChange={setTopic} />
        </span>
      </div>
      {field('Short summary', <input value={subtitle} maxLength={160} placeholder="Shown under the question" onChange={(e) => setSubtitle(e.target.value)} style={inputStyle} />)}
      {field('Answer', <textarea value={body} maxLength={5000} onChange={(e) => setBody(e.target.value)} style={textarea(3)} />)}
      <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '11px', alignItems: 'start' }}>
        {field('Steps heading', <input value={stepsTitle} maxLength={60} onChange={(e) => setStepsTitle(e.target.value)} style={inputStyle} />)}
        {field('Steps · one per line', <textarea value={steps} onChange={(e) => setSteps(e.target.value)} style={textarea(4)} />)}
      </div>
      {field('Closing note', <textarea value={note} maxLength={500} onChange={(e) => setNote(e.target.value)} style={textarea(2)} />)}
      {usesPlaceholders && (
        <span style={{ ...hintText, lineHeight: 1.5, marginTop: '-4px' }}>
          Live values the app fills in: {HELP_PLACEHOLDERS.join(' ')}
        </span>
      )}
      <span style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
        <span style={labelStyle}>Status</span>
        <span role="radiogroup" aria-label="Status" style={{ display: 'flex', gap: '3px', padding: '3px', background: '#EEF0EC', borderRadius: '9px' }}>
          {[['published', 'Published'], ['draft', 'Draft']].map(([k, l]) => {
            const on = status === k
            return (
              <button key={k} type="button" role="radio" aria-checked={on} onClick={() => setStatus(k)} style={{ flex: '1', height: '30px', border: '0', borderRadius: '7px', background: on ? '#fff' : 'transparent', boxShadow: on ? '0 1px 2px rgba(0,0,0,.12)' : 'none', font: `600 12.5px/1.2 ${FONT}`, color: on ? INK : MUTED, cursor: 'pointer' }}>
                {l}
              </button>
            )
          })}
        </span>
      </span>
    </Modal>
  )
}

export default function HelpCentreTab({ v, adding, setAdding }) {
  const list = useHelpArticles()
  const [topic, setTopic] = useState('all')
  const [editing, setEditing] = useState(null)
  const [busy, setBusy] = useState(null)
  const all = useMemo(() => list.data ?? [], [list.data])
  const rows = useMemo(() => {
    const order = HELP_TOPICS.map(([k]) => k)
    return all.filter((a) => topic === 'all' || a.topic === topic)
      .sort((a, b) => order.indexOf(a.topic) - order.indexOf(b.topic) || a.sort - b.sort)
  }, [all, topic])

  const remove = async (a) => {
    if (!window.confirm(`Delete “${a.title}”? It disappears from the app’s Help centre straight away.`)) return
    setBusy(a.id)
    try {
      await deleteHelpArticle(a.id)
      v.flash('Article deleted')
    } catch (e) {
      v.flash(e.message)
    } finally {
      setBusy(null)
    }
  }

  let empty = null
  if (list.status === 'off') empty = 'Supabase keys are missing · add them to .env to load articles.'
  else if (list.loading) empty = 'Loading articles…'
  else if (list.status === 'error' && !all.length) empty = list.error
  else if (!rows.length) empty = topic === 'all' ? 'No articles yet · add your first one.' : `No ${topicLabel(topic)} articles yet.`

  const topicBtn = (key, label, n) => {
    const on = topic === key
    return (
      <button key={key} type="button" onClick={() => setTopic(key)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', width: '100%', height: '34px', padding: '0 10px', border: '0', borderRadius: '8px', background: on ? '#F1F9DF' : 'transparent', font: `${on ? 600 : 500} 12.5px/1.2 ${FONT}`, color: on ? '#0B3D1F' : INK, cursor: 'pointer', textAlign: 'left' }}>
        <span style={ellipsis}>{label}</span>
        <span style={{ font: `500 11px/1 ${FONT}`, color: on ? '#0B3D1F' : MUTED }}>{n}</span>
      </button>
    )
  }

  return (
    <div className="ad-scroll" style={{ flex: '1', minHeight: '0', overflowY: 'auto', padding: '18px 26px 30px', display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
      <div style={{ width: '180px', flex: 'none', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <span style={{ ...labelStyle, padding: '2px 10px 8px' }}>Topics</span>
        {topicBtn('all', 'All articles', all.length)}
        {HELP_TOPICS.map(([k, l]) => topicBtn(k, l, all.filter((a) => a.topic === k).length))}
      </div>
      <div style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <span style={{ font: `400 12.5px/1.5 ${FONT}`, color: MUTED }}>
          Articles shown on the app’s Help centre topic screens. Each opens inline as an expandable question.
        </span>
        <Table cols={COLS} head={['Article', 'Topic', 'Views', 'Helpful', 'Status', { label: 'Actions', right: true }]} empty={empty}>
          {rows.map((a, i) => {
            const pct = helpfulPct(a)
            const votes = a.helpful_yes + a.helpful_no
            return (
              <Row key={a.id} cols={COLS} last={i === rows.length - 1} dim={a.status === 'draft'}>
                <span style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '0' }}>
                  <span style={{ font: `600 12.5px/1.3 ${FONT}`, color: INK, ...ellipsis }}>{a.title}</span>
                  {a.subtitle && <span style={{ font: `400 11.5px/1.2 ${FONT}`, color: MUTED, ...ellipsis }}>{a.subtitle}</span>}
                </span>
                <span style={{ font: `500 12px/1.2 ${FONT}`, color: INK }}>{topicLabel(a.topic)}</span>
                <span style={{ font: `400 12px/1.2 ${FONT}`, color: INK }}>{num(a.views)}</span>
                <span title={votes ? `${num(a.helpful_yes)} yes · ${num(a.helpful_no)} no` : 'No votes yet'} style={{ font: `600 12px/1.2 ${FONT}`, color: pct == null ? MUTED : pct >= 78 ? '#0B6B33' : pct >= 75 ? INK : '#A95A00' }}>
                  {pct == null ? '—' : `${pct}%`}
                </span>
                <span><Pill pill={STATUS[a.status] ?? STATUS.draft} /></span>
                <span style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                  <button type="button" className="hv1" aria-label={`Edit ${a.title}`} onClick={() => setEditing(a)} style={iconBtn}><PencilIcon /></button>
                  <button type="button" className="hv1" aria-label={`Delete ${a.title}`} disabled={busy === a.id} onClick={() => remove(a)} style={{ ...iconBtn, borderColor: '#F0D5CF' }}><TrashIcon /></button>
                </span>
              </Row>
            )
          })}
        </Table>
      </div>
      {(adding || editing) && (
        <HelpArticleModal article={editing} defaultTopic={topic === 'all' ? undefined : topic} flash={v.flash} onClose={() => { setEditing(null); setAdding(false) }} />
      )}
    </div>
  )
}
