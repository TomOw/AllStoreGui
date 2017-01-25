/**
 * Created by Tomasz on 15.12.2016.
 */
app.service('Session', function () {

    var url = 'http://85.255.8.105:8080';

    //var url = 'http://localhost:8080';

    this.create = function (data) {
        this.login = data.username;
        this.userRoles = [];
        angular.forEach(data.authorities, function (value, key) {
            this.push(value.authority);
        }, this.userRoles);
    };
    this.invalidate = function () {
        this.login = null;
        this.userRoles = null;
    };
    return this;
});

app.service('AuthSharedService', function ($rootScope, $http, $route, authService, Session) {

    var url = 'http://85.255.8.105:8080';

    //var url = 'http://localhost:8080';

    return {
        login: function (userName, password, rememberMe) {
            var data = {
                username: userName,
                password: password
            };

            var config = {
                params: {
                    username: userName,
                    password: password,
                    rememberme: rememberMe
                },
                ignoreAuthModule: 'ignoreAuthModule'
            };
            $http.post(url + '/authenticate', data, config)
                .success(function (data, status, headers, config) {
                    authService.loginConfirmed(data);
                }).error(function (data, status, headers, config) {
                $rootScope.authenticationError = true;
                Session.invalidate();
            });
        },

        logout: function () {
            $http.get(url + '/logout')
                .then(function (response) {
                    Session.invalidate();
                    $rootScope.authenticated = false;
                    $route.reload();
                })
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
        },

        checkRole: function (role) {
            if (Session.userRoles === undefined || Session.userRoles === null) {
                return false;
            } else {
                var result = Session.userRoles.indexOf(role);
                if (result == -1) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    };
});