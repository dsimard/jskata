/* jskata.undo.js */
(function() {
  var jsk = {
    ///// PROPERTIES
	  dids : [],
	  undids : [],
	  // Can undo
	  canUndo : function() {
	    return this.dids.length > 0;
	  },
	  // Can Redo
	  canRedo : function() {
	    return this.undids.length > 0;
	  },
	  ///// FUNCTIONS
	  // deprecated : Push an undo function
	  push : function(undoFunction) {
		  this.execute(null, undoFunction);
	  },
	  // Do something that can be undone
	  execute : function execute(doFunction, undoFunction, options) {
	    // If in async, it will not execute the do when calling redo
	    // (see redoFunction)
	    var data;

	    if (options === undefined || options === null) { options = {}; }
	    
	    if (this.isFct(doFunction) && options.async !== true) { 
	      data = doFunction();
      }

      // This causes me problem on async
      // TODO : This is not thread safe but I didn't find yet how to do it
      if (jsk.isInAsyncRedo !== true) {
        this.undids = [];
      }
      jsk.isInAsyncRedo = false; 

      // If there's data in options, use them
      if (options.data) { data = options.data; }

      // Create a new undo and pass what the do returned
      var wrappedUndo = function wrappedUndo() {
        undoFunction(data);
      };

      this.dids.push({redo:doFunction, undo:undoFunction, 
        wrappedUndo:wrappedUndo, options:options});

      this.fireEvents();

      return data;
	  },
	  // Undo
	  undo : function undo() {
		  var fct = this.dids && this.dids.length > 0 ? this.dids.pop() : null;
		  if (this.isFct(fct.wrappedUndo)) {
		    fct.wrappedUndo();
		    
		    // There can be no "do" so don't push a redo
		    if (this.isFct(fct.redo)) {
	        this.undids.push({redo:fct.redo, undo:fct.undo, 
	        options : fct.options});
	      }
		  }

      this.fireEvents();
	  },
	  // Redo
	  redo : function redo() {
	    var fct = this.undids && this.undids.length > 0 ? this.undids.pop() : null;
	    if (this.isFct(fct.redo)) {
	      jsk.isInAsyncRedo = fct.options.async;
	      var data = fct.redo();
	      
	      // If there's data in options, use them
	      if (fct.options.data) { data = fct.options.data; }
	      
	      var wrappedUndo = function wrappedUndo() {
	        fct.undo(data);
	      };
	      
	      // Put the redo in dids (if in async, skip this)
	      if (fct.options.async !== true) {
	        this.dids.push({redo:fct.redo,undo:fct.undo,
	          wrappedUndo:wrappedUndo, options:fct.options});
	      }
	    }
	    
	    this.fireEvents();
	  },
	  ///// EVENTS
	  // When there's a change
	  onChange : function() {
		  return false;
	  },
	  // deprecated : when all the do/undo are empty
	  onEmpty : function() {
		  return false;
	  },
	  ///// PRIVATE
	  // fired when something changes
	  fireEvents : function() {
		  if (this.onChange) { this.onChange(); }
		  if (this.dids.length === 0 && this.undids.length === 0) { this.onEmpty(); }
	  },
	  // is Function
	  isFct : function(fct) {
	    return fct && typeof fct == "function";
	  }
  };
  
  // Creates the base namespaces
  if (typeof(window.javascriptKataDotCom) == "undefined") { window.javascriptKataDotCom = {}; }
  if (typeof(window.jsKata) == "undefined") { window.jsKata = window.javascriptKataDotCom; }
  if (typeof(window.jsk) == "undefined") { window.jsk = window.javascriptKataDotCom; }
  if (typeof(window._) == "undefined") { window._ = window.javascriptKataDotCom; }
    
  window.javascriptKataDotCom.undo = jsk; 
  window.javascriptKataDotCom.u = jsk;

  // Shortcut for backward compatibility
  window.jskataUndo = window.javascriptKataDotCom.undo; 
})();

/* jskata.timezone.js */
/* http://upload.wikimedia.org/wikipedia/commons/0/01/2007-02-20_time_zones.svg */
/* 
  In the northern emisphere, january is in winter and july is in summer.
  In the southern emisphere, january is in summer and july is in winter.
  A daylight saving time offset is always -1, so standard time is always 
  the greatest of two offsets.
*/
(function() {
  var jsk = {
    /******* PROPERTIES *******/
    breakingMonth : 0,
    testMonth0Offset : null,
    testMonth6Offset : null,
    timeSepator : "",
    /******* PRIVATE *******/
    getDateOffset : function getDate(month) {
      return new Date((new Date()).getFullYear(), month, 0).getTimezoneOffset();
    },
    getMonth0Offset : function() {
      return jsk.testMonth0Offset !== null ?
        jsk.testMonth0Offset :
        jsk.getDateOffset(jsk.breakingMonth);
    },
    getMonth6Offset : function() {
      return jsk.testMonth6Offset !== null ?
        jsk.testMonth6Offset :
        jsk.getDateOffset(jsk.breakingMonth+6);
    },
    offsetToString : function(offset, timeSeparator) {
      timeSeparator = timeSeparator || jsk.timeSeparator || "";

      var parts = [];
      
      var st = offset/60.0;
      parts.push(st >= 0 ? "+" : "-");

      var hour = Math.floor(Math.abs(st)); 
      parts.push((hour <= 9 ? "0" : "") + hour);
      
      parts.push(timeSeparator);
      
      var min = Math.abs(st%1.0)*60;
      parts.push((min <= 9 ? "0" : "") + min);
      
      return parts.join("");
    },
    /******* PUBLIC *******/
    // Force some test offsets
    testOffset : function testOffset(month0Offset, month6Offset) {
      jsk.testMonth0Offset = month0Offset;
      jsk.testMonth6Offset = month6Offset;
    },
    // the timezone has daylight saving
    hasDst : function() {
      return jsk.st() != jsk.dst();
    },
    // Returns the standard time offset (inverted)
    invertedSt : function invertedSt() {
      return Math.max(jsk.getMonth0Offset(), jsk.getMonth6Offset());
    },
    // Returns the daylight saving time offset (inverted)
    invertedDst : function invertedDst() {
      return Math.min(jsk.getMonth0Offset(), jsk.getMonth6Offset());
    },
    // Returns the standard time offset
    st : function st() {
      return 0-jsk.invertedSt();
    },
    // Returns standard to string
    stToString : function(timeSeparator) {
      return jsk.offsetToString(jsk.st(), timeSeparator);
    },
    // Returns the standard time offset
    dst : function dst() {
      return 0-jsk.invertedDst();
    },
    // Returns daylight saving to string
    dstToString : function(timeSeparator) {
      return jsk.offsetToString(jsk.dst(), timeSeparator);
    },
    iHateTheLastComma : true // this line exists because I hate the last comma
  };
  
  // Creates the base namespaces
  if (typeof(window.javascriptKataDotCom) == "undefined") { window.javascriptKataDotCom = {}; }
  if (typeof(window.jsKata) == "undefined") { window.jsKata = window.javascriptKataDotCom; }
  if (typeof(window.jsk) == "undefined") { window.jsk = window.javascriptKataDotCom; }
  if (typeof(window._) == "undefined") { window._ = window.javascriptKataDotCom; }
    
  window.javascriptKataDotCom.timezone = jsk; 
  window.javascriptKataDotCom.tz = jsk;
})();

/* jskata.nofreeze.js */
/*jslint forin: true */
(function() {
  var jsk = {
    sleepFor : 1, // How many milliseconds should it sleeps
    chunkSize : 10, // How many executions before sleep
    stops : [], // Contains all stop functions
    // A responsive for
    forLoop:function for_(wh, inc, fct, options, stopCallback) {
      var self = this;
      var timerId;
      
      var sleepFor = options && options.sleepFor ? 
        options.sleepFor : this.sleepFor;
        
      var chunkSize = options && options.chunkSize ? 
        options.chunkSize : this.chunkSize;
        
      // Create the stop function
      var innerStop = function innerStop() {
        if (stopCallback) { stopCallback(); }
        clearTimeout(timerId);
      };
      
      var stop = function stopWrapper() {
        if (innerStop) { innerStop(); }
        innerStop = null;
      };
      
      self.stops.push(stop);
      
      // Execute a chunk of code
      var chunk = function chunk() {
        var jskcurrent = 0;
        while (wh() && jskcurrent++ < chunkSize) {
          fct();
          if (inc) { inc(); }
        } 
        
        if (wh()) { 
          timerId = setTimeout(chunk, sleepFor);
        } else {
          stop();
        }
      };
            
      // Start the process
      chunk();
      
      return {stop:stop};
    },
    // A simple for with an index increasing to a count
    forCount : function forCount(maxCount, fct, options, stopCallback) {
      var jsKataforCountIndex = (options && options.beginAt) || 0;
      var newFct = function() { fct(jsKataforCountIndex); };
      return this.forloop(
        function() {return jsKataforCountIndex <= maxCount;},
        function() {jsKataforCountIndex++;},
        newFct,
        options,
        stopCallback
      );
    },
    // Create an infinite loop
    infinite:function infinite(fct, options, stopCallback) {
      return this.forloop(
        function() { return true; },
        null,
        fct,
        options,
        stopCallback
      );
    },
    // Each
    each:function(obj, fct, options, stopCallback) {
      var i = 0;
      
      // If it's an array
      // taken from jQuery
      if (Object.prototype.toString.call(obj) == "[object Array]") {
        i = 0;
        return this.forloop(
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
        for(var prop in obj) {props.push(prop); }
        i = 0;
        return this.forloop(
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
      for(var i = 0; i < this.stops.length; i++) {
        this.stops[i]();
      }
      if (this.onStop) { this.onStop(); }
    }
  };
  
  jsk.forloop = jsk.forLoop; // backward compatibility

  // Creates the base namespaces
  if (typeof(window.javascriptKataDotCom) == "undefined") { window.javascriptKataDotCom = {}; }
  if (typeof(window.jsKata) == "undefined") { window.jsKata = window.javascriptKataDotCom; }
  if (typeof(window.jsk) == "undefined") { window.jsk = window.javascriptKataDotCom; }
  if (typeof(window._) == "undefined") { window._ = window.javascriptKataDotCom; }
    
  window.javascriptKataDotCom.nofreeze = jsk; 
  window.javascriptKataDotCom.nf = window.javascriptKataDotCom.nofreeze;
})();

