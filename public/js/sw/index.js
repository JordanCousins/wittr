self.addEventListener('fetch', function(event) {
  event.respondWith(
    new Response('Whale hello, world!', {
      headers: {'foo': 'bar'}
    })
  );
});
