'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', function($scope, $http) {


  $scope.rooms = null;
  $scope.places = '';
  $scope.tv = false;
  $scope.proj = false;

  $http.get('/data/rooms.json').success(function(data) {
    // you can do some processing here
      $scope.rooms = data.rooms;
   // console.log(data);

  });

    $scope.modalInit = function (index) {
        $scope.selected = $scope.rooms[index];

    }


    $scope.clear = function(model){

    };

    $scope.greaterThan = function(prop, val){
        return function(item){
            return Number(item[prop]) >= Number(val);
        }
    }

    $scope.equfilter = function(){
        return function (rooms) {
            if (!$scope.tv && !$scope.proj)
                return rooms;
            var i;
            var len;
            var ret = [];
           // console.log(rooms);
                var ok = true;
                console.log($scope.tv);
                console.log((rooms.equipements.length > 0 && rooms.equipements[0].name != 'TV'))
            console.log((rooms.equipements.length > 1 && rooms.equipements[1].name != "TV"))

                if ($scope.tv &&  (rooms.equipements.length == 0 || (rooms.equipements.length == 1 && rooms.equipements[0].name != 'TV') || (rooms.equipements.length > 1 && rooms.equipements[0].name != 'TV' && rooms.equipements[1].name != "TV")))
                    ok = false;
                if ($scope.proj && (rooms.equipements.length == 0 || (rooms.equipements.length == 1 && rooms.equipements[0].name != 'Retro Projecteur') || (rooms.equipements.length > 1 && rooms.equipements[0].name != 'Retro Projecteur' && rooms.equipements[1].name != "Retro Projecteur")))
                    ok = false;
           console.log('-----')
            return ok;
        }
    };

    $scope.showData = function() {
      console.log($scope.rooms);
    }
    $('#datetimepicker1').datetimepicker({
        format: 'DD:MM:YYYY HH:mm',
        stepping: 30,
        minDate: moment()
    });

    $scope.test = function(model){
        if ($scope[model])
            $scope[model] = false;
        else
            $scope[model] = true;
    };


}])