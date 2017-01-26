app.controller('LoginController', function($rootScope, $scope, $mdDialog, $location, AuthSharedService) {


    $scope.rememberMe = true;


    $scope.login = function() {
        $rootScope.authenticationError = false;
        AuthSharedService.login($scope.username, $scope.password, $scope.rememberMe);
    };

    $scope.infoDialog = function (ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Sample credentials')
            .textContent('Sample credentials can be found at about section')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('OK')
            .cancel('About page');

        $mdDialog.show(confirm).then(function () {
        }, function () {
            console.log('called redirect to info page');
            $location.path('/info');
        });
    };
});