self.addEventListener('fetch', function(event) {
  console.log("Whale hello, there!", event.request);
});
