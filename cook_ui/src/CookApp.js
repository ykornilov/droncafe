'use strict';

const cookApp =
    angular
        .module('CookApp', [
            'btford.socket-io'
        ])
        .controller('MainCtrl', ($scope, socket) => {
            $scope.common = {};
            $scope.common.orders = null;

            socket.emit('getOrders');

            socket.on('orders', data => {
                $scope.common.orders = data;
            });

            socket.on('order', data => {
                const dish = $scope.common.orders.find(item => item._id === data._id);
                if (dish) {
                    dish.status = data.status;
                } else {
                    $scope.common.orders.push(data);
                }
            })
        });
