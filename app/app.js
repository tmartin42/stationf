'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
    'ngRoute',
    'myApp.booking',
    'myApp.bookingHistory'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/booking'});

}]).controller('appController', ['$scope', function($scope) {

    $scope.transition = function(){
        $('.menu').addClass('minimized');
        $('.menu #thebutton').addClass('dispnoneimp');
    }

}]);