var User = function() {
	this.favoriteCount = 0;
};

var Show = function(name) {

	var url = "/json/"+name.toLowerCase().replace(/ /g,"-")+".json";
	var self = this;
	self.name = name;
	self.nameURLNormalized = name.toLowerCase().replace(/ /g,"-");
	self.seasons = new Array();
	self.actors = new Array();
	self.data = null;
	fetchJson(url, function(show){
		self.data = show;
		for(var i=1;i<=show.seasons;i++) {
			self.seasons.push(new Season(self.nameURLNormalized,i));
		}
		show.people.actors.forEach(function(actor){
			self.actors.push(new Actor(actor));
		})
	});
};

var Actor = function(obj) {
	var self = this;
	self.data = obj;
	console.log(obj);
}

var Season = function(showUrlName,seasonNum) {
	var url = "/json/"+showUrlName+"/seasons/"+seasonNum+".json";
	var self = this;
	self.episodes = new Array();
	self.data = null;
	fetchJson(url, function(season) {
		self.data = season;
		season.forEach(function(episode) {
			self.episodes.push(new Episode(episode));
		});
	});
}

var Episode = function(obj) {
	var self = this;
	self.data = obj;
}

var fetchJson = function(url, cb) {
	jQuery.getJSON(url, cb);
};