'use strict';

angular
    .module('app')
    .controller('MainCtrl', function(socket) {
        var vm = this;
        vm.orders = null;

        socket.emit('getOrders');

        vm.changeOrderStatus = (order, status) => socket.emit('changeStatusOrder', {order, status});

        socket.on('orders', data => vm.orders = data);
        socket.on('order', data => {
            const dish = vm.orders.find(item => item._id === data._id);
            if (dish) {
                dish.status = data.status;
            } else {
                vm.orders.push(data);
            }
        })
    });
