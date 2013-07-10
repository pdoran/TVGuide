/*global module:false,require:false,console:false */
var webroot = "./server";
var port = 8000;
var assetTypes = [".js", ".css", ".txt", ".ico", ".html", ".png",".jpg"];

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
    	console.log(req.url);
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