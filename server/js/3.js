var dataReady = function() {
	var selectedShow = shows[0];

	var viewModel = {
		shows: ko.observableArray(shows),
		genres: ko.observableArray([]),
		title: ko.observable(selectedShow.title),
		network: ko.observable(selectedShow.network),
		rating: ko.observable(selectedShow.rating),
		description: ko.observable(selectedShow.description),
		posterUrl: ko.observable(selectedShow.posterUrl),
		selectShow: function(show) {
			//we have to go through each option and set it based on the show data
		}
	}

	// var viewModel = {
	// 	shows: ko.observableArray(shows),
	// 	genres: ko.observableArray([]),
	// 	selectedShow: ko.observable(shows[1]),
	// 	selectShow: function(show) {
	// 		viewModel.selectedShow(show)
	// 	}
	// }

	// var viewModelObject = function(shows) {
	// 	var self = this;
	// 	self.shows = ko.observableArray(shows);
	// 	self.genres = ko.observableArray([]);
	// 	self.selectedShow = ko.observable(shows[0]);
	// 	self.selectShow = function(show) {
	// 		self.selectedShow(show)
	// 	};
	// };

	// var viewModel = new viewModelObject(shows);

	ko.applyBindings(viewModel);
};
