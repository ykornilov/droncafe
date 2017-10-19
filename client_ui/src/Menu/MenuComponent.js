'use strict';

clientApp.component('menu', {

    controller: function MenuCtrl($scope, socket) {
        $scope.menu = [];
        $scope.common = $scope.$parent.common;

        $scope.addOrder = function(dish) {
            socket.emit('addOrder', dish);
        };

        socket.emit('getMenu');

        socket.on('menu', data => {
            $scope.menu = data;
            console.log(data);
        });
    },

    templateUrl: './src/Menu/Menu.html'

});