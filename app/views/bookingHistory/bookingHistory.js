'use strict';

angular.module('myApp.bookingHistory', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/bookingHistory', {
    templateUrl: '/views/bookingHistory/bookingHistory.html',
    controller: 'BookingHistoryCtrl'
  });
}])

.controller('BookingHistoryCtrl', ['$scope', '$http', function($scope, $http) {

    $('.modal-backdrop').remove();
    $http.get('/data/bookings.json').success(function(data) {
        $scope.rooms = data.rooms;
    });

    $('.menu a').removeClass('active');
    $('.menu a[href="#!/bookingHistory"]').addClass('active');

    $('#datetimepicker1').datetimepicker({
        format: 'YYYY-MM-DD',
        stepping: 30
    });

    $('#datetimepicker1').on('change.datetimepicker',function(){
        $scope.date = $('#date').val();
        $('#date').trigger('input');
        $scope.$apply();
    });

    $scope.datefilter = function(from, to, val){
        return function(item){
            if (val == undefined || !moment(val).isValid()) {
                return true;
            }
            if (!moment(item[from]).isValid() || !moment(item[to]).isValid()) {
                return false;
            }
            return moment(val).isBetween(moment(item[from]), moment(item[to]),'day', '[]');
        }
    };

    $scope.rev = false;
    $scope.order = 'booked';
    $scope.changeOrder= function (val) {
        if (val == 'az'){
            $scope.rev = false;
            $scope.order = "name";
        } else if (val == 'za'){
            $scope.rev = true;
            $scope.order = "name";
        } else if (val == 'pu'){
            $scope.rev = false;
            $scope.order = "capacity";
        } else if (val == 'pd'){
            $scope.rev = true;
            $scope.order = "capacity";
        } else if (val == 'du'){
            $scope.rev = false;
            $scope.order = "booked";
        } else if (val == 'dd'){
            $scope.rev = true;
            $scope.order = "booked";
        }
    };

    $scope.openSearch = function () {
        $('.row.form-inline, .rooms').toggleClass('opened');
    };
}]);