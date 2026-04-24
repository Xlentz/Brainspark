const CACHE_NAME = 'Nexoria-cache-v1.4';

const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  './image.png'
];

const CATEGORY_ASSETS = [];
for (let i = 1; i <= 8; i++) {
  CATEGORY_ASSETS.push(`./category-${i}.json`);
}

const ALL_ASSETS = [...CORE_ASSETS, ...CATEGORY_ASSETS];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Core Assets müssen geladen werden
      cache.addAll(CORE_ASSETS);
      // Kategorien einzeln laden, damit ein Fehler nicht die ganze Installation stoppt
      return Promise.allSettled(
        ALL_ASSETS.map(url => 
          fetch(url).then(res => {
            if(res.ok) return cache.put(url, res);
          }).catch(() => {})
        )
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((fetchRes) => {
        if (!fetchRes || fetchRes.status !== 200 || event.request.method !== 'GET') {
          return fetchRes;
        }
        const responseToCache = fetchRes.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return fetchRes;
      }).catch(() => {
        return new Response("Offline-Inhalt nicht verfügbar.");
      });
    })
  );
});
