self.addEventListener('fetch', function(event) {
	//Hijacking to respond to all requests with a custom html response
	event.respondWith(
    new Response('<h1 class="a-winner-is-me">Whale hello there, world!</h1>', {
      headers: {'Content-Type': 'text/html'}  //allows html response in browser
    })
  );
});
