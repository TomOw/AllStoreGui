/**
 * Created by Tomasz on 04/01/17.
 */
app.service('UserService', ['$http', function ($http) {

    //var url = 'http://localhost:8080';

    var url = 'http://85.255.8.105:8080';

    this.getUser = function (username) {
        return $http.get(url + '/user/get/' + username)
            .then(function success(response, status) {
                return response.data;
            })
    };
    this.getLoggedInUser = function () {
        return $http.get(url + '/user/me')
            .then(function success(response, status) {
                return response.data;
            });
    }

}]);