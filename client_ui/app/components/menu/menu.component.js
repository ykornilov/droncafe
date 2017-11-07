'use strict';

angular
    .module('app')
    .component('menu', {
        templateUrl: './app/components/menu/menu.component.html',
        bindings: {
            clientData: '<'
        },
        controller: function(socket) {
            var vm = this;
            vm.menu = [];

            socket.emit('getMenu');

            vm.newOrder = dish => socket.emit('newOrder', dish);

            socket.on('menu', data => vm.menu = data);
        }
    });