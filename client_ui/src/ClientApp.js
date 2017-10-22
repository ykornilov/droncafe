
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
        .controller('MainCtrl', $scope => {
            $scope.common = {};
            $scope.common.user = null;

            $scope.$on('client', (event, data) => {
                $scope.common.user = data;
            });

            $scope.$on('auth', (event, data) => {
                $scope.common.user = data;
                if ($scope.common.user) {
                    $scope.$broadcast('userReady');
                }
            });
        });
