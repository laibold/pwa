const CACHE_NAME = 'pwa-cache-v2';
const urlsToCache = [
    '/index.html',
    '/battery.html',
    '/image.html',
    '/script.js',
    '/manifest.json',
    'style.css'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME) // Öffnet (oder erstellt, falls nicht vorhanden) einen Cache mit dem Namen CACHE_NAME
            .then(cache => cache.addAll(urlsToCache)) // Fügt alle in der Liste urlsToCache definierten URLs in den Cache ein
    );
});

/* CACHE FIRST */
// self.addEventListener('fetch', event => {
//   event.respondWith( // Hält den Standard-Netzwerkrequest an und ermöglicht dem Service Worker, eine alternative Antwort bereitzustellen.
//       caches.match(event.request) // Prüft, ob die angeforderte Ressource bereits im Cache gespeichert ist.
//           .then(response => response || fetch(event.request)) // responded mit cache oder fetch, wenn kein cache
//   );
// });

/* NETWORK FIRST */
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .then(() => {
                const clonedResponse = response.clone();
                caches.open(CACHE_NAME)
                    .then((cache) => cache.put(event.request, clonedResponse))

                return response;
            })
            .catch(() => {
                return caches.match(event.request)
            })
    );
});
