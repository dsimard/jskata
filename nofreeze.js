$(document).ready(function() {
  $(".stop").click(function() {$(this).fadeOut();});

  /********** NON FREEZING FOR **********/
  // A non-freezing for
  var nonFreezingFor = function nonFreezingFor() {
    var i = 0; // index
    var loop = jsk.nofreeze.forloop(
      function() { return i < Number.MAX_VALUE;  }, // the condition
      function() { i++; }, // the incrementor
      function fct() { // this is what will be executed
         $("#nonFreezingCount").text(i.toString());
      }
    );
    
    // Stop
    $("#nonFreezingStop").fadeIn().click(loop.stop);
  }

  $("#nonFreezingFor").click(nonFreezingFor);
  
  /********** INFINITE **********/
  var infinite = function infinite() {
    // Start the loop
    var loop = jsk.nofreeze.infinite(function() {
      $("#infiniteRandom").text(Math.round((Math.random()*1000)).toString())
    });
    
    // Stop the loop
    $("#stopInfinite").fadeIn().click(loop.stop);
  }
  
  $("#infinite").click(infinite);
  
  /********** EACH **********/
  var eachLoop = function eachLoop() {
    _.nf.each(window, function(index, el) {
      $("#windowEach").text(index);
    });
  }
  
  $("#each").click(eachLoop);
  
  /********** ALL PROCESSES **********/
  $("#startAll").click(function() {
    $("#infinite, #nonFreezingFor, #each").click();
  });
  
  $("#stopAll").click(function() {
    jsKata.nofreeze.stop();
  });
});

