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
            $scope.$emit('auth', data);
        });

        socket.on('client', data => {
            $scope.$emit('client', data);
        });

        socket.on('disconnect', () => {
            $scope.$emit('auth', null);
        });
    },

    templateUrl: './src/Client/Client.html'

});
