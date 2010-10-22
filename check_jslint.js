var sys = require("sys");
var fs = require("fs");
var cp = require('child_process');

var path = fs.realpathSync("./src/");

var inError = false;

fs.readdir(fs.realpathSync("./src/"), function(err, files) {
  for (var i = 0; i < files.length; i++) {
    var filename = files[i];
    var complete = path + filename;
    
    (function(file) {
      // Run jslint on each file
      var jslint = cp.exec("jslint " + file, function(error, stdout, stderr) {
        if (error) {
          inError = true;
          console.log(file + " : " + error);
        }
      }); 
    })(complete);   
  }
});
