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
		jsk.undo.do(function() {
		    logAction("Added user <strong>" + user + "</strong>")
		  },
		  function() {
	      logAction("<span style='color:red'>[undo]</span>" + 
				      "Removed user <strong>" + user + "<strong>");
		  });
	});
	
	// Add project
	$("#addProject").click(function() {
		var project = $("#project").val();
		if (project == "") project = "[empty]";
		jsk.undo.do(function() {
		  logAction("Added project <strong>" + project + "</strong>")
		}, function() {
			logAction("<span style='color:red'>[undo]</span>" + 
				"Removed project <strong>" + project + "</strong>")
		});
	});
});
