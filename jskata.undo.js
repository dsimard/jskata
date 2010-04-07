(function() {
  var jsk = {
	  dids : [],
	  undids : [],
	  // deprecated : Push an undo function
	  push : function(undoFunction) {
		  this.do(null, undoFunction);
	  },
	  // Do something that can be undone
	  do : function(doFunction, undoFunction) {
	    if (this.isFct(doFunction)) { 
	      doFunction();
  	    this.undids = [];
  	  }
  	  
  	  this.dids.push({do:doFunction, undo:undoFunction});
  	  
      this.fireEvents();
	  },
	  // Undo
	  undo : function() {
		  var fct = this.dids && this.dids.length > 0 ? this.dids.pop() : null;
		  if (this.isFct(fct["undo"])) {
		    fct["undo"]();
		    
		    // There can be no "do" so don't push a redo
		    if (this.isFct(fct["do"]))
	        this.undids.push({do:fct["do"], undo:fct["undo"]});
		  }
	  	
	  	this.fireEvents();
	  },
	  // Redo
	  redo : function() {
	    var fct = this.undids && this.undids.length > 0 ? this.undids.pop() : null;
	    if (this.isFct(fct["do"])) {
	      fct["do"]();
	      
	      // Put the redo in dids
	      this.dids.push({do:fct["do"],undo:fct["undo"]});
	    }
	    
	    this.fireEvents();
	  },
	  // Can undo
	  canUndo : function() {
	    return this.dids.length > 0;
	  },
	  // Can Redo
	  canRedo : function() {
	    return this.undids.length > 0;
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
  
  // Creates a namespace if not exist
  if (window.jskata == undefined) {
    window.jskata = {};
    window.jsk = window.jskata;
  }
  
  window.jskata.undo = jsk; 
  window.jskataUndo = jsk; // Shortcut for backward compatibility;
})()
