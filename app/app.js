'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/view1'});
}]).controller('appController', ['$scope', function($scope) {

    $scope.transition = function(){
        $('.menu').addClass('minimized');
        $('.menu .btn').addClass('dispnoneimp');
    }
}]);