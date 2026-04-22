/**
 * Nexoria Service Worker - Version 1.0
 * Nur icon.png als Logo/Icon Quelle.
 */

const CACHE_NAME = 'Nexoria-cache-v1.0';

const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png' // Einzige Bildquelle
];

const CATEGORY_ASSETS = [];
for (let i = 1; i <= 20; i++) {
  CATEGORY_ASSETS.push(`./category-${i}.json`);
}

const ALL_ASSETS = [...CORE_ASSETS, ...CATEGORY_ASSETS];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        ALL_ASSETS.map(url => 
          cache.add(url).catch(err => console.log(`[SW] Nicht gefunden: ${url}`))
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
        return caches.open(CACHE_NAME).then((cache) => {
          if (event.request.method === 'GET' && fetchRes.status === 200) {
            cache.put(event.request, fetchRes.clone());
          }
          return fetchRes;
        });
      });
    })
  );
});
