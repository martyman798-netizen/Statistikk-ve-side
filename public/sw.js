/* Statistikkens alfabet — frakoblet bruk.
   Nett først: med nett hentes alt som vanlig, og en kopi legges i bufferen.
   Uten nett (på t-banen, på flyet) serveres kopien. Siden blir derfor aldri
   gammel så lenge du er på nett. Skriftene fra Google hentes ikke hit;
   uten nett faller siden tilbake på Georgia og en systemmono. */
const CACHE = 'sa-v1';
const CORE = ['/', '/favicon.svg', '/manifest.webmanifest', '/icon-192.png', '/apple-touch-icon.png'];

self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=> c.addAll(CORE)).then(()=> self.skipWaiting()));
});

self.addEventListener('activate', e=>{
  e.waitUntil(
    caches.keys()
      .then(keys=> Promise.all(keys.filter(k=> k !== CACHE).map(k=> caches.delete(k))))
      .then(()=> self.clients.claim())
  );
});

self.addEventListener('fetch', e=>{
  const req = e.request;
  if(req.method !== 'GET') return;
  const url = new URL(req.url);
  if(url.origin !== self.location.origin) return;
  /* index.html og / er samme side; lagre den under / */
  const key = req.mode === 'navigate' ? '/' : req;
  e.respondWith(
    fetch(req)
      .then(res=>{
        if(res.ok && res.type === 'basic' && (req.mode !== 'navigate' || url.pathname === '/' || url.pathname === '/index.html')){
          const copy = res.clone();
          caches.open(CACHE).then(c=> c.put(key, copy));
        }
        return res;
      })
      .catch(()=> caches.match(key).then(hit=> hit || caches.match('/')).then(hit=> hit || Response.error()))
  );
});
