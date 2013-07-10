var request = require('request');
var fs = require('fs');

var apiKey = "ec989300f0953fd4abcf015b6c318627";

var getShowSummary = function(showName) {
	request("http://api.trakt.tv/show/summary.json/"+apiKey+"/"+showName).pipe(fs.createWriteStream("./server/json/"+showName+".json"));	
}
var getSeason = function(showName, season) {
  fs.mkdir("./server/json/"+showName+"/seasons/", function(err){
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
});