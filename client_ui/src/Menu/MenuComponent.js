'use strict';

clientApp.component('menu', {

    controller: function MenuCtrl($scope, socket) {
        $scope.menu = [];
        $scope.common = $scope.$parent.common;

        $scope.newOrder = function(dish) {
            socket.emit('newOrder', dish);
        };

        socket.emit('getMenu');

        socket.on('menu', data => {
            $scope.menu = data;
        });
    },

    templateUrl: './src/Menu/Menu.html'

});