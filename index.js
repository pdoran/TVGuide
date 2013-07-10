var request = require('request');

var fs = require('fs');
var wd = require('./walkingdead.json');
console.log(wd.title);
var apiKey = "ec989300f0953fd4abcf015b6c318627";

var getShowSummary = function(showName) {
	request("http://api.trakt.tv/show/summary.json/"+apiKey+"/"+showName).pipe(fs.createWriteStream(showName+".json"));	
}

var shows = [
"the-walking-dead",
"breaking-bad",
"mad-men",
"true-blood"
];

shows.forEach( function(show){
	getShowSummary(show);
});
// request("http://api.trakt.tv/show/summary.json/ec989300f0953fd4abcf015b6c318627/the-walking-dead").pipe(fs.createWriteStream("walkingdead.json"));