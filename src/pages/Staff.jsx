export default function Staff({ v }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "18px", padding: "24px 26px 2px" }}>
        <span style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
          <span style={{ font: "700 20px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Staff & admins</span>
          <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>24 team members · 6 roles</span>
        </span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "8px", height: "34px", width: "210px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <circle cx="9" cy="9" r="6" stroke="#7C8A81" strokeWidth="1.6" />
              <path d="M13.4 13.4L18 18" stroke="#7C8A81" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Search staff…
            </span>
          </span>
          <button className="hv1" onClick={v.openInvite} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            Roles
          </button>
          <button className="hv2" onClick={v.openInvite} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 13px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <path d="M10 4.4v11.2M4.4 10h11.2" stroke="#8BE000" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            Invite member
          </button>
        </span>
      </div>
      <div className="ad-scroll" style={{ flex: "1", minHeight: "0", overflowY: "auto", padding: "20px 26px 30px", display: "flex", flexDirection: "column", gap: "18px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "14px" }}>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <circle cx="7.8" cy="7.2" r="2.8" stroke="#4A564E" strokeWidth="1.5" />
                  <path d="M3 16.4c.7-2.8 2.5-4.2 4.8-4.2s4.1 1.4 4.8 4.2" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M13.2 9.6l1.6 1.6 3.2-3.4" stroke="#4A564E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Team members</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>24</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", background: "#EEF0EC", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              4 invited this month
            </span>
          </div>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#4A564E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Active now</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>11</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              Logged in today
            </span>
          </div>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <rect x="4.6" y="8.6" width="10.8" height="8" rx="2" stroke="#4A564E" strokeWidth="1.5" />
                  <path d="M7.2 8.6V6.8a2.8 2.8 0 015.6 0v1.8" stroke="#4A564E" strokeWidth="1.5" />
                </svg>
              </span>
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Roles</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>6</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", background: "#EEF0EC", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              Custom permissions
            </span>
          </div>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <circle cx="10" cy="10" r="7.2" stroke="#4A564E" strokeWidth="1.5" />
                  <path d="M10 5.8V10l3 1.8" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Pending invites</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>2</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              Expire in 5 days
            </span>
          </div>
        </div>
        <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", overflow: "hidden", flex: "none" }}>
          {" "}
          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 2fr 1.3fr 1.1fr 1fr minmax(84px,.9fr) 120px", gap: "14px", padding: "11px 16px", background: "#F6F7F4", borderBottom: "1px solid #E4E7E2" }}>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Name
            </span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Email
            </span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Role
            </span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Department
            </span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Last active
            </span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Status
            </span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Actions
            </span>
          </div>
          {" "}
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.3fr 2fr 1.3fr 1.1fr 1fr minmax(84px,.9fr) 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                AK
              </span>
              <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Aarav Kapoor
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                aarav.kapoor@spicekart.com.au
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Super Admin
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Executive
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Now</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Active
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                <button onClick={v.editRecord} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                  Edit
                </button>
                <button onClick={v.openRowActions} aria-label="More" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                    <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                    <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                  </svg>
                </button>
              </span>
            </span>
          </div>
          {" "}
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.3fr 2fr 1.3fr 1.1fr 1fr minmax(84px,.9fr) 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                SM
              </span>
              <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Sarah Mitchell
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                sarah.mitchell@spicekart.com.au
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Operations Manager
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Operations
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                12 min ago
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Active
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                <button onClick={v.editRecord} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                  Edit
                </button>
                <button onClick={v.openRowActions} aria-label="More" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                    <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                    <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                  </svg>
                </button>
              </span>
            </span>
          </div>
          {" "}
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.3fr 2fr 1.3fr 1.1fr 1fr minmax(84px,.9fr) 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                DP
              </span>
              <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Dev Patel
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                dev.patel@spicekart.com.au
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Inventory Manager
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Supply chain
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>1 hr ago</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Active
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                <button onClick={v.editRecord} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                  Edit
                </button>
                <button onClick={v.openRowActions} aria-label="More" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                    <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                    <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                  </svg>
                </button>
              </span>
            </span>
          </div>
          {" "}
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.3fr 2fr 1.3fr 1.1fr 1fr minmax(84px,.9fr) 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                GL
              </span>
              <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Grace Lam
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                grace.lam@spicekart.com.au
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Order Manager
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Operations
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                2 hrs ago
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Active
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                <button onClick={v.editRecord} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                  Edit
                </button>
                <button onClick={v.openRowActions} aria-label="More" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                    <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                    <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                  </svg>
                </button>
              </span>
            </span>
          </div>
          {" "}
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.3fr 2fr 1.3fr 1.1fr 1fr minmax(84px,.9fr) 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                NW
              </span>
              <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Noah Williams
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                noah.williams@spicekart.com.au
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Customer Support
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Support</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Today 9:14 AM
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Active
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                <button onClick={v.editRecord} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                  Edit
                </button>
                <button onClick={v.openRowActions} aria-label="More" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                    <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                    <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                  </svg>
                </button>
              </span>
            </span>
          </div>
          {" "}
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.3fr 2fr 1.3fr 1.1fr 1fr minmax(84px,.9fr) 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                IR
              </span>
              <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Isla Reid
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                isla.reid@spicekart.com.au
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Content Manager
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Marketing
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Yesterday
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Active
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                <button onClick={v.editRecord} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                  Edit
                </button>
                <button onClick={v.openRowActions} aria-label="More" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                    <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                    <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                  </svg>
                </button>
              </span>
            </span>
          </div>
          {" "}
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.3fr 2fr 1.3fr 1.1fr 1fr minmax(84px,.9fr) 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                BT
              </span>
              <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Ben Turner
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                ben.turner@spicekart.com.au
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Customer Support
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Support</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                2 weeks ago
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#5F6B62", background: "#EEF0EC", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Inactive
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                <button onClick={v.editRecord} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                  Edit
                </button>
                <button onClick={v.openRowActions} aria-label="More" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                    <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                    <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                  </svg>
                </button>
              </span>
            </span>
          </div>
          {" "}
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.3fr 2fr 1.3fr 1.1fr 1fr minmax(84px,.9fr) 120px", gap: "14px", padding: "13px 16px", alignItems: "center" }}>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                ZH
              </span>
              <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Zoe Harper
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                zoe.harper@spicekart.com.au
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Order Manager
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Operations
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Never</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Pending
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                <button onClick={v.editRecord} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                  Edit
                </button>
                <button onClick={v.openRowActions} aria-label="More" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                    <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                    <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                  </svg>
                </button>
              </span>
            </span>
          </div>
          {" "}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderTop: "1px solid #E4E7E2", background: "#fff" }}>
            <span style={{ font: "400 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Showing 8 of 24 members</span>
            <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ width: "28px", height: "28px", border: "1px solid #E4E7E2", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff" }}>
                <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M12.4 4.4L6.8 10l5.6 5.6" stroke="#7C8A81" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={{ minWidth: "28px", height: "28px", borderRadius: "6px", background: "#0B3D1F", color: "#fff", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
                1
              </span>
              <span style={{ minWidth: "28px", height: "28px", border: "1px solid #E4E7E2", borderRadius: "6px", font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff" }}>
                2
              </span>
              <span style={{ width: "28px", height: "28px", border: "1px solid #E4E7E2", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff" }}>
                <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M7.6 4.4L13 10l-5.4 5.6" stroke="#7C8A81" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </span>
          </div>
          {" "}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <span style={{ font: "600 14px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            Role permissions
          </span>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", overflow: "hidden", flex: "none" }}>
            {" "}
            <div style={{ display: "grid", gridTemplateColumns: "1.6fr repeat(5,1fr)", gap: "14px", padding: "11px 16px", background: "#F6F7F4", borderBottom: "1px solid #E4E7E2" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase" }}>MODULE</span>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", textAlign: "center" }}>
                View
              </span>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", textAlign: "center" }}>
                Create
              </span>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", textAlign: "center" }}>
                Edit
              </span>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", textAlign: "center" }}>
                Delete
              </span>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", textAlign: "center" }}>
                Export
              </span>
            </div>
            {" "}
            <div style={{ display: "flex", alignItems: "center", gap: "9px", padding: "10px 14px", borderBottom: "1px solid #E4E7E2", background: "#FAFBF9" }}>
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Showing permissions for
              </span>
              <button onClick={v.chs_0} style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: v.chs_0Fg, background: v.chs_0Bg, border: `1px solid ${v.chs_0Bd}`, padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap", cursor: "pointer" }}>
                Operations Manager
              </button>
              <button onClick={v.chs_1} style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: v.chs_1Fg, background: v.chs_1Bg, border: `1px solid ${v.chs_1Bd}`, padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap", cursor: "pointer" }}>
                Inventory Manager
              </button>
              <button onClick={v.chs_2} style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: v.chs_2Fg, background: v.chs_2Bg, border: `1px solid ${v.chs_2Bd}`, padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap", cursor: "pointer" }}>
                Customer Support
              </button>
              <button onClick={v.chs_3} style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: v.chs_3Fg, background: v.chs_3Bg, border: `1px solid ${v.chs_3Bd}`, padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap", cursor: "pointer" }}>
                Content Manager
              </button>
            </div>
            {" "}
            <div style={{ display: "grid", gridTemplateColumns: "1.6fr repeat(5,1fr)", gap: "12px", padding: "10px 14px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
              <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Dashboard
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", border: "1.5px solid #E4E7E2", background: "#fff", display: "block" }} />
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </div>
            {" "}
            <div style={{ display: "grid", gridTemplateColumns: "1.6fr repeat(5,1fr)", gap: "12px", padding: "10px 14px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
              <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Orders</span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </div>
            {" "}
            <div style={{ display: "grid", gridTemplateColumns: "1.6fr repeat(5,1fr)", gap: "12px", padding: "10px 14px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
              <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Products
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", border: "1.5px solid #E4E7E2", background: "#fff", display: "block" }} />
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", border: "1.5px solid #E4E7E2", background: "#fff", display: "block" }} />
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </div>
            {" "}
            <div style={{ display: "grid", gridTemplateColumns: "1.6fr repeat(5,1fr)", gap: "12px", padding: "10px 14px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
              <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Inventory
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", border: "1.5px solid #E4E7E2", background: "#fff", display: "block" }} />
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </div>
            {" "}
            <div style={{ display: "grid", gridTemplateColumns: "1.6fr repeat(5,1fr)", gap: "12px", padding: "10px 14px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
              <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Customers
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", border: "1.5px solid #E4E7E2", background: "#fff", display: "block" }} />
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", border: "1.5px solid #E4E7E2", background: "#fff", display: "block" }} />
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </div>
            {" "}
            <div style={{ display: "grid", gridTemplateColumns: "1.6fr repeat(5,1fr)", gap: "12px", padding: "10px 14px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
              <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Delivery
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", border: "1.5px solid #E4E7E2", background: "#fff", display: "block" }} />
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </div>
            {" "}
            <div style={{ display: "grid", gridTemplateColumns: "1.6fr repeat(5,1fr)", gap: "12px", padding: "10px 14px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
              <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Promotions
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", border: "1.5px solid #E4E7E2", background: "#fff", display: "block" }} />
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", border: "1.5px solid #E4E7E2", background: "#fff", display: "block" }} />
              </span>
            </div>
            {" "}
            <div style={{ display: "grid", gridTemplateColumns: "1.6fr repeat(5,1fr)", gap: "12px", padding: "10px 14px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
              <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Payments
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", border: "1.5px solid #E4E7E2", background: "#fff", display: "block" }} />
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", border: "1.5px solid #E4E7E2", background: "#fff", display: "block" }} />
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", border: "1.5px solid #E4E7E2", background: "#fff", display: "block" }} />
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </div>
            {" "}
            <div style={{ display: "grid", gridTemplateColumns: "1.6fr repeat(5,1fr)", gap: "12px", padding: "10px 14px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
              <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Reviews
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", border: "1.5px solid #E4E7E2", background: "#fff", display: "block" }} />
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", border: "1.5px solid #E4E7E2", background: "#fff", display: "block" }} />
              </span>
            </div>
            {" "}
            <div style={{ display: "grid", gridTemplateColumns: "1.6fr repeat(5,1fr)", gap: "12px", padding: "10px 14px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
              <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Content
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", border: "1.5px solid #E4E7E2", background: "#fff", display: "block" }} />
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", border: "1.5px solid #E4E7E2", background: "#fff", display: "block" }} />
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", border: "1.5px solid #E4E7E2", background: "#fff", display: "block" }} />
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", border: "1.5px solid #E4E7E2", background: "#fff", display: "block" }} />
              </span>
            </div>
            {" "}
            <div style={{ display: "grid", gridTemplateColumns: "1.6fr repeat(5,1fr)", gap: "12px", padding: "10px 14px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
              <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Analytics
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", border: "1.5px solid #E4E7E2", background: "#fff", display: "block" }} />
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", border: "1.5px solid #E4E7E2", background: "#fff", display: "block" }} />
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", border: "1.5px solid #E4E7E2", background: "#fff", display: "block" }} />
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </div>
            {" "}
            <div style={{ display: "grid", gridTemplateColumns: "1.6fr repeat(5,1fr)", gap: "12px", padding: "10px 14px", alignItems: "center" }}>
              <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Settings
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", border: "1.5px solid #E4E7E2", background: "#fff", display: "block" }} />
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", border: "1.5px solid #E4E7E2", background: "#fff", display: "block" }} />
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", border: "1.5px solid #E4E7E2", background: "#fff", display: "block" }} />
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "19px", height: "19px", borderRadius: "5px", border: "1.5px solid #E4E7E2", background: "#fff", display: "block" }} />
              </span>
            </div>
            {" "}
          </div>
        </div>
      </div>
    </>
  )
}
