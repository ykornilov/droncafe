
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
                        templateUrl: 'src/views/menu.html'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
        })
        .controller('ClientCtrl', $scope => {
            $scope.user = null;
            $scope.balance = 0;

            $scope.$on('balance', (event, data) => {
                $scope.balance = data;
            });

            $scope.$on('auth', (event, data) => {
                $scope.user = data;
            });
        });
