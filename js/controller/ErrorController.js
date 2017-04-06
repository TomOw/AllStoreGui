app.controller('ErrorController', ['$rootScope', '$scope', '$routeParams', function ($rootScope, $scope, $routeParams) {

    $scope.code = $routeParams.code;

}]);