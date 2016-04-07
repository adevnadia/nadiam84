'use strict';

app.controller('SampleController', ['$scope', '$timeout', function ($scope, $timeout) {
	$scope.test = "dw 2016 start!!!";

	$scope.toggleError = false;

	$scope.ui = {};
	$scope.ui.search="";

	$scope.ui.openPopup = false;

	$scope.closePopup = function () {
		$scope.ui.openPopup = false;
		$scope.ui.searchTeamMate = "";
		$('body').css('overflow', 'auto');

		$timeout(function() {
			setRandom();
		}, 400)
	};

	$scope.openPopup = function() {
		$scope.ui.openPopup = true;
		$scope.ui.searchTeamMate = "";
		$scope.model.team = [].concat($scope.model.savedTeam);
		for (var i=0; i<$scope.model.team.length; i++) {
			$scope.model.team[i].justAdded = false;
		}
		stopRandom();
		$('body').css('overflow', 'hidden');
	};

	$scope.chooseMate = function(id) {
		var mate = findById(id);
		if (mate) {
		   mate.isChosen = true;
		   mate.justAdded = true;
		   addMateToTheTeam(mate);
		}
	};

	$scope.destroyMate = function(id) {
		var mate = findById(id);
		if (mate && mate.justAdded) {
			mate.isChosen = false;
			mate.justAdded = false;
			removeMateFromTheTeam(mate);
		}
	};

	$scope.toggleMate = function(mate) {
	  if (mate.isChosen) {
	  	  $scope.destroyMate(mate.id);
	  } else {
		  $scope.chooseMate(mate.id)
	  }
	};

	$scope.saveTeamMates = function() {
		$scope.model.savedTeam = [].concat($scope.model.team);
		for (var i=0; i<$scope.model.savedTeam.length;i++) {
			if ($scope.model.savedTeam[i].justAdded) {
				$scope.model.savedTeam[i].pending = true;
			}
			$scope.model.savedTeam[i].justAdded = false;
		}
		$scope.closePopup();
	};

	$scope.model = {};

	$scope.model.people = [
		{id: 1, name: "Matt", team: "AUI", photo: "static/images/Alana.png"},
		{id: 2, name: "Jake", team: "JIRA", photo: "static/images/Cassie.png"},
		{id: 3, name: "Felix", team: "Bitbucket", photo: "static/images/Alana.png"},
		{id: 4, name: "Nadia", team: "Bitbucket", photo: "static/images/Emma.png"},
		{id: 5, name: "Lucy", team: "Bitbucket", photo: "static/images/Harvey.png"},
		{id: 6, name: "Helena", team: "AUI", photo: "static/images/jennifer.jpg"},
		{id: 7, name: "Bekky", team: "JIRA", photo: "static/images/Alana.png"},
		{id: 8, name: "Solomon", team: "JIRA", photo: "static/images/kevin.jpg"},
		{id: 9, name: "Stiven", team: "JIRA", photo: "static/images/max.png"},
		{id: 10, name: "Rex", team: "AUI", photo: "static/images/mitch.jpg"},
		{id: 11, name: "Matt1", team: "AUI", photo: "static/images/ryan.png"},
		{id: 12, name: "Jake1", team: "JIRA", photo: "static/images/Will.png"},
		{id: 13, name: "Felix1", team: "Bitbucket", photo: "static/images/Cassie.png"},
		{id: 14, name: "Nadia1", team: "Bitbucket", photo: "static/images/Will.png"},
		{id: 15, name: "Lucy1", team: "Bitbucket", photo: "static/images/kevin.jpg"},
		{id: 16, name: "Helena1", team: "AUI", photo: "static/images/ryan.png"},
		{id: 17, name: "Bekky1", team: "JIRA", photo: "static/images/Alana.png"},
		{id: 18, name: "Solomon1", team: "JIRA", photo: "static/images/Harvey.png"},
		{id: 19, name: "Stiven1", team: "JIRA", photo: "static/images/Emma.png"},
		{id: 20, name: "Re1x", team: "AUI", photo: "static/images/kevin.jpg"}
	];

	$scope.model.team = [];

	$scope.model.savedTeam = [];

	/*$scope.chooseMate(1);
	$scope.chooseMate(5);
	$scope.chooseMate(6);
	$scope.saveTeamMates();

	for (var i=0; i<$scope.model.savedTeam.length; i++) {
		$scope.model.savedTeam[i].pending = false;
	}

	for (var i=0; i<$scope.model.team.length; i++) {
		$scope.model.savedTeam[i].justAdded = false;
	}*/

	function findById(id) {
	  for (var i=0; i<$scope.model.people.length; i++) {
	  	if ($scope.model.people[i].id == id) {
	  		return $scope.model.people[i];
		}
	  }

	  return undefined;
	}

	function addMateToTheTeam(mate) {
		$scope.model.team.push(mate);
	}

	function removeMateFromTheTeam(mate) {
		for (var i=0; i<$scope.model.team.length; i++) {
		    if ($scope.model.team[i].id == mate.id) {
				$scope.model.team.splice(i, 1);
				return;
			}
		}
	}

	var interval;

	function setRandom() {
		if (!interval) {
			interval = setInterval(function() {
				for (var i=0; i<$scope.model.savedTeam.length; i++) {
					if ($scope.model.savedTeam[i].pending) {
						$scope.model.savedTeam[i].pending = false;
						$scope.$apply();
						break;
					}
				}

			}, 2000);
		}
	}

	function stopRandom() {
		clearInterval(interval);
	}

}]);
