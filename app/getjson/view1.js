'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', function($scope, $http) {
  var obj = {content:null};

  $http.get('data/rooms.json').success(function(data) {
    // you can do some processing here
    obj.content = data;
   // console.log(data);
  });

    $scope.showData = function() {
      console.log(obj);
    }

    $scope.modalInit = function (index) {
      $scope.selected = obj

    }
}]);