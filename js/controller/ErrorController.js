/**
 * Created by Tomasz on 21.12.2016.
 */
app.controller('ErrorController', ['$rootScope', '$scope', '$routeParams', function ($rootScope, $scope, $routeParams) {

    $scope.code = $routeParams.code;

}]);