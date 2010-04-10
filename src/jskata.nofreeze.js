(function() {
  var jsk = {
    sleepFor : 1, // How many milliseconds should it sleeps
    chunkSize : 10, // How many executions before sleep
    stops : [], // Contains all stop functions
    // A responsive for
    for:function for_(wh, inc, fct, options, stopCallback) {
      var self = this;
      var timerId;
      
      var sleepFor = options && options["sleepFor"] ? 
        options["sleepFor"] : this.sleepFor;
        
      var chunkSize = options && options["chunkSize"] ? 
        options["chunkSize"] : this.chunkSize;
        
      // Create the stop function
      var innerStop = function innerStop() {
        if (stopCallback) stopCallback();
        clearTimeout(timerId);
      }
      var stop = function stopWrapper() {
        if (innerStop) innerStop();
        innerStop = null;
      };
      self.stops.push(stop);
      
      // Execute a chunk of code
      var chunk = function chunk() {
        var jskcurrent = 0;
        while (wh() && jskcurrent++ < chunkSize) {
          fct();
          if (inc) inc();
        } 
        
        if (wh()) { 
          timerId = setTimeout(chunk, sleepFor);
        } else {
          stop();
        }
      }
            
      // Start the process
      chunk();
      
      return {stop:stop};
    },
    // Create an infinite loop
    infinite:function infinite(fct, options, stopCallback) {
      return this.for(
        function() { return true; },
        null,
        fct,
        options,
        stopCallback
      )
    },
    // Each
    each:function(obj, fct, options, stopCallback) {
      // If it's an array
      // taken from jQuery
      if (toString.call(obj) == "[object Array]") {
        var i = 0;
        return this.for(
          function() { return i < obj.length; },
          function() { i++; },
          function() { fct.call(obj[i], i, obj[i]); },
          options,
          stopCallback
        );
      // If it's an an object
      } else {
        // Create an array of properties
        var props = [];
        for(var prop in obj) { props.push(prop); }
        var i = 0;
        return this.for(
          function() { return i < props.length; },
          function() { i++; },
          function() { fct.call(obj[props[i]], props[i], obj[props[i]]);},
          options,
          stopCallback
        );
      }
    },
    // Stop it after the next round
    stop:function() {
      for(var i = 0, fct; fct = this.stops[i]; i++) {
        fct();
      }
      if (this.onStop) this.onStop();
    }
  }

  // Creates the base namespace
  window.javascriptKataDotCom = {};
  if (window.jsKata === undefined) window.jsKata = window.javascriptKataDotCom;
  if (window.jsk === undefined) window.jsk = window.javascriptKataDotCom;
  if (window._ === undefined) window._ = window.javascriptKataDotCom;
  window.javascriptKataDotCom.nofreeze = jsk; 
  window.javascriptKataDotCom.nf = window.javascriptKataDotCom.nofreeze;
})()
