/* Camnemi TOPIK Preparation — shared site JS */

/* ---------- Auth bootstrap (all pages) ----------
   Loads Supabase config + auth module synchronously so the navbar user chip
   and login state are available on every page. config.js is gitignored. */
document.write('<script src="js/config.js"><\/script>');
document.write('<script src="js/auth.js"><\/script>');

/* ---------- Config (backend) ---------- */
/* The URL/key below are the PUBLIC anon credentials (safe to ship — Supabase anon
   keys are designed to be public). config.js is gitignored and not deployed, so a
   hard-coded fallback keeps the live site working. localStorage overrides win. */
function cfgUrl() {
  return localStorage.getItem('camnemi_topik_url') ||
    (window.CAMNEMI_TOPIK_URL || 'https://srwatzpxnpxohhodylgc.supabase.co');
}
function cfgKey() {
  return localStorage.getItem('camnemi_topik_key') ||
    (window.CAMNEMI_TOPIK_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyd2F0enB4bnB4b2hob2R5bGdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYzNzE3MTAsImV4cCI6MjEwMTk0NzcxMH0.rl3KcSz_mZLRhFCGpWxnF2PBKtc3-iHbEp9BAoqI1l8');
}
function backendReady() {
  return !!(cfgUrl() && cfgKey());
}

/* ---------- Supabase REST helper (matches Camnemi CRM pattern) ---------- */
async function sbFetch(path, opts) {
  const url = cfgUrl().replace(/\/+$/, '') + path;
  const headers = Object.assign({
    'apikey': cfgKey(),
    'Authorization': 'Bearer ' + cfgKey(),
    'Content-Type': 'application/json'
  }, (opts && opts.headers) || {});
  const res = await fetch(url, Object.assign({}, opts, { headers }));
  const text = await res.text();
  if (!res.ok) throw new Error('Supabase HTTP ' + res.status + ' ' + text.slice(0, 200));
  return text ? JSON.parse(text) : null;
}
async function sbInsert(table, row) {
  return sbFetch('/rest/v1/' + table, { method: 'POST', body: JSON.stringify(row) });
}
async function sbSelect(table, query) {
  const q = query ? (query.startsWith('?') ? query : '?' + query) : '';
  return sbFetch('/rest/v1/' + table + q);
}

/* ---------- Lead capture ---------- */
/* Saves a lead to Supabase `topik_leads`. If backend isn't configured, falls back
   to localStorage so the flow still works during development. */
async function saveLead(lead) {
  lead.created_at = new Date().toISOString();
  lead.source = lead.source || 'website';
  if (backendReady()) {
    try {
      await sbInsert('topik_leads', lead);
      return { ok: true, mode: 'supabase' };
    } catch (e) {
      console.warn('Supabase insert failed, falling back:', e);
    }
  }
  const key = 'camnemi_topik_leads';
  const all = JSON.parse(localStorage.getItem(key) || '[]');
  all.push(lead);
  localStorage.setItem(key, JSON.stringify(all));
  return { ok: true, mode: 'local' };
}

/* ---------- UI helpers ---------- */
function toast(msg, ms) {
  let el = document.querySelector('.toast');
  if (!el) { el = document.createElement('div'); el.className = 'toast'; document.body.appendChild(el); }
  el.textContent = msg;
  requestAnimationFrame(() => el.classList.add('show'));
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), ms || 2600);
}
function qs(name) { return new URLSearchParams(location.search).get(name); }

/* ---------- Nav + footer ---------- */
const NAV = [
  { href: 'index.html', label: 'Home' },
  { href: 'curriculum.html', label: 'Curriculum' },
  { href: 'practice.html', label: 'Practice Library' },
  { href: 'topik-practice.html', label: 'Practice App', cls: 'app' },
  { href: 'drama.html', label: 'Drama Clips', cls: 'drama' },
  { href: 'level-test.html', label: 'Level Test' },
  { href: 'topik-info.html', label: 'TOPIK II Guide' },
  { href: 'book.html', label: 'Camnemi Book', cls: 'book' },
  { href: 'contact.html', label: 'Consult', cls: 'cta' }
];
function renderNav() {
  const host = document.getElementById('nav');
  if (!host) return;
  const here = (location.pathname.split('/').pop() || 'index.html');
  const links = NAV.map(n => {
    const active = n.href === here ? ' class="active"' : '';
    return `<a href="${n.href}"${active}${n.cls ? ` data-${n.cls}="1"` : ''}>${n.label}</a>`;
  }).join('');
  host.innerHTML = `
    <div class="nav">
      <div class="container nav-inner">
        <a class="brand" href="index.html">
          <span class="logo">C</span>
          <span>Camnemi TOPIK<br><small>한국어능력시험 준비</small></span>
        </a>
        <button class="nav-toggle" aria-label="Menu" onclick="toggleNav()">☰</button>
        <nav class="nav-links" id="nav-links">${links}
          <span id="auth-chip"></span>
          <a href="contact.html" class="nav-cta" style="background:var(--navy);color:#fff;border-radius:9px;padding:9px 16px;margin-left:4px;">Free Consultation</a>
        </nav>
      </div>
    </div>`;
}
function toggleNav() {
  document.getElementById('nav-links').classList.toggle('open');
}
const FOOTER = {
  cols: [
    { h: 'Learn', items: [['Curriculum', 'curriculum.html'], ['Level Test', 'level-test.html'], ['Practice Library', 'practice.html'], ['Camnemi Book', 'book.html']] },
    { h: 'TOPIK', items: [['Test Info', 'topik-info.html'], ['TOPIK in Cambodia', 'topik-info.html#cambodia'], ['Test Schedule', 'topik-info.html#schedule'], ['Book a Consult', 'contact.html']] }
  ]
};
function renderFooter() {
  const host = document.getElementById('footer');
  if (!host) return;
  const cols = FOOTER.cols.map(c => `
    <div><h4>${c.h}</h4>${c.items.map(i => `<a href="${i[1]}">${i[0]}</a>`).join('')}</div>`).join('');
  host.innerHTML = `
    <footer class="footer">
      <div class="footer-inner">
        <div>
          <div class="brand"><span class="logo">C</span><span>Camnemi TOPIK</span></div>
          <p style="font-size:14px;line-height:1.7;">Free Korean &amp; TOPIK preparation for students worldwide aiming for TOPIK II Level 3 and their Korean university dream.</p>
          <p style="font-size:13px;margin-top:10px;opacity:.8;">Part of Camnemi Study Abroad Consulting.</p>
        </div>
        ${cols}
      </div>
      <div class="footer-bottom">© ${new Date().getFullYear()} Camnemi TOPIK Preparation · Study in Korea with Camnemi</div>
    </footer>`;
}

/* ---------- Generic lead form binding ---------- */
function bindLeadForm(formId, extra) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const err = form.querySelector('.form-err');
    const ok = form.querySelector('.form-ok');
    if (err) err.classList.remove('show');
    const fd = new FormData(form);
    const lead = { name: fd.get('name'), contact: fd.get('contact'), goal: fd.get('goal'), message: fd.get('message') || null };
    Object.assign(lead, extra || {});
    if (!lead.name || !lead.contact) { if (err) { err.textContent = 'Please fill in your name and contact.'; err.classList.add('show'); } return; }
    const btn = form.querySelector('button[type=submit]');
    const orig = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
    const r = await saveLead(lead);
    if (btn) { btn.disabled = false; btn.textContent = orig; }
    if (r.ok) {
      form.reset();
      if (ok) { ok.textContent = r.mode === 'supabase' ? '✓ Thank you! We received your details — Camnemi will contact you soon.' : '✓ Saved (offline mode). We will contact you soon.'; ok.classList.add('show'); }
      toast('Received! We will contact you soon.');
    } else if (err) {
      err.textContent = 'Something went wrong. Please try again or contact us on Telegram.';
      err.classList.add('show');
    }
  });
}

/* ---------- Boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderNav();
  renderFooter();
  if (window.initAuth) initAuth();
});
