'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$http', function($scope, $http) {

    $http.get('/data/bookings.json').success(function(data) {
        $scope.rooms = data.rooms;

    });

    $('#datetimepicker1').datetimepicker({
        format: 'YYYY-MM-DD',
        stepping: 30
    });


    $('#datetimepicker1').on('change.datetimepicker',function(){
        $scope.date = $('#date').val();
        $('#date').trigger('input');
        $scope.$apply();
    })

    $scope.datefilter = function(prop, val){

        return function(item){
            if (val == undefined || !moment(val).isValid())
                return true;
            return moment(item[prop]).isSame(val, 'day');
        }
    };
}]);