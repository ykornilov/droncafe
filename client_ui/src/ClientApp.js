
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
            $scope.common = {};
            $scope.common.balance = 0;
            $scope.common.user = null;

            $scope.$on('balance', (event, data) => {
                $scope.common.balance = parseInt(data);
            });

            $scope.$on('auth', (event, data) => {
                $scope.common.user = data;
            });
        });
