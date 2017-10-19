'use strict';

clientApp.component('user', {

    controller: function UserCtrl($scope, socket) {
        $scope.auth = false;
        $scope.user = {};

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
            $scope.user.name = data.name;
            $scope.user.email = data.email;
            $scope.$emit('balance', data.balance);
            $scope.auth = true;
        });

        socket.on('changeBalance', data => {
            $scope.$emit('balance', data);
        });

        socket.on('menu', data => {
            $scope.$emit('menu', data);
        });
    },

    templateUrl: './src/User/User.html'

});
