'use strict';

angular
    .module('app')
    .component('menuItem', {
        templateUrl: './app/components/menuitem/menu-item.component.html',
        bindings: {
            clientData: '<',
            dish: '<',
            toOrder: '&'
        },
        controller: function() {
            var vm = this;
            vm.order = () => vm.toOrder({dish: vm.dish});
        }
    });