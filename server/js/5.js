var dataReady = function() {
	var selectedShow = shows[0];

	var seasonView = function(root) {
		var self = this;
		
		self.root = root;
		self.selectedShow = root.selectedShow;
		self.selectedSeason = root.selectedSeason;
		self.seasons = root.seasons;

		self.navLabel = "Seasons";
		
		self.episodes = ko.computed(function() {
			var season = this.selectedSeason();
			var episodes = [];
			if(season!==null && typeof season !== "undefined") {
				episodes = season;
			}
			return episodes;
		}, self);

		self.selectSeason = function(season) {
			self.selectedSeason(season);
		}

	};

	var episodeView = function(root) {
		var self = this;
		var _selectedEpisode = ko.observable();

		self.navLabel = "Episodes";
		self.root = root;
		self.selectedShow = root.selectedShow;
		self.selectedSeason = root.selectedSeason;
		self.seasons = root.seasons;

		self.episodes = ko.computed(function() {
			var season = this.selectedSeason();
			var episodes = [];
			if(season!==null && typeof season !== "undefined") {
				episodes = season.episodes;
			}
			return episodes;
		}, self);

		self.selectedEpisode = ko.computed({
			read: function() {
				if(this.episodes().indexOf(_selectedEpisode())!==-1) {
					return _selectedEpisode();
				}
				return null;
			},
			write: function(value) {
				_selectedEpisode(value);
			},
			owner: self
		});

		self.selectEpisode = function(episode) {
			self.selectedEpisode(episode);
		}

	};

	var actorView = function(root) {
		var self = this;
		var _selectedActor = ko.observable();
		self.navLabel = "Characters";
		self.root = root;
		self.selectedShow = root.selectedShow;

		self.actors = ko.computed(function() {
			var show = this.selectedShow();
			var actors = [];
			if(show!==null && typeof show !== "undefined") {
				actors = show.actors;
			}
			return actors;
		}, self);

		self.selectedActor = ko.computed({
			read: function() {
				if(this.actors().indexOf(_selectedActor())!==-1) {
					return _selectedActor();
				}
				return null;
			},
			write: function(value) {
				_selectedActor(value);
			},
			owner: self
		});

		self.selectActor = function(actor) {
			self.selectedActor(actor);
		}
	};

	var viewModelObject = function(shows) {
		var self = this;

		//observables
		var _selectedSeason = ko.observable();
		self.shows = ko.observableArray(shows);
		self.selectedShow = ko.observable(shows[0]);
		self.selectedSeason = ko.observable();

		//computeds
		self.genres = ko.computed(function() {
			var shows = this.shows();
			var genres = [];
			shows.forEach(function(show) {
				show.data.genres.forEach(function(genre) {
					if(genres.indexOf(genre)==-1) {
						genres.push(genre);
					}
				});
			});
			return genres.sort();
		}, self);

		self.seasons = ko.computed(function() {
			var show = this.selectedShow();
			var seasons = [];
			if(show!==null && typeof show !== "undefined") {
				seasons = show.seasons;
			} 
			return seasons;
		}, self);

		self.selectedSeason = ko.computed({
			read: function() {
				if(this.seasons().indexOf(_selectedSeason())!==-1) {
					return _selectedSeason();
				}
				return null;
			},
			write: function(value) {
				_selectedSeason(value);
			},
			owner: self
		});

		self.views = ko.observableArray([
			new seasonView(self),
			new episodeView(self),
			new actorView(self)
		]);

		self.selectedView = ko.observable()

		self.selectView = function(view) {
			if(view!==self.selectedView()) {
				self.selectedView(view);	
			}
		}

		//click handlers
		self.selectShow = function(show) {
			self.selectedShow(show);
			self.selectedSeason(null);
		};
		self.removeShow = function(show) {
			self.shows.remove(show);
			self.selectedShow(null);
		}

	};

	var viewModel = new viewModelObject(shows);

	ko.applyBindings(viewModel);
};
