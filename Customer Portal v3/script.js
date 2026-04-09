// ══════════════════════════════════════════════
// DATA
// ══════════════════════════════════════════════
const DEMO_USER = {
  name: 'Ahmad Plantation Sdn Bhd', company: 'Ahmad Plantation Sdn Bhd',
  email: 'customer@mjm.com', password: '1234', phone: '+60 12-345 6789',
  state: 'Sarawak', since: 'January 2024',
  addr1: 'Lot 234, Jalan Plantation', addr2: 'Taman Industri Miri',
  city: 'Miri', postcode: '98000', bstate: 'Sarawak', country: 'Malaysia'
};

const MJM_BANK = {
  bank: 'Maybank Berhad',
  accountName: 'MJM Nursery Sdn Bhd',
  accountNo: '5120 1234 5678',
  swift: 'MBBEMYKL'
};

const ORDERS = [
  {
    id: 'ORD-001', variety: 'Oil Palm Seedling — Oct 2024', qty: 2000, price: 21.99, total: 43980,
    orderDate: '2024-11-15', collDate: '2025-04-10', status: 'Order Confirmed',
    notes: 'Delivery to Miri — confirm route 1 week before.',
    billing: 'Lot 234, Jalan Plantation, Taman Industri Miri, 98000 Miri, Sarawak',
    attachments: {
      order_placed: [{ name: 'Invoice INV-2024-001', type: 'PDF', size: '124 KB', icon: '📄' }],
      confirmed: [{ name: 'Order Confirmation', type: 'PDF', size: '88 KB', icon: '✅' }],
      preparing: [], ready_to_collect: [], collecting: [], order_completed: []
    }
  },
  {
    id: 'ORD-002', variety: 'Oil Palm Seedling — Nov 2024', qty: 1500, price: 21.99, total: 32985,
    orderDate: '2024-12-01', collDate: '2025-05-18', status: 'Pending Payment',
    notes: 'Waiting for payment confirmation.',
    billing: 'Lot 234, Jalan Plantation, Taman Industri Miri, 98000 Miri, Sarawak',
    attachments: {
      order_placed: [{ name: 'Proforma Invoice', type: 'PDF', size: '98 KB', icon: '📄' }],
      confirmed: [], preparing: [], ready_to_collect: [], collecting: [], order_completed: []
    }
  },
  {
    id: 'ORD-003', variety: 'Oil Palm Seedling — Sep 2024', qty: 3000, price: 21.99, total: 65970,
    orderDate: '2024-10-20', collDate: '2025-05-05', readyDate: '2025-04-10', status: 'Ready-to-Collect',
    notes: '1000 pcs priority ICU grade. Vehicle to bring tarpaulin.',
    billing: 'Lot 234, Jalan Plantation, Taman Industri Miri, 98000 Miri, Sarawak',
    attachments: {
      order_placed: [{ name: 'Invoice INV-2024-003', type: 'PDF', size: '132 KB', icon: '📄' }],
      confirmed: [{ name: 'Confirmation Letter', type: 'PDF', size: '76 KB', icon: '✅' }],
      preparing: [{ name: 'Seedling Prep Report', type: 'PDF', size: '210 KB', icon: '📋' }],
      ready_to_collect: [{ name: 'Ready Notice', type: 'PDF', size: '64 KB', icon: '📬' }],
      collecting: [], order_completed: []
    }
  },
  {
    id: 'ORD-005', variety: 'Oil Palm Seedling — Aug 2024', qty: 2500, price: 21.99, total: 54975,
    orderDate: '2024-09-10', collDate: '2025-03-20', readyDate: '2025-02-20', status: 'Collecting',
    notes: '1st batch of 1,000 collected. Remaining 1,500 to be arranged.',
    billing: 'Lot 234, Jalan Plantation, Taman Industri Miri, 98000 Miri, Sarawak',
    collectedQty: 1000,
    attachments: {
      order_placed: [{ name: 'Invoice INV-2024-005', type: 'PDF', size: '128 KB', icon: '📄' }],
      confirmed: [{ name: 'Confirmation Letter', type: 'PDF', size: '80 KB', icon: '✅' }],
      preparing: [{ name: 'Seedling Prep Report', type: 'PDF', size: '220 KB', icon: '📋' }],
      ready_to_collect: [{ name: 'Ready Notice', type: 'PDF', size: '68 KB', icon: '📬' }],
      collecting: [
        { name: 'Partial Collection DO — Batch 1', type: 'PDF', size: '92 KB', icon: '🚛' },
        { name: 'Consent Form (Signed)', type: 'PDF', size: '48 KB', icon: '✍️' }
      ],
      order_completed: []
    }
  },
  {
    id: 'ORD-004', variety: 'Oil Palm Seedling — Jul 2024', qty: 1000, price: 21.99, total: 21990,
    orderDate: '2024-08-05', collDate: '2024-12-15', completedDate: '2024-12-15', status: 'Order Completed',
    notes: 'Completed.',
    billing: 'Lot 234, Jalan Plantation, Taman Industri Miri, 98000 Miri, Sarawak',
    attachments: {
      order_placed: [{ name: 'Invoice INV-2024-004', type: 'PDF', size: '118 KB', icon: '📄' }],
      confirmed: [{ name: 'Confirmation', type: 'PDF', size: '68 KB', icon: '✅' }],
      preparing: [{ name: 'Prep Report', type: 'PDF', size: '195 KB', icon: '📋' }],
      ready_to_collect: [{ name: 'Ready Notice', type: 'PDF', size: '58 KB', icon: '📬' }],
      collecting: [{ name: 'Consent Form (Signed)', type: 'PDF', size: '44 KB', icon: '✍️' }],
      order_completed: [{ name: 'Collection Receipt', type: 'PDF', size: '85 KB', icon: '🧾' }]
    }
  },
];

const POINTS_DATA = {
  balance: 3450, tier: 'Gold', totalEarned: 5200, redeemed: 1200, expiringSoon: 200,
  nextTier: { name: 'Platinum', threshold: 5000 },
  history: [
    { type: 'earn', desc: 'Order ORD-001 — 2,000 seedlings', pts: 440, date: '15 Nov 2024' },
    { type: 'earn', desc: 'Order ORD-002 — 1,500 seedlings', pts: 330, date: '01 Dec 2024' },
    { type: 'earn', desc: 'Order ORD-003 — 3,000 seedlings', pts: 660, date: '20 Oct 2024' },
    { type: 'redeem', desc: 'Voucher SAVE10 redeemed', pts: -200, date: '05 Dec 2024' },
    { type: 'earn', desc: 'Order ORD-004 — 1,000 seedlings', pts: 220, date: '05 Aug 2024' },
    { type: 'expire', desc: 'Points expired (Q1 2024)', pts: -200, date: '31 Mar 2024' },
  ]
};

const VOUCHERS = {
  active: [
    { code: 'MJMGOLD10', type: 'Gold Member Reward', discount: '10% OFF', desc: '10% off your next order.', minSpend: 'RM 10,000', expiry: '30 Jun 2025', points: null },
    { code: 'FIRSTCOLL', type: 'Collection Bonus', discount: 'RM 500 OFF', desc: 'RM 500 rebate on transport costs.', minSpend: 'RM 20,000', expiry: '31 May 2025', points: null },
  ],
  shop: [
    { code: 'BULKDEAL5', type: 'Shop Voucher', discount: '5% OFF', desc: '5% off on orders above 2,000 seedlings.', minSpend: 'RM 40,000', expiry: '31 Aug 2025', points: null },
    { code: 'SAVE200', type: 'Points Redemption', discount: 'RM 200 OFF', desc: 'Redeem 200 points for RM 200 off.', minSpend: 'RM 5,000', expiry: '31 Dec 2025', points: 200 },
    { code: 'NURSERY15', type: 'Seasonal Promo', discount: '15% OFF', desc: 'Seasonal discount — Oct–Dec 2025.', minSpend: 'RM 30,000', expiry: '31 Dec 2025', points: null },
  ],
  past: [
    { code: 'SAVE10OLD', type: 'Redeemed', discount: 'RM 200 OFF', desc: 'Used on ORD-004.', status: 'Used', usedOn: '05 Aug 2024' },
    { code: 'NEWYEAR24', type: 'Expired', discount: '5% OFF', desc: 'New Year 2024 promotion.', status: 'Expired', usedOn: '—' },
  ]
};

const SLOT_BOOKINGS = {};
const MAX_PER_SLOT = 3;
const consentSigned = {};
const orderRatings = {};
const orderNextBooking = {}; // orderId -> 'YYYY-MM-DD' of next confirmed booking slot

let currentConsentOrderId = null;
let currentUser = null;
let vtab = 'active';
let currentRatingOrderId = null;
let currentRatingVal = 0;
let signDrawing = false, signHasMark = false;

// ══════════════════════════════════════════════
// OVERDUE REMINDER LOGIC
// Show overdue if:
//   Ready-to-Collect, no booking → 14 days after readyDate
//   Ready-to-Collect, booking made → booking date has passed
//   Collecting (remaining), no booking → 14 days after readyDate
//   Collecting (remaining), booking made → booking date has passed
// ══════════════════════════════════════════════
function isOverdueReminder(o) {
  if (['Order Completed','Cancelled','Pending Payment','Order Confirmed','Preparing'].includes(o.status)) return false;
  const today = new Date(); today.setHours(0,0,0,0);
  const nextBooking = orderNextBooking[o.id];

  if (o.status === 'Ready-to-Collect') {
    if (nextBooking) {
      const bd = new Date(nextBooking); bd.setHours(0,0,0,0);
      return today > bd;
    }
    const refDate = o.readyDate || o.collDate;
    if (!refDate) return false;
    const rd = new Date(refDate); rd.setHours(0,0,0,0);
    return Math.round((today - rd) / 864e5) >= 14;
  }

  if (o.status === 'Collecting') {
    const remaining = o.qty - (o.collectedQty || 0);
    if (remaining <= 0) return false;
    if (nextBooking) {
      const bd = new Date(nextBooking); bd.setHours(0,0,0,0);
      return today > bd;
    }
    const refDate = o.readyDate || o.collDate;
    if (!refDate) return false;
    const rd = new Date(refDate); rd.setHours(0,0,0,0);
    return Math.round((today - rd) / 864e5) >= 14;
  }
  return false;
}

function overdueReminderText(o) {
  const nextBooking = orderNextBooking[o.id];
  if (nextBooking) {
    const bd = new Date(nextBooking);
    return `Booking was scheduled for ${bd.toLocaleDateString('en-MY',{day:'2-digit',month:'short',year:'numeric'})} but collection has not been completed. Please contact MJM Nursery immediately.`;
  }
  return 'No collection booking has been made. Please book your collection slot immediately to avoid forfeiture of seedlings.';
}

// ══════════════════════════════════════════════
// STATUS CONFIG
// ══════════════════════════════════════════════
function badgeClass(s) {
  return {
    'Order Confirmed': 'badge-green',
    'Pending Payment': 'badge-amber',
    'Ready-to-Collect': 'badge-teal',
    'Collecting': 'badge-orange',
    'Order Completed': 'badge-grey',
    'Cancelled': 'badge-red'
  }[s] || 'badge-grey';
}

const STEP_KEYS = ['order_placed','confirmed','preparing','ready_to_collect','collecting','order_completed'];
const STEP_LABELS = {
  order_placed:'Order Placed', confirmed:'Confirmed', preparing:'Preparing',
  ready_to_collect:'Ready-to-Collect', collecting:'Collecting', order_completed:'Order Completed'
};
const STATUS_STEPS = {
  'Pending Payment':1, 'Order Confirmed':2, 'Preparing':3,
  'Ready-to-Collect':4, 'Collecting':5, 'Order Completed':6, 'Cancelled':0
};

// ══════════════════════════════════════════════
// AUTH
// ══════════════════════════════════════════════
function doLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-password').value;
  const err   = document.getElementById('login-error');
  if (email === DEMO_USER.email && pass === DEMO_USER.password) {
    err.style.display = 'none'; currentUser = { ...DEMO_USER }; showPortal();
  } else {
    err.style.display = 'block';
    setTimeout(() => err.style.display = 'none', 4000);
  }
}

function doRegister() {
  const name  = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const pass  = document.getElementById('reg-password').value;
  if (!name || !email || !pass) { showToast('⚠ Please fill in all required fields.'); return; }
  currentUser = {
    name, company: document.getElementById('reg-company').value.trim(), email,
    phone: document.getElementById('reg-phone').value.trim(), password: pass, state: '',
    since: new Date().toLocaleDateString('en-MY',{ month:'long', year:'numeric' })
  };
  showToast('Account created! Welcome 🌴');
  showPortal();
}

function doLogout() {
  currentUser = null; switchPage('page-login');
  document.getElementById('login-email').value = '';
  document.getElementById('login-password').value = '';
}

function switchLoginTab(tab, btn) {
  document.querySelectorAll('.lt-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('login-form').style.display    = tab === 'login'    ? 'block' : 'none';
  document.getElementById('register-form').style.display = tab === 'register' ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('login-password').addEventListener('keydown', e => { if (e.key==='Enter') doLogin(); });
  document.getElementById('login-email').addEventListener('keydown',    e => { if (e.key==='Enter') doLogin(); });
  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', e => { if (e.target===m) m.classList.remove('open'); });
  });
});

// ══════════════════════════════════════════════
// PAGE SWITCHING
// ══════════════════════════════════════════════
function switchPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0,0);
}

function showPortal() {
  document.getElementById('pn-user-name').textContent = currentUser.name;
  ['name','company','email','phone','state','since'].forEach(k => {
    const el = document.getElementById('pf-'+k); if (el) el.value = currentUser[k] || '';
  });
  ['addr1','addr2','city','post','bstate','country'].forEach(k => {
    const el = document.getElementById('pf-'+k); if (el) el.value = currentUser[k] || '';
  });
  renderStats(); renderOrders(); renderCollection(); renderPoints(); renderVouchers();
  switchPage('page-portal');
  switchTab('orders', document.querySelector('.ptab'));
}

// ══════════════════════════════════════════════
// STATS
// ══════════════════════════════════════════════
function renderStats() {
  const active = ORDERS.filter(o => !['Order Completed','Cancelled'].includes(o.status)).length;
  const ready  = ORDERS.filter(o => o.status === 'Ready-to-Collect').length;
  document.getElementById('stats-row').innerHTML = `
    <div class="stat-card" style="cursor:pointer" onclick="switchTab('orders',document.querySelectorAll('.ptab')[0])" title="View My Orders">
      <div class="sc-status sc-status-default">ACTIVE</div>
      <span class="sc-icon">📋</span>
      <div class="sc-label">Total Orders</div>
      <div class="sc-val">${ORDERS.length}</div>
    </div>
    <div class="stat-card accent-amber" style="cursor:pointer" onclick="switchTab('collection',document.querySelectorAll('.ptab')[1])" title="View Collection Schedule">
      <div class="sc-status">PENDING</div>
      <span class="sc-icon">🔄</span>
      <div class="sc-label">Awaiting Collection</div>
      <div class="sc-val">${active}</div>
    </div>
    <div class="stat-card accent-blue" style="cursor:pointer" onclick="switchTab('collection',document.querySelectorAll('.ptab')[1])" title="View Ready-to-Collect">
      <div class="sc-status" style="color:var(--blue)">HEALTHY</div>
      <span class="sc-icon">🌱</span>
      <div class="sc-label">Ready-to-Collect</div>
      <div class="sc-val">${ready}</div>
    </div>
    <div class="stat-card accent-green" style="cursor:pointer" onclick="switchTab('points',document.querySelectorAll('.ptab')[2])" title="View My Points">
      <div class="sc-status">POINTS</div>
      <span class="sc-icon">⭐</span>
      <div class="sc-label">My Points Balance</div>
      <div class="sc-val">${POINTS_DATA.balance.toLocaleString()}</div>
    </div>`;
}

// ══════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════
function switchTab(tab, btn) {
  document.querySelectorAll('.ptab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.ptab-panel').forEach(p => p.classList.remove('active'));
  if (btn) btn.classList.add('active');
  else document.querySelector('.ptab').classList.add('active');
  document.getElementById('ptab-'+tab).classList.add('active');
}

// ══════════════════════════════════════════════
// ORDERS LIST
// ══════════════════════════════════════════════
function renderOrders() {
  const recent  = ORDERS.filter(o => o.status !== 'Order Completed');
  const history = ORDERS.filter(o => o.status === 'Order Completed');
  let html = '';
  if (recent.length) {
    html += `<div class="orders-section-label">📋 Recent Orders (${recent.length})</div>`;
    html += `<div class="orders-grid">${recent.map(orderCardHTML).join('')}</div>`;
  }
  if (history.length) {
    html += `<div class="orders-section-label">🗂️ Order History (${history.length})</div>`;
    html += `<div class="orders-grid">${history.map(orderCardHTML).join('')}</div>`;
  }
  document.getElementById('orders-list').innerHTML = html;
}

function orderCardHTML(o) {
  const isCompleted = o.status === 'Order Completed';
  let dateDisplay = '—';
  if (isCompleted) {
    dateDisplay = `<span style="color:var(--green);font-weight:600">${o.completedDate || o.collDate || '—'}</span>`;
  } else if (o.collDate) {
    const d = Math.round((new Date(o.collDate) - new Date()) / 864e5);
    if      (d < 0)  dateDisplay = `<span style="color:var(--red);font-weight:700">Overdue</span>`;
    else if (d === 0) dateDisplay = `<span style="color:var(--amber);font-weight:700">Today!</span>`;
    else dateDisplay = `${o.collDate} <span style="font-size:.72rem;color:${d<=14?'var(--amber)':'var(--ink3)'}">(${d}d)</span>`;
  }
  const collectingNote = o.status==='Collecting' && o.collectedQty
    ? `<div class="oc-row"><span class="oc-row-label">Collected So Far</span><span class="oc-row-val" style="color:var(--teal);font-weight:700">${o.collectedQty.toLocaleString()} / ${o.qty.toLocaleString()} seedlings</span></div>` : '';
  const collDateLabel = isCompleted ? 'Completed Date' : 'Collection Date';
  return `<div class="order-card">
    <div class="oc-header">
      <div><div class="oc-id">${o.id}</div><div class="oc-date">Ordered ${o.orderDate}</div></div>
      <span class="badge ${badgeClass(o.status)}">${o.status}</span>
    </div>
    <div class="oc-body">
      <div class="oc-row"><span class="oc-row-label">Seedling Batch</span><span class="oc-row-val">${o.variety}</span></div>
      <div class="oc-row"><span class="oc-row-label">Quantity</span><span class="oc-row-val">${o.qty.toLocaleString()} seedlings</span></div>
      <div class="oc-row"><span class="oc-row-label">Unit Price</span><span class="oc-row-val">RM ${o.price.toFixed(2)}</span></div>
      <div class="oc-row"><span class="oc-row-label">${collDateLabel}</span><span class="oc-row-val">${dateDisplay}</span></div>
      ${collectingNote}
      ${o.notes ? `<div class="oc-row"><span class="oc-row-label">Notes</span><span class="oc-row-val" style="font-size:.77rem;color:var(--ink3);max-width:55%;text-align:right">${o.notes}</span></div>` : ''}
    </div>
    <div class="oc-footer">
      <div>
        <div class="oc-total-label">Order Total</div>
        <div class="oc-total-val">RM ${o.total.toLocaleString('en-MY',{minimumFractionDigits:2})}</div>
        ${orderRatings[o.id]
          ? `<div class="rating-done-badge">${'⭐'.repeat(orderRatings[o.id].rating)} Reviewed</div>`
          : (isCompleted ? `<button class="btn-outline" style="margin-top:.4rem;font-size:.74rem" onclick="openRatingModal('${o.id}')">⭐ Leave a Review</button>` : '')}
      </div>
      <div class="oc-actions">
        <button class="btn-outline" onclick="viewDetail('${o.id}')">View Details</button>
        ${o.status==='Pending Payment' ? `<button class="btn-outline danger" onclick="showToast('Please contact MJM Nursery to cancel.')">Cancel</button>` : ''}
      </div>
    </div>
  </div>`;
}

// ══════════════════════════════════════════════
// ORDER DETAIL
// ══════════════════════════════════════════════
function viewDetail(id) {
  const o = ORDERS.find(x => x.id===id); if (!o) return;
  const stepsDone  = STATUS_STEPS[o.status] || 0;
  const pct        = Math.max(0, Math.min(100, ((stepsDone-0.5)/STEP_KEYS.length)*100));
  const isCompleted = o.status === 'Order Completed';

  // Alert
  let alertHtml = '';
  if (!['Order Completed','Cancelled'].includes(o.status)) {
    const overdue = isOverdueReminder(o);
    if (overdue) {
      alertHtml = `<div class="coll-alert overdue"><span class="ca-icon">⚠️</span><div class="ca-text"><strong>Collection Overdue</strong><span>${overdueReminderText(o)}</span></div></div>`;
    } else if (o.status === 'Ready-to-Collect') {
      alertHtml = `<div class="coll-alert ready"><span class="ca-icon">✅</span><div class="ca-text"><strong>Your order is Ready-to-Collect!</strong><span>Please sign the consent form and book your collection date.</span></div></div>`;
    } else if (o.status === 'Collecting') {
      const rem = o.qty - (o.collectedQty||0);
      alertHtml = `<div class="coll-alert soon"><span class="ca-icon">🚛</span><div class="ca-text"><strong>Collection In Progress</strong><span>${(o.collectedQty||0).toLocaleString()} of ${o.qty.toLocaleString()} seedlings collected. ${rem.toLocaleString()} remaining — book your next slot below.</span></div></div>`;
    } else if (o.collDate) {
      const d = Math.round((new Date(o.collDate) - new Date()) / 864e5);
      if (d >= 0 && d <= 14) alertHtml = `<div class="coll-alert soon"><span class="ca-icon">⏰</span><div class="ca-text"><strong>Collection in ${d} day${d!==1?'s':''}</strong><span>Prepare your vehicle and confirm access road conditions.</span></div></div>`;
    }
  }

  // Timeline
  const tlSteps = STEP_KEYS.map((key,i) => {
    const isDone   = i < stepsDone;
    const isActive = (i===stepsDone) && !isCompleted && o.status!=='Cancelled';
    const cls = isDone ? 'done' : isActive ? 'active' : '';
    let atts = (o.attachments && o.attachments[key]) || [];
    if (key==='ready_to_collect' && consentSigned[id]) {
      const alreadyHas = atts.some(a => a.name.includes('Consent'));
      if (!alreadyHas) atts = [...atts,{name:`Consent Form — ${id} (Signed)`,type:'PDF',size:'44 KB',icon:'✍️',isConsent:true,consentOrderId:id}];
    }
    const attHtml = atts.length
      ? `<div class="h-step-attach" onclick="openAttModalWithFiles('${id}','${key}',event)">📎 ${atts.length} Doc${atts.length!==1?'s':''}</div>`
      : `<div style="height:1.2rem"></div>`;
    return `<div class="h-step ${cls}"><div class="h-step-dot"></div><div class="h-step-label">${STEP_LABELS[key]}</div>${attHtml}</div>`;
  }).join('');

  // Booking / action section
  let bookingHtml = '';
  if (o.status === 'Ready-to-Collect') {
    bookingHtml = consentSigned[id] ? buildBookingForm(id,o) : `
      <div class="booking-section">
        <h4>📅 Book Collection</h4>
        <p>Before booking your collection slot, please review and sign our collection consent form.</p>
        <div class="booking-locked">
          <div class="booking-locked-icon">🔒</div>
          <div class="booking-locked-text"><strong>Consent Required</strong>You must agree to our collection terms before proceeding.</div>
          <button class="btn-primary" style="margin-left:auto;flex-shrink:0" onclick="openConsentModal('${id}')">Sign Consent →</button>
        </div>
      </div>`;

  } else if (o.status === 'Collecting') {
    // No re-sign needed — show booking form directly
    const remaining = o.qty - (o.collectedQty||0);
    const pctDone   = o.qty ? Math.round(((o.collectedQty||0)/o.qty)*100) : 0;
    const progressBar = `<div style="margin:.6rem 0 0"><div style="height:7px;background:#fed7aa;border-radius:4px;overflow:hidden"><div style="width:${pctDone}%;height:100%;background:#c2410c;border-radius:4px"></div></div><div style="display:flex;justify-content:space-between;font-size:.7rem;color:#c2410c;font-weight:600;margin-top:.25rem"><span>${(o.collectedQty||0).toLocaleString()} collected</span><span>${remaining.toLocaleString()} remaining</span></div></div>`;
    bookingHtml = `
      <div class="booking-section" style="background:#fff7ed;border-color:#fed7aa;">
        <h4 style="color:#c2410c;">🚛 Collection In Progress — Book Next Batch</h4>
        <p>Book a slot for the remaining <strong>${remaining.toLocaleString()} seedlings</strong> below. Your consent is already on record.</p>
        <div style="display:flex;align-items:center;gap:.8rem;padding:.7rem 1rem;background:rgba(0,0,0,.04);border-radius:10px;margin-bottom:.9rem;">
          <span style="font-size:1.1rem">📦</span>
          <div style="flex:1">
            <div style="font-size:.84rem;font-weight:700;color:var(--ink)">${(o.collectedQty||0).toLocaleString()} / ${o.qty.toLocaleString()} seedlings collected</div>
            ${progressBar}
          </div>
          <div style="text-align:right;flex-shrink:0;margin-left:.5rem">
            <div style="font-size:.7rem;color:var(--ink3);font-weight:600;text-transform:uppercase;letter-spacing:.05em">Progress</div>
            <div style="font-size:1rem;font-weight:800;color:#c2410c">${pctDone}%</div>
          </div>
        </div>
        ${buildBookingForm(id, o, remaining)}
      </div>`;

  } else if (o.status === 'Pending Payment') {
    bookingHtml = buildPaymentUploadSection(id, o);

  } else if (['Order Confirmed','Preparing'].includes(o.status)) {
    bookingHtml = `<p style="font-size:.79rem;color:var(--ink3);margin-top:.7rem;padding:.6rem 1rem;background:var(--surface2);border-radius:8px;border-left:3px solid var(--border2);">Collection booking will be available once your order is <strong>Ready-to-Collect</strong>.</p>`;
  }

  const dateLabelKey = isCompleted ? 'Completed Date' : 'Collection Date';
  const dateLabelVal = isCompleted ? (o.completedDate||o.collDate||'—') : (o.collDate||'—');

  document.getElementById('orders-list').innerHTML = `
    <button class="detail-back" onclick="renderOrders()">← Back to Orders</button>
    <div class="detail-header">
      <div class="dh-top">
        <div class="dh-id">${o.id}</div>
        <span class="badge ${badgeClass(o.status)}">${o.status}</span>
      </div>
      <div class="dh-meta">
        <div class="dh-meta-item"><span>Batch</span><strong>${o.variety}</strong></div>
        <div class="dh-meta-item"><span>Quantity</span><strong>${o.qty.toLocaleString()} seedlings</strong></div>
        <div class="dh-meta-item"><span>Order Date</span><strong>${o.orderDate}</strong></div>
        <div class="dh-meta-item"><span>${dateLabelKey}</span><strong>${dateLabelVal}</strong></div>
        <div class="dh-meta-item"><span>Total</span><strong>RM ${o.total.toLocaleString('en-MY',{minimumFractionDigits:2})}</strong></div>
      </div>
    </div>
    ${alertHtml}
    <div class="card">
      <h3>📊 Order Progress</h3>
      <div class="h-timeline-wrap">
        <div class="h-timeline" id="htl-${id}">
          <div class="h-timeline-progress" style="width:${pct}%"></div>
          ${tlSteps}
        </div>
      </div>
      ${bookingHtml}
    </div>
    <div class="card">
      <h3>📋 Order Information</h3>
      <div class="oc-row"><span class="oc-row-label">Seedling Batch</span><span class="oc-row-val">${o.variety}</span></div>
      <div class="oc-row"><span class="oc-row-label">Quantity</span><span class="oc-row-val">${o.qty.toLocaleString()}</span></div>
      <div class="oc-row"><span class="oc-row-label">Unit Price</span><span class="oc-row-val">RM ${o.price.toFixed(2)}</span></div>
      ${o.status==='Collecting' && o.collectedQty ? `<div class="oc-row"><span class="oc-row-label">Collected So Far</span><span class="oc-row-val" style="color:var(--teal);font-weight:700">${o.collectedQty.toLocaleString()} seedlings (${Math.round((o.collectedQty/o.qty)*100)}%)</span></div>` : ''}
      <div class="oc-row" style="padding-top:.7rem;border-top:1.5px solid var(--border);margin-top:.3rem;">
        <span class="oc-row-label" style="font-weight:700">Total Amount</span>
        <span class="oc-row-val" style="font-family:'DM Serif Display',serif;font-size:1.1rem">RM ${o.total.toLocaleString('en-MY',{minimumFractionDigits:2})}</span>
      </div>
      ${o.notes ? `<div style="margin-top:1rem;padding-top:.9rem;border-top:1px solid var(--border)"><div style="font-size:.68rem;font-weight:700;color:var(--ink3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:.4rem">Notes</div><div style="font-size:.82rem;color:var(--ink2);line-height:1.6">${o.notes}</div></div>` : ''}
      <div style="margin-top:1rem;padding-top:.9rem;border-top:1px solid var(--border)">
        <div style="font-size:.68rem;font-weight:700;color:var(--ink3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:.5rem">📍 Billing Address</div>
        <div style="font-size:.84rem;color:var(--ink);font-weight:600">${o.billing}</div>
      </div>
      <div style="margin-top:1rem;padding-top:.9rem;border-top:1px solid var(--border)">
        <div style="font-size:.68rem;font-weight:700;color:var(--ink3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:.6rem">Need Help?</div>
        <a href="mailto:info@mjnursery.com.my" style="display:block;font-size:.81rem;color:var(--blue);margin-bottom:.35rem;">✉️ info@mjnursery.com.my</a>
        <p style="font-size:.77rem;color:var(--ink3)">Mon–Fri 8am–5pm · Sat 8am–12pm</p>
      </div>
    </div>`;
}

// ══════════════════════════════════════════════
// PAYMENT UPLOAD SECTION
// ══════════════════════════════════════════════
function buildPaymentUploadSection(id, o) {
  return `
    <div class="payment-section">
      <h4>💳 Complete Your Payment</h4>
      <p>Transfer the full amount and upload your payment proof. We will verify and confirm within 1–2 business days.</p>
      <div class="bank-details-box">
        <div class="bank-details-title">🏦 MJM Nursery Bank Account</div>
        <div class="bank-row"><span class="bank-label">Bank</span><span class="bank-val">${MJM_BANK.bank}</span></div>
        <div class="bank-row"><span class="bank-label">Account Name</span><span class="bank-val">${MJM_BANK.accountName}</span></div>
        <div class="bank-row">
          <span class="bank-label">Account No.</span>
          <span class="bank-val bank-acc">${MJM_BANK.accountNo}
            <button class="copy-acc-btn" onclick="copyBankAcc(event)">Copy</button>
          </span>
        </div>
        <div class="bank-row"><span class="bank-label">Swift Code</span><span class="bank-val">${MJM_BANK.swift}</span></div>
        <div class="bank-row"><span class="bank-label">Payment Reference</span><span class="bank-val" style="color:var(--green);font-weight:700">${id}</span></div>
        <div class="bank-amount-row">
          <span>Amount Due</span>
          <span class="bank-amount">RM ${o.total.toLocaleString('en-MY',{minimumFractionDigits:2})}</span>
        </div>
      </div>
      <div class="upload-box" id="upload-box-${id}">
        <div class="upload-icon">📎</div>
        <div class="upload-label">Upload Payment Proof</div>
        <div class="upload-hint">Click to select or drag & drop your receipt (JPG, PNG, PDF)</div>
        <input type="file" id="payment-file-${id}" accept="image/*,.pdf" style="display:none" onchange="handlePaymentUpload('${id}',this)"/>
        <button class="upload-btn" onclick="document.getElementById('payment-file-${id}').click()">Select File</button>
      </div>
      <div id="upload-preview-${id}" style="display:none" class="upload-preview">
        <span class="upload-preview-icon">✅</span>
        <span id="upload-preview-name-${id}" class="upload-preview-name"></span>
        <button class="upload-remove-btn" onclick="removePaymentFile('${id}')">✕ Remove</button>
      </div>
      <button class="btn-primary" style="margin-top:1rem;width:100%" onclick="submitPaymentProof('${id}')">📤 Submit Payment Proof</button>
    </div>`;
}

function copyBankAcc(e) {
  e.stopPropagation();
  navigator.clipboard?.writeText(MJM_BANK.accountNo.replace(/\s/g,'')).catch(()=>{});
  showToast('📋 Account number copied!');
}

function handlePaymentUpload(id, input) {
  if (!input.files || !input.files[0]) return;
  document.getElementById('upload-box-'+id).style.display = 'none';
  document.getElementById('upload-preview-name-'+id).textContent = input.files[0].name;
  document.getElementById('upload-preview-'+id).style.display = 'flex';
}

function removePaymentFile(id) {
  document.getElementById('payment-file-'+id).value = '';
  document.getElementById('upload-box-'+id).style.display = 'flex';
  document.getElementById('upload-preview-'+id).style.display = 'none';
}

function submitPaymentProof(id) {
  const input = document.getElementById('payment-file-'+id);
  if (!input || !input.files || !input.files[0]) { showToast('⚠ Please select a file first.'); return; }
  showToast('✅ Payment proof submitted! We will verify within 1–2 business days.');
  setTimeout(() => viewDetail(id), 500);
}

// ══════════════════════════════════════════════
// BOOKING FORM
// ══════════════════════════════════════════════
const HOURS = [8,9,10,11,12,13,14,15,16];

function fmtHour(h) {
  return { main: (h>12?h-12:h)+':00', ampm: h<12?'AM':'PM' };
}

function getSlotKey(date,hour) { return date+'|'+hour; }
function getSlotCount(date,hour) { return SLOT_BOOKINGS[getSlotKey(date,hour)]||0; }

function buildBookingForm(id, o, maxQtyOverride) {
  const today = new Date().toISOString().split('T')[0];
  const maxQ  = maxQtyOverride || o.qty;
  return `
    <div class="booking-section-inner" id="booking-section-${id}">
      <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:1rem;padding:.45rem .8rem;background:var(--green-light);border-radius:8px;width:fit-content">
        <span>✅</span>
        <span style="font-size:.77rem;font-weight:700;color:#15803d">Consent on record — no re-signing required</span>
      </div>
      <div style="margin-bottom:1rem">
        <label style="display:block;font-size:.72rem;font-weight:700;color:var(--ink2);letter-spacing:.06em;text-transform:uppercase;margin-bottom:.4rem">Select Date</label>
        <input type="date" id="book-date-${id}" min="${today}"
          style="background:var(--surface2);border:1.5px solid var(--border);border-radius:var(--radius-sm);padding:.6rem .9rem;font-size:.86rem;color:var(--ink);outline:none;font-family:inherit;width:220px"
          onchange="renderTimeWheel('${id}')"/>
      </div>
      <div class="time-picker-section">
        <label>Select Time Slot <span style="font-weight:400;color:var(--ink3);text-transform:none;letter-spacing:0">(max ${MAX_PER_SLOT} per slot)</span></label>
        <div class="time-wheel-grid" id="time-wheel-${id}"><p style="font-size:.8rem;color:var(--ink3)">Please select a date first.</p></div>
      </div>
      <div class="booking-form-grid">
        <div>
          <label>Collection Quantity (seedlings)</label>
          <input type="number" id="book-qty-${id}" placeholder="e.g. 2000" min="1" max="${maxQ}"
            style="background:var(--surface2);border:1.5px solid var(--border);border-radius:var(--radius-sm);padding:.6rem .9rem;font-size:.86rem;color:var(--ink);outline:none;font-family:inherit;width:100%"/>
          <div style="font-size:.7rem;color:var(--ink3);margin-top:.3rem">Max: ${maxQ.toLocaleString()} seedlings</div>
        </div>
        <div>
          <label>Vehicle Type / Notes</label>
          <input type="text" id="book-notes-${id}" placeholder="e.g. 10-tonne lorry, tarpaulin"
            style="background:var(--surface2);border:1.5px solid var(--border);border-radius:var(--radius-sm);padding:.6rem .9rem;font-size:.86rem;color:var(--ink);outline:none;font-family:inherit;width:100%"/>
        </div>
      </div>
      <input type="hidden" id="book-hour-${id}" value=""/>
      <button class="btn-primary" style="margin-top:.8rem" onclick="submitBooking('${id}',${maxQ})">📅 Confirm Booking Request</button>
    </div>`;
}

function renderTimeWheel(orderId) {
  const dateInput = document.getElementById('book-date-'+orderId);
  const date = dateInput ? dateInput.value : '';
  const container = document.getElementById('time-wheel-'+orderId);
  if (!date || !container) return;
  const hourInput = document.getElementById('book-hour-'+orderId);
  if (hourInput) hourInput.value = '';
  container.innerHTML = HOURS.map(h => {
    const count = getSlotCount(date,h);
    const full  = count >= MAX_PER_SLOT;
    const {main,ampm} = fmtHour(h);
    const rem = MAX_PER_SLOT - count;
    return `<div class="time-slot ${full?'full':''}" id="ts-${orderId}-${h}" onclick="selectHour('${orderId}',${h},'${date}')">
      <div class="ts-time">${main}</div>
      <div class="ts-ampm">${ampm}</div>
      <div class="ts-slots ${full?'full-label':''}">${full?'FULL':rem+' left'}</div>
    </div>`;
  }).join('');
}

function selectHour(orderId,h,date) {
  if (getSlotCount(date,h)>=MAX_PER_SLOT) { showToast('⚠ This slot is full. Please choose another time.'); return; }
  HOURS.forEach(hr => { const el=document.getElementById('ts-'+orderId+'-'+hr); if(el) el.classList.remove('selected'); });
  const el = document.getElementById('ts-'+orderId+'-'+h);
  if (el) el.classList.add('selected');
  const hi = document.getElementById('book-hour-'+orderId);
  if (hi) hi.value = h;
}

function submitBooking(id, maxQty) {
  const date = document.getElementById('book-date-'+id)?.value;
  const hour = document.getElementById('book-hour-'+id)?.value;
  const qty  = document.getElementById('book-qty-'+id)?.value;
  if (!date) { showToast('⚠ Please select a date.'); return; }
  if (!hour) { showToast('⚠ Please select a time slot.'); return; }
  if (!qty || isNaN(qty) || Number(qty)<1) { showToast('⚠ Please enter a valid quantity.'); return; }
  if (Number(qty)>Number(maxQty)) { showToast(`⚠ Quantity cannot exceed ${maxQty} seedlings.`); return; }
  SLOT_BOOKINGS[getSlotKey(date,parseInt(hour))] = (SLOT_BOOKINGS[getSlotKey(date,parseInt(hour))]||0)+1;
  orderNextBooking[id] = date; // record for overdue logic
  const {main,ampm} = fmtHour(parseInt(hour));
  showToast(`✅ Booking confirmed for ${date} at ${main} ${ampm} — ${Number(qty).toLocaleString()} seedlings`);
  setTimeout(() => viewDetail(id), 400);
}

// ══════════════════════════════════════════════
// CONSENT MODAL
// ══════════════════════════════════════════════
function openConsentModal(orderId) {
  currentConsentOrderId = orderId;
  document.getElementById('consent-chk').checked = false;
  document.getElementById('consent-submit-btn').disabled = true;
  signHasMark = false; clearSignature();
  document.getElementById('consent-modal').classList.add('open');
  setTimeout(initCanvas, 100);
}
function closeConsentModal() {
  document.getElementById('consent-modal').classList.remove('open');
  currentConsentOrderId = null;
}
function checkConsentReady() {
  document.getElementById('consent-submit-btn').disabled = !(document.getElementById('consent-chk').checked && signHasMark);
}
function submitConsent() {
  if (!currentConsentOrderId) return;
  const canvas = document.getElementById('sign-canvas');
  const sigDataUrl = canvas ? canvas.toDataURL('image/png') : '';
  const signedAt = new Date().toLocaleString('en-MY',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'});
  const orderId = currentConsentOrderId;
  consentSigned[orderId] = { signed:true, signatureDataUrl:sigDataUrl, signedAt };
  const order = ORDERS.find(x => x.id===orderId);
  if (order) {
    if (!order.attachments.ready_to_collect) order.attachments.ready_to_collect = [];
    if (!order.attachments.ready_to_collect.some(a => a.isConsent)) {
      order.attachments.ready_to_collect.push({
        name:`Consent Form — ${orderId} (Signed)`, type:'PDF', size:'44 KB', icon:'✍️',
        isConsent:true, consentOrderId:orderId, signedAt, sigDataUrl
      });
    }
  }
  closeConsentModal();
  showToast('✅ Consent signed! Saved to your order documents.');
  viewDetail(orderId);
}

function downloadConsentPdf(orderId) {
  const cs = consentSigned[orderId];
  const order = ORDERS.find(x => x.id===orderId);
  if (!cs||!order) { showToast('Consent data not found.'); return; }
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>Consent Form — ${orderId}</title>
  <style>body{font-family:Georgia,serif;max-width:700px;margin:40px auto;color:#111;line-height:1.7}
  h1{font-size:1.4rem;border-bottom:2px solid #111;padding-bottom:.5rem;margin-bottom:1.2rem}
  h2{font-size:1rem;margin:1.2rem 0 .4rem}.meta{font-size:.85rem;color:#555;margin-bottom:1.5rem}
  .sig-box{border:1.5px solid #ccc;border-radius:8px;padding:.5rem;margin:1rem 0;background:#fafafa;text-align:center}
  .sig-box img{max-width:100%;height:100px;object-fit:contain}
  .footer{margin-top:2rem;padding-top:1rem;border-top:1px solid #ccc;font-size:.8rem;color:#888}
  </style></head><body>
  <h1>MJM Nursery — Collection Consent Form</h1>
  <div class="meta"><strong>Order:</strong> ${orderId} &nbsp;|&nbsp; <strong>Signed:</strong> ${cs.signedAt}</div>
  <h2>Terms & Conditions</h2>
  <p><strong>1. Collection Responsibility.</strong> The customer is solely responsible for arranging adequate transportation.</p>
  <p><strong>2. Seedling Condition.</strong> MJM Nursery guarantees seedlings are healthy at time of collection.</p>
  <p><strong>3. Quantity Verification.</strong> Customer must verify quantity and sign the delivery order (DO) on-site.</p>
  <p><strong>4. Changes & Cancellations.</strong> 48 hours notice required; less than 24 hours may incur RM 200 fee.</p>
  <p><strong>5. Access & Safety.</strong> Customer's staff must adhere to nursery safety guidelines.</p>
  <p><strong>6. Force Majeure.</strong> MJM Nursery may reschedule in extreme weather or uncontrollable circumstances.</p>
  <h2>Customer Signature</h2>
  <div class="sig-box">
    ${cs.signatureDataUrl ? `<img src="${cs.signatureDataUrl}" alt="Signature"/>` : '<p style="color:#aaa;font-style:italic">No signature data</p>'}
    <div style="font-size:.8rem;color:#555;margin-top:.3rem">Signed on: ${cs.signedAt}</div>
  </div>
  <div class="footer">MJM Nursery Sdn Bhd &nbsp;|&nbsp; info@mjnursery.com.my &nbsp;|&nbsp; Generated electronically.</div>
  </body></html>`;
  const blob = new Blob([html],{type:'text/html'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href=url; a.download=`Consent_Form_${orderId}.html`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url); showToast('📥 Consent PDF downloaded!');
}

function downloadFile(file, orderId) {
  if (file.isConsent) { downloadConsentPdf(file.consentOrderId||orderId); return; }
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>${file.name}</title>
  <style>body{font-family:Georgia,serif;max-width:700px;margin:60px auto;color:#111;text-align:center}
  .icon{font-size:4rem;margin-bottom:1rem}h1{font-size:1.4rem}p{color:#555}</style></head><body>
  <div class="icon">${file.icon||'📄'}</div><h1>${file.name}</h1>
  <p>Order: ${orderId} &nbsp;|&nbsp; Type: ${file.type} &nbsp;|&nbsp; Size: ${file.size}</p>
  <p style="margin-top:2rem;font-style:italic;color:#aaa">Demo document — actual file served in production.</p>
  <p style="margin-top:1rem;font-size:.85rem;color:#888">MJM Nursery Sdn Bhd</p></body></html>`;
  const blob = new Blob([html],{type:'text/html'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href=url; a.download=file.name.replace(/[^a-zA-Z0-9\-_.]/g,'_')+'.html';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url); showToast(`📥 Downloading ${file.name}…`);
}

function initCanvas() {
  const canvas = document.getElementById('sign-canvas'); if (!canvas) return;
  const dpr = window.devicePixelRatio||1;
  const rect = canvas.getBoundingClientRect();
  canvas.width=rect.width*dpr; canvas.height=rect.height*dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr,dpr); ctx.strokeStyle='#111827'; ctx.lineWidth=2; ctx.lineCap='round'; ctx.lineJoin='round';
  function getPos(e) { const r=canvas.getBoundingClientRect(); const src=e.touches?e.touches[0]:e; return {x:src.clientX-r.left,y:src.clientY-r.top}; }
  canvas.onmousedown=canvas.ontouchstart=(e)=>{ e.preventDefault(); signDrawing=true; const p=getPos(e); const ctx=canvas.getContext('2d'); ctx.beginPath(); ctx.moveTo(p.x,p.y); };
  canvas.onmousemove=canvas.ontouchmove=(e)=>{ e.preventDefault(); if(!signDrawing) return; const p=getPos(e); const ctx=canvas.getContext('2d'); ctx.lineTo(p.x,p.y); ctx.stroke(); signHasMark=true; checkConsentReady(); };
  canvas.onmouseup=canvas.ontouchend=()=>{ signDrawing=false; };
  canvas.onmouseleave=()=>{ signDrawing=false; };
}

function clearSignature() {
  const canvas=document.getElementById('sign-canvas'); if(!canvas) return;
  canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height);
  signHasMark=false; checkConsentReady();
}

// ══════════════════════════════════════════════
// ATTACHMENT MODAL
// ══════════════════════════════════════════════
function openAttModal(orderId,stepKey,e) {
  if (e) e.stopPropagation();
  const o = ORDERS.find(x=>x.id===orderId); if(!o) return;
  let files = (o.attachments&&o.attachments[stepKey])||[];
  if (stepKey==='ready_to_collect'&&consentSigned[orderId]) {
    if (!files.some(a=>a.isConsent)) files=[...files,{name:`Consent Form — ${orderId} (Signed)`,type:'PDF',size:'44 KB',icon:'✍️',isConsent:true,consentOrderId:orderId}];
  }
  openAttModalWithFileList(orderId,stepKey,files);
}
function openAttModalWithFiles(orderId,stepKey,e) { if(e) e.stopPropagation(); openAttModal(orderId,stepKey,null); }

function openAttModalWithFileList(orderId,stepKey,files) {
  const label = {order_placed:'Order Placed',confirmed:'Confirmed',preparing:'Preparing',ready_to_collect:'Ready-to-Collect',collecting:'Collecting',order_completed:'Order Completed'}[stepKey]||stepKey;
  document.getElementById('att-modal-title').textContent = label+' — Documents';
  const filesHtml = files.length
    ? files.map(f=>`<div class="att-file" onclick="downloadFile(${JSON.stringify(f).replace(/"/g,'&quot;')},'${orderId}')">
        <div class="att-file-icon">${f.icon}</div>
        <div class="att-file-info"><strong>${f.name}</strong><span>${f.type} · ${f.size}${f.signedAt?' · Signed '+f.signedAt:''}</span></div>
        <div class="att-file-dl">⬇ Download</div>
      </div>`).join('')+(files.length>1?`<button class="att-download-all" onclick="downloadAllFiles(${JSON.stringify(files).replace(/"/g,'&quot;')},'${orderId}')">⬇ Download All (${files.length} files)</button>`:'')
    : '<p style="font-size:.84rem;color:var(--ink3);text-align:center;padding:1.5rem 0">No documents for this stage yet.</p>';
  document.getElementById('att-modal-body').innerHTML = filesHtml;
  document.getElementById('att-modal').classList.add('open');
}

function downloadAllFiles(files,orderId) {
  showToast(`📥 Downloading ${files.length} files…`);
  files.forEach((f,i)=>{ setTimeout(()=>downloadFile(f,orderId),i*600); });
}
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

// ══════════════════════════════════════════════
// COLLECTION SCHEDULE
// ══════════════════════════════════════════════
function renderCollection() {
  const upcoming = ORDERS.filter(o=>!['Order Completed','Cancelled'].includes(o.status)&&o.collDate)
    .sort((a,b)=>new Date(a.collDate)-new Date(b.collDate));
  const past = ORDERS.filter(o=>o.status==='Order Completed');
  let html='';

  upcoming.forEach(o => {
    const overdue = isOverdueReminder(o);
    if (overdue) {
      html+=`<div class="coll-alert overdue"><span class="ca-icon">⚠️</span><div class="ca-text"><strong>${o.id} — Collection Overdue</strong><span>${overdueReminderText(o)}</span></div></div>`;
    } else if (o.status==='Ready-to-Collect') {
      html+=`<div class="coll-alert ready"><span class="ca-icon">✅</span><div class="ca-text"><strong>${o.id} — Ready-to-Collect!</strong><span>Go to order details to sign consent and book your slot.</span></div></div>`;
    } else if (o.status==='Collecting') {
      const rem=o.qty-(o.collectedQty||0);
      html+=`<div class="coll-alert soon"><span class="ca-icon">🚛</span><div class="ca-text"><strong>${o.id} — Collection In Progress</strong><span>${(o.collectedQty||0).toLocaleString()} / ${o.qty.toLocaleString()} collected. ${rem.toLocaleString()} remaining — book next batch from order details.</span></div></div>`;
    } else {
      const d=Math.round((new Date(o.collDate)-new Date())/864e5);
      if (d>=0&&d<=7) html+=`<div class="coll-alert soon"><span class="ca-icon">⏰</span><div class="ca-text"><strong>${o.id} — ${d} day${d!==1?'s':''} to collection</strong><span>Prepare your vehicle and confirm access route.</span></div></div>`;
    }
  });

  if (upcoming.length) {
    html+=`<div class="card"><h3>📅 Upcoming Collections</h3>`;
    html+=upcoming.map(o=>{
      const d=Math.round((new Date(o.collDate)-new Date())/864e5);
      const overdue=isOverdueReminder(o);
      const dStr=overdue?`<span style="color:var(--red);font-weight:700">⚠ Overdue</span>`
        :d===0?`<span style="color:var(--amber);font-weight:700">Today!</span>`
        :d<0?`<span style="color:var(--red);font-weight:700">Past</span>`
        :d<=7?`<span style="color:var(--amber);font-weight:700">In ${d} days</span>`
        :`In ${d} days`;
      return `<div class="oc-row" style="flex-wrap:wrap;gap:.5rem;align-items:center;padding:.7rem 0">
        <div><div style="font-weight:700;font-size:.87rem">${o.id}</div><div style="font-size:.75rem;color:var(--ink3)">${o.variety} · ${o.qty.toLocaleString()} seedlings</div></div>
        <div style="margin-left:auto;display:flex;align-items:center;gap:.7rem;flex-wrap:wrap">
          <div style="text-align:right"><div style="font-size:.74rem;color:var(--ink3)">${o.collDate}</div><div style="font-size:.74rem">${dStr}</div></div>
          <span class="badge ${badgeClass(o.status)}">${o.status}</span>
        </div>
      </div>`;
    }).join('');
    html+=`</div>`;
  }

  if (past.length) {
    html+=`<div class="card"><h3>✅ Collection History</h3>`;
    html+=past.map(o=>`<div class="oc-row" style="flex-wrap:wrap;gap:.5rem;align-items:center;padding:.7rem 0">
      <div><div style="font-weight:700;font-size:.87rem">${o.id}</div><div style="font-size:.75rem;color:var(--ink3)">${o.variety} · ${o.qty.toLocaleString()} seedlings</div></div>
      <div style="margin-left:auto;display:flex;align-items:center;gap:.7rem">
        <div style="text-align:right"><div style="font-size:.74rem;color:var(--ink3)">Completed ${o.completedDate||o.collDate}</div><div style="font-size:.74rem;font-weight:700;color:var(--green)">RM ${o.total.toLocaleString('en-MY',{minimumFractionDigits:2})}</div></div>
        <span class="badge badge-grey">Order Completed</span>
      </div>
    </div>`).join('');
    html+=`<div style="margin-top:1rem;padding-top:.9rem;border-top:1.5px solid var(--border);display:flex;justify-content:space-between;align-items:center">
      <span style="font-size:.8rem;color:var(--ink3);font-weight:600;text-transform:uppercase;letter-spacing:.05em">Total Completed</span>
      <span style="font-family:'DM Serif Display',serif;font-size:1.2rem;color:var(--ink)">RM ${past.reduce((s,o)=>s+o.total,0).toLocaleString('en-MY',{minimumFractionDigits:2})}</span>
    </div></div>`;
  }

  if (!upcoming.length&&!past.length) html=`<div class="empty-state"><div class="es-icon">📅</div><div class="es-title">No collections yet</div><div class="es-desc">Upcoming collection schedules will appear here.</div></div>`;
  document.getElementById('coll-view').innerHTML=html;
}

// ══════════════════════════════════════════════
// POINTS
// ══════════════════════════════════════════════
function renderPoints() {
  const p=POINTS_DATA;
  const tierCls={Gold:'tier-gold',Silver:'tier-silver',Bronze:'tier-bronze'}[p.tier]||'tier-silver';
  const pct=Math.min(100,Math.round((p.balance/p.nextTier.threshold)*100));
  document.getElementById('points-view').innerHTML=`
    <div class="points-hero">
      <div class="ph-inner" style="position:relative;z-index:2">
        <div>
          <div class="ph-label">Available Points</div>
          <div class="ph-val">${p.balance.toLocaleString()}<span>pts</span></div>
          <span class="tier-badge ${tierCls}">🏅 ${p.tier} Member</span>
          ${p.expiringSoon?`<div style="font-size:.72rem;color:rgba(255,200,80,.65);margin-top:.5rem">⚠ ${p.expiringSoon} pts expiring soon</div>`:''}
        </div>
        <div class="ph-progress-card">
          <label>Progress to ${p.nextTier.name}</label>
          <div class="ph-bar-bg"><div class="ph-bar" style="width:${pct}%"></div></div>
          <div class="ph-bar-text">${p.balance.toLocaleString()} / ${p.nextTier.threshold.toLocaleString()} pts (${pct}%)</div>
        </div>
      </div>
    </div>
    <div class="points-stats">
      <div class="pts-card hi"><div class="v">${p.balance.toLocaleString()}</div><div class="l">Available</div></div>
      <div class="pts-card"><div class="v">${p.totalEarned.toLocaleString()}</div><div class="l">Total Earned</div></div>
      <div class="pts-card"><div class="v">${p.redeemed.toLocaleString()}</div><div class="l">Redeemed</div></div>
    </div>
    <div class="card" style="padding:0">
      <div style="padding:1rem 1.5rem;border-bottom:1.5px solid var(--border);display:flex;justify-content:space-between;align-items:center">
        <h3 style="border:none;padding:0;margin:0">Points History</h3>
        <span style="font-size:.74rem;color:var(--ink3);font-weight:600">${p.history.length} transactions</span>
      </div>
      ${p.history.map(h=>`
        <div class="pts-row">
          <div class="pts-icon ${h.type}">${h.type==='earn'?'🌱':h.type==='redeem'?'🎟️':'⌛'}</div>
          <div class="pts-info"><strong>${h.desc}</strong><span>${h.date}</span></div>
          <div class="pts-amount ${h.type}">${h.pts>0?'+':''}${h.pts.toLocaleString()} pts</div>
        </div>`).join('')}
    </div>
    <div class="card" style="margin-top:1rem">
      <h3>How to Earn Points</h3>
      <div class="oc-row"><span class="oc-row-label">Every RM 100 spent</span><span class="oc-row-val">+1 point</span></div>
      <div class="oc-row"><span class="oc-row-label">Gold Member bonus</span><span class="oc-row-val">2× points on all orders</span></div>
      <div class="oc-row"><span class="oc-row-label">Refer a new customer</span><span class="oc-row-val">+100 bonus points</span></div>
      <div class="oc-row"><span class="oc-row-label">Redeem 200 pts</span><span class="oc-row-val">RM 200 voucher</span></div>
    </div>`;
}

// ══════════════════════════════════════════════
// VOUCHERS
// ══════════════════════════════════════════════
function renderVouchers() {
  const tabs=`<div class="vtabs">
    <button class="vtab ${vtab==='active'?'active':''}" onclick="setVtab('active')">✅ Active (${VOUCHERS.active.length})</button>
    <button class="vtab ${vtab==='shop'?'active':''}" onclick="setVtab('shop')">🏪 Shop (${VOUCHERS.shop.length})</button>
    <button class="vtab ${vtab==='past'?'active':''}" onclick="setVtab('past')">📁 Past (${VOUCHERS.past.length})</button>
  </div>`;
  const list=VOUCHERS[vtab];
  const cards=list.length
    ?`<div class="voucher-grid">${list.map(v=>vcHTML(v,vtab)).join('')}</div>`
    :`<div class="empty-state"><div class="es-icon">🎟️</div><div class="es-title">No vouchers here</div><div class="es-desc">Check other tabs for available vouchers.</div></div>`;
  document.getElementById('vouchers-view').innerHTML=tabs+cards;
}
function setVtab(t) { vtab=t; renderVouchers(); }
function vcHTML(v,type) {
  const cls=type==='active'?'vc-green':type==='shop'?'vc-amber':'vc-grey';
  const stamp=type==='past'?(v.status==='Used'?'<div class="vc-stamp used">Used</div>':'<div class="vc-stamp expired">Expired</div>'):'';
  const btn=type==='past'?'':(v.points?`<button class="vc-copy" onclick="redeemPts(${v.points},'${v.code}',event)" style="color:inherit">Redeem</button>`:`<button class="vc-copy" onclick="copyCode('${v.code}',event)" style="color:inherit">Copy</button>`);
  const foot=type==='past'?`<span>${v.status==='Used'?'Used '+v.usedOn:'Expired'}</span><span></span>`:`<span>Expires ${v.expiry}</span>${v.points?`<span class="pts-badge">⭐ ${v.points} pts</span>`:'<span></span>'}`;
  return `<div class="vc ${cls}"><div class="vc-inner">${stamp}<div class="vc-type">${v.type}</div><div class="vc-discount">${v.discount}</div><div class="vc-desc">${v.desc}</div><div class="vc-min">Min. spend: ${v.minSpend}</div><div class="vc-code-row"><span class="vc-code">${v.code}</span>${btn}</div><div class="vc-foot">${foot}</div></div><div class="vc-notch">${'<div class="vc-notch-dot"></div>'.repeat(7)}</div></div>`;
}
function copyCode(code,e) { e.stopPropagation(); navigator.clipboard?.writeText(code).catch(()=>{}); showToast(`📋 "${code}" copied!`); }
function redeemPts(pts,code,e) {
  e.stopPropagation();
  if (POINTS_DATA.balance<pts) { showToast(`⚠ Not enough points. Need ${pts} pts.`); return; }
  POINTS_DATA.balance-=pts; POINTS_DATA.redeemed+=pts;
  showToast(`✅ ${code} unlocked! ${pts} pts deducted.`);
  renderPoints(); renderVouchers(); renderStats();
}

// ══════════════════════════════════════════════
// PROFILE
// ══════════════════════════════════════════════
function saveProfile() { showToast('Profile updated ✓'); }

// ══════════════════════════════════════════════
// RATING SYSTEM
// ══════════════════════════════════════════════
function openRatingModal(orderId) {
  currentRatingOrderId=orderId; currentRatingVal=0;
  document.getElementById('rating-comment').value='';
  document.getElementById('rating-submit-btn').disabled=true;
  document.getElementById('star-label').textContent='Tap a star to rate';
  document.querySelectorAll('.star').forEach(s=>s.classList.remove('active'));
  const o=ORDERS.find(x=>x.id===orderId);
  document.getElementById('rating-order-info').innerHTML=o?`<strong>${o.id}</strong> — ${o.variety} · ${o.qty.toLocaleString()} seedlings`:orderId;
  document.getElementById('rating-modal').classList.add('open');
}
function setRating(val) {
  currentRatingVal=val;
  const labels=['','😞 Poor','😐 Fair','🙂 Good','😊 Great','🌟 Excellent!'];
  document.getElementById('star-label').textContent=labels[val];
  document.querySelectorAll('.star').forEach(s=>s.classList.toggle('active',parseInt(s.dataset.val)<=val));
  document.getElementById('rating-submit-btn').disabled=false;
}
function submitRating() {
  if (!currentRatingOrderId||!currentRatingVal) return;
  const ratedAt=new Date().toLocaleString('en-MY',{day:'2-digit',month:'short',year:'numeric'});
  orderRatings[currentRatingOrderId]={rating:currentRatingVal,comment:document.getElementById('rating-comment').value.trim(),ratedAt};
  closeModal('rating-modal');
  showToast(`${'⭐'.repeat(currentRatingVal)} Thank you for your feedback!`);
  renderOrders();
}
function markOrderComplete(orderId) {
  const o=ORDERS.find(x=>x.id===orderId); if(!o) return;
  o.status='Order Completed'; o.completedDate=new Date().toISOString().split('T')[0];
  renderOrders(); renderCollection(); renderStats();
  setTimeout(()=>openRatingModal(orderId),600);
}

// ══════════════════════════════════════════════
// TOAST
// ══════════════════════════════════════════════
function showToast(msg) {
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3500);
}