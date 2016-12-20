/**
 * Created by Tomasz on 15.12.2016.
 */
app.service('Session', function () {

    var url = 'http://85.255.8.105:8080';

    //var url = 'http://localhost:8080';

    this.create = function (data) {
        this.id = data.id;
        this.login = data.login;
        this.firstName = data.firstName;
        this.lastName = data.familyName;
        this.email = data.email;
        this.userRoles = [];
        angular.forEach(data.authorities, function (value, key) {
            this.push(value.name);
        }, this.userRoles);
    };
    this.invalidate = function () {
        this.id = null;
        this.login = null;
        this.firstName = null;
        this.lastName = null;
        this.email = null;
        this.userRoles = null;
    };
    return this;
});

app.service('AuthSharedService', function ($rootScope, $http, authService, Session) {

    var url = 'http://85.255.8.105:8080';

    //var url = 'http://localhost:8080';

    return {
        login: function (userName, password, rememberMe) {
            var config = {
                params: {
                    username: userName,
                    password: password,
                    rememberme: rememberMe
                },
                ignoreAuthModule: 'ignoreAuthModule'
            };
            $http.post(url + '/authenticate', '', config)
                .success(function (data, status, headers, config) {
                    authService.loginConfirmed(data);
                }).error(function (data, status, headers, config) {
                $rootScope.authenticationError = true;
                Session.invalidate();
            });
        },

        getAccount: function () {
            $rootScope.loadingAccount = true;
            $http.get(url + '/user/me')
                .then(function (response) {
                    authService.loginConfirmed(response.data);
                });
        },


        isAuthorized: function (authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                if (authorizedRoles == '*') {
                    return true;
                }
                authorizedRoles = [authorizedRoles];
            }
            var isAuthorized = false;
            angular.forEach(authorizedRoles, function (authorizedRole) {
                var authorized = (!!Session.login &&
                Session.userRoles.indexOf(authorizedRole) !== -1);
                if (authorized || authorizedRole == '*') {
                    isAuthorized = true;
                }
            });
            return isAuthorized;
        }
    };
});