/**
 * Created by Tomasz on 20.12.2016.
 */
app.controller('UserController', ['$rootScope', '$scope', 'UserService', function ($rootScope, $scope, UserService) {

    UserService.getLoggedInUser().then(function (result) {
        $scope.user = result;
    })

}]);