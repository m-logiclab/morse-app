const CACHE_NAME = 'morse-cache-v2';
const urlsToCache = [
  './',
  './index.html',
  './letter.html',
  './word.html',
  './karuta.html',
  './style.css',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './images/morse_tree_level1.png',
  './images/morse_tree_level2.png',
  './images/morse_tree_level3.png',
  './images/morse_tree_level4.png',
  './images/morse_tree_level5.png',
  './images/morse_tree_level6.png',
  './images/morse_tree_level7.png',
  './images/morse_tree_level8.png',
  './images/morse_tree_level9.png',
  './images/morse_tree_level10.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (!cacheWhitelist.includes(key)) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});
