app.controller('LoginController', function($rootScope, $scope, AuthSharedService) {


    $scope.rememberMe = true;


    $scope.login = function() {
        $rootScope.authenticationError = false;
        AuthSharedService.login($scope.username, $scope.password, $scope.rememberMe);
    }
});