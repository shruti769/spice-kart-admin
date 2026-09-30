import { useState } from 'react'
import CannedRepliesTab from '../components/support/CannedRepliesTab'
import HelpCentreTab from '../components/support/HelpCentreTab'
import InboxTab from '../components/support/InboxTab'
import { useSupportSummary } from '../lib/support'

const FONT = 'Inter,system-ui,sans-serif'

// [tab label, header button label, tab body]
const TABS = [
  ['Inbox', null, InboxTab],
  ['Canned replies', 'New reply', CannedRepliesTab],
  ['Help centre', 'New article', HelpCentreTab],
]

function subtitle(summary) {
  const s = summary.data
  if (!s) return summary.status === 'error' ? summary.error : summary.status === 'off' ? 'Supabase keys are missing' : 'Customer chats from the app appear here live'
  const parts = [`${s.open} open`, `${s.pending} awaiting customer`]
  if (s.avg_first_reply_min != null) parts.push(`${s.avg_first_reply_min} min avg first reply`)
  if (s.csat_pct != null) parts.push(`${s.csat_pct}% CSAT`)
  return parts.join(' · ')
}

export default function Support({ v }) {
  const tab = v.supportTab
  const [label, action, Body] = TABS[tab] ?? TABS[0]
  const summary = useSupportSummary()
  // Which tab's "add" dialog is open (so switching tabs closes it).
  const [addingTab, setAddingTab] = useState(null)
  const adding = addingTab === tab
  const setAdding = (on) => setAddingTab(on ? tab : null)
  const open = summary.data?.open

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '18px', padding: '24px 26px 0' }}>
        <span style={{ display: 'flex', flexDirection: 'column', gap: '5px', minWidth: '0' }}>
          <span style={{ font: `700 20px/1.2 ${FONT}`, color: '#17201A', whiteSpace: 'nowrap' }}>Support</span>
          <span style={{ font: `400 12.5px/1.2 ${FONT}`, color: '#7C8A81', whiteSpace: 'nowrap' }}>{subtitle(summary)}</span>
        </span>
        {action && (
          <button className="hv2" onClick={() => setAdding(true)} style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '7px', height: '34px', padding: '0 13px', border: '0', borderRadius: '8px', background: '#0B3D1F', color: '#fff', font: `600 12.5px/1.2 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
              <path d="M10 4.4v11.2M4.4 10h11.2" stroke="#8BE000" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            {action}
          </button>
        )}
      </div>
      <div role="tablist" aria-label={label} style={{ display: 'flex', gap: '2px', padding: '16px 26px 0', flex: 'none' }}>
        {TABS.map(([name], i) => (
          <button key={name} role="tab" aria-selected={tab === i} onClick={v[`tb_support_${i}`]} style={{ border: '0', background: 'transparent', padding: '0 12px 10px', font: `600 12.5px/1.2 ${FONT}`, color: v[`tb_support_${i}Fg`], borderBottom: `2px solid ${v[`tb_support_${i}Bd`]}`, cursor: 'pointer', whiteSpace: 'nowrap', marginBottom: '-1px' }}>
            {name}{i === 0 && open ? ` · ${open}` : ''}
          </button>
        ))}
      </div>
      {tab === 0
        ? <Body v={v} summary={summary} />
        : <div style={{ flex: '1', minHeight: '0', display: 'flex', flexDirection: 'column', borderTop: '1px solid #E4E7E2' }}><Body v={v} adding={adding} setAdding={setAdding} /></div>}
    </>
  )
}
