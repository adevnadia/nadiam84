'use strict';

var app = angular.module('BasicApp', [
	'ngRoute'
])
	.config(['$routeProvider', function ($routeProvider) {

		$routeProvider.
			when('/', {
				templateUrl: 'views/templates/views/dw16index.html',
				controller: 'SampleController'
			}).
			otherwise({
				redirectTo: '/'
			});

	}]);

app.log = function(o) {
	console.log(o);
};

app.filter('reverse', function() {
	return function(items) {
		return items.slice().reverse();
	};
});