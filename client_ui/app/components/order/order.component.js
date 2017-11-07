'use strict';

angular
    .module('app')
    .component('order', {
        templateUrl: './app/components/order/order.component.html',
        bindings: {
            dish: '<'
        },
        controller: function() {
            var vm = this;
        }
    });