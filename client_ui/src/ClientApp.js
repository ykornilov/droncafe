
const clientApp =
    angular
        .module('ClientApp', [
            'ngRoute',
            'btford.socket-io'
        ])
        .config($routeProvider => {
                $routeProvider
                    .when('/', {
                        templateUrl: 'src/views/main.html'
                    })
                    .when('/menu', {
                        template: '<b>Menu</b>'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
        })
        .controller('ClientCtrl', $scope => {
            $scope.menu = null;
            $scope.balance = 0;

            $scope.$on('balance', (event, data) => {
                $scope.balance = data;
            });

            $scope.$on('menu', (event, data) => {
                $scope.menu = data;
            });
        });
