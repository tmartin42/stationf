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

  $('.menu a').removeClass('active');
  $('.menu a[href="#!/view1"]').addClass('active');

  $http.get('/data/rooms.json').success(function(data) {
      $scope.rooms = data.rooms;

  });

    $scope.modalInit = function (index) {
        $scope.selected = $scope.rooms[index];
    };



    $scope.greaterThan = function(prop, val){
        return function(item){
            return Number(item[prop]) >= Number(val);
        }
    };

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
    };
    $('#datetimepicker1').datetimepicker({
        format: 'YYYY-MM-DD HH:mm',
        stepping: 30,
        minDate: moment()
    });


    $scope.checkbox = function(model){
        if ($scope[model])
            $scope[model] = false;
        else
            $scope[model] = true;
    };


    $scope.submitBooking = function() {

        var data = $('#date').val();
        console.log("Rdv le: ", data);


    $scope.error = function () {
        $('.message').removeClass('above');
        setTimeout(function () {
            $('.message').addClass('error');
        }, 100);
        setTimeout(function () {
            $('.error').removeClass('error').addClass('above');
        }, 3100);
    };

    $scope.success = function() {
        $('.message').removeClass('above')
        setTimeout(function () {
            $('.message').addClass('success');
        }, 100);
        setTimeout(function () {
            $('.success').removeClass('success').addClass('above');
        }, 3100);
    };

        $('#exampleModal').modal('hide');

        if (moment(data).isValid()) {

            if (moment(data).isBefore(moment())) {
                $scope.message = "Bien essaye ! Mais non tu ne peux pas etre dans le passe";
                $('.logo').addClass('outatime');
                $scope.error();
            } else {
                //normalement ajax ici avec ceci dans le cas de succes. il faut penser au cas ou l'AJAX renvoie une erreur

                $scope.message = "Prise de rendez-vous reussie ! Elle sera le " + moment(data).format("DD/MM/YYYY[ a ]HH[h]mm").toString();
                $scope.success();
            }

        } else {
            $scope.message = "Erreur: Date invalide";
            $scope.error();
        }

    };
    $scope.rev = false;
    $scope.order = 'name';
    $scope.selectval = 'az';
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
        }
    }

}]);