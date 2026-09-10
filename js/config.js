/* Camnemi TOPIK — Supabase config (public keys by design)
   Project: Camnemi_Application (srwatzpxnpxohhodylgc)
   anon key is PUBLIC — safe to ship in the browser. Never put the service_role key here.
*/
window.CAMNEMI_TOPIK_URL = 'https://srwatzpxnpxohhodylgc.supabase.co';
window.CAMNEMI_TOPIK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyd2F0enB4bnB4b2hob2R5bGdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYzNzE3MTAsImV4cCI6MjEwMTk0NzcxMH0.rl3KcSz_mZLRhFCGpWxnF2PBKtc3-iHbEp9BAoqI1l8';

// OAuth providers (Google + Facebook). Client IDs go here once created.
// Right now these are placeholders — the login buttons work once real
// credentials are configured in the Supabase dashboard (Auth > Providers).
window.CAMNEMI_OAUTH = {
  google: { enabled: true,  clientId: '' },   // from Google Cloud Console
  facebook: { enabled: true, clientId: '' }   // from Meta for Developers
};

// AI question generator — same-origin (served by ai_server.py alongside the app)
window.CAMNEMI_AI_BASE = '/api';   // app + AI on ONE URL → no CORS/tunnel conflicts
