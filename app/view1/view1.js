'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', function($scope, $http) {
  $scope.lol = 'lol';
  $scope.rooms = {rooms:null};

  $http.get('/data/rooms.json').success(function(data) {
    // you can do some processing here
    $scope.rooms = data.rooms;
   // console.log(data);
  });

    $scope.modalInit = function (index) {
        $scope.selected = $scope.rooms[index];

    }

    $scope.showData = function() {
      console.log($scope.rooms);
    }
}]);