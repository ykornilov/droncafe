'use strict';

angular
    .module('app')
    .controller('MainCtrl', function() {
        var vm = this;
        vm.user = null;

        vm.changeData = data => vm.user = data;
        vm.disconnect = () => vm.user = null;
    });
