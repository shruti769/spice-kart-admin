import { useEffect, useState } from 'react'
import { useCategories } from '../lib/categories'
import { AUDIENCES, CAMPAIGN_TYPES, LINK_PAGES, campaignReach, saveCampaign, sendCampaignNow } from '../lib/notifications'
import { isSupabaseConfigured } from '../lib/supabase'

const FONT = 'Inter,system-ui,sans-serif'
const INK = '#17201A'
const MUTED = '#7C8A81'
const BORDER = '#E4E7E2'
const ERROR_RED = '#B3402F'

const labelStyle = { font: `600 10.5px/1.2 ${FONT}`, letterSpacing: '.4px', color: MUTED, textTransform: 'uppercase', whiteSpace: 'nowrap' }
const box = { height: '36px', padding: '0 11px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', font: `500 12.5px/1.2 ${FONT}`, color: INK, width: '100%', minWidth: '0', boxSizing: 'border-box', outline: 'none' }
const selectBox = { ...box, appearance: 'none', WebkitAppearance: 'none', paddingRight: '30px', background: '#fff', cursor: 'pointer' }
const withError = (s, e) => (e ? { ...s, borderColor: ERROR_RED } : s)
const card = { background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }
const cardTitle = { font: `600 13.5px/1.2 ${FONT}`, color: INK }
const btn = { display: 'flex', alignItems: 'center', gap: '7px', height: '34px', padding: '0 12px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', color: INK, font: `600 12.5px/1.2 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap' }

function Field({ label, error, hint, span2, children }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '0', ...(span2 ? { gridColumn: 'span 2' } : null) }}>
      <span style={labelStyle}>{label}</span>
      {children}
      {error ? <span style={{ font: `500 11px/1.3 ${FONT}`, color: ERROR_RED }}>{error}</span> : hint && <span style={{ font: `400 11px/1.3 ${FONT}`, color: MUTED }}>{hint}</span>}
    </label>
  )
}

/** ISO → value for <input type="datetime-local"> in the browser's time zone. */
function toLocalInput(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`
}
const tz = Intl.DateTimeFormat().resolvedOptions().timeZone

export default function NewNotification({ v }) {
  const editing = v.editingCampaign?.id ? v.editingCampaign : null
  const src = v.editingCampaign // also set when duplicating (id '')
  const { rows: categories } = useCategories()
  const [title, setTitle] = useState(src?.title ?? '')
  const [message, setMessage] = useState(src?.message ?? '')
  const [type, setType] = useState(src?.type ?? 'promotional')
  const [cta, setCta] = useState(src?.cta_label ?? '')
  const [link, setLink] = useState(src?.link ?? '')
  const [audience, setAudience] = useState(src?.audience ?? 'all')
  const [mode, setMode] = useState(editing?.scheduled_at ? 'scheduled' : 'now')
  const [when, setWhen] = useState(toLocalInput(editing?.scheduled_at))
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [reach, setReach] = useState(null) // { audience_size, reachable } | { error }

  useEffect(() => {
    if (!isSupabaseConfigured) return
    let cancelled = false
    const t = setTimeout(() => {
      campaignReach(audience, type)
        .then((r) => { if (!cancelled) setReach(r) })
        .catch((e) => { if (!cancelled) setReach({ error: e.message }) })
    }, 200)
    return () => { cancelled = true; clearTimeout(t) }
  }, [audience, type])

  const clear = (k) => setErrors((e) => ({ ...e, [k]: undefined }))
  const validate = (sending) => {
    const e = {}
    if (!title.trim()) e.title = 'Title is required'
    if (!message.trim()) e.message = 'Message is required'
    if (sending && mode === 'scheduled') {
      if (!when) e.when = 'Pick a date and time'
      else if (new Date(when).getTime() < Date.now() + 60000) e.when = 'Pick a time at least a minute from now'
    }
    setErrors(e)
    return !Object.keys(e).length
  }
  const row = (status) => ({
    title: title.trim(),
    message: message.trim(),
    type,
    cta_label: cta.trim(),
    link: link || null,
    audience,
    scheduled_at: mode === 'scheduled' && when ? new Date(when).toISOString() : null,
    status,
  })

  const submit = async (action) => {
    if (saving || !validate(action !== 'draft')) return
    if (!isSupabaseConfigured) return v.flash('Supabase keys are missing · add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to .env and restart the dev server')
    if (action === 'send' && !window.confirm(`Send “${title.trim()}” to ${AUDIENCES.find(([k]) => k === audience)[1].toLowerCase()} now? This can’t be undone.`)) return
    setSaving(true)
    try {
      if (action === 'draft') {
        await saveCampaign(editing?.id, row('draft'))
        v.flash('Saved as a draft')
      } else if (action === 'schedule') {
        await saveCampaign(editing?.id, row('scheduled'))
        v.flash(`Scheduled for ${new Date(when).toLocaleString('en-AU', { dateStyle: 'medium', timeStyle: 'short' })}`)
      } else {
        const saved = await saveCampaign(editing?.id, row('draft'))
        const n = await sendCampaignNow(saved.id)
        v.flash(n ? `Sent to ${n} customer${n === 1 ? '' : 's'} · push notifications go out within a minute` : 'Sent · no customers matched the audience')
      }
      v.campaignDone()
    } catch (e) {
      setSaving(false)
      v.flash(`Could not save · ${e.message}`)
    }
  }

  const reachText = !reach ? 'Checking reach…'
    : reach.error ? reach.error
      : `${reach.audience_size.toLocaleString('en-AU')} customer${reach.audience_size === 1 ? '' : 's'} · ${reach.reachable.toLocaleString('en-AU')} with push enabled on a device`
  const primary = mode === 'scheduled' ? ['schedule', 'Schedule send'] : ['send', 'Send now']

  return (
    <>
      <div className="sk-topbar" style={{ display: 'flex', alignItems: 'flex-end', gap: '18px', padding: '24px 26px 2px' }}>
        <span style={{ display: 'flex', flexDirection: 'column', gap: '5px', minWidth: '0' }}>
          <span style={{ font: `700 20px/1.2 ${FONT}`, color: INK, whiteSpace: 'nowrap' }}>{editing ? 'Edit notification' : 'Create notification'}</span>
          <span style={{ font: `400 12.5px/1.2 ${FONT}`, color: MUTED, whiteSpace: 'nowrap' }}>Push notification to the Spice Kart app, also saved in each customer’s inbox</span>
        </span>
        <span className="r-wrap" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button className="hv1" onClick={v.campaignDone} disabled={saving} style={btn}>Cancel</button>
          <button className="hv1" onClick={() => submit('draft')} disabled={saving} style={btn}>Save as draft</button>
          <button className="hv2" onClick={() => submit(primary[0])} disabled={saving} style={{ ...btn, border: '0', background: '#0B3D1F', color: '#fff', opacity: saving ? 0.7 : 1 }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none"><path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#8BE000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            {saving ? 'Saving…' : primary[1]}
          </button>
        </span>
      </div>
      <div className="ad-scroll sk-page" style={{ flex: '1', minHeight: '0', overflowY: 'auto', padding: '20px 26px 30px' }}>
        <div className="r-stack" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.5fr) minmax(280px,1fr)', gap: '18px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={card}>
              <span style={cardTitle}>Message</span>
              <div className="r-stack-sm" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <Field label="Title" error={errors.title} hint={`${title.length}/65`}>
                  <input value={title} maxLength={65} placeholder="e.g. 20% off fresh produce" onChange={(e) => { setTitle(e.target.value); clear('title') }} style={withError(box, errors.title)} />
                </Field>
                <Field label="Notification type" hint={type === 'promotional' ? 'Only reaches customers who opted in to marketing' : 'Reaches everyone with push notifications on'}>
                  <select value={type} onChange={(e) => setType(e.target.value)} style={selectBox}>
                    {CAMPAIGN_TYPES.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
                  </select>
                </Field>
                <Field label="Message" span2 error={errors.message} hint={`${message.length}/178`}>
                  <textarea value={message} maxLength={178} rows={3} placeholder="What should customers know?" onChange={(e) => { setMessage(e.target.value); clear('message') }} style={withError({ ...box, height: 'auto', padding: '10px 11px', font: `400 12.5px/1.55 ${FONT}`, resize: 'vertical' }, errors.message)} />
                </Field>
                <Field label="CTA label" hint="Shown in the app inbox">
                  <input value={cta} maxLength={20} placeholder="e.g. Shop now" onChange={(e) => setCta(e.target.value)} style={box} />
                </Field>
                <Field label="Destination" hint="Opens when the notification is tapped">
                  <select value={link} onChange={(e) => setLink(e.target.value)} style={selectBox}>
                    <option value="">Inbox only</option>
                    <optgroup label="Screen">
                      {LINK_PAGES.map((p) => <option key={p} value={`page:${p}`}>{p}</option>)}
                    </optgroup>
                    {categories.length > 0 && (
                      <optgroup label="Category">
                        {categories.map((c) => <option key={c.id} value={`category:${c.id}`}>Category → {c.name}</option>)}
                      </optgroup>
                    )}
                  </select>
                </Field>
              </div>
            </div>

            <div style={card}>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ ...cardTitle, flex: '1' }}>Audience</span>
                <span style={{ font: `500 11.5px/1.3 ${FONT}`, color: reach?.error ? ERROR_RED : MUTED }}>{reachText}</span>
              </span>
              <span style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {AUDIENCES.map(([k, l, sub]) => {
                  const on = audience === k
                  return (
                    <button key={k} type="button" aria-pressed={on} onClick={() => setAudience(k)} title={sub} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '3px', padding: '9px 12px', border: `1px solid ${on ? '#9FD35A' : BORDER}`, borderRadius: '9px', background: on ? '#F1F9DF' : '#fff', cursor: 'pointer' }}>
                      <span style={{ font: `600 12.5px/1.2 ${FONT}`, color: on ? '#0B3D1F' : INK }}>{l}</span>
                      {sub && <span style={{ font: `400 10.5px/1.2 ${FONT}`, color: MUTED }}>{sub}</span>}
                    </button>
                  )
                })}
              </span>
            </div>

            <div style={card}>
              <span style={cardTitle}>Send</span>
              <span style={{ display: 'flex', gap: '3px', padding: '3px', background: '#EEF0EC', borderRadius: '9px', alignSelf: 'flex-start' }}>
                {[['now', 'Send now'], ['scheduled', 'Schedule']].map(([k, l]) => (
                  <button key={k} type="button" onClick={() => { setMode(k); clear('when') }} style={{ height: '30px', padding: '0 16px', border: '0', borderRadius: '7px', background: mode === k ? '#fff' : 'transparent', boxShadow: mode === k ? '0 1px 2px rgba(0,0,0,.12)' : 'none', font: `600 12.5px/1.2 ${FONT}`, color: mode === k ? INK : MUTED, cursor: 'pointer' }}>{l}</button>
                ))}
              </span>
              {mode === 'scheduled' && (
                <div className="r-stack-sm" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <Field label="Date & time" error={errors.when} hint={`Your time zone (${tz})`}>
                    <input type="datetime-local" value={when} onChange={(e) => { setWhen(e.target.value); clear('when') }} style={withError(box, errors.when)} />
                  </Field>
                  <span style={{ font: `400 11.5px/1.5 ${FONT}`, color: MUTED, alignSelf: 'center' }}>Goes out within a minute of this time. You can edit or cancel it until then.</span>
                </div>
              )}
            </div>
          </div>

          <div style={{ ...card, position: 'sticky', top: '0' }}>
            <span style={cardTitle}>Preview</span>
            <span style={{ borderRadius: '22px', background: 'linear-gradient(160deg,#1B3C22,#2E5A34)', padding: '26px 14px 60px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ font: `300 34px/1 ${FONT}`, color: '#fff', textAlign: 'center' }}>9:41</span>
              <span style={{ background: 'rgba(255,255,255,.88)', borderRadius: '14px', padding: '11px 12px', display: 'flex', gap: '10px', marginTop: '14px' }}>
                <span style={{ width: '28px', height: '28px', borderRadius: '7px', background: '#0B3D1F', color: '#8BE000', font: `700 11px/28px ${FONT}`, textAlign: 'center', flex: 'none' }}>SK</span>
                <span style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: '0' }}>
                  <span style={{ display: 'flex', font: `500 10.5px/1.2 ${FONT}`, color: MUTED }}><span style={{ flex: '1' }}>SPICE KART</span>now</span>
                  <span style={{ font: `600 12.5px/1.3 ${FONT}`, color: title.trim() ? INK : MUTED }}>{title.trim() || 'Notification title'}</span>
                  <span style={{ font: `400 12px/1.4 ${FONT}`, color: '#3A443D' }}>{message.trim() || 'Your message will appear here.'}</span>
                </span>
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
