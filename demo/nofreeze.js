$(document).ready(function() {
  $("#stop").click(function() {$(this).fadeOut();});

  // A non-freezing for
  var nonFreezingFor = function nonFreezingFor() {
    var i = 0;
    jsk.nofreeze.forloop(
      function() { return i < Number.MAX_VALUE;  },
      function() { i++; },
      function fct() {
        $("#count").append("<span>. </span>");
      },
      null,
      function() {
        $("#count").append("<span>stopped</span>");
      }
    );
  }

  $("#nonFreezingFor").click(nonFreezingFor);
  
  $("#infinite").click(function() {
    jsk.nofreeze.stop();
    var inf = jsk.nofreeze.infinite(function() {
      $("#count").append("<span>. </span>")
    });
    
    $("#stop").fadeIn().click(function() {
      inf.stop();
    });
  });
  
  $("#each").click(function() {
    $("#count").empty();
      _.nf.each(window, function(index, el) {
      $("#count").append("<span>"+index+", </span>");
    });
  });
  
  $("#nonresp").click(function() {
    for (var i = 0; i < Number.MAX_VALUE; i++) {
      $("#count").append("<span>.</span>");
    }
  });
});
