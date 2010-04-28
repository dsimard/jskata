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
	  execute : function execute(doFunction, undoFunction) {
	    var data = null;
	    
	    if (this.isFct(doFunction)) { 
	      data = doFunction();
  	    this.undids = [];
  	  }
  	  
  	  // Create a new undo and pass what the do returned
  	  var wrappedUndo = function wrappedUndo() {
  	    undoFunction(data);
  	  }
  	  
  	  this.dids.push({redo:doFunction, undo:undoFunction, 
  	    wrappedUndo:wrappedUndo});
  	  
      this.fireEvents();
	  },
	  // Undo
	  undo : function undo() {
		  var fct = this.dids && this.dids.length > 0 ? this.dids.pop() : null;
		  if (this.isFct(fct["wrappedUndo"])) {
		    var data = fct["wrappedUndo"]();
		    
		    // There can be no "do" so don't push a redo
		    if (this.isFct(fct["redo"]))
	        this.undids.push({redo:fct["redo"], undo:fct["undo"]});
		  }
	  	
	  	this.fireEvents();
	  },
	  // Redo
	  redo : function redo() {
	    var fct = this.undids && this.undids.length > 0 ? this.undids.pop() : null;
	    if (this.isFct(fct["redo"])) {
	      var data = fct["redo"]();
	      
	      var wrappedUndo = function wrappedUndo() {
	        fct["undo"](data);
	      }
	      
	      // Put the redo in dids
	      this.dids.push({redo:fct["redo"],undo:fct["undo"],
	        wrappedUndo:wrappedUndo});
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
	  /// PRIVATE
	  // fired when something changes
	  fireEvents : function() {
		  if (this.onChange) this.onChange();
		  if (this.dids.length == 0 && this.undids.length == 0) this.onEmpty();
	  },
	  // is Function
	  isFct : function(fct) {
	    return fct && typeof fct == "function";
	  }
  }
  
  // Creates the base namespace
  window.javascriptKataDotCom = {};
  if (window.jsKata === undefined) window.jsKata = window.javascriptKataDotCom;
  if (window.jsk === undefined) window.jsk = window.javascriptKataDotCom;
  if (window._ === undefined) window._ = window.javascriptKataDotCom;    
  window.javascriptKataDotCom.undo = jsk; 
  window.javascriptKataDotCom.u = window.javascriptKataDotCom.undo;
  
  window.jskataUndo = window.javascriptKataDotCom.undo; // Shortcut for backward compatibility;
})()
