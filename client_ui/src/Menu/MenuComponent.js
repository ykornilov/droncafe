'use strict';

clientApp.component('menu', {

    controller: function MenuCtrl($scope, socket) {
        $scope.menu = [];

        socket.emit('getMenu');

        socket.on('menu', data => {
            $scope.menu = data;
            console.log(data);
        });
    },

    templateUrl: './src/Menu/Menu.html'

});