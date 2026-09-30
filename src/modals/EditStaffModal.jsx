import { useEffect, useState } from 'react'
import { ROLES, removeStaff, staffInitials, updateStaff } from '../lib/staff'

const FONT = 'Inter,system-ui,sans-serif'
const INK = '#17201A'
const MUTED = '#7C8A81'
const BORDER = '#E4E7E2'
const DANGER = '#B3402F'
const label = { font: `600 10.5px/1.2 ${FONT}`, letterSpacing: '.4px', color: MUTED, textTransform: 'uppercase', whiteSpace: 'nowrap' }
const input = { height: '36px', padding: '0 11px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', font: `500 12.5px/1.2 ${FONT}`, color: INK, outline: 'none', width: '100%', minWidth: '0', boxSizing: 'border-box' }
const btn = { height: '36px', padding: '0 14px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', font: `600 12.5px/1.2 ${FONT}`, color: INK, cursor: 'pointer', whiteSpace: 'nowrap' }
const hint = { font: `400 11px/1.3 ${FONT}`, color: MUTED }

/**
 * Edit a team member (a staff_list() row). Props: `member`, `isSelf`, `startRemoving`, `onClose()`, `onDone(message)`.
 */
export default function EditStaffModal({ member, isSelf, startRemoving, onClose, onDone }) {
  const [form, setForm] = useState(() => ({ name: member.name ?? '', role: member.role, department: member.department ?? '', status: member.status }))
  const [busy, setBusy] = useState('')
  const [error, setError] = useState('')
  const [confirming, setConfirming] = useState(!!startRemoving && !isSelf)
  const set = (k) => (e) => { setForm((f) => ({ ...f, [k]: e.target.value })); setError('') }
  const close = () => { if (!busy) onClose() }

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && !busy) onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [busy, onClose])

  const who = form.name.trim() || member.email
  const changed = form.name.trim() !== (member.name ?? '') || form.role !== member.role || form.department.trim() !== (member.department ?? '') || form.status !== member.status

  const save = async (e) => {
    e?.preventDefault()
    if (busy || !changed) return
    if (!form.name.trim()) { setError('Enter their name'); return }
    setBusy('save')
    setError('')
    try {
      await updateStaff(member.user_id, { name: form.name.trim(), role: form.role, department: form.department.trim(), status: form.status })
      onDone?.(`${who} updated`)
      onClose()
    } catch (err) {
      setError(err.message)
      setBusy('')
    }
  }

  const remove = async () => {
    if (busy) return
    setBusy('remove')
    setError('')
    try {
      await removeStaff(member.user_id)
      onDone?.(`${who} removed from the team`)
      onClose()
    } catch (err) {
      setError(err.message)
      setBusy('')
    }
  }

  return (
    <div className="sk-overlay" onClick={close} style={{ position: 'fixed', inset: '0', zIndex: '90', background: 'rgba(14,22,16,.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
      <form className="sk-modal" onSubmit={save} onClick={(e) => e.stopPropagation()} style={{ width: '500px', maxWidth: '100%', maxHeight: '100%', background: '#fff', borderRadius: '14px', boxShadow: '0 26px 60px rgba(10,18,12,.3)', overflow: 'hidden', display: 'flex', flexDirection: 'column', margin: '0' }}>
        <div style={{ padding: '16px 18px 14px', display: 'flex', alignItems: 'flex-start', gap: '11px', borderBottom: '1px solid #EFF1ED' }}>
          <span style={{ width: '34px', height: '34px', borderRadius: '9px', background: '#F1F9DF', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', font: `700 11.5px/1 ${FONT}`, color: '#0B3D1F' }}>
            {staffInitials(member.name, member.email)}
          </span>
          <span style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '0' }}>
            <span style={{ font: `700 15px/1.2 ${FONT}`, color: INK }}>Edit {member.name || member.email}{isSelf ? ' (you)' : ''}</span>
            <span style={{ font: `400 11.5px/1.55 ${FONT}`, color: MUTED, overflowWrap: 'anywhere' }}>{member.email}</span>
          </span>
        </div>
        <div className="ad-scroll" style={{ padding: '15px 18px', display: 'flex', flexDirection: 'column', gap: '11px', overflowY: 'auto' }}>
          <div className="r-stack-sm" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '11px' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '0' }}>
              <span style={label}>Full name</span>
              <input value={form.name} onChange={set('name')} maxLength={80} disabled={!!busy} style={input} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '0' }}>
              <span style={label}>Role</span>
              <select value={form.role} onChange={set('role')} disabled={!!busy} style={{ ...input, cursor: 'pointer' }}>
                {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '0' }}>
              <span style={label}>Department</span>
              <input value={form.department} onChange={set('department')} maxLength={60} disabled={!!busy} placeholder="e.g. Operations" style={input} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '0' }}>
              <span style={label}>Status</span>
              <select value={form.status} onChange={set('status')} disabled={!!busy || isSelf} style={{ ...input, cursor: isSelf ? 'default' : 'pointer', opacity: isSelf ? 0.6 : 1 }}>
                {member.status === 'invited' && <option value="invited">Pending invite</option>}
                <option value="active">Active</option>
                <option value="inactive">Inactive · no admin access</option>
              </select>
              {isSelf && <span style={hint}>You can’t deactivate yourself</span>}
            </label>
          </div>
          <span style={{ padding: '10px 11px', borderRadius: '8px', background: '#F6F7F4', border: `1px solid ${BORDER}`, font: `400 11.5px/1.5 ${FONT}`, color: '#4A564E' }}>
            Roles are labels for now · every active team member can use the whole admin. Inactive members can’t sign in to the admin.
          </span>
          {!isSelf && (
            confirming ? (
              <span style={{ display: 'flex', flexDirection: 'column', gap: '9px', padding: '11px', borderRadius: '8px', border: '1px solid #EEDAD5', background: '#FDF7F5' }}>
                <span style={{ font: `400 12px/1.5 ${FONT}`, color: '#A93826' }}>
                  Remove {who} from the team? They lose admin access straight away; their login account itself isn’t deleted.
                </span>
                <span style={{ display: 'flex', gap: '9px' }}>
                  <button type="button" onClick={() => setConfirming(false)} disabled={!!busy} style={{ ...btn, flex: '1', height: '34px' }}>Keep them</button>
                  <button type="button" onClick={remove} disabled={!!busy} style={{ ...btn, flex: '1', height: '34px', border: '0', background: '#A93826', color: '#fff', opacity: busy ? 0.6 : 1 }}>
                    {busy === 'remove' ? 'Removing…' : 'Remove from team'}
                  </button>
                </span>
              </span>
            ) : (
              <span style={{ display: 'flex', gap: '9px' }}>
                <button type="button" onClick={() => { setConfirming(true); setError('') }} disabled={!!busy} style={{ flex: '1', height: '38px', border: '1px solid #EEDAD5', borderRadius: '8px', background: '#FDF7F5', font: `600 12.5px/1.2 ${FONT}`, color: '#A93826', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  Remove from team
                </button>
              </span>
            )
          )}
          {error && <span style={{ font: `400 11.5px/1.4 ${FONT}`, color: DANGER }}>{error}</span>}
        </div>
        <div style={{ padding: '13px 18px 16px', display: 'flex', alignItems: 'center', gap: '9px', borderTop: '1px solid #EFF1ED', background: '#F6F7F4' }}>
          <span style={{ marginLeft: 'auto', display: 'flex', gap: '9px' }}>
            <button type="button" onClick={close} disabled={!!busy} style={btn}>Cancel</button>
            <button type="submit" disabled={!!busy || !changed} style={{ ...btn, padding: '0 15px', border: '0', background: '#0B3D1F', color: '#fff', opacity: busy || !changed ? 0.45 : 1, cursor: busy || !changed ? 'default' : 'pointer' }}>
              {busy === 'save' ? 'Saving…' : 'Save changes'}
            </button>
          </span>
        </div>
      </form>
    </div>
  )
}
