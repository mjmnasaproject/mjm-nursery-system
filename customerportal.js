const DEMO_USER={
name:'Ahmad Plantation Sdn Bhd',company:'Ahmad Plantation Sdn Bhd',
email:'customer@mjm.com',password:'1234',phone:'+60 12-345 6789',
state:'Sarawak',since:'January 2024',
addr1:'Lot 234, Jalan Plantation',addr2:'Taman Industri Miri',
city:'Miri',postcode:'98000',bstate:'Sarawak',country:'Malaysia'
};

const ORDERS=[
{id:'ORD-001',variety:'Oil Palm Seedling — Oct 2024',qty:2000,price:21.99,total:43980,
orderDate:'2024-11-15',collDate:'2025-04-10',status:'Confirmed',
notes:'Delivery to Miri — confirm route 1 week before.',
billing:'Lot 234, Jalan Plantation, Taman Industri Miri, 98000 Miri, Sarawak',
attachments:{order_placed:[{name:'Invoice INV-2024-001',type:'PDF',size:'124 KB',icon:'📄'}],confirmed:[{name:'Order Confirmation',type:'PDF',size:'88 KB',icon:'✅'}],preparing:[],ready:[],collected:[]}},
{id:'ORD-002',variety:'Oil Palm Seedling — Nov 2024',qty:1500,price:21.99,total:32985,
orderDate:'2024-12-01',collDate:'2025-05-18',status:'Pending',
notes:'Waiting for payment confirmation.',
billing:'Lot 234, Jalan Plantation, Taman Industri Miri, 98000 Miri, Sarawak',
attachments:{order_placed:[{name:'Proforma Invoice',type:'PDF',size:'98 KB',icon:'📄'}],confirmed:[],preparing:[],ready:[],collected:[]}},
{id:'ORD-003',variety:'Oil Palm Seedling — Sep 2024',qty:3000,price:21.99,total:65970,
orderDate:'2024-10-20',collDate:'2025-05-05',status:'Ready',
notes:'1000 pcs priority ICU grade. Vehicle to bring tarpaulin.',
billing:'Lot 234, Jalan Plantation, Taman Industri Miri, 98000 Miri, Sarawak',
attachments:{order_placed:[{name:'Invoice INV-2024-003',type:'PDF',size:'132 KB',icon:'📄'}],confirmed:[{name:'Confirmation Letter',type:'PDF',size:'76 KB',icon:'✅'}],preparing:[{name:'Seedling Prep Report',type:'PDF',size:'210 KB',icon:'📋'}],ready:[{name:'Ready Notice',type:'PDF',size:'64 KB',icon:'📬'}],collected:[]}},
{id:'ORD-004',variety:'Oil Palm Seedling — Jul 2024',qty:1000,price:21.99,total:21990,
orderDate:'2024-08-05',collDate:'2024-12-15',status:'Collected',
notes:'Completed.',
billing:'Lot 234, Jalan Plantation, Taman Industri Miri, 98000 Miri, Sarawak',
attachments:{order_placed:[{name:'Invoice INV-2024-004',type:'PDF',size:'118 KB',icon:'📄'}],confirmed:[{name:'Confirmation',type:'PDF',size:'68 KB',icon:'✅'}],preparing:[{name:'Prep Report',type:'PDF',size:'195 KB',icon:'📋'}],ready:[{name:'Ready Notice',type:'PDF',size:'58 KB',icon:'📬'}],collected:[{name:'Collection Receipt',type:'PDF',size:'85 KB',icon:'🧾'}]}},
];

const POINTS_DATA={
balance:3450,tier:'Gold',totalEarned:5200,redeemed:1200,expiringSoon:200,
nextTier:{name:'Platinum',threshold:5000},
history:[
{type:'earn',desc:'Order ORD-001 — 2,000 seedlings',pts:440,date:'15 Nov 2024'},
{type:'earn',desc:'Order ORD-002 — 1,500 seedlings',pts:330,date:'01 Dec 2024'},
{type:'earn',desc:'Order ORD-003 — 3,000 seedlings',pts:660,date:'20 Oct 2024'},
{type:'redeem',desc:'Voucher SAVE10 redeemed',pts:-200,date:'05 Dec 2024'},
{type:'earn',desc:'Order ORD-004 — 1,000 seedlings',pts:220,date:'05 Aug 2024'},
{type:'expire',desc:'Points expired (Q1 2024)',pts:-200,date:'31 Mar 2024'},
]
};

const VOUCHERS={
active:[
{code:'MJMGOLD10',type:'Gold Member Reward',discount:'10% OFF',desc:'10% off your next order.',minSpend:'RM 10,000',expiry:'30 Jun 2025',points:null},
{code:'FIRSTCOLL',type:'Collection Bonus',discount:'RM 500 OFF',desc:'RM 500 rebate on transport costs.',minSpend:'RM 20,000',expiry:'31 May 2025',points:null},
],
shop:[
{code:'BULKDEAL5',type:'Shop Voucher',discount:'5% OFF',desc:'5% off on orders above 2,000 seedlings.',minSpend:'RM 40,000',expiry:'31 Aug 2025',points:null},
{code:'SAVE200',type:'Points Redemption',discount:'RM 200 OFF',desc:'Redeem 200 points for RM 200 off.',minSpend:'RM 5,000',expiry:'31 Dec 2025',points:200},
{code:'NURSERY15',type:'Seasonal Promo',discount:'15% OFF',desc:'Seasonal discount — Oct–Dec 2025.',minSpend:'RM 30,000',expiry:'31 Dec 2025',points:null},
],
past:[
{code:'SAVE10OLD',type:'Redeemed',discount:'RM 200 OFF',desc:'Used on ORD-004.',status:'Used',usedOn:'05 Aug 2024'},
{code:'NEWYEAR24',type:'Expired',discount:'5% OFF',desc:'New Year 2024 promotion.',status:'Expired',usedOn:'—'},
]
};

// Slot capacity system: key = "date|hour", value = count of bookings
const SLOT_BOOKINGS={};
const MAX_PER_SLOT=3;

// Consent state per order
const consentSigned={};
let currentConsentOrderId=null;
let currentUser=null;
let vtab='active';

// Signature canvas state
let signDrawing=false,signHasMark=false;

// ══════════════════════════════════════════════
// AUTH
// ══════════════════════════════════════════════
function doLogin(){
const email=document.getElementById('login-email').value.trim();
const pass=document.getElementById('login-password').value;
const err=document.getElementById('login-error');
if(email===DEMO_USER.email&&pass===DEMO_USER.password){
err.style.display='none';
currentUser={...DEMO_USER};
showPortal();
} else {
err.style.display='block';
setTimeout(()=>err.style.display='none',4000);
}
}
function doRegister(){
const name=document.getElementById('reg-name').value.trim();
const email=document.getElementById('reg-email').value.trim();
const pass=document.getElementById('reg-password').value;
if(!name||!email||!pass){showToast('⚠ Please fill in all required fields.');return;}
currentUser={name,company:document.getElementById('reg-company').value.trim(),email,
phone:document.getElementById('reg-phone').value.trim(),password:pass,state:'',
since:new Date().toLocaleDateString('en-MY',{month:'long',year:'numeric'})};
showToast('Account created! Welcome 🌴');showPortal();
}
function doLogout(){
currentUser=null;
switchPage('page-login');
document.getElementById('login-email').value='';
document.getElementById('login-password').value='';
}
function switchLoginTab(tab,btn){
document.querySelectorAll('.lt-btn').forEach(b=>b.classList.remove('active'));
btn.classList.add('active');
document.getElementById('login-form').style.display=tab==='login'?'block':'none';
document.getElementById('register-form').style.display=tab==='register'?'block':'none';
}
document.getElementById('login-password').addEventListener('keydown',e=>{if(e.key==='Enter')doLogin();});
document.getElementById('login-email').addEventListener('keydown',e=>{if(e.key==='Enter')doLogin();});

// ══════════════════════════════════════════════
// PAGE SWITCHING
// ══════════════════════════════════════════════
function switchPage(id){
document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
document.getElementById(id).classList.add('active');
window.scrollTo(0,0);
}

function showPortal(){
// Fill data
const first=currentUser.name.split(' ')[0];
document.getElementById('pn-user-name').textContent=currentUser.name;
// Profile fields
['name','company','email','phone','state','since'].forEach(k=>{
const el=document.getElementById('pf-'+k);
if(el)el.value=currentUser[k]||'';
});
['addr1','addr2','city','post','bstate','country'].forEach(k=>{
const el=document.getElementById('pf-'+k);
if(el)el.value=currentUser[k]||'';
});
renderStats();renderOrders();renderCollection();renderPoints();renderVouchers();
switchPage('page-portal');
switchTab('orders',document.querySelector('.ptab'));
}

// ══════════════════════════════════════════════
// STATS
// ══════════════════════════════════════════════
function renderStats(){
const active=ORDERS.filter(o=>!['Collected','Cancelled'].includes(o.status)).length;
const ready=ORDERS.filter(o=>o.status==='Ready').length;
const totalSpent=ORDERS.filter(o=>o.status==='Collected').reduce((s,o)=>s+o.total,0);
document.getElementById('stats-row').innerHTML=`
<div class="stat-card">
<div class="sc-status sc-status-default">ACTIVE</div>
<span class="sc-icon">📋</span>
<div class="sc-label">Total Orders</div>
<div class="sc-val">${ORDERS.length}</div>
</div>
<div class="stat-card accent-amber">
<div class="sc-status">PENDING</div>
<span class="sc-icon">🔄</span>
<div class="sc-label">Awaiting Collection</div>
<div class="sc-val">${active}</div>
</div>
<div class="stat-card accent-blue">
<div class="sc-status" style="color:var(--blue)">HEALTHY</div>
<span class="sc-icon">🌱</span>
<div class="sc-label">Ready to Collect</div>
<div class="sc-val">${ready}</div>
</div>
<div class="stat-card accent-green">
<div class="sc-status">POINTS</div>
<span class="sc-icon">⭐</span>
<div class="sc-label">My Points Balance</div>
<div class="sc-val">${POINTS_DATA.balance.toLocaleString()}</div>
</div>`;
}

// ══════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════
function switchTab(tab,btn){
document.querySelectorAll('.ptab').forEach(b=>b.classList.remove('active'));
document.querySelectorAll('.ptab-panel').forEach(p=>p.classList.remove('active'));
if(btn)btn.classList.add('active');
else document.querySelector('.ptab').classList.add('active');
document.getElementById('ptab-'+tab).classList.add('active');
}

// ══════════════════════════════════════════════
// ORDERS
// ══════════════════════════════════════════════
function badgeClass(s){
return{Confirmed:'badge-green',Pending:'badge-amber',Ready:'badge-teal',Collected:'badge-grey',Cancelled:'badge-red'}[s]||'badge-grey';
}

function renderOrders(){
const recent=ORDERS.filter(o=>o.status!=='Collected');
const history=ORDERS.filter(o=>o.status==='Collected');
let html='';
if(recent.length){
html+=`<div class="orders-section-label">📋 Recent Orders (${recent.length})</div>`;
html+=`<div class="orders-grid">${recent.map(orderCardHTML).join('')}</div>`;
}
if(history.length){
html+=`<div class="orders-section-label">🗂️ Order History (${history.length})</div>`;
html+=`<div class="orders-grid">${history.map(orderCardHTML).join('')}</div>`;
}
document.getElementById('orders-list').innerHTML=html;
}

function orderCardHTML(o){
const d=o.collDate?Math.round((new Date(o.collDate)-new Date())/(864e5)):null;
let dStr='—';
if(d!==null){
if(d<0)dStr=`<span style="color:var(--red);font-weight:700">Overdue</span>`;
else if(d===0)dStr=`<span style="color:var(--amber);font-weight:700">Today!</span>`;
else dStr=`${o.collDate} <span style="font-size:.72rem;color:${d<=14?'var(--amber)':'var(--ink3)'}">(${d}d)</span>`;
}
return`<div class="order-card">
<div class="oc-header">
<div><div class="oc-id">${o.id}</div><div class="oc-date">Ordered ${o.orderDate}</div></div>
<span class="badge ${badgeClass(o.status)}">${o.status}</span>
</div>
<div class="oc-body">
<div class="oc-row"><span class="oc-row-label">Seedling Batch</span><span class="oc-row-val">${o.variety}</span></div>
<div class="oc-row"><span class="oc-row-label">Quantity</span><span class="oc-row-val">${o.qty.toLocaleString()} seedlings</span></div>
<div class="oc-row"><span class="oc-row-label">Unit Price</span><span class="oc-row-val">RM ${o.price.toFixed(2)}</span></div>
<div class="oc-row"><span class="oc-row-label">Collection Date</span><span class="oc-row-val">${dStr}</span></div>
${o.notes?`<div class="oc-row"><span class="oc-row-label">Notes</span><span class="oc-row-val" style="font-size:.77rem;color:var(--ink3);max-width:55%;text-align:right">${o.notes}</span></div>`:''}
</div>
<div class="oc-footer">
<div><div class="oc-total-label">Order Total</div><div class="oc-total-val">RM ${o.total.toLocaleString('en-MY',{minimumFractionDigits:2})}</div></div>
<div class="oc-actions">
<button class="btn-outline" onclick="viewDetail('${o.id}')">View Details</button>
${o.status==='Pending'?`<button class="btn-outline danger" onclick="showToast('Please contact MJM Nursery to cancel.')">Cancel</button>`:''}
</div>
</div>
</div>`;
}

// ══════════════════════════════════════════════
// ORDER DETAIL
// ══════════════════════════════════════════════
const STEP_KEYS=['order_placed','confirmed','preparing','ready','collected'];
const STEP_LABELS={order_placed:'Order Placed',confirmed:'Confirmed',preparing:'Preparing',ready:'Ready',collected:'Collected'};
const STATUS_STEPS={Confirmed:2,Pending:1,Ready:4,Collected:5,Cancelled:0};

function viewDetail(id){
const o=ORDERS.find(x=>x.id===id);if(!o)return;
const stepsDone=STATUS_STEPS[o.status]||0;
const d=o.collDate?Math.round((new Date(o.collDate)-new Date())/(864e5)):null;
const pct=Math.max(0,Math.min(100,((stepsDone-0.5)/STEP_KEYS.length)*100));

// Alert
let alertHtml='';
if(d!==null&&!['Collected','Cancelled'].includes(o.status)){
if(d<0)alertHtml=`<div class="coll-alert overdue"><span class="ca-icon">⚠️</span><div class="ca-text"><strong>Collection Overdue by ${Math.abs(d)} days</strong><span>Please contact MJM Nursery to reschedule immediately.</span></div></div>`;
else if(d<=14)alertHtml=`<div class="coll-alert soon"><span class="ca-icon">⏰</span><div class="ca-text"><strong>Collection in ${d} day${d!==1?'s':''}</strong><span>Prepare your vehicle and confirm access road conditions.</span></div></div>`;
else if(o.status==='Ready')alertHtml=`<div class="coll-alert ready"><span class="ca-icon">✅</span><div class="ca-text"><strong>Your order is ready for collection!</strong><span>Please sign the consent form and book your collection date.</span></div></div>`;
}

// Horizontal timeline
const tlSteps=STEP_KEYS.map((key,i)=>{
const isDone=i<stepsDone;
const isActive=i===stepsDone&&o.status!=='Cancelled';
const cls=isDone?'done':isActive?'active':'';
const hasAtt=o.attachments&&(o.attachments[key]||[]).length>0;
const attHtml=hasAtt?`<div class="h-step-attach" onclick="openAttModal('${id}','${key}',event)">📎 Docs</div>`:`<div style="height:1.2rem;"></div>`;
return`<div class="h-step ${cls}">
<div class="h-step-dot"></div>
<div class="h-step-label">${STEP_LABELS[key]}</div>
${attHtml}
</div>`;
}).join('');

// Booking section
let bookingHtml='';
if(o.status==='Ready'){
const signed=consentSigned[id];
if(signed){
bookingHtml=buildBookingForm(id,o);
} else {
bookingHtml=`
<div class="booking-section">
<h4>📅 Book Collection</h4>
<p>Before booking your collection slot, you must review and sign our collection consent form.</p>
<div class="booking-locked">
<div class="booking-locked-icon">🔒</div>
<div class="booking-locked-text">
<strong>Consent Required</strong>
You must agree to our collection terms before proceeding.
</div>
<button class="btn-primary" style="margin-left:auto;flex-shrink:0" onclick="openConsentModal('${id}')">Sign Consent →</button>
</div>
</div>`;
}
} else if(['Confirmed','Preparing','Pending'].includes(o.status)){
bookingHtml=`<p style="font-size:.79rem;color:var(--ink3);margin-top:.7rem;padding:.6rem 1rem;background:var(--surface2);border-radius:8px;border-left:3px solid var(--border2);">Collection booking will be available once your order is <strong>Ready</strong>.</p>`;
}

const container=document.getElementById('orders-list');
container.innerHTML=`
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
<div class="dh-meta-item"><span>Collection Date</span><strong>${o.collDate||'—'}</strong></div>
<div class="dh-meta-item"><span>Total</span><strong>RM ${o.total.toLocaleString('en-MY',{minimumFractionDigits:2})}</strong></div>
</div>
</div>

${alertHtml}

<!-- ORDER PROGRESS -->
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

<!-- ORDER INFORMATION -->
<div class="card">
<h3>📋 Order Information</h3>
<div class="oc-row"><span class="oc-row-label">Seedling Batch</span><span class="oc-row-val">${o.variety}</span></div>
<div class="oc-row"><span class="oc-row-label">Quantity</span><span class="oc-row-val">${o.qty.toLocaleString()}</span></div>
<div class="oc-row"><span class="oc-row-label">Unit Price</span><span class="oc-row-val">RM ${o.price.toFixed(2)}</span></div>
<div class="oc-row" style="padding-top:.7rem;border-top:1.5px solid var(--border);margin-top:.3rem;">
<span class="oc-row-label" style="font-weight:700">Total Amount</span>
<span class="oc-row-val" style="font-family:'DM Serif Display',serif;font-size:1.1rem">RM ${o.total.toLocaleString('en-MY',{minimumFractionDigits:2})}</span>
</div>
${o.notes?`<div style="margin-top:1rem;padding-top:.9rem;border-top:1px solid var(--border)"><div style="font-size:.68rem;font-weight:700;color:var(--ink3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:.4rem">Notes</div><div style="font-size:.82rem;color:var(--ink2);line-height:1.6">${o.notes}</div></div>`:''}
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
// BOOKING FORM with Time Wheel
// ══════════════════════════════════════════════
const HOURS=[8,9,10,11,12,13,14,15,16];
function fmtHour(h){const ampm=h<12?'AM':'PM';const d=h>12?h-12:h;return{main:d+':00',ampm};}

function getSlotKey(date,hour){return date+'|'+hour;}
function getSlotCount(date,hour){return SLOT_BOOKINGS[getSlotKey(date,hour)]||0;}

function buildBookingForm(id,o){
const today=new Date().toISOString().split('T')[0];
return`
<div class="booking-section" id="booking-section-${id}">
<h4>📅 Book Collection Slot</h4>
<p>Select your preferred collection date and time. Each time slot allows up to ${MAX_PER_SLOT} bookings. Fill in all details and confirm your request.</p>
<div style="display:flex;align-items:center;gap:.5rem;margin-bottom:1rem;padding:.45rem .8rem;background:var(--green-light);border-radius:8px;width:fit-content;">
<span style="font-size:.8rem;">✅</span>
<span style="font-size:.77rem;font-weight:700;color:#15803d;">Consent form signed</span>
</div>

<!-- Date -->
<div style="margin-bottom:1rem;">
<label style="display:block;font-size:.72rem;font-weight:700;color:var(--ink2);letter-spacing:.06em;text-transform:uppercase;margin-bottom:.4rem;">Select Date</label>
<input type="date" id="book-date-${id}" min="${today}" value=""
style="background:var(--surface2);border:1.5px solid var(--border);border-radius:var(--radius-sm);padding:.6rem .9rem;font-size:.86rem;color:var(--ink);outline:none;font-family:'Outfit',sans-serif;width:220px;"
onchange="renderTimeWheel('${id}')"/>
</div>

<!-- Time wheel -->
<div class="time-picker-section">
<label>Select Time Slot <span style="font-weight:400;color:var(--ink3);text-transform:none;letter-spacing:0">(max ${MAX_PER_SLOT} bookings per slot)</span></label>
<div class="time-wheel-grid" id="time-wheel-${id}">
<p style="font-size:.8rem;color:var(--ink3);">Please select a date first.</p>
</div>
</div>

<!-- Quantity & notes -->
<div class="booking-form-grid">
<div>
<label>Collection Quantity (seedlings)</label>
<input type="number" id="book-qty-${id}" placeholder="e.g. 2000" min="1" max="${o.qty}" style="background:var(--surface2);border:1.5px solid var(--border);border-radius:var(--radius-sm);padding:.6rem .9rem;font-size:.86rem;color:var(--ink);outline:none;font-family:'Outfit',sans-serif;width:100%;"/>
<div style="font-size:.7rem;color:var(--ink3);margin-top:.3rem;">Max: ${o.qty.toLocaleString()} seedlings</div>
</div>
<div>
<label>Vehicle Type / Notes</label>
<input type="text" id="book-notes-${id}" placeholder="e.g. 10-tonne lorry, tarpaulin" style="background:var(--surface2);border:1.5px solid var(--border);border-radius:var(--radius-sm);padding:.6rem .9rem;font-size:.86rem;color:var(--ink);outline:none;font-family:'Outfit',sans-serif;width:100%;"/>
</div>
</div>

<input type="hidden" id="book-hour-${id}" value=""/>
<button class="btn-primary" style="margin-top:.5rem;" onclick="submitBooking('${id}','${o.qty}')">📅 Confirm Booking Request</button>
</div>`;
}

function renderTimeWheel(orderId){
const dateInput=document.getElementById('book-date-'+orderId);
const date=dateInput?dateInput.value:'';
const container=document.getElementById('time-wheel-'+orderId);
if(!date||!container)return;
// Clear selected hour
const hourInput=document.getElementById('book-hour-'+orderId);
if(hourInput)hourInput.value='';

container.innerHTML=HOURS.map(h=>{
const count=getSlotCount(date,h);
const full=count>=MAX_PER_SLOT;
const {main,ampm}=fmtHour(h);
const rem=MAX_PER_SLOT-count;
return`<div class="time-slot ${full?'full':''}" id="ts-${orderId}-${h}" onclick="selectHour('${orderId}',${h},'${date}')">
<div class="ts-time">${main}</div>
<div class="ts-ampm">${ampm}</div>
<div class="ts-slots ${full?'full-label':''}">${full?'FULL':rem+' left'}</div>
</div>`;
}).join('');
}

function selectHour(orderId,h,date){
const count=getSlotCount(date,h);
if(count>=MAX_PER_SLOT){showToast('⚠ This slot is full. Please choose another time.');return;}
// Deselect all
HOURS.forEach(hr=>{
const el=document.getElementById('ts-'+orderId+'-'+hr);
if(el)el.classList.remove('selected');
});
const el=document.getElementById('ts-'+orderId+'-'+h);
if(el)el.classList.add('selected');
const hourInput=document.getElementById('book-hour-'+orderId);
if(hourInput)hourInput.value=h;
}

function submitBooking(id,maxQty){
const date=document.getElementById('book-date-'+id)?.value;
const hour=document.getElementById('book-hour-'+id)?.value;
const qty=document.getElementById('book-qty-'+id)?.value;
const notes=document.getElementById('book-notes-'+id)?.value;
if(!date){showToast('⚠ Please select a date.');return;}
if(!hour){showToast('⚠ Please select a time slot.');return;}
if(!qty||isNaN(qty)||Number(qty)<1){showToast('⚠ Please enter a valid collection quantity.');return;}
if(Number(qty)>Number(maxQty)){showToast(`⚠ Quantity cannot exceed ${maxQty} seedlings.`);return;}
// Reserve slot
const key=getSlotKey(date,parseInt(hour));
SLOT_BOOKINGS[key]=(SLOT_BOOKINGS[key]||0)+1;
const {main,ampm}=fmtHour(parseInt(hour));
showToast(`✅ Booking confirmed for ${date} at ${main} ${ampm} — ${Number(qty).toLocaleString()} seedlings`);
// Re-render detail to show booking locked state
setTimeout(()=>viewDetail(id),400);
}

// ══════════════════════════════════════════════
// CONSENT MODAL
// ══════════════════════════════════════════════
function openConsentModal(orderId){
currentConsentOrderId=orderId;
document.getElementById('consent-chk').checked=false;
document.getElementById('consent-submit-btn').disabled=true;
signHasMark=false;
clearSignature();
document.getElementById('consent-modal').classList.add('open');
setTimeout(initCanvas,100);
}
function closeConsentModal(){
document.getElementById('consent-modal').classList.remove('open');
currentConsentOrderId=null;
}
function checkConsentReady(){
const chk=document.getElementById('consent-chk').checked;
document.getElementById('consent-submit-btn').disabled=!(chk&&signHasMark);
}
function submitConsent(){
if(!currentConsentOrderId)return;
consentSigned[currentConsentOrderId]=true;
closeConsentModal();
showToast('✅ Consent signed! You can now book your collection.');
viewDetail(currentConsentOrderId);
}

// ── SIGNATURE CANVAS ──
function initCanvas(){
const canvas=document.getElementById('sign-canvas');
if(!canvas)return;
const dpr=window.devicePixelRatio||1;
const rect=canvas.getBoundingClientRect();
canvas.width=rect.width*dpr;canvas.height=rect.height*dpr;
const ctx=canvas.getContext('2d');
ctx.scale(dpr,dpr);
ctx.strokeStyle='#111827';ctx.lineWidth=2;ctx.lineCap='round';ctx.lineJoin='round';

function getPos(e){
const r=canvas.getBoundingClientRect();
const src=e.touches?e.touches[0]:e;
return{x:src.clientX-r.left,y:src.clientY-r.top};
}
canvas.onmousedown=canvas.ontouchstart=(e)=>{e.preventDefault();signDrawing=true;const p=getPos(e);const ctx=canvas.getContext('2d');ctx.beginPath();ctx.moveTo(p.x,p.y);};
canvas.onmousemove=canvas.ontouchmove=(e)=>{e.preventDefault();if(!signDrawing)return;const p=getPos(e);const ctx=canvas.getContext('2d');ctx.lineTo(p.x,p.y);ctx.stroke();signHasMark=true;checkConsentReady();};
canvas.onmouseup=canvas.ontouchend=()=>{signDrawing=false;};
canvas.onmouseleave=()=>{signDrawing=false;};
}
function clearSignature(){
const canvas=document.getElementById('sign-canvas');if(!canvas)return;
const ctx=canvas.getContext('2d');
ctx.clearRect(0,0,canvas.width,canvas.height);
signHasMark=false;checkConsentReady();
}

// ══════════════════════════════════════════════
// ATTACHMENT MODAL
// ══════════════════════════════════════════════


// ══════════════════════════════════════════════
// COLLECTION SCHEDULE
// ══════════════════════════════════════════════
function renderCollection(){
const upcoming=ORDERS.filter(o=>!['Collected','Cancelled'].includes(o.status)&&o.collDate).sort((a,b)=>new Date(a.collDate)-new Date(b.collDate));
const past=ORDERS.filter(o=>o.status==='Collected');
let html='';
upcoming.forEach(o=>{
const d=Math.round((new Date(o.collDate)-new Date())/(864e5));
if(o.status==='Ready')html+=`<div class="coll-alert ready"><span class="ca-icon">✅</span><div class="ca-text"><strong>${o.id} — Ready for Collection!</strong><span>Go to order details to sign consent and book your slot.</span></div></div>`;
else if(d<0)html+=`<div class="coll-alert overdue"><span class="ca-icon">⚠️</span><div class="ca-text"><strong>${o.id} overdue by ${Math.abs(d)} days</strong><span>Contact MJM Nursery immediately.</span></div></div>`;
else if(d<=7)html+=`<div class="coll-alert soon"><span class="ca-icon">⏰</span><div class="ca-text"><strong>${o.id} — ${d} day${d!==1?'s':''} to collection</strong><span>Prepare your vehicle and confirm access route.</span></div></div>`;
});
if(upcoming.length){
html+=`<div class="card"><h3>📅 Upcoming Collections</h3>`;
html+=upcoming.map(o=>{
const d=Math.round((new Date(o.collDate)-new Date())/(864e5));
const dStr=d<0?`<span style="color:var(--red);font-weight:700">Overdue ${Math.abs(d)}d</span>`:d===0?`<span style="color:var(--amber);font-weight:700">Today!</span>`:d<=7?`<span style="color:var(--amber);font-weight:700">In ${d} days</span>`:`In ${d} days`;
return`<div class="oc-row" style="flex-wrap:wrap;gap:.5rem;align-items:center;padding:.7rem 0">
<div><div style="font-weight:700;font-size:.87rem">${o.id}</div><div style="font-size:.75rem;color:var(--ink3)">${o.variety} · ${o.qty.toLocaleString()} seedlings</div></div>
<div style="margin-left:auto;display:flex;align-items:center;gap:.7rem;flex-wrap:wrap;">
<div style="text-align:right"><div style="font-size:.74rem;color:var(--ink3)">${o.collDate}</div><div style="font-size:.74rem">${dStr}</div></div>
<span class="badge ${badgeClass(o.status)}">${o.status}</span>
</div>
</div>`;
}).join('');
html+=`</div>`;
}
if(past.length){
html+=`<div class="card"><h3>✅ Collection History</h3>`;
html+=past.map(o=>`<div class="oc-row" style="flex-wrap:wrap;gap:.5rem;align-items:center;padding:.7rem 0">
<div><div style="font-weight:700;font-size:.87rem">${o.id}</div><div style="font-size:.75rem;color:var(--ink3)">${o.variety} · ${o.qty.toLocaleString()} seedlings</div></div>
<div style="margin-left:auto;display:flex;align-items:center;gap:.7rem;">
<div style="text-align:right"><div style="font-size:.74rem;color:var(--ink3)">Collected ${o.collDate}</div><div style="font-size:.74rem;font-weight:700;color:var(--green)">RM ${o.total.toLocaleString('en-MY',{minimumFractionDigits:2})}</div></div>
<span class="badge badge-grey">Collected</span>
</div>
</div>`).join('');
html+=`<div style="margin-top:1rem;padding-top:.9rem;border-top:1.5px solid var(--border);display:flex;justify-content:space-between;align-items:center;"><span style="font-size:.8rem;color:var(--ink3);font-weight:600;text-transform:uppercase;letter-spacing:.05em">Total Completed</span><span style="font-family:'DM Serif Display',serif;font-size:1.2rem;color:var(--ink)">RM ${past.reduce((s,o)=>s+o.total,0).toLocaleString('en-MY',{minimumFractionDigits:2})}</span></div>`;
html+=`</div>`;
}
if(!upcoming.length&&!past.length)html=`<div class="empty-state"><div class="es-icon">📅</div><div class="es-title">No collections yet</div><div class="es-desc">Upcoming collection schedules will appear here.</div></div>`;
document.getElementById('coll-view').innerHTML=html;
}

// ══════════════════════════════════════════════
// POINTS
// ══════════════════════════════════════════════
function renderPoints(){
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
function renderVouchers(){
const tabs=`<div class="vtabs">
<button class="vtab ${vtab==='active'?'active':''}" onclick="setVtab('active')">✅ Active (${VOUCHERS.active.length})</button>
<button class="vtab ${vtab==='shop'?'active':''}" onclick="setVtab('shop')">🏪 Shop (${VOUCHERS.shop.length})</button>
<button class="vtab ${vtab==='past'?'active':''}" onclick="setVtab('past')">📁 Past (${VOUCHERS.past.length})</button>
</div>`;
const list=VOUCHERS[vtab];
const cards=list.length?`<div class="voucher-grid">${list.map(v=>vcHTML(v,vtab)).join('')}</div>`:
`<div class="empty-state"><div class="es-icon">🎟️</div><div class="es-title">No vouchers here</div><div class="es-desc">Check other tabs for available vouchers.</div></div>`;
document.getElementById('vouchers-view').innerHTML=tabs+cards;
}
function setVtab(t){vtab=t;renderVouchers();}
function vcHTML(v,type){
const cls=type==='active'?'vc-green':type==='shop'?'vc-amber':'vc-grey';
const stamp=type==='past'?(v.status==='Used'?'<div class="vc-stamp used">Used</div>':'<div class="vc-stamp expired">Expired</div>'):'';
const btn=type==='past'?'':
(v.points?`<button class="vc-copy" onclick="redeemPts(${v.points},'${v.code}',event)" style="color:inherit">Redeem</button>`:
`<button class="vc-copy" onclick="copyCode('${v.code}',event)" style="color:inherit">Copy</button>`);
const foot=type==='past'?`<span>${v.status==='Used'?'Used '+v.usedOn:'Expired'}</span><span></span>`:
`<span>Expires ${v.expiry}</span>${v.points?`<span class="pts-badge">⭐ ${v.points} pts</span>`:'<span></span>'}`;
return`<div class="vc ${cls}">
<div class="vc-inner">
${stamp}
<div class="vc-type">${v.type}</div>
<div class="vc-discount">${v.discount}</div>
<div class="vc-desc">${v.desc}</div>
<div class="vc-min">Min. spend: ${v.minSpend}</div>
<div class="vc-code-row"><span class="vc-code">${v.code}</span>${btn}</div>
<div class="vc-foot">${foot}</div>
</div>
<div class="vc-notch">${'<div class="vc-notch-dot"></div>'.repeat(7)}</div>
</div>`;
}
function copyCode(code,e){e.stopPropagation();navigator.clipboard?.writeText(code).catch(()=>{});showToast(`📋 "${code}" copied!`);}
function redeemPts(pts,code,e){
e.stopPropagation();
if(POINTS_DATA.balance<pts){showToast(`⚠ Not enough points. Need ${pts} pts.`);return;}
POINTS_DATA.balance-=pts;POINTS_DATA.redeemed+=pts;
showToast(`✅ ${code} unlocked! ${pts} pts deducted.`);
renderPoints();renderVouchers();renderStats();
}

// ══════════════════════════════════════════════
// PROFILE
// ══════════════════════════════════════════════
function saveProfile(){
showToast('Profile updated ✓');
}

// ══════════════════════════════════════════════
// TOAST
// ══════════════════════════════════════════════
function showToast(msg){
const t=document.getElementById('toast');
t.textContent=msg;t.classList.add('show');
setTimeout(()=>t.classList.remove('show'),3500);
}