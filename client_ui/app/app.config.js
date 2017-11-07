'use strict';

angular
    .module('app')
    .config($routeProvider => {
        $routeProvider
            .when('/', {
                templateUrl: 'app/views/main.html'
            })
            .when('/menu', {
                templateUrl: 'app/views/menu.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    });