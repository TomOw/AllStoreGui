/**
 * Created by Tomasz on 07.12.2016.
 */
app.controller('LoginController', ['$scope', '$http', function ($scope) {

    var url = 'http://localhost:8080';

    //var url = 'http://85.255.8.105:8080';

    $scope.user = {
        credentials: {
            login: '',
            password: ''
        }
    };

    $scope.sendLogin = function () {
        return $http.post(url + '/login', $scope.user.credentials)
            .then(function success(response, status) {
                return response.data;
            })
    }

}]);