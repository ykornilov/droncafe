'use strict';

cookApp.component('cookingOrders', {

    controller: function CookingOrdersCtrl($scope, socket) {
        $scope.common = $scope.$parent.common;

        $scope.readyDish = function(order) {
            socket.emit('changeStatusOrder', {order, status: 2});
        }
    },

    templateUrl: './src/CookingOrders/CookingOrders.html'

});