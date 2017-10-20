'use strict';

cookApp.component('newOrders', {

    controller: function NewOrdersCtrl($scope, socket) {
        $scope.common = $scope.$parent.common;

        $scope.cookDish = function(order) {
            socket.emit('changeStatusOrder', {order, status: 1});
        }
    },

    templateUrl: './src/NewOrders/NewOrders.html'

});