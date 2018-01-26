self.addEventListener('fetch', function(event) {
  event.respondWith(
    /*  Respond to all requests for non-existing
    pages with a 404 '.gif' response  */
    fetch(event.request).then(function(response) {
      if (response.status === 404) {  //if the requested page is invalid
        return fetch('/imgs/404-error.gif');  //return 404 error
      }
      return response;
    }).catch(function() {  //respond to all total or connection failures
      return new Response("Oh no, that totally failed!");  //with this custom response
    })
  );
});
