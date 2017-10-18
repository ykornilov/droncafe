'use strict';

clientApp.component('user', {

    controller: function UserCtrl($scope, socket) {
        $scope.hello = false;
        $scope.name = 'Yury';

        socket.on('auth', () => {
            $scope.hello = true;
        });

        socket.emit('login', {name: $scope.name});
    },

    templateUrl: './src/User/User.html'

});
