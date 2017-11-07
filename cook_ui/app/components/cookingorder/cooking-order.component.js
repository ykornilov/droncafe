'use strict';

angular
    .module('app')
    .component('cookingOrder', {
        templateUrl: './app/components/cookingorder/cooking-order.component.html',
        bindings: {
            dish: '<',
            onChangeStatus: '&'
        },
        controller: function() {
            var vm = this;

            vm.readyDish = () => vm.onChangeStatus({dish: vm.dish});
        }
    });