/* 量化策略實驗室 — Service Worker
   頁面本體走「網路優先」，確保更新後一定拿得到新版；離線才回退快取。
   行情 API 一律不快取（App 自己有 6 小時 localStorage 快取，兩層快取會互相打架）。 */
const V = 'qlab-v1';
const SHELL = [
  './', './index.html', './manifest.json',
  './icons/icon-192.png', './icons/icon-512.png',
  './icons/icon-maskable-512.png', './icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(V)
      .then(c => Promise.allSettled(SHELL.map(u => c.add(u))))   // 單一檔案失敗不要整個安裝失敗
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (url.hostname === 'api.finmindtrade.com') return;        // 行情一律走網路

  const isPage = req.mode === 'navigate'
    || url.pathname.endsWith('/') || url.pathname.endsWith('.html');

  if (isPage) {                                                // 網路優先
    e.respondWith(
      fetch(req)
        .then(r => { const c = r.clone(); caches.open(V).then(x => x.put(req, c)); return r; })
        .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  e.respondWith(                                               // 其他資源：快取優先、背景更新
    caches.match(req).then(hit => {
      const net = fetch(req).then(r => {
        if (r && (r.ok || r.type === 'opaque')) {
          const c = r.clone(); caches.open(V).then(x => x.put(req, c));
        }
        return r;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
