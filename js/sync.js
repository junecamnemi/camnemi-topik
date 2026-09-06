/* Camnemi TOPIK — Learner data auto-sync (Supabase)
   Automatic layer on top of the manual sync (syncUserData) + login pull
   (loadUserData) already in app.js. It:
     • pushes local learner data → server whenever a synced key changes (debounced)
     • merges server → local (idempotent, non-clobbering) on login / manual pull

   Server row = topik_user_data (user_id PK, data jsonb). RLS: owner only.
   CONVENTION (matches existing app.js code): the `data` object is keyed by the
   FULL localStorage key string (e.g. "camnemi_topik_progress"), NOT a short
   logical name — keep it that way so syncUserData/loadUserData interoperate.
*/
(function () {
  // Full localStorage keys that hold per-user learner data (excludes device
  // prefs already fine locally: lang/theme/country/char are partly device-level,
  // but char rides via auth metadata; we sync the study data + char name here).
  var KEYS = [
    'camnemi_topik_progress', 'camnemi_topik_daily', 'camnemi_topik_wrong',
    'camnemi_topik_streak', 'camnemi_topik_scores', 'camnemi_topik_srs',
    'camnemi_topik_xp', 'camnemi_topik_quests', 'camnemi_topik_conquered',
    'camnemi_topik_section', 'camnemi_topik_mylevel',
    'camnemi_topik_study_time', 'camnemi_topik_lt_result',
    'camnemi_topik_bookmarks', 'camnemi_topik_aibank',
    'camnemi_topik_mock_status',
    'camnemi_topik_char', 'camnemi_topik_char_name'
  ];
  var _pushTimer = null;
  var _pullTimer = null;
  var _ready = false;

  function getSb() {
    if (window.AUTH && typeof window.AUTH.getSupabase === 'function') {
      var c = window.AUTH.getSupabase();
      if (c) return c;
    }
    return null;
  }
  function uid() {
    var s = window.AUTH && typeof window.AUTH.getSession === 'function' ? window.AUTH.getSession() : null;
    return s && s.user ? s.user.id : null;
  }
  function authed() {
    var s = window.AUTH && typeof window.AUTH.getSession === 'function' ? window.AUTH.getSession() : null;
    return !!(s && s.user);
  }
  function read(k) {
    try { var v = localStorage.getItem(k); return v === null ? null : JSON.parse(v); }
    catch (e) { return null; }
  }
  function write(k, v) {
    try { localStorage.setItem(k, typeof v === 'string' ? v : JSON.stringify(v)); } catch (e) {}
  }
  function snapshotLocal() {
    var out = {};
    for (var i = 0; i < KEYS.length; i++) {
      var raw = null;
      try { raw = localStorage.getItem(KEYS[i]); } catch (e) {}
      if (raw !== null) {
        try { out[KEYS[i]] = JSON.parse(raw); } catch (e) { out[KEYS[i]] = raw; }
      }
    }
    return out;
  }
  function setSyncedAt() { try { localStorage.setItem('camnemi_topik_synced_at', new Date().toISOString()); } catch (e) {} }

  /* ---------- push ---------- */
  async function push() {
    var c = getSb(), u = uid();
    if (!c || !u) return { ok: false, reason: 'not-logged-in' };
    var snap = snapshotLocal();
    if (!Object.keys(snap).length) return { ok: true, skipped: 'empty' };
    try {
      var { error } = await c.from('topik_user_data').upsert(
        { user_id: u, data: snap, updated_at: new Date().toISOString() },
        { onConflict: 'user_id' }
      );
      if (error) { console.warn('[sync] push failed:', error.message); return { ok: false, error: error.message }; }
      setSyncedAt();
      return { ok: true };
    } catch (e) { console.warn('[sync] push error:', e.message); return { ok: false, error: e.message }; }
  }

  /* ---------- id/key helpers for non-clobbering merge ---------- */
  function arrKey(x, i) {
    if (x === null || typeof x !== 'object') return 'i' + i;
    if (x.qid !== undefined) return 'q' + x.qid;
    if (x.id !== undefined) return 'd' + x.id;
    if (x.date !== undefined) return 't' + x.date;
    if (x.mockId !== undefined) return 'm' + x.mockId;
    if (x.at !== undefined) return 'a' + x.at;
    return 'k' + JSON.stringify(x);
  }
  function mergeArray(local, server) {
    var map = {};
    local.forEach(function (x, i) { map[arrKey(x, i)] = x; });
    server.forEach(function (x, i) { if (!(arrKey(x, i) in map)) map[arrKey(x, i)] = x; });
    var arr = Object.keys(map).map(function (k) { return map[k]; });
    return { arr: arr, dirty: arr.length !== local.length };
  }
  function mergeVal(local, server) {
    // object/object → recurse; array/array → union; else server wins if differs
    if (local === server) return { val: local, dirty: false };
    if (server === null || server === undefined) return { val: local, dirty: false };
    if (typeof server === 'object' && !Array.isArray(server)) {
      var base = (local && typeof local === 'object' && !Array.isArray(local)) ? JSON.parse(JSON.stringify(local)) : {};
      var dirty = (local && typeof local === 'object' && !Array.isArray(local)) ? false : true;
      Object.keys(server).forEach(function (sk) {
        var sv = server[sk];
        if (!(sk in base)) { base[sk] = sv; dirty = true; }
        else { var m = mergeVal(base[sk], sv); if (m.dirty) { base[sk] = m.val; dirty = true; } }
      });
      return { val: base, dirty: dirty };
    }
    if (Array.isArray(server)) {
      if (Array.isArray(local)) { var ma = mergeArray(local, server); return { val: ma.arr, dirty: ma.dirty }; }
      return { val: server, dirty: true };
    }
    return { val: server, dirty: local !== server };
  }

  /* Merge server snapshot into localStorage (server fills gaps; never drops local). */
  function applyServer(snap) {
    var changed = false;
    if (!snap || typeof snap !== 'object') return false;
    Object.keys(snap).forEach(function (k) {
      if (KEYS.indexOf(k) < 0) return;            // ignore unknown keys
      var sv = snap[k];
      var cur = null;
      try { cur = localStorage.getItem(k) === null ? null : JSON.parse(localStorage.getItem(k)); } catch (e) {}
      var m = mergeVal(cur, sv);
      if (m.dirty) { write(k, m.val); changed = true; }
    });
    return changed;
  }

  async function pull() {
    var c = getSb(), u = uid();
    if (!c || !u) return { ok: false, reason: 'not-logged-in' };
    try {
      var { data, error } = await c.from('topik_user_data').select('data').eq('user_id', u).maybeSingle();
      if (error) { console.warn('[sync] pull failed:', error.message); return { ok: false, error: error.message }; }
      if (data && data.data) {
        var changed = applyServer(data.data);
        if (changed) schedulePush(1200);   // write local gaps back up
      }
      return { ok: true, applied: !!(data && data.data) };
    } catch (e) { console.warn('[sync] pull error:', e.message); return { ok: false, error: e.message }; }
  }

  function schedulePush(ms) {
    if (_pushTimer) clearTimeout(_pushTimer);
    _pushTimer = setTimeout(function () { _pushTimer = null; push(); }, ms === undefined ? 1400 : ms);
  }
  function schedulePull(ms) {
    if (_pullTimer) clearTimeout(_pullTimer);
    _pullTimer = setTimeout(function () { _pullTimer = null; pull(); }, ms === undefined ? 400 : ms);
  }

  /* Auto-push when a synced key is written. */
  function hookSetItem() {
    try {
      var orig = Storage.prototype.setItem;
      var self = this;
      Storage.prototype.setItem = function (k, v) {
        var isSync = KEYS.indexOf(k) >= 0;
        if (isSync && authed()) schedulePush(1400);
        return orig.call(this, k, v);
      };
    } catch (e) {}
  }

  function init() {
    if (_ready) return;
    _ready = true;
    hookSetItem();
    if (window.onAuthChange) {
      window.onAuthChange(function (session) {
        if (session) schedulePull(300);     // signed in → pull server data
      });
    }
    if (authed()) schedulePull(500);        // already signed in when loaded
  }

  window.SYNC = {
    push: push, pull: pull, schedulePush: schedulePush, schedulePull: schedulePull,
    init: init, isLoggedIn: authed, snapshotLocal: snapshotLocal, authed: authed
  };
})();
