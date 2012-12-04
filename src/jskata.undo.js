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
  if (typeof window !== 'undefined') {
    if (window.javascriptKataDotCom === undefined) { window.javascriptKataDotCom = {}; }
    if (window.jsKata === undefined) { window.jsKata = window.javascriptKataDotCom; }
    if (window.jskata === undefined) { window.jskata = window.javascriptKataDotCom; }
    if (window.jsk === undefined) { window.jsk = window.javascriptKataDotCom; }
    if (window._  === undefined) { window._ = window.javascriptKataDotCom; }
      
    window.javascriptKataDotCom.undo = jsk; 
    window.javascriptKataDotCom.u = jsk;

    // Shortcut for backward compatibility
    window.jskataUndo = window.javascriptKataDotCom.undo; 
  } else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = jsk;
  }
})();
