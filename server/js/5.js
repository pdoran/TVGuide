var dataReady = function() {
	var selectedShow = shows[0];

	var seasonView = function(selectedShow) {
		var self = this;
		var _selectedSeason = ko.observable();
		
		self.selectedShow = selectedShow;

		self.navLabel = "Seasons";
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

	var episodeView = function(show) {
		var self = this;

		self.navLabel = "Episodes";
	};

	var actorView = function(show) {
		var self = this;

		self.navLabel = "Actors";

	};

	var viewModelObject = function(shows) {
		var self = this;

		//observables
		self.shows = ko.observableArray(shows);
		self.selectedShow = ko.observable(shows[0]);
		self.views = ko.observableArray([
			new seasonView(self.selectedShow),
			new episodeView(self.selectedShow),
			new actorView(self.selectedShow)
		]);
		
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
