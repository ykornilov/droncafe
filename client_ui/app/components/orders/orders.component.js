'use strict';

angular
    .module('app')
    .component('orders', {
        templateUrl: './app/components/orders/orders.component.html',
        controller: function(socket) {
            var vm = this;
            vm.orders = [];

            socket.emit('getOrders');

            socket.on('orders', data => vm.orders = data);
            socket.on('remove', data => vm.orders = vm.orders.filter(item => item._id !== data._id));
            socket.on('order', data => {
                const dish = vm.orders.find(item => item._id === data._id);
                if (dish) {
                    dish.status = data.status;
                }
            });
        }
    });