'use strict';

angular
    .module('app')
    .component('cookingOrders', {
        templateUrl: './app/components/cookingorders/cooking-orders.component.html',
        bindings: {
            orders: '<',
            onChange: '&'
        },
        controller: function() {
            var vm = this;

            vm.changeStatus = dish => vm.onChange({dish});
        }
    });