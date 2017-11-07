'use strict';

angular
    .module('app')
    .component('newOrder', {
        templateUrl: './app/components/neworder/new-order.component.html',
        bindings: {
            dish: '<',
            onChangeStatus: '&'
        },
        controller: function() {
            var vm = this;

            vm.cookDish = () => vm.onChangeStatus({dish: vm.dish});
            //vm.cookDish = () => socket.emit('changeStatusOrder', {order, status: 1});
        }
    });