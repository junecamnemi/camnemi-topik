/* Camnemi TOPIK — backend config
   Copy this to config.js and fill in your Supabase project's anon (publishable) key.
   The anon key is PUBLIC by design — safe to ship in a static site.
   Get it from: Supabase Dashboard → Project → Settings → API
   Current project: Camnemi_Application (srwatzpxnpxohhodylgc) — TOPIK app backend */
window.CAMNEMI_TOPIK_URL = 'https://srwatzpxnpxohhodylgc.supabase.co';
window.CAMNEMI_TOPIK_KEY  = '';

// OAuth provider toggles + client ids (fill after creating apps)
window.CAMNEMI_OAUTH = {
  google:   { enabled: true, clientId: '' },
  facebook: { enabled: true, clientId: '' }
};
