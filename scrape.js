var request = require('request');
var fs = require('fs');
var nfs = require('node-fs');

if(process.argv.length<3) throw new Error("Must provide an api key as a command line argument");
var apiKey = process.argv[2].toString();

var getShowSummary = function(showName) {
  request({
      url:"http://api.trakt.tv/show/summary.json/"+apiKey+"/"+showName,
      json:true},function(err,resp,body) {
        request(body.poster).pipe(fs.createWriteStream("./server/img/posters/"+showName+".jpg"));
      });
}
var getSeason = function(showName, season) {
  nfs.mkdir("./server/json/"+showName+"/seasons/", 0777, true, function(err){
    if(err) console.log(err);
    request("http://api.trakt.tv/show/season.json/"+apiKey+"/"+showName+"/"+season).pipe(fs.createWriteStream("./server/json/"+showName+"/seasons/"+season+".json"));
  });
}
var getSeasons = function(showName) {
  request({
      url:"http://api.trakt.tv/show/seasons.json/"+apiKey+"/"+showName,
      json:true},
      function(err,resp, body){
        body.forEach(function(season){
          getSeason(showName, season.season);
          request(season.images.poster).pipe(fs.createWriteStream("./server/img/posters/"+showName+"-"+season.season+".jpg"));
        });
    });
}


var shows = [
"the-walking-dead",
"breaking-bad",
"mad-men",
"true-blood"
];
shows.forEach( function(show){
 getSeasons(show);
 getShowSummary(show);
});
