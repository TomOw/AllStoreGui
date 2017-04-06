
app.controller('UserController', ['$rootScope', '$scope', '$routeParams', 'OrderService', 'UserService', function ($rootScope, $scope, $routeParams, OrderService, UserService) {

    var username = $routeParams.username;

    $scope.username = username;

    $scope.controllerTest = 'smth !!! Test 123';

    $scope.user = {};

    $scope.user.orders = {};

    UserService.getLoggedInUser().then(function (result) {
        $scope.user = result;
    });

    OrderService.getOrdersByLoggedUser().then(function (result) {
        $scope.user.orders = result;
    });

    /*UserService.getLoggedInUser().then(function (result) {
        $scope.user = result;
    });*/

}]);