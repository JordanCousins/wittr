/*calling the funtion to represent the static cache*/
var staticCacheName = "wittr-static-v2";

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


//Using a Service Worker to create a//
//cache and load content from it... //
self.addEventListener('install', function(event) {
 //`event.waitUntil` takes a promise
 event.waitUntil(
   //`caches.open` returns a promise
   caches.open(staticCacheName).then(function(cache) {
     /*Once the cache is opened, `cache.addAll`
     can be used to cache all URLs.*/
     return cache.addAll([
       '/',
       'js/main.js',
       'imgs/icon.png',
       'etc.'
     ]);
   })
 );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('wittr-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

//Creating a Cache Response//
self.addEventListener('fetch', function(event) {
/*Respond with an entry from the cache, if there is one.
 If there isn't, fetch from the network.*/
 event.respondWith(
   caches.match(event.request).then(function(response) {
     return response || fetch(event.request);
   })
 );
});
