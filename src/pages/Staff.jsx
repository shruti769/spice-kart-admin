import { useMemo, useRef, useState } from 'react'
import {
  ROLES, STAFF_STATUS_PILL, inviteStaff, lastActiveAt, lastActiveLabel, staffInitials, staffStats, updateStaff, useMyUserId, useNow, useStaff,
} from '../lib/staff'
import EditStaffModal from '../modals/EditStaffModal'
import InviteStaffModal from '../modals/InviteStaffModal'

const FONT = 'Inter,system-ui,sans-serif'
const INK = '#17201A'
const MUTED = '#7C8A81'
const BORDER = '#E4E7E2'
const PAGE_SIZE = 10
const COLS = '1.3fr 2fr 1.3fr 1.1fr 1fr minmax(84px,.9fr) 120px'
const RCOLS = '1.6fr repeat(3,1fr) 120px'
const STATUS_CHIPS = [['all', 'All'], ['active', 'Active'], ['inactive', 'Inactive'], ['invited', 'Pending invites']]

const head = { font: `600 10.5px/1.2 ${FONT}`, letterSpacing: '.5px', color: MUTED, textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
const ell = { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
const cellWrap = { minWidth: '0', display: 'flex', alignItems: 'center', gap: '8px' }
const soft = { font: `400 11px/1.2 ${FONT}`, color: MUTED, ...ell }
const pill = (fg, bg) => ({ font: `600 10.5px/1.2 ${FONT}`, color: fg, background: bg, padding: '5px 8px', borderRadius: '5px', whiteSpace: 'nowrap', display: 'inline-block' })
const smallBtn = { height: '26px', padding: '0 9px', border: `1px solid ${BORDER}`, borderRadius: '6px', background: '#fff', font: `600 11px/1.2 ${FONT}`, color: INK, cursor: 'pointer', whiteSpace: 'nowrap' }
const chip = (on) => ({ font: `600 11.5px/1.2 ${FONT}`, color: on ? '#0B3D1F' : '#4A564E', background: on ? '#F1F9DF' : '#fff', border: `1px solid ${on ? '#C7E88A' : BORDER}`, padding: '7px 10px', borderRadius: '7px', whiteSpace: 'nowrap', cursor: 'pointer' })
const menuItem = { display: 'block', width: '100%', textAlign: 'left', border: '0', background: 'transparent', padding: '9px 12px', font: `500 12px/1.2 ${FONT}`, color: INK, cursor: 'pointer', whiteSpace: 'nowrap' }

const GREEN = ['#0B6B33', '#E9F6E3']
const GREY = ['#7C8A81', '#EEF0EC']
const AMBER = ['#8A6100', '#FBF1DE']

const ICONS = {
  team: (
    <>
      <circle cx="7.8" cy="7.2" r="2.8" stroke="#4A564E" strokeWidth="1.5" />
      <path d="M3 16.4c.7-2.8 2.5-4.2 4.8-4.2s4.1 1.4 4.8 4.2" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13.2 9.6l1.6 1.6 3.2-3.4" stroke="#4A564E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  active: <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#4A564E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  roles: (
    <>
      <rect x="4.6" y="8.6" width="10.8" height="8" rx="2" stroke="#4A564E" strokeWidth="1.5" />
      <path d="M7.2 8.6V6.8a2.8 2.8 0 015.6 0v1.8" stroke="#4A564E" strokeWidth="1.5" />
    </>
  ),
  pending: (
    <>
      <circle cx="10" cy="10" r="7.2" stroke="#4A564E" strokeWidth="1.5" />
      <path d="M10 5.8V10l3 1.8" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
}

function Kpi({ icon, label, value, note }) {
  const [text, fg, bg] = note
  return (
    <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '15px 16px', display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '0' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ width: '26px', height: '26px', borderRadius: '7px', background: '#F6F7F4', border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>{ICONS[icon]}</svg>
        </span>
        <span style={{ font: `500 11.5px/1.2 ${FONT}`, color: MUTED, whiteSpace: 'nowrap' }}>{label}</span>
      </span>
      <span style={{ font: `700 23px/1.2 ${FONT}`, color: INK, letterSpacing: '-.4px', whiteSpace: 'nowrap' }}>{value}</span>
      <span style={{ font: `600 10.5px/1.2 ${FONT}`, color: fg, background: bg, padding: '4px 7px', borderRadius: '5px', alignSelf: 'flex-start', ...ell, maxWidth: '100%', boxSizing: 'border-box' }}>{text}</span>
    </div>
  )
}

function Pager({ page, pages, onPage }) {
  if (pages <= 1) return null
  const from = Math.max(1, Math.min(page - 2, pages - 4))
  const nums = Array.from({ length: Math.min(5, pages) }, (_, i) => from + i)
  const sq = (on, disabled) => ({ minWidth: '28px', height: '28px', padding: '0 6px', boxSizing: 'border-box', border: on ? '0' : `1px solid ${BORDER}`, borderRadius: '6px', background: on ? '#0B3D1F' : '#fff', color: on ? '#fff' : '#4A564E', font: `${on ? 600 : 500} 11.5px/1.2 ${FONT}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: disabled || on ? 'default' : 'pointer', opacity: disabled ? 0.4 : 1 })
  return (
    <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '5px' }}>
      <button aria-label="Previous page" disabled={page <= 1} onClick={() => onPage(page - 1)} style={sq(false, page <= 1)}>
        <svg width="12" height="12" viewBox="0 0 20 20" fill="none"><path d="M12.4 4.4L6.8 10l5.6 5.6" stroke={MUTED} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      {nums.map((n) => <button key={n} onClick={() => onPage(n)} style={sq(n === page)}>{n}</button>)}
      <button aria-label="Next page" disabled={page >= pages} onClick={() => onPage(page + 1)} style={sq(false, page >= pages)}>
        <svg width="12" height="12" viewBox="0 0 20 20" fill="none"><path d="M7.6 4.4L13 10l-5.4 5.6" stroke={MUTED} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
    </span>
  )
}

export default function Staff({ v }) {
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('all')
  const [role, setRole] = useState('all')
  const [page, setPage] = useState(1)
  const [inviting, setInviting] = useState(false)
  const [editing, setEditing] = useState(null) // { member, startRemoving }
  const [menu, setMenu] = useState(null) // { member, top, right }
  const [busyId, setBusyId] = useState(null)
  const staff = useStaff()
  const me = useMyUserId()
  const now = useNow(30000)
  const rolesRef = useRef(null)
  const listRef = useRef(null)

  const all = staff.rows
  const stats = useMemo(() => staffStats(all, now), [all, now])
  const statusCounts = useMemo(() => {
    const c = { all: all.length }
    for (const s of all) c[s.status] = (c[s.status] || 0) + 1
    return c
  }, [all])
  const roleRows = useMemo(() => ROLES.map((r) => {
    const members = all.filter((s) => s.role === r)
    return { role: r, members: members.length, active: members.filter((s) => s.status === 'active').length, invited: members.filter((s) => s.status === 'invited').length }
  }), [all])

  const rows = useMemo(() => {
    const t = q.trim().toLowerCase()
    return all.filter((s) => {
      if (status !== 'all' && s.status !== status) return false
      if (role !== 'all' && s.role !== role) return false
      if (!t) return true
      return `${s.name} ${s.email} ${s.role} ${s.department}`.toLowerCase().includes(t)
    })
  }, [all, q, status, role])

  const pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE))
  const cur = Math.min(page, pages)
  const shown = rows.slice((cur - 1) * PAGE_SIZE, cur * PAGE_SIZE)
  const filtered = status !== 'all' || role !== 'all' || q.trim()

  let message = null
  if (staff.status === 'off') message = 'Supabase keys are missing · add them to .env to load the team.'
  else if (staff.loading) message = 'Loading the team…'
  else if (staff.status === 'error' && !all.length) message = staff.error
  else if (!rows.length) message = all.length ? 'No team members match these filters.' : 'No team members yet · invite someone to get started.'

  const ready = staff.status === 'ready' || all.length > 0
  const done = (msg) => { v.flash?.(msg); staff.refetch() }

  const openMenu = (e, member) => {
    e.stopPropagation()
    const r = e.currentTarget.getBoundingClientRect()
    setMenu((m) => (m?.member.user_id === member.user_id ? null : { member, top: r.bottom + 4, right: window.innerWidth - r.right }))
  }

  const setMemberStatus = async (member, next) => {
    setMenu(null)
    setBusyId(member.user_id)
    try {
      await updateStaff(member.user_id, { status: next })
      done(`${member.name || member.email} ${next === 'active' ? 'reactivated' : 'deactivated'}`)
    } catch (err) {
      v.flash?.(err.message)
    } finally {
      setBusyId(null)
    }
  }

  const resend = async (member) => {
    setMenu(null)
    setBusyId(member.user_id)
    try {
      await inviteStaff({ email: member.email, name: member.name, role: member.role, department: member.department, resend: true })
      done(`Invite re-sent to ${member.email}`)
    } catch (err) {
      v.flash?.(err.message)
    } finally {
      setBusyId(null)
    }
  }

  const copyEmail = async (member) => {
    setMenu(null)
    try {
      await navigator.clipboard.writeText(member.email)
      v.flash?.(`Copied ${member.email}`)
    } catch {
      v.flash?.(`Couldn’t copy · ${member.email}`)
    }
  }

  const showRole = (r) => {
    setRole(r)
    setStatus('all')
    setPage(1)
    listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const menuMember = menu?.member
  const menuSelf = menuMember && menuMember.user_id === me

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '18px', padding: '24px 26px 2px' }}>
        <span style={{ display: 'flex', flexDirection: 'column', gap: '5px', minWidth: '0' }}>
          <span style={{ font: `700 20px/1.2 ${FONT}`, color: INK, whiteSpace: 'nowrap' }}>Staff & admins</span>
          <span style={{ font: `400 12.5px/1.2 ${FONT}`, color: MUTED, whiteSpace: 'nowrap' }}>
            {ready
              ? `${stats.total} team member${stats.total === 1 ? '' : 's'} · ${stats.rolesInUse} role${stats.rolesInUse === 1 ? '' : 's'} in use`
              : 'Who can sign in to this admin'}
          </span>
        </span>
        <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '34px', width: '210px', padding: '0 11px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff' }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
              <circle cx="9" cy="9" r="6" stroke={MUTED} strokeWidth="1.6" />
              <path d="M13.4 13.4L18 18" stroke={MUTED} strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input value={q} onChange={(e) => { setQ(e.target.value); setPage(1) }} placeholder="Search staff…" style={{ border: '0', outline: 'none', background: 'transparent', font: `400 12.5px/1.2 ${FONT}`, color: INK, width: '100%' }} />
          </span>
          <button className="hv1" onClick={() => rolesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })} style={{ display: 'flex', alignItems: 'center', gap: '7px', height: '34px', padding: '0 12px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', color: INK, font: `600 12.5px/1.2 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            Roles
          </button>
          <button className="hv2" onClick={() => setInviting(true)} style={{ display: 'flex', alignItems: 'center', gap: '7px', height: '34px', padding: '0 13px', border: '0', borderRadius: '8px', background: '#0B3D1F', color: '#fff', font: `600 12.5px/1.2 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
              <path d="M10 4.4v11.2M4.4 10h11.2" stroke="#8BE000" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            Invite member
          </button>
        </span>
      </div>
      <div className="ad-scroll" style={{ flex: '1', minHeight: '0', overflowY: 'auto', padding: '20px 26px 30px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
          <Kpi icon="team" label="Team members" value={ready ? stats.total : '—'} note={ready ? [`${stats.invitedThisMonth} invited this month`, ...GREY] : ['—', ...GREY]} />
          <Kpi icon="active" label="Active now" value={ready ? stats.activeToday : '—'} note={ready ? ['Used the admin today', ...(stats.activeToday ? GREEN : GREY)] : ['—', ...GREY]} />
          <Kpi icon="roles" label="Roles" value={ready ? stats.rolesInUse : '—'} note={[`In use, of ${ROLES.length} roles`, ...GREY]} />
          <Kpi icon="pending" label="Pending invites" value={ready ? stats.pending : '—'} note={ready ? [stats.pending ? 'Awaiting first sign-in' : 'None waiting', ...(stats.pending ? AMBER : GREY)] : ['—', ...GREY]} />
        </div>

        <div ref={listRef} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', overflow: 'hidden', flex: 'none', scrollMarginTop: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '10px 14px', borderBottom: `1px solid ${BORDER}`, background: '#FAFBF9', flexWrap: 'wrap' }}>
            <span style={{ font: `500 11.5px/1.2 ${FONT}`, color: MUTED, whiteSpace: 'nowrap' }}>Showing</span>
            {STATUS_CHIPS.map(([k, label]) => (
              <button key={k} onClick={() => { setStatus(k); setPage(1) }} style={chip(status === k)}>
                {label}{statusCounts[k] ? ` · ${statusCounts[k]}` : ''}
              </button>
            ))}
            <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <select value={role} onChange={(e) => { setRole(e.target.value); setPage(1) }} aria-label="Role" style={{ height: '30px', padding: '0 8px', border: `1px solid ${role !== 'all' ? '#C7E88A' : BORDER}`, borderRadius: '7px', background: role !== 'all' ? '#F1F9DF' : '#fff', font: `600 11.5px/1.2 ${FONT}`, color: role !== 'all' ? '#0B3D1F' : '#4A564E', cursor: 'pointer' }}>
                <option value="all">All roles</option>
                {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
              {filtered && (
                <button onClick={() => { setStatus('all'); setRole('all'); setQ(''); setPage(1) }} style={{ border: '0', background: 'transparent', font: `600 11.5px/1.2 ${FONT}`, color: '#17693A', cursor: 'pointer', padding: '0', whiteSpace: 'nowrap' }}>Clear</button>
              )}
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: COLS, gap: '14px', padding: '11px 16px', background: '#F6F7F4', borderBottom: `1px solid ${BORDER}` }}>
            {['Name', 'Email', 'Role', 'Department', 'Last active', 'Status'].map((h) => <span key={h} style={head}>{h}</span>)}
            <span style={{ ...head, textAlign: 'right' }}>Actions</span>
          </div>
          {message ? (
            <div style={{ padding: '32px 16px', textAlign: 'center', font: `400 12.5px/1.5 ${FONT}`, color: MUTED }}>{message}</div>
          ) : shown.map((s, i) => {
            const [label, fg, bg] = STAFF_STATUS_PILL[s.status] ?? STAFF_STATUS_PILL.active
            const self = s.user_id === me
            const busy = busyId === s.user_id
            return (
              <div key={s.user_id} className="hv3" style={{ display: 'grid', gridTemplateColumns: COLS, gap: '14px', padding: '13px 16px', borderBottom: i < shown.length - 1 ? '1px solid #EFF1ED' : '0', alignItems: 'center', opacity: busy ? 0.55 : 1 }}>
                <span style={cellWrap}>
                  <span style={{ width: '28px', height: '28px', borderRadius: '7px', background: '#F6F7F4', border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', font: `600 10.5px/1.2 ${FONT}`, color: '#4A564E', flex: 'none' }}>
                    {staffInitials(s.name, s.email)}
                  </span>
                  <span style={{ font: `600 12.5px/1.2 ${FONT}`, color: INK, ...ell }}>{s.name || s.email}</span>
                  {self && <span style={{ font: `500 10.5px/1.2 ${FONT}`, color: MUTED, flex: 'none' }}>You</span>}
                </span>
                <span style={cellWrap}><span style={soft} title={s.email}>{s.email}</span></span>
                <span style={cellWrap}><span style={{ font: `500 12.5px/1.2 ${FONT}`, color: INK, ...ell }}>{s.role}</span></span>
                <span style={cellWrap}><span style={soft}>{s.department || '—'}</span></span>
                <span style={cellWrap}><span style={soft}>{lastActiveLabel(lastActiveAt(s), now)}</span></span>
                <span style={cellWrap}><span style={pill(fg, bg)}>{label}</span></span>
                <span style={cellWrap}>
                  <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button onClick={() => setEditing({ member: s })} disabled={busy} style={smallBtn}>Edit</button>
                    <button onClick={(e) => openMenu(e, s)} disabled={busy} aria-label="More" style={{ width: '26px', height: '26px', border: `1px solid ${BORDER}`, borderRadius: '6px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: '0' }}>
                      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
                        <circle cx="5" cy="10" r="1.3" fill={MUTED} />
                        <circle cx="10" cy="10" r="1.3" fill={MUTED} />
                        <circle cx="15" cy="10" r="1.3" fill={MUTED} />
                      </svg>
                    </button>
                  </span>
                </span>
              </div>
            )
          })}
          {!message && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderTop: `1px solid ${BORDER}`, background: '#fff' }}>
              <span style={{ font: `400 11.5px/1.2 ${FONT}`, color: MUTED, whiteSpace: 'nowrap' }}>
                Showing {shown.length} of {rows.length} member{rows.length === 1 ? '' : 's'}
              </span>
              <Pager page={cur} pages={pages} onPage={setPage} />
            </div>
          )}
        </div>

        <div ref={rolesRef} style={{ display: 'flex', flexDirection: 'column', gap: '10px', scrollMarginTop: '12px' }}>
          <span style={{ font: `600 14px/1.2 ${FONT}`, color: INK, ...ell }}>Roles</span>
          <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', overflow: 'hidden', flex: 'none' }}>
            <div style={{ display: 'grid', gridTemplateColumns: RCOLS, gap: '14px', padding: '11px 16px', background: '#F6F7F4', borderBottom: `1px solid ${BORDER}` }}>
              <span style={head}>Role</span>
              {['Members', 'Active', 'Pending invites'].map((h) => <span key={h} style={{ ...head, textAlign: 'center' }}>{h}</span>)}
              <span />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '10px 14px', borderBottom: `1px solid ${BORDER}`, background: '#FAFBF9' }}>
              <span style={{ font: `500 11.5px/1.45 ${FONT}`, color: MUTED }}>
                Roles are labels for now · every active team member can use the whole admin. Per-page permissions aren’t enforced yet.
              </span>
            </div>
            {roleRows.map((r, i) => (
              <div key={r.role} className="hv3" style={{ display: 'grid', gridTemplateColumns: RCOLS, gap: '14px', padding: '10px 16px', borderBottom: i < roleRows.length - 1 ? '1px solid #EFF1ED' : '0', alignItems: 'center' }}>
                <span style={{ font: `500 12.5px/1.2 ${FONT}`, color: INK, ...ell }}>{r.role}</span>
                <span style={{ font: `600 12.5px/1.2 ${FONT}`, color: r.members ? INK : MUTED, textAlign: 'center' }}>{ready ? r.members : '—'}</span>
                <span style={{ font: `400 12px/1.2 ${FONT}`, color: MUTED, textAlign: 'center' }}>{ready ? r.active : '—'}</span>
                <span style={{ font: `400 12px/1.2 ${FONT}`, color: MUTED, textAlign: 'center' }}>{ready ? r.invited : '—'}</span>
                <span style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {r.members > 0 && <button onClick={() => showRole(r.role)} style={smallBtn}>View members</button>}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {menu && (
        <>
          <div onClick={() => setMenu(null)} style={{ position: 'fixed', inset: '0', zIndex: '80' }} />
          <div style={{ position: 'fixed', top: `${menu.top}px`, right: `${menu.right}px`, zIndex: '81', minWidth: '180px', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '9px', boxShadow: '0 12px 30px rgba(10,18,12,.16)', padding: '4px 0', overflow: 'hidden' }}>
            <button className="hv3" onClick={() => { setMenu(null); setEditing({ member: menuMember }) }} style={menuItem}>Edit details</button>
            {menuMember.status === 'invited' && <button className="hv3" onClick={() => resend(menuMember)} style={menuItem}>Resend invite</button>}
            {!menuSelf && menuMember.status === 'active' && <button className="hv3" onClick={() => setMemberStatus(menuMember, 'inactive')} style={menuItem}>Deactivate</button>}
            {!menuSelf && menuMember.status === 'inactive' && <button className="hv3" onClick={() => setMemberStatus(menuMember, 'active')} style={menuItem}>Reactivate</button>}
            {menuMember.email && <button className="hv3" onClick={() => copyEmail(menuMember)} style={menuItem}>Copy email</button>}
            {!menuSelf && (
              <button className="hv3" onClick={() => { setMenu(null); setEditing({ member: menuMember, startRemoving: true }) }} style={{ ...menuItem, color: '#A93826', borderTop: '1px solid #EFF1ED' }}>
                Remove from team…
              </button>
            )}
          </div>
        </>
      )}
      {inviting && <InviteStaffModal onClose={() => setInviting(false)} onDone={done} />}
      {editing && (
        <EditStaffModal
          key={editing.member.user_id}
          member={editing.member}
          isSelf={editing.member.user_id === me}
          startRemoving={editing.startRemoving}
          onClose={() => setEditing(null)}
          onDone={done}
        />
      )}
    </>
  )
}
