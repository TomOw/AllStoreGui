/**
 * Created by Tomasz on 20.12.2016.
 */
app.service('UserService', ['$http', function ($http) {

    //var url = 'http://localhost:8080';

    var url = 'http://85.255.8.105:8080';

    this.getLoggedInUser = function () {
        return $http.get(url + '/user/me')
            .then(function success(response, status) {
                return response.data;
            });
    }

}]);