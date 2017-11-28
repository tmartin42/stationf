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

                var ok = true;
                if ($scope.tv &&  (rooms.equipements.length == 0 || (rooms.equipements.length == 1 && rooms.equipements[0].name != 'TV') || (rooms.equipements.length > 1 && rooms.equipements[0].name != 'TV' && rooms.equipements[1].name != "TV")))
                    ok = false;
                if ($scope.proj && (rooms.equipements.length == 0 || (rooms.equipements.length == 1 && rooms.equipements[0].name != 'Retro Projecteur') || (rooms.equipements.length > 1 && rooms.equipements[0].name != 'Retro Projecteur' && rooms.equipements[1].name != "Retro Projecteur")))
                    ok = false;
            return ok;
        }
    };

    $scope.showData = function() {
      console.log($scope.rooms);
    }
    $('#datetimepicker1').datetimepicker({
        format: 'YYYY-MM-DD HH:mm',
        stepping: 30,
        minDate: moment()
    });/*
    $('#datetimepicker1').on('change.datetimepicker',function(){
        $('#date').trigger('input');
    })*/

    $scope.checkbox = function(model){
        if ($scope[model])
            $scope[model] = false;
        else
            $scope[model] = true;
    };

    $scope.test = function(model){
        $scope.message = "Prise de rendez-vous reussie ! <br/> Elle sera lerfgdssd fgdsfgdsfgdfsgsdg " ;
        $('.message').removeClass('above')
        setTimeout(function () {
            $('.message').addClass('success');
        }, 100);
        setTimeout(function () {
            $('.success').removeClass('success').addClass('above');
        }, 3100);
    };
    $scope.testt = function(){
        $scope.message = "Erreur: Date invalide";
        $('.message').removeClass('above');
        setTimeout(function () {
            $('.message').addClass('error');
        }, 100);
        setTimeout(function () {
            $('.error').removeClass('error').addClass('above');
        }, 3100);
    };
    $scope.$watch('datepicker'), function(newVal, oldVal, scope){
        if(newVal != oldVal){
            scope.datepicker = newVal;
        }
    };
    $scope.submitBooking = function() {

        var data = $('#date').val();
        console.log("Rdv le: ", data);
        $('#exampleModal').modal('hide');

        if (moment(data).isValid()) {
            $scope.message = "Prise de rendez-vous reussie ! Elle sera le " + moment(data).format("DD/MM/YYYY[ a ]HH[h]mm").toString();
            $('.message').removeClass('above')
            setTimeout(function () {
                $('.message').addClass('success');
            }, 100);
            setTimeout(function () {
                $('.success').removeClass('success').addClass('above');
            }, 3100);
        } else {
            $scope.message = "Erreur: Date invalide";
            $('.message').removeClass('above');
            setTimeout(function () {
                $('.message').addClass('error');
            }, 100);
            setTimeout(function () {
                $('.error').removeClass('error').addClass('above');
            }, 3100);
        }

    };


}]);