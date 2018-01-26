self.addEventListener('fetch', function(event) {
	/*  Hijacking all requests ending in ".jpg"
  to respond with a custom .gif response  */
  if (event.request.url.endsWith('.jpg')) { //when request ends in '.jpg'
    event.respondWith( //respond with
      fetch('/imgs/whale-hello.gif') //whale meme ('.gif')
    );
  }
});
