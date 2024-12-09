const CACHE_NAME = 'pwa-cache-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// This will handle incoming push messages and display them as notifications
self.addEventListener('push', function(event) {
  const data = event.data.json();  // Assuming the server sends JSON
  const options = {
    body: "Neue Benachrichtigung aus der PWA mit süßem Katzenbild",
    icon: "https://placecats.com/200/200",
    badge: "/public/icon-192x192.png"
  };
  event.waitUntil(
      self.registration.showNotification(data.title, options)
  );
});
