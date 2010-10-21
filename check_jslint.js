var sys = require("sys");
var fs = require("fs");
var cp = require('child_process');

var path = fs.realpathSync("./src/");

fs.readdir(fs.realpathSync("./src/"), function(err, files) {
  for (var i = 0; i < files.length; i++) {
    var filename = files[i];
    var complete = path + filename;

    // Run jslint on each file
    var jslint = cp.exec("jslint " + complete, function(error, stdout, stderr) {
      if (error) {
        console.log(filename + " : " + error);
      }
    });    
  }
});

