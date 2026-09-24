import { useCallback, useEffect, useRef, useState } from 'react'

const INITIAL_STATE = { page: 'login', modal: null, toast: '', catTab: 'products', rowMenu: null, store: 0, storeOpen: false }

// Pages that "Back" returns to from a create/edit flow.
const BACK_TO = { promonew: 'promo', bannernew: 'content', notifnew: 'notif', addproduct: 'catalogue', editproduct: 'catalogue' }

// Display name for the signed-in admin, derived from their email:
// "aarav.kapoor@…" -> "Aarav Kapoor" (AK), "test@…" -> "Test" (T).
function userFromEmail(email) {
  const words = email.split('@')[0].split(/[._+\-\s\d]+/).filter(Boolean)
  if (!words.length) return { name: 'Admin', firstName: 'Admin', initials: 'A' }
  const cap = (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
  return {
    name: words.map(cap).join(' '),
    firstName: cap(words[0]),
    initials: words.slice(0, 2).map((w) => w.charAt(0).toUpperCase()).join(''),
  }
}

/**
 * Holds all UI state for the admin console and returns the view model `v`
 * (handlers, flags and computed colours) that every page and modal renders from.
 */
export function useAdminState() {
  const [s, setFullState] = useState(INITIAL_STATE)
  const toastTimer = useRef(null)

  // Class-style setState: merges a partial object or the result of an updater fn.
  const setState = useCallback((update) => {
    setFullState((prev) => ({ ...prev, ...(typeof update === 'function' ? update(prev) : update) }))
  }, [])

  useEffect(() => () => clearTimeout(toastTimer.current), [])

  const go = (p) => setState({ page: p, modal: null, rowMenu: null, storeOpen: false })
  const goBackModule = () => {
    const t = BACK_TO[s.page]
    if (t) go(t)
  }
  const flash = (msg) => {
    clearTimeout(toastTimer.current)
    setState({ toast: msg })
    toastTimer.current = setTimeout(() => setState({ toast: '' }), 2600)
  }

  const active = {"orderdetail":"orders","addproduct":"catalogue","editproduct":"catalogue","proddetail":"catalogue","driver":"del","promonew":"promo","refunds":"pay","bannernew":"content","notifnew":"notif","notifcentre":"notif"}[s.page] || s.page;
  const ct = s.catTab || 'products';
  const rm = (s.rowMenu === undefined) ? null : s.rowMenu;
  const v = {};
  // ---- tab bars ----
  const TABS = [
    ['_orders', 9],
    ['_catalogue', 5],
    ['_catalogue2', 5],
    ['_cust', 6],
    ['_del', 6],
    ['_del2', 3],
    ['_del3', 4],
    ['_promo', 5],
    ['_pay', 6],
    ['_refunds', 5],
    ['_rev', 5],
    ['_content', 6],
    ['_notif', 6],
    ['_analytics', 7],
    ['_settings', 6],
    ['_notifcentre', 6]
  ];
  const tabState = s.tabs || {};
  TABS.forEach(([gid, n]) => {
    const active = tabState[gid] === undefined ? 0 : tabState[gid];
    for (let i = 0; i < n; i++) {
      const on = active === i, key = 'tb' + gid + '_' + i, ix = i;
      v[key] = () => setState(st => ({ tabs: Object.assign({}, st.tabs, { [gid]: ix }), rowMenu: null }));
      v[key + 'Fg'] = on ? '#0B3D1F' : '#7C8A81';
      v[key + 'Bd'] = on ? '#0B3D1F' : 'transparent';
      v[key + 'Bg'] = on ? '#F1F9DF' : '#fff';
    }
  });
  // ---- segmented ranges & filter chips ----
  const RANGES = [['rng6', 5, 1], ['rng7', 5, 1]];
  const rngState = s.ranges || {};
  RANGES.forEach(([gid, n, def]) => {
    const active = rngState[gid] === undefined ? def : rngState[gid];
    for (let i = 0; i < n; i++) {
      const on = active === i, key = gid + '_' + i, ix = i;
      v[key] = () => setState(st => ({ ranges: Object.assign({}, st.ranges, { [gid]: ix }) }));
      v[key + 'Fg'] = on ? '#ffffff' : '#4A564E';
      v[key + 'Bg'] = on ? '#0B3D1F' : 'transparent';
    }
  });
  const CHIPS = [['cho', 5, [2, 3]], ['chp', 5, [2]], ['chi', 2, [0]], ['cha', 8, [0, 2, 5]], ['chs', 4, [0]]];
  const chipState = s.chips || {};
  CHIPS.forEach(([gid, n, def]) => {
    const sel = chipState[gid] || def;
    for (let i = 0; i < n; i++) {
      const on = sel.indexOf(i) >= 0, key = gid + '_' + i, ix = i;
      v[key] = () => setState(st => {
        const cur = (st.chips && st.chips[gid]) || def;
        const next = cur.indexOf(ix) >= 0 ? cur.filter(x => x !== ix) : cur.concat([ix]);
        return { chips: Object.assign({}, st.chips, { [gid]: next }) };
      });
      v[key + 'Fg'] = on ? '#0B3D1F' : '#4A564E';
      v[key + 'Bg'] = on ? '#F1F9DF' : '#fff';
      v[key + 'Bd'] = on ? '#C7E88A' : '#E4E7E2';
    }
  });
  // ---- row actions & dialogs ----
  const openM = (k) => () => setState({ modal: k, rowMenu: null, storeOpen: false });
  v.openRowActions = openM('rowactions');
  v.openStatus = openM('status');
  v.openAssign = openM('assign');
  v.openContact = openM('contact');
  v.openCallDriver = openM('calldriver');
  v.openReply = openM('reply');
  v.openHideReview = openM('hidereview');
  v.openInvite = openM('invite');
  v.openPassword = openM('password');
  v.openSessions = openM('sessions');
  v.openDateRange = openM('daterange');
  v.openFilterDrawer = openM('filter');
  v.openPrint = openM('print');
  v.openZones = openM('zones');
  v.openEditCustomer = openM('editcustomer');
  v.m_rowactions = s.modal === 'rowactions';
  v.m_status = s.modal === 'status';
  v.m_assign = s.modal === 'assign';
  v.m_contact = s.modal === 'contact';
  v.m_calldriver = s.modal === 'calldriver';
  v.m_reply = s.modal === 'reply';
  v.m_hidereview = s.modal === 'hidereview';
  v.m_invite = s.modal === 'invite';
  v.m_password = s.modal === 'password';
  v.m_sessions = s.modal === 'sessions';
  v.m_daterange = s.modal === 'daterange';
  v.m_filter = s.modal === 'filter';
  v.m_print = s.modal === 'print';
  v.m_zones = s.modal === 'zones';
  v.m_editcustomer = s.modal === 'editcustomer';
  // ---- record actions from the row menu ----
  v.viewRecord = () => { setState({ modal: null }); go('proddetail'); };
  v.editRecord = () => { setState({ modal: null }); go('editproduct'); };
  v.duplicateRecord = () => { setState({ modal: null }); flash('Duplicated as a draft · edit before publishing'); };
  v.archiveRecord = () => { setState({ modal: null }); flash('Archived · sales history retained'); };
  // ---- alerts ----
  v.markRead = () => flash('Alert marked as read');
  v.markAllRead = () => flash('All 7 alerts marked as read');
  v.loadOlder = () => flash('Loaded 20 older alerts');
  v.autoReassign = () => flash('4 orders reassigned · 2 drivers notified');
  v.notifyCustomers = () => flash('Delay notice sent to 4 customers');
  // ---- forms ----
  v.saveDraft = () => { flash('Saved as a draft'); };
  v.publishItem = () => { flash('Published and live in the app'); goBackModule(); };
  v.saveProduct = () => { flash(s.page === 'editproduct' ? 'Product updated' : 'Product saved to the catalogue'); go('catalogue'); };
  v.saveAndAdd = () => flash('Saved · form cleared for the next product');
  v.saveSettings = () => flash('Settings saved for Spice Kart Australia');
  v.discardChanges = () => flash('Changes discarded');
  v.previewApp = () => flash('Opening the customer app preview…');
  v.clearFilters = () => { setState({ modal: null, chips: { cho: [], chp: [], chi: [], cha: [], chs: [] } }); flash('Filters cleared'); };
  // ---- auth ----
  v.nav_forgot = () => go('forgot');
  v.recoveryCode = () => flash('Enter one of your 10 saved recovery codes');
  v.sendReset = () => flash('Reset link emailed · expires in 30 minutes');
  v.toast_calling = () => { setState({ modal: null }); flash('Calling +61 412 663 208 from the store line…'); };
  v.toast_sms = () => { setState({ modal: null }); flash('SMS sent to the customer'); };
  v.toast_email = () => { setState({ modal: null }); flash('Email sent to the customer'); };
  const STORE_NAMES = ['Collingwood store','Richmond store','Carlton store','South Yarra store','All stores'];
  const si = s.store === undefined ? 0 : s.store;
  v.storeOpen = !!s.storeOpen;
  v.storeName = STORE_NAMES[si];
  v.storeRot = s.storeOpen ? '270deg' : '90deg';
  v.storeBd = s.storeOpen ? '#0B3D1F' : '#E4E7E2';
  v.storeBg = s.storeOpen ? '#F1F9DF' : '#fff';
  v.toggleStore = () => setState(st => ({ storeOpen: !st.storeOpen, rowMenu: null }));
  for (let i = 0; i < 5; i++) {
    const idx = i;
    v['pickStore' + idx] = () => { setState({ store: idx, storeOpen: false }); flash('Switched to ' + STORE_NAMES[idx]); };
    v['storeSel' + idx] = si === idx;
    v['storeRowBg' + idx] = si === idx ? '#F7FCEE' : '#fff';
    v['storeIconBg' + idx] = si === idx ? '#F1F9DF' : '#F6F7F4';
    v['storeIconBd' + idx] = si === idx ? '#C7E88A' : '#E4E7E2';
  }
  v.p_productform = (s.page === 'addproduct' || s.page === 'editproduct');
  v.nav_editproduct = () => setState({ page: 'editproduct', modal: null, rowMenu: null });
  v.nav_addproduct = () => setState({ page: 'addproduct', modal: null, rowMenu: null });
  v.formTitle = s.page === 'editproduct' ? 'Edit product' : 'Add product';
  v.formSub = s.page === 'editproduct' ? 'Basmati Rice 5kg · SK-PAN-0142 · Grains, Rice &amp; Cereals › Basmati' : 'Create a new product in the Spice Kart catalogue';
  v.formCta = s.page === 'editproduct' ? 'Save changes' : 'Save product';
  v.isAddMode = s.page !== 'editproduct';
  v.openAbout = () => setState({ page: 'proddetail', rowMenu: null, modal: null });
  v.openDeleteProduct = () => setState({ modal: 'delete', rowMenu: null });
  for (let i = 0; i < 8; i++) {
    const idx = i;
    v['rowMenu' + idx] = () => setState(st => ({ rowMenu: st.rowMenu === idx ? null : idx }));
    v['rowOpen' + idx] = rm === idx;
    v['rowBd' + idx] = rm === idx ? '#0B3D1F' : '#E4E7E2';
    v['rowBg' + idx] = rm === idx ? '#F1F9DF' : '#fff';
  }
  v.p_catalogue = s.page === 'catalogue';
  v.nav_catalogue = () => go('catalogue');
  v.navBg_catalogue = active === 'catalogue' ? 'rgba(139,224,0,.14)' : 'transparent';
  v.navFg_catalogue = active === 'catalogue' ? '#8BE000' : 'rgba(255,255,255,.72)';
  v.nav_products = () => setState({ page: 'catalogue', catTab: 'products', modal: null });
  v.nav_cats = () => setState({ page: 'catalogue', catTab: 'cats', modal: null });
  v.nav_inv = () => setState({ page: 'catalogue', catTab: 'inv', modal: null });
  v.ct_products = () => setState({ catTab: 'products', rowMenu: null });
  v.ct_cats = () => setState({ catTab: 'cats', rowMenu: null });
  v.ct_inv = () => setState({ catTab: 'inv', rowMenu: null });
  v.isProducts = ct === 'products'; v.isCats = ct === 'cats'; v.isInv = ct === 'inv';
  ['products','cats','inv'].forEach(k => {
    const on = ct === k;
    v['ct_' + k + 'Fg'] = on ? '#0B3D1F' : '#7C8A81';
    v['ct_' + k + 'Bd'] = on ? '#0B3D1F' : 'transparent';
    v['ct_' + k + 'Bg'] = on ? '#F1F9DF' : '#EEF0EC';
  });
  v.catSearch = ct === 'products' ? 'Search products, SKU…' : (ct === 'cats' ? 'Search categories…' : 'Search SKU or product…');
  v.nav_dash = () => go('dash');
  v.navBg_dash = active === 'dash' ? 'rgba(139,224,0,.14)' : 'transparent';
  v.navFg_dash = active === 'dash' ? '#8BE000' : 'rgba(255,255,255,.72)';
  v.nav_orders = () => go('orders');
  v.navBg_orders = active === 'orders' ? 'rgba(139,224,0,.14)' : 'transparent';
  v.navFg_orders = active === 'orders' ? '#8BE000' : 'rgba(255,255,255,.72)';
  v.nav_cust = () => go('cust');
  v.navBg_cust = active === 'cust' ? 'rgba(139,224,0,.14)' : 'transparent';
  v.navFg_cust = active === 'cust' ? '#8BE000' : 'rgba(255,255,255,.72)';
  v.nav_del = () => go('del');
  v.navBg_del = active === 'del' ? 'rgba(139,224,0,.14)' : 'transparent';
  v.navFg_del = active === 'del' ? '#8BE000' : 'rgba(255,255,255,.72)';
  v.nav_promo = () => go('promo');
  v.navBg_promo = active === 'promo' ? 'rgba(139,224,0,.14)' : 'transparent';
  v.navFg_promo = active === 'promo' ? '#8BE000' : 'rgba(255,255,255,.72)';
  v.nav_pay = () => go('pay');
  v.navBg_pay = active === 'pay' ? 'rgba(139,224,0,.14)' : 'transparent';
  v.navFg_pay = active === 'pay' ? '#8BE000' : 'rgba(255,255,255,.72)';
  v.nav_rev = () => go('rev');
  v.navBg_rev = active === 'rev' ? 'rgba(139,224,0,.14)' : 'transparent';
  v.navFg_rev = active === 'rev' ? '#8BE000' : 'rgba(255,255,255,.72)';
  v.nav_content = () => go('content');
  v.navBg_content = active === 'content' ? 'rgba(139,224,0,.14)' : 'transparent';
  v.navFg_content = active === 'content' ? '#8BE000' : 'rgba(255,255,255,.72)';
  v.nav_notif = () => go('notif');
  v.navBg_notif = active === 'notif' ? 'rgba(139,224,0,.14)' : 'transparent';
  v.navFg_notif = active === 'notif' ? '#8BE000' : 'rgba(255,255,255,.72)';
  v.nav_analytics = () => go('analytics');
  v.navBg_analytics = active === 'analytics' ? 'rgba(139,224,0,.14)' : 'transparent';
  v.navFg_analytics = active === 'analytics' ? '#8BE000' : 'rgba(255,255,255,.72)';
  v.nav_staff = () => go('staff');
  v.navBg_staff = active === 'staff' ? 'rgba(139,224,0,.14)' : 'transparent';
  v.navFg_staff = active === 'staff' ? '#8BE000' : 'rgba(255,255,255,.72)';
  v.nav_settings = () => go('settings');
  v.navBg_settings = active === 'settings' ? 'rgba(139,224,0,.14)' : 'transparent';
  v.navFg_settings = active === 'settings' ? '#8BE000' : 'rgba(255,255,255,.72)';
  v.p_dash = s.page === 'dash';
  v.p_orders = s.page === 'orders';
  v.p_orderdetail = s.page === 'orderdetail';
  v.p_addproduct = s.page === 'addproduct';
  v.p_proddetail = s.page === 'proddetail';
  v.p_cust = s.page === 'cust';
  v.p_custdetail = s.page === 'custdetail';
  v.p_del = s.page === 'del';
  v.p_driver = s.page === 'driver';
  v.p_promo = s.page === 'promo';
  v.p_promonew = s.page === 'promonew';
  v.p_pay = s.page === 'pay';
  v.p_refunds = s.page === 'refunds';
  v.p_rev = s.page === 'rev';
  v.p_content = s.page === 'content';
  v.p_bannernew = s.page === 'bannernew';
  v.p_notif = s.page === 'notif';
  v.p_notifnew = s.page === 'notifnew';
  v.p_analytics = s.page === 'analytics';
  v.p_staff = s.page === 'staff';
  v.p_settings = s.page === 'settings';
  v.p_login = s.page === 'login';
  v.p_twofa = s.page === 'twofa';
  v.p_forgot = s.page === 'forgot';
  v.p_notifcentre = s.page === 'notifcentre';
  v.nav_notifcentre = () => go('notifcentre');
  v.nav_orderdetail = () => go('orderdetail');
  v.nav_proddetail = () => go('proddetail');
  v.nav_custdetail = () => go('custdetail');
  v.nav_driver = () => go('driver');
  v.nav_refunds = () => go('refunds');
  v.nav_login = () => go('login');
  v.openOrder = () => go('orderdetail');
  v.openPromoNew = () => go('promonew');
  v.openBannerNew = () => go('bannernew');
  v.openNotifNew = () => go('notifnew');
  // Dummy auth: any email/password is accepted, then any 6-digit code.
  const authEmail = s.authEmail || 'aarav.kapoor@spicekart.com.au';
  const user = userFromEmail(authEmail);
  v.authEmail = authEmail;
  v.userName = user.name;
  v.userFirstName = user.firstName;
  v.userInitials = user.initials;
  v.signIn = (email) => {
    if (typeof email === 'string') setState({ authEmail: email });
    go('twofa');
    flash('Code sent to your authenticator app');
  };
  v.verify2fa = () => { go('dash'); flash(`Signed in as ${user.name} · Super Admin`); };
  v.authError = (msg) => flash(msg);
  v.logout = () => {
    setState({ page: 'login', modal: null, rowMenu: null, storeOpen: false, catTab: 'products', tabs: {}, ranges: {}, chips: {}, store: 0 });
    flash('Signed out · two-factor required to sign back in');
  };
  v.openCancel = () => setState({ modal: 'cancel' });
  v.openRefund = () => setState({ modal: 'refund' });
  v.openStockAdj = () => setState({ modal: 'stockadj' });
  v.openDelete = () => setState({ modal: 'delete' });
  v.openSuspend = () => setState({ modal: 'suspend' });
  v.openCatEdit = () => setState({ modal: 'catedit' });
  v.closeModal = () => setState({ modal: null });
  v.confirmModal = () => {
    const msgs = { rowactions: 'Action applied', status: 'Order #SK10482 moved to Packed · customer notified', assign: '2 orders assigned to Jay Patel', contact: 'Message sent to John Smith', calldriver: 'Calling Michael Ryan…', reply: 'Reply posted publicly under the review', hidereview: 'Review hidden from the app', invite: 'Invite emailed to priya.raman@spicekart.com.au', password: 'Password changed · other sessions signed out', sessions: 'Signed out of 3 other sessions', daterange: 'Showing 22 Aug – 21 Sep 2026', filter: 'Filters applied', print: 'Invoice sent to the printer', zones: 'Delivery zones saved', editcustomer: 'Customer details updated', cancel: 'Order #SK10482 cancelled · $94.04 refunded', refund: 'Refund RF-2188 approved · $24.50 returned', stockadj: 'Stock updated · Basmati Rice 5kg now 126 units', delete: 'Basmati Rice 5kg deleted from the catalogue', suspend: 'Account suspended · customer notified', catedit: 'Category saved · Fresh Produce' };
    setState({ modal: null });
    flash(msgs[s.modal] || 'Changes saved');
  };
  v.m_cancel = s.modal === 'cancel';
  v.m_refund = s.modal === 'refund';
  v.m_stockadj = s.modal === 'stockadj';
  v.m_delete = s.modal === 'delete';
  v.m_suspend = s.modal === 'suspend';
  v.m_catedit = s.modal === 'catedit';
  v.toast_saved = () => flash('Changes saved successfully');
  v.toast_export = () => flash('Export started · CSV will be emailed to you');
  v.toast_help = () => flash('Support: it@spicekart.com.au · 1800 774 235');
  v.toast_notif = () => go('notifcentre');
  v.hideToast = () => setState({ toast: '' });
  v.toast = s.toast;
  v.hasToast = s.toast.length > 0;
  return v
}
