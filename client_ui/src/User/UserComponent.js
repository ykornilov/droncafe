'use strict';

clientApp.component('user', {

    controller: function UserCtrl($scope) {
        $scope.name = 'Yury';
    },

    templateUrl: './src/User/User.html'

});
