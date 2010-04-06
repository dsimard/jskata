(function() {
  var jsk = {
    sleepFor : 50, // How many milliseconds should it sleeps
    chunkSize : 10, // How many executions before sleep
    stopped : false,
    // A responsive for
    // Options accept "sleepFor" and "chunkSize"
    for:function(wh, inc, fct, options) {
      var that = this; // used as "this" in shouldContinue
      
      var sleepFor = options && options["sleepFor"] ? 
        options["sleepFor"] : this.sleepFor;
        
      var chunkSize = options && options["chunkSize"] ? 
        options["chunkSize"] : this.chunkSize;
      
      // Function to check if should stop
      var shouldContinue = function shouldStop() {
        var cont = !this.stopped && wh();
        if (!cont && this.onStop && typeof this.onStop == "function") this.onStop(); 
        return cont;
      }
      
      // Execute a chunk of code
      var chunk = function() {
        var jskcurrent = 0;
        while (shouldContinue.apply(that) && jskcurrent++ < chunkSize) {
          fct();
          inc();
        } 
        
        if (shouldContinue.apply(that)) setTimeout(chunk, sleepFor);
      }
      
      // Start the thread
      chunk();
      if (this.onStart && typeof this.onStart == "function") this.onStart();
      
      return this;
    },
    // Stop it after the next round
    stop:function() {
      this.stopped = true;
    },
    /// EVENTS
    onStart : function() {
      return false;
    },
    onStop : function() {
      return false;
    }
  }

  // Creates a namespace if not exist
  if (window.jskata === undefined) {
    window.jskata = {};
    window.jsk = window.jskata;
  }
  window.jskata.responsive = jsk; 
})()
