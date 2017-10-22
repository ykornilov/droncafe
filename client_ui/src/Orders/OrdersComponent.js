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
        });

        socket.on('orders', data => {
            $scope.orders = data;
        });

        socket.on('order', data => {
            const dish = $scope.orders.find(item => item._id === data._id);
            if (dish) {
                dish.status = data.status;
            }
        });

        socket.on('remove', data => {
            $scope.orders = $scope.orders.filter(item => item._id !== data._id);
        })
    },

    templateUrl: './src/Orders/Orders.html'

});