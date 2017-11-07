'use strict';

angular
    .module('app')
    .component('client', {
        templateUrl: './app/components/client/client.component.html',
        bindings: {
            clientData: '<',
            onChangeData: '&',
            onDisconnect: '&'
        },
        controller: function(socket) {
            var vm = this;
            vm.user = null;

            vm.authUser = () => {
                socket.emit('login', {
                    name: vm.user.name,
                    email: vm.user.email
                });
            };

            vm.incBalance = () => socket.emit('incBalance');

            socket.on('auth', data => vm.onChangeData({data}));
            socket.on('client', data => vm.onChangeData({data}));
            socket.on('disconnect', () => vm.onDisconnect());
        }
    });
