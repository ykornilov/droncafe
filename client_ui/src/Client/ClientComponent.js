'use strict';

clientApp.component('client', {

    controller: function ClientCtrl($scope, socket) {
        $scope.common = $scope.$parent.common;
        $scope.user = null;

        $scope.authUser = function(user) {
            socket.emit('login', {
                name: user.name,
                email: user.email
            });
        };

        $scope.incBalance = function() {
            socket.emit('incBalance');
        };

        socket.on('auth', data => {
            $scope.$emit('auth', {
                name: data.name,
                email: data.email
            });
            $scope.$emit('balance', data.balance);
        });

        socket.on('changeBalance', data => {
            $scope.$emit('balance', data);
        });
    },

    templateUrl: './src/Client/Client.html'

});
