import { useState } from 'react'
import BannerGrid from '../components/BannerGrid'
import AnnouncementsTab from '../components/content/AnnouncementsTab'
import CollectionsTab from '../components/content/CollectionsTab'
import DealsTab from '../components/content/DealsTab'
import FeaturedCategoriesTab from '../components/content/FeaturedCategoriesTab'
import FeaturedProductsTab from '../components/content/FeaturedProductsTab'
import { SectionHead } from '../components/content/ui'

// [tab label, header button label, tab body]
const TABS = [
  ['Banners', 'Create banner', null],
  ['Featured categories', 'Add categories', FeaturedCategoriesTab],
  ['Featured products', 'Add products', FeaturedProductsTab],
  ['Deals', 'Add deal to home', DealsTab],
  ['Seasonal collections', 'New collection', CollectionsTab],
  ['Announcements', 'New announcement', AnnouncementsTab],
]

export default function Content({ v }) {
  const tab = v.contentTab
  const [, action, Body] = TABS[tab] ?? TABS[0]
  // Which tab's "add" dialog is open (so switching tabs closes it).
  const [addingTab, setAddingTab] = useState(null)
  const adding = addingTab === tab
  const setAdding = (on) => setAddingTab(on ? tab : null)

  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "18px", padding: "24px 26px 2px" }}>
        <span style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
          <span style={{ font: "700 20px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Content</span>
          <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>
            Homepage banners, featured collections and announcements
          </span>
        </span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          <button className="hv1" onClick={v.previewApp} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            Preview app
          </button>
          <button className="hv2" onClick={Body ? () => setAdding(true) : v.openBannerNew} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 13px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <path d="M10 4.4v11.2M4.4 10h11.2" stroke="#8BE000" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            {action}
          </button>
        </span>
      </div>
      <div className="ad-scroll" style={{ flex: "1", minHeight: "0", overflowY: "auto", padding: "20px 26px 30px", display: "flex", flexDirection: "column", gap: "18px" }}>
        <div role="tablist" className="ad-scroll" style={{ display: "flex", gap: "2px", borderBottom: "1px solid #E4E7E2", overflowX: "auto", flex: "none" }}>
          {TABS.map(([label], i) => (
            <button key={label} role="tab" aria-selected={tab === i} onClick={v[`tb_content_${i}`]} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v[`tb_content_${i}Fg`], borderBottom: `2px solid ${v[`tb_content_${i}Bd`]}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
              {label}
            </button>
          ))}
        </div>
        {Body ? (
          <Body v={v} adding={adding} setAdding={setAdding} />
        ) : (
          <>
            <SectionHead title="Banners" sub="Image banners in the home carousel and middle strip. Published banners show in the app between their start and end dates." />
            <BannerGrid v={v} />
          </>
        )}
      </div>
    </>
  )
}
