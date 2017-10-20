'use strict';

clientApp.component('orders', {

    controller: function OrdersCtrl($scope, socket) {
        $scope.orders = [];
        $scope.common = $scope.$parent.common;

        if ($scope.common.user) {
            socket.emit('getOrders');
        }

        $scope.$on('userReady', (event, data) => {
            socket.emit('getOrders');
            console.log('getOrders');
        });

        socket.on('orders', data => {
            $scope.orders = data;
        });
    },

    templateUrl: './src/Orders/Orders.html'

});