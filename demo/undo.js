$(document).ready(function() {
  // Disabled
  $("#undo, #redo").attr("disabled", true);

	// Show a log of action
	var logAction = function(msg) {
		$("#actions").append(
			$("<li>").html(msg)
		);
	}

	// Show the undo button when there's a new undo
	jskataUndo.onChange = function() {
		if (jsk.undo.canUndo()) $("#undo").attr("disabled", false) 
		  else $("#undo").attr("disabled", true);
		  
		if (jsk.undo.canRedo()) $("#redo").attr("disabled", false) 
		  else $("#redo").attr("disabled", true);
	};
	
	// Undo/redo is clicked
	$("#undo").click(function() {
		jskataUndo.undo();
	});
	
	$("#redo").click(function() {
		jsk.undo.redo();
	});
	
	// Add user
	$("#addUser").click(function() {
		var user = $("#user").val();
		if (!user) user = "[empty]";
		jsk.undo.execute(function() {
        var fakeId = Math.round((Math.random()*1000))+1;
        
		    logAction("Added user <strong>" + user + 
		      " (id:" + fakeId.toString() + ")</strong>");
		      
		    return {id:fakeId}; // Return a fake ID
		  },
		  function undo(data) {
	      logAction("<span style='color:red'>[undo]</span>" + 
				  "Removed user <strong>" + user + 
				  " (id:" + data.id.toString() + ")<strong>");
		  });
	});
	
	///// PROJECT //////
	// Make the async call
  var createProject = function createProject_() {  
    var project = $("#project").val();
    if (!project || project === undefined) project = "[empty]";
    
    // Success of the async call
    var success = function success(data) {
      // Create data (for test only)
      data.name = project; 
      data.id = Math.round(Math.random()*999);
      result = data;
    
      logAction("Added project <strong>" + data.name + 
        " (id:" + data.id.toString() + ")</strong>");
        
      var cb = _.u.asyncExecute(createProject);

      var removeProject = function removeProject_(data) {
        $.get("./undo.project.json", function success() {
          logAction("<span style='color:red'>[undo]</span>" + 
	          "Removed project <strong>" + result.name + 
	          " (id:" + data.id + ")<strong>");
        });
      };
      
      
    }

  };
	
	// Add project with jsonp
	$("#addProject").click(function() {
    createProject();
	});
	
	//
	$("#addAsync").click(function() {
	  var add = function() {
	    $.get("./undo.project.json", {}, function success(data) {
	      data.id = Math.round((Math.random()*1000));
	      
	      console.log("DO", data.id);
	      var del = function del() {
	        console.log("UNDO", data.id);
	      }
	    
        var cb = _.u.execute(add, del, {async:true});
	    }, "json");
	  };
	  
	  add();
	});
	
}); // document.ready


