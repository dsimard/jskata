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
		    console.log("in", data)
	      logAction("<span style='color:red'>[undo]</span>" + 
				  "Removed user <strong>" + user + 
				  " (id:" + data.id.toString() + ")<strong>");
		  });
	});
	
	// Add project with jsonp
	$("#addProject").click(function() {
	  var removeProject = function removeProject_(data) {
	    $.get("./undo.project.json", function success() {
	      logAction("<span style='color:red'>[undo]</span>" + 
				  "Removed project <strong>" + data.name + 
				  " (id:" + data.id + ")<strong>");
	    })
	  }
	
    var createProject = function createProject_() {  
      var project = $("#project").val();
      if (!project) project = "[empty]";
     
      var result;
     
      $.ajax(
        {
          url:"./undo.project.json", 
          success: function success(data) {
            // Create data
            data.name = project;
            data.id = Math.round(Math.random()*999);
          
            logAction("Added project <strong>" + data.name + 
              " (id:" + data.id.toString() + ")</strong>");

            _.u.execute(createProject,
                function undo() { removeProject(data); },
                {async:true}

              );
          },
          dataType:"json",
        }
      );
    };
    
    createProject();
	});
	
	

	
}); // document.ready


