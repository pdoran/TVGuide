
var Show = function(name, cb) {

	var url = "/json/"+name.toLowerCase().replace(/ /g,"-")+".json";
	var self = this;
	self.name = name;
	self.nameURLNormalized = name.toLowerCase().replace(/ /g,"-");
	self.seasons = new Array();
	self.actors = new Array();
	self.data = null;
	fetchJson(url, function(show){
		self.data = show;
		self.title = show.title;
		self.network = show.network;
		self.rating = show.certification;
		self.description = show.overview;
		self.posterUrl = "/img/posters/"+self.nameURLNormalized+".jpg";
		var cbs = 0;
		var maxCB = show.seasons;
		var dataCB = function() {
			cbs++;
			if(cbs==maxCB) {
				cb(name);
			}
		}
		for(var i=1;i<=show.seasons;i++) {
			self.seasons.push(new Season(self.name,i, dataCB));
		}
		show.people.actors.forEach(function(actor){
			self.actors.push(new Actor(actor));
		})
	});
	self.toString = function() {
		return self.name;
	}
};

var Actor = function(obj) {
	var self = this;
	self.data = obj;
	self.toString = function() {
		return self.data.character + " (" + self.data.name + ")";
	}
}

var Season = function(show,seasonNum, cb) {
	var showUrlName = show.toLowerCase().replace(/ /g,"-");
	var url = "/json/"+showUrlName+"/seasons/"+seasonNum+".json";
	var self = this;
	self.episodes = new Array();
	self.data = null;
	self.seasonName = "Season " + seasonNum;
	fetchJson(url, function(season) {
		self.data = season;
		self.posterUrl = "/img/posters/"+showUrlName+"-"+seasonNum+".jpg";
		season.forEach(function(episode) {
			self.episodes.push(new Episode(episode, show));
		});
		cb();
	});
}

var Episode = function(obj, show) {
	var self = this;
	self.data = obj;
	self.show = show;
	self.toString = function() {
		return self.show + " S"+self.data.season+"E"+self.data.episode+": "+self.data.title;
	}
}

var fetchJson = function(url, cb) {
	jQuery.getJSON(url, cb);
};