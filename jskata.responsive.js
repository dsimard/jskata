(function() {

  var jsk = {
    for:function(wh, inc, fct) {
      do {
        fct();
        inc();
      } while (wh())      
    }
  }

  // Creates a namespace if not exist
  if (window.jskata == undefined) {
    window.jskata = {};
    window.jsk = window.jskata;
  }
  window.jskata.responsive = jsk; 
})()
