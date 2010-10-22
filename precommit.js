var sys = require("sys");
var fs = require("fs");

function for_each_js(callback) {
  var path = fs.realpathSync("./src/");
  var files = fs.readdirSync(fs.realpathSync("./src/"));

  for (var i = 0; i < files.length; i++) {
    var filename = files[i];
    var complete = path + filename;
    callback(complete);
  }
}

// Compress with google compiler
function compress(file) {
  var rest = require("./vendor/restler/lib/restler");

  var http = require('http');
  var google = http.createClient(80, 'http://closure-compiler.appspot.com/compile');
  
  // 
  var code = fs.readFileSync(file).toString();

  var params = {"js_code" : code, 
    "compilation_level" : "SIMPLE_OPTIMIZATIONS", 
    "output_format" : "text",
    "output_info" : "compiled_code"
  };
  
  rest.post("http://closure-compiler.appspot.com/compile", {data : params})
    .addListener('complete', function(data) {
      var filename = file.match(/[^/]+$/i)[0];
      filename = filename.replace(/\.js$/i, ".min.js");
      var path = fs.realpathSync("./minified/");
      fs.writeFileSync(path + "/" + filename, data);
    });
}

function jslint(file) {
  var cp = require('child_process');
  
  // Run jslint on each file
  var jslint = cp.exec("jslint " + file, function(error, stdout, stderr) {
    if (error) {
      sys.puts(file + " : " + error);
    }
  });
}

for_each_js(jslint);
for_each_js(compress);

