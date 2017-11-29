'use strict';

angular.module('myApp.booking', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/booking', {
    templateUrl: '/views/booking/booking.html',
    controller: 'BookingCtrl'
  });
}])

.controller('BookingCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.rooms = null;
    $scope.places = '';
    $scope.tv = false;
    $scope.proj = false;
    $scope.why = '';
    $scope.login = '';

    $('.menu a').removeClass('active');
    $('.menu a[href="#!/booking"]').addClass('active');

    $http.get('/data/rooms.json').success(function(data) {
      $scope.rooms = data.rooms;
    });

    $scope.modalInit = function (index) {
        $scope.selected = $scope.rooms[index];
    };

    $('#modal').on('hide.bs.modal', function (e) {
        $('.modal-content').addClass('selected');
        $('.modal-content.content-form').removeClass('selected');
    });

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
                if ($scope.tv &&  (rooms.equipements.length == 0 || (rooms.equipements.length == 1 && rooms.equipements[0].name != 'TV') ||
                    (rooms.equipements.length > 1 && rooms.equipements[0].name != 'TV' && rooms.equipements[1].name != "TV")))
                    ok = false;
                if ($scope.proj && (rooms.equipements.length == 0 || (rooms.equipements.length == 1 && rooms.equipements[0].name != 'Retro Projecteur') ||
                    (rooms.equipements.length > 1 && rooms.equipements[0].name != 'Retro Projecteur' && rooms.equipements[1].name != "Retro Projecteur")))
                    ok = false;
            return ok;
        }
    };

    $('#datetimepicker1').datetimepicker({
        format: 'YYYY-MM-DD HH:mm',
        stepping: 30,
        minDate: moment()
    });
    $('#datetimepicker2').datetimepicker({
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

    var timeouts = [];
    $scope.clearTimeouts = function() {
        timeouts.forEach(function(e) {
            clearTimeout(e);
        })
    };

    $scope.error = function () {
        $scope.clearTimeouts();
        $('.message').removeClass('above').removeClass('dispnoneimp');
        timeouts.push(setTimeout(function () {
            $('.message').addClass('error');
        }, 100));
        timeouts.push(setTimeout(function () {
            $('.error').removeClass('error').addClass('above');
        }, 3100));
        timeouts.push(setTimeout(function () {
            $('.message').addClass('dispnoneimp');
        }, 3600));
    };

    $scope.success = function() {
        $scope.clearTimeouts();
        $('.message').removeClass('above').removeClass('dispnoneimp');
        timeouts.push(setTimeout(function () {
            $('.message').addClass('success');
        }, 100));
        timeouts.push(setTimeout(function () {
            $('.success').removeClass('success').addClass('above');
        }, 3100));
        timeouts.push(setTimeout(function () {
            $('.message').addClass('dispnoneimp');
        }, 3600));
    };

    $scope.contain = function(roomName) {
        var ret = false;
        $scope.rooms.forEach(function(room) {
            if (room.name == roomName) {
                ret = true;
                return;
            }
        });
        return ret;
    };

    $scope.submitBooking = function(room) {

        var dataStart = $('#dateStart').val();
        var dataEnd = $('#dateEnd').val();
        var dataRoomName = room.name;
        var dataLogin = $scope.login;
        var dataWhy = $scope.why;

        $('#modal').modal('hide');

        if (moment(dataStart).isValid() && moment(dataEnd).isValid()) {

            if (moment(dataStart).isBefore(moment())) {
                $scope.message = "Bien essayé ! Mais tu ne peux pas etre dans le passé";
                $('.logo').addClass('outatime');
                $scope.error();
            } else if (moment(dataStart).isSameOrAfter(moment(dataEnd))) {
                $scope.message = "Erreur: Date de départ après date de fin";
                $scope.error();
            } else if (!$scope.contain(dataRoomName)) {
                $scope.message = "Erreur: Cette salle n'éxiste pas";
                $scope.error();
            } else if (!dataLogin.length || !dataWhy.length) {
                $scope.message = "Erreur: Informations incomplètes";
                $scope.error();
            } else {
                //normalement ajax ici avec ceci dans le cas de succes. il faut penser au cas ou l'AJAX renvoie une erreur
                $scope.message = "Prise de rendez-vous réussie ! Elle sera du " + moment(dataStart).format("DD/MM/YYYY[ a ]HH[h]mm").toString() + " au "
                    + moment(dataEnd).format("DD/MM/YYYY[ a ]HH[h]mm").toString() + " dans la " + dataRoomName;
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
    };

    $scope.activateBooking = function() {
        $('.modal-content').toggleClass('selected');
    };

    $scope.openSearch = function () {
        $('.row.form-inline, .rooms').toggleClass('opened');
    };

}]);