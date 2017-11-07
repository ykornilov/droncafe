'use strict';

angular
    .module('app')
    .component('newOrders', {
        templateUrl: './app/components/neworders/new-orders.component.html',
        bindings: {
            orders: '<',
            onChange: '&'
        },
        controller: function() {
            var vm = this;

            vm.changeStatus = dish => vm.onChange({dish});
        }
    });