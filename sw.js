const CACHE_NAME = ‘nexoria-cache-v2.0’;

const CORE_ASSETS = [
‘./’,
‘./index.html’,
‘./manifest.json’,
‘./icon.png’,
‘./image.png’
];

const CATEGORY_ASSETS = [];
for (let i = 1; i <= 8; i++) {
CATEGORY_ASSETS.push(`./category-${i}.json`);
}

const ALL_ASSETS = […CORE_ASSETS, …CATEGORY_ASSETS];

// ── Install ───────────────────────────────────────────────────────────────
self.addEventListener(‘install’, (event) => {
event.waitUntil(
caches.open(CACHE_NAME).then((cache) => {
// Core-Assets müssen zwingend geladen werden
return cache.addAll(CORE_ASSETS).then(() => {
// Kategorien einzeln laden – ein Fehler stoppt nicht die gesamte Installation
return Promise.allSettled(
CATEGORY_ASSETS.map(url =>
fetch(url).then(res => {
if (res.ok) return cache.put(url, res);
}).catch(() => {})
)
);
});
})
);
self.skipWaiting();
});

// ── Activate ──────────────────────────────────────────────────────────────
self.addEventListener(‘activate’, (event) => {
event.waitUntil(
caches.keys().then((cacheNames) => {
return Promise.all(
cacheNames
.filter((name) => name !== CACHE_NAME)
.map((name) => {
console.log(’[SW] Alter Cache gelöscht:’, name);
return caches.delete(name);
})
);
})
);
return self.clients.claim();
});

// ── Fetch ─────────────────────────────────────────────────────────────────
self.addEventListener(‘fetch’, (event) => {
// Nur GET-Requests cachen
if (event.request.method !== ‘GET’) return;

```
event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;

        return fetch(event.request)
            .then((networkResponse) => {
                if (
                    !networkResponse ||
                    networkResponse.status !== 200 ||
                    networkResponse.type === 'opaque'
                ) {
                    return networkResponse;
                }
                // Neue Ressourcen dynamisch cachen
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });
                return networkResponse;
            })
            .catch(() => {
                // Offline-Fallback: HTML-Anfragen bekommen die gecachte index.html
                if (event.request.headers.get('accept')?.includes('text/html')) {
                    return caches.match('./index.html');
                }
                // Für JSON-Anfragen (Kategorien): leeres aber valides JSON zurückgeben
                if (event.request.url.endsWith('.json')) {
                    return new Response(
                        JSON.stringify({ name:'Offline', emoji:'📵', color:'#555', levels:[] }),
                        { headers: { 'Content-Type': 'application/json' } }
                    );
                }
                // Allgemeiner Fallback
                return new Response(
                    '<h2 style="font-family:sans-serif;text-align:center;margin-top:40px">📵 Du bist offline</h2>',
                    { headers: { 'Content-Type': 'text/html' } }
                );
            });
    })
);
```

});