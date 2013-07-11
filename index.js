/*global module:false,require:false,console:false */
var webroot = "./server";
var port = 8000;
var assetTypes = [".js", ".css", ".txt", ".ico", ".html", ".png",".jpg",".json"];

var nodeStatic = require("node-static");
var http = require("http");
var util = require("util");

function isStaticResource(url) {
  return assetTypes.reduce(function(memo, assetType) {
    return memo || url.indexOf(assetType) !== -1;
  }, false);
}

module.exports.startServer = function() {
  var file = new(nodeStatic.Server)(webroot, {
    cache: 0
  });

  http.createServer(function(req, res) {
  	req.on('data', function() {});
    req.addListener("end", function() {
      if (!isStaticResource(req.url)) {
        req.url = "/index.html";
      }

      file.serve(req, res, function(err, result) {
        if (err) {
          console.error("Error serving %s - %s", req.url, err.message);
          res.writeHead(err.status, err.headers);
          res.end();
        }
      });
    });
  }).listen(port);

  console.log("Development server running at http://localhost:%d", port);
};

module.exports.startServer();

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(chunk) {
  checkCommands(chunk);
});

var currentItem = 1;

var checkCommands = function(chunk) {
  var args = chunk.split(" ");
  console.log(args);
  switch(args[0].replace("\r\n","")) {
    case "clone":
      clone(args);
      break;
    case "next":
      next(args);
      break;
    default:
      process.stdout.write('Cannot find command for: ' + chunk);
      break;
    }
};

var clone = function(args) {

}
var next = function(args) {
  if(args.length>1) {
    currentItem = parseInt(args[1],10);
  } else {
    currentItem++;  
  }
  console.log("Moving to item " + currentItem);
}

process.stdin.on('end', function() {
  process.stdout.write('end');
});