/* Camnemi TOPIK — Authentication module (Supabase Auth: Google + Facebook)
   Loaded after config.js + common.js. Provides:
   - initAuth(): loads supabase-js, restores session, wires the navbar user chip
   - loginWith(provider): starts OAuth flow ('google' | 'facebook')
   - handleAuthCallback(): processes the OAuth redirect hash
   - logout(): signs out
   - getSession() / getProfile(): current session / Supabase profile
*/

let _sb = null;          // supabase client
let _session = null;     // current session
let _profile = null;     // public.profiles row

/* ---------- lazy-load supabase-js from CDN ---------- */
function loadSupabaseJS() {
  return new Promise((resolve, reject) => {
    if (window.supabase) return resolve(window.supabase);
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    s.onload = () => resolve(window.supabase);
    s.onerror = () => reject(new Error('Failed to load supabase-js'));
    document.head.appendChild(s);
  });
}

/* ---------- client init ---------- */
async function initAuth() {
  try {
    const supabase = await loadSupabaseJS();
    _sb = supabase.createClient(cfgUrl(), cfgKey());
    // restore session
    const { data: { session } } = await _sb.auth.getSession();
    _session = session || null;
    if (_session) await loadProfile();
    renderAuthChip();
    // listen for future auth changes
    _sb.auth.onAuthStateChange(async (event, session) => {
      _session = session;
      if (event === 'SIGNED_IN' && session) await loadProfile();
      if (event === 'SIGNED_OUT') { _session = null; _profile = null; }
      renderAuthChip();
    });
  } catch (e) {
    console.warn('Auth init failed:', e.message);
  }
}

async function loadProfile() {
  if (!_sb || !_session) return;
  const { data, error } = await _sb
    .from('profiles')
    .select('*')
    .eq('id', _session.user.id)
    .maybeSingle();
  if (!error && data) _profile = data;
}

/* ---------- OAuth login ---------- */
async function loginWith(provider) {
  if (!_sb) await initAuth();
  const oauth = window.CAMNEMI_OAUTH || {};
  if (!(oauth[provider] && oauth[provider].enabled)) {
    alert(provider + ' login is being set up — check back soon!');
    return;
  }
  // redirectTo must match an entry in the Supabase dashboard Redirect URLs
  const redirectTo = window.location.origin + window.location.pathname.replace(/[^/]*$/, '') + 'login.html';
  const { error } = await _sb.auth.signInWithOAuth({
    provider: provider,           // 'google' | 'facebook'
    options: { redirectTo }
  });
  if (error) alert('Login error: ' + error.message);
}

function logout() {
  if (!_sb) return;
  _sb.auth.signOut().then(() => {
    _session = null; _profile = null;
    renderAuthChip();
  });
}

/* ---------- Email + password login (no external setup needed) ---------- */
async function emailSignup(email, password, name) {
  if (!_sb) await initAuth();
  const { data, error } = await _sb.auth.signUp({
    email, password,
    options: { data: { full_name: name } }
  });
  if (error) return { ok: false, msg: error.message };
  // If email confirmation is required, the user must click the link first.
  if (!data.session) return { ok: true, confirm: true };
  return { ok: true, confirm: false };
}
async function emailLogin(email, password) {
  if (!_sb) await initAuth();
  const { data, error } = await _sb.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, msg: error.message };
  _session = data.session;
  await loadProfile();
  renderAuthChip();
  return { ok: true };
}

/* ---------- OAuth callback (login.html) ---------- */
async function handleAuthCallback() {
  if (!_sb) await initAuth();
  const { data: { session }, error } = await _sb.auth.getSession();
  if (error) console.warn('Callback error:', error.message);
  // Supabase stores the session in localStorage automatically; just head home.
  setTimeout(() => { window.location.href = 'index.html?welcome=1'; }, 600);
}

/* ---------- navbar user chip ---------- */
function renderAuthChip() {
  // Common.js renders #nav — this injects a user menu into the nav-right area.
  const holder = document.getElementById('auth-chip');
  if (!holder) return;
  if (!_session) {
    holder.innerHTML = `<a class="btn btn-primary btn-sm" href="login.html">Log in</a>`;
    return;
  }
  const name = (_profile && (_profile.full_name || _profile.email)) || (_session.user.email || 'Student');
  const initial = (name[0] || '?').toUpperCase();
  holder.innerHTML = `
    <div class="user-chip">
      <span class="user-avatar">${initial}</span>
      <span class="user-name">${escapeHtml(name.split(' ')[0])}</span>
      <button class="btn btn-ghost btn-sm" onclick="logout()" title="Log out">⎋</button>
    </div>`;
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

/* ---------- quick accessors for other pages ---------- */
function getSession() { return _session; }
function getProfile() { return _profile; }
function isLoggedIn() { return !!_session; }
function getSupabase() { return _sb; }   // raw client for page-level DB calls
