const cacheName = 'site-static-v11';
const assets = [
    '/',
    '/pesquisav11/index.html',
    '/pesquisav11/styles.css',
    '/pesquisav11/script.js',
    '/pesquisav11/manifest.json',
    '/pesquisav11/images/icon-192x192.png',
    '/pesquisav11/images/icon-512x512.png',
    // Adicione outros recursos necessários
];

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna o recurso do cache se disponível
        return response || fetch(event.request).then(fetchResponse => {
          // Se o recurso for buscado com sucesso na rede, adicione-o ao cache
          return caches.open(cacheName).then(cache => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
  );
});