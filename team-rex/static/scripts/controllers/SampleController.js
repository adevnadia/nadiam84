'use strict';

app.controller('SampleController', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.toggleError = false;

    $scope.ui = {};
    $scope.ui.search = "";

    $scope.ui.openPopup = false;
    $scope.ui.closePopupAnimation = false;

    $scope.closePopup = function () {
        $scope.ui.closePopupAnimation = true;
        $timeout(function () {
            $scope.ui.closePopupAnimation = false;
            $scope.ui.openPopup = false;
            $scope.ui.searchTeamMate = "";
            $('body').css('overflow', 'auto');

            for (var i = 0; i < $scope.model.team.length; i++) {
                $scope.model.team[i].justAdded = false;
                $scope.model.team[i].isChosen = false;
            }

            setRandom();
        }, 800);
    };

    $scope.openPopup = function () {
        $scope.ui.openPopup = true;
        $scope.ui.searchTeamMate = "";
        $scope.model.team = [].concat($scope.model.savedTeam);

        stopRandom();
        $('body').css('overflow', 'hidden');
    };

    $scope.chooseMate = function (id) {
        var mate = findById(id);
        if (mate) {
            mate.isChosen = true;
            mate.justAdded = true;
            if (mate.email) {
                emailCount++;
            }
            if (mate.pending) {
                mate.pending = false;
                mate.rePending = true;
            } else {
                addMateToTheTeam(mate);
            }
        }
    };

    $scope.destroyMate = function (id) {
        var mate = findById(id);
        if (mate && mate.justAdded && !mate.rePending) {
            mate.isChosen = false;
            mate.justAdded = false;
            removeMateFromTheTeam(mate);
        }
    };

    $scope.toggleMate = function (mate) {
        if (mate.isChosen) {
            $scope.destroyMate(mate.id);
        } else {
            $scope.chooseMate(mate.id)
        }
    };

    $scope.saveTeamMates = function () {
        $scope.model.savedTeam = [].concat($scope.model.team);
        for (var i = 0; i < $scope.model.savedTeam.length; i++) {
            if ($scope.model.savedTeam[i].justAdded) {
                $scope.model.savedTeam[i].pending = true;
            }
            $scope.model.savedTeam[i].justAdded = false;
        }
        $scope.closePopup();
    };

    $scope.model = {};

    $scope.model.people = [
        {id: 1, name: "Alex Riegelman", team: "Senior UX Designer", photo: "static/images/avatars/alex.png"},
        {id: 2, name: "Zaki Salleh", team: "UX Designer", photo: "static/images/avatars/zaki.png"},
        {id: 3, name: "Jurgen Spangl", team: "Head of things and stuff", photo: "static/images/avatars/jurgen.png"},
        {id: 3, name: "Becc Roach", team: "Senior UX Designer", photo: "static/images/avatars/becc.jpg"},
        {id: 4, name: "Andrew McKay", team: "Designer", photo: "static/images/avatars/andrew.jpeg"},
        {id: 5, name: "Becky Todd", team: "Senior Technical Writer", photo: "static/images/avatars/becky.png"},
        {id: 6, name: "Dave Meyer", team: "Product Manager", photo: "static/images/avatars/dave.jpg"},
        {id: 7, name: "James Cooke", team: "JIRA SW Design Team Lead", photo: "static/images/avatars/jamesC.jpg"},
        {id: 8, name: "James Rotanson", team: "Grad Designer", photo: "static/images/avatars/jamesR.jpg"},
        {id: 9, name: "James Navin", team: "Senior Developer", photo: "static/images/avatars/jamesN.jpg"},
        {id: 10, name: "James Bryant", team: "Senior Designer for JIRA Software", photo: "static/images/avatars/jamesB.png"},
        {id: 11, name: "James Richards", team: "Senior Support Engineer", photo: "static/images/avatars/jamesR1.png"},
        {id: 12, name: "James Russell", team: "Developer", photo: "static/images/avatars/jamesR2.png"},
        {id: 13, name: "Ben Crothers", team: "Fabulous", photo: "static/images/avatars/ben.png"},
        {id: 14, name: "Daniel Franz", team: "Principal Product Manager", photo: "static/images/avatars/daniel.png"},
        {id: 15, name: "Christopher Nortje", team: "Development Team Lead", photo: "static/images/avatars/christopher.png"},
        {id: 16, name: "Brett Flower", team: "Design team lead (JIRA Platform/Core)", photo: "static/images/avatars/brett.png"},
        {id: 17, name: "Warren Thompson", team: "Technical something something", photo: "static/images/avatars/warren.JPG"},
        {id: 18, name: "Jaiden Ashmore", team: "Developer", photo: "static/images/avatars/jaiden.jpg"},
        {id: 19, name: "Daniel Kerris", team: "Design Enthusiast", photo: "static/images/avatars/danielK.jpg"},
        {
            id: 20,
            name: "Georgie Bottomly",
            team: "JIRA UX Research, Level 8/ 341 George St",
            photo: "static/images/avatars/georgie.jpg"
        }
    ];

    $scope.model.team = [];

    $scope.model.savedTeam = [];

    var emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    $scope.$watch('ui.searchTeamMate', function (val) {
        if (val && emailRegexp.test(val)) {
            addEmailToTheTeam(val);
        }
    });

    var emailCount = 0;

    function addEmailToTheTeam(email) {
        var team = $scope.model.people;
        var emailinteam = findCurEmail(emailCount, team);

        if (!emailinteam) {
            team.push({id: 'email_id_' + emailCount, email: email, photo: "static/images/email1.png"});
        } else {
            emailinteam["email"] = email;
        }
    }

    function findCurEmail(emailCount, team) {
        for (var i = 0; i < team.length; i++) {
            if (team[i].id == 'email_id_' + emailCount) {
                return team[i];
            }
        }

        return undefined;
    }

    function findById(id) {
        for (var i = 0; i < $scope.model.people.length; i++) {
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
        for (var i = 0; i < $scope.model.team.length; i++) {
            if ($scope.model.team[i].id == mate.id) {
                $scope.model.team.splice(i, 1);
                return;
            }
        }
    }

    var interval;

    function setRandom() {
        if (!interval) {
            interval = setInterval(function () {
                for (var i = 0; i < $scope.model.savedTeam.length; i++) {
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
        interval = undefined;
    }

}]);
