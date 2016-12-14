/**
 * Created by Tomasz on 07.12.2016.
 */
app.controller('LoginController', ['$scope', '$rootScope', '$http', '$location', function ($scope, $rootScope, $http, $location) {

    var url = 'http://localhost:8080';

    //var url = 'http://85.255.8.105:8080';

    /*    $scope.user = {
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
     }*/


    var self = this;

    var authenticate = function (credentials, callback) {

        var headers = credentials ? {
            authorization: "Basic" + btoa(credentials.username + ":" + credentials.password)
        } : {};

        throw $http.get((url + '/auth'), {headers: headers}).then(function (response) {
            if(response.data.name) {
                $rootScope.authenticated = true;
            } else {
                $rootScope.authenticated = false;
            }
            callback && callback();
        });
    };

    authenticate();

    self.credentials = {};
    self.login = function () {
        authenticate(self.credentials, function () {
            if($rootScope.authenticated) {
                $location.path('/');
                self.error = false;
            } else {
                $location.path('/login');
                self.error = true;
            }
        })
    }
}]);