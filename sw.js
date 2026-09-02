/* Camnemi TOPIK service worker — offline-first caching for static assets */
const CACHE = 'camnemi-topik-v1';
const ASSETS = [
  './',
  './app.html',
  './index.html',
  './login.html',
  './manifest.json',
  './css/style.css',
  './css/app.css',
  './js/config.js',
  './js/common.js',
  './js/auth.js',
  './js/app.js',
  './data/topik1-bank.js',
  './data/topik2-bank.js',
  './data/mock-tests.js',
  './data/topik-schedule.js'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // never cache API calls (AI server) — network only
  if (url.pathname.includes('/api/') || url.pathname.includes('/generate') || url.pathname.includes('/tts')) return;
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      const clone = res.clone();
      if (res.ok && url.origin === location.origin) caches.open(CACHE).then(c => c.put(e.request, clone));
      return res;
    }).catch(() => caches.match('./app.html')))
  );
});
