(function() {
  var jsk = {
    sleepFor : 1, // How many milliseconds should it sleeps
    chunkSize : 10, // How many executions before sleep
    stops : [], // Contains all stop functions
    // A responsive for
    // Options accept "sleepFor" and "chunkSize"
    for:function for_(wh, inc, fct, options) {
      var self = this;
      var timerId;
      
      var sleepFor = options && options["sleepFor"] ? 
        options["sleepFor"] : this.sleepFor;
        
      var chunkSize = options && options["chunkSize"] ? 
        options["chunkSize"] : this.chunkSize;
      
      // Execute a chunk of code
      var chunk = function chunk() {
        var jskcurrent = 0;
        while (wh() && jskcurrent++ < chunkSize) {
          fct();
          inc();
        } 
        
        if (wh()) timerId = setTimeout(chunk, sleepFor);
      }
      
      // Create the stop function
      var stop = function stop() {
        clearTimeout(timerId);
      }
      this.stops.push(stop);
            
      // Start the thread
      chunk();
      if (this.onStart && typeof this.onStart == "function") this.onStart();
      
      return {stop:stop};
    },
    // Stop it after the next round
    stop:function() {
      for(var i = 0, fct; fct = this.stops[i]; i++) {
        fct();
      }
      if (this.onStop) this.onStop();
    }
  }

  // Creates a namespace if not exist
  if (window.jskata === undefined) {
    window.jskata = {};
    window.jsk = window.jskata;
  }
  window.jskata.responsive = jsk; 
})()
