var app = angular.module('BlankApp', ['ngMaterial', 'ngRoute', 'ngResource', 'http-auth-interceptor'])
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('red')
            .warnPalette('red');
    });

app.constant('USER_ROLES', {
    all: '*',
    admin: 'ROLE_ADMIN',
    manager: 'ROLE_MANAGER',
    user: 'ROLE_USER'
});

app.config(function ($routeProvider, USER_ROLES) {
    $routeProvider
        .when('/addItem', {
            templateUrl: 'templates/addItemForm.html',
            controller: 'ItemFormController',
            access: {
                loginRequired: true,
                authorizedRoles: [USER_ROLES.admin]
            }
        })
        .when('/', {
            templateUrl: 'templates/itemSearch.html',
            controller: 'ItemSearchController'
        })
        .when('/store/:storeName', {
            templateUrl: 'templates/itemsInStore.html',
            controller: 'StoreController'
        })
        .when('/store/manager/:storeName', {
            templateUrl: 'templates/storeManager.html',
            controller: 'StoreManagerController',
            access: {
                loginRequired: true,
                authorizedRoles: [USER_ROLES.manager]
            }
        })
        .when('/store/manager/:storeName/items', {
            templateUrl: 'templates/storeManagerItems.html',
            controller: 'StoreManagerController',
            access: {
                loginRequired: true,
                authorizedRoles: [USER_ROLES.manager]
            }
        })
        .when('/store/manager/:storeName/items/add', {
            templateUrl: 'templates/addItemStoreManager.html',
            controller: 'StoreManagerController',
            access: {
                loginRequired: true,
                authorizedRoles: [USER_ROLES.manager]
            }
        })
        .when('/store/manager/:storeName/items/storage', {
            templateUrl: 'templates/storeManagerStorage.html',
            controller: 'StoreManagerController',
            access: {
                loginRequired: true,
                authorizedRoles: [USER_ROLES.manager]
            }
        })
        .when('/store/manager/:storeName/orders', {
            templateUrl: 'templates/storeManagerOrders.html',
            controller: 'StoreManagerController',
            access: {
                loginRequired: true,
                authorizedRoles: [USER_ROLES.manager]
            }
        })
        .when('/item/:itemId', {
            templateUrl: 'templates/itemView.html',
            controller: 'ItemController'
        })
        .when('/container', {
            templateUrl: 'templates/flexContainerExample.html'
        })
        .when('/category/:categoryName', {
            templateUrl: 'templates/itemSearch.html',
            controller: 'ItemCategorySearchController'
        })
        .when('/login', {
            templateUrl: 'templates/login.html',
            controller: 'LoginController'
        })
        .when('/user/:username', {
            templateUrl: 'templates/user.html',
            controller: 'UserController',
            access: {
                loginRequired: true,
                authorizedRoles: [USER_ROLES.user]
            }
        })
        .when('/user/:username/orders', {
            templateUrl: 'templates/userOrders.html',
            controller: 'UserController',
            access: {
                loginRequired: true,
                authorizedRoles: [USER_ROLES.user]
            }
        })
        .when('/user', {
            templateUrl: 'templates/user.html',
            controller: 'UserController'
        })
        .when('/error/:code', {
            templateUrl: 'templates/error.html',
            controller: 'ErrorController'
        })
        .when('/order/confirm', {
            templateUrl: 'templates/orderConfirm.html',
            controller: 'AppCtrl',
            access: {
                loginRequired: true,
                authorizedRoles: [USER_ROLES.all]
            }
        })
        .otherwise({
            template: '<h1>otherwise template 404</h1>'
        })
});

app.filter('capitalizeFirst', function () {
    return function (input) {
        if(input != undefined) {
            var char = input.charAt(0);
            char = char.toUpperCase();
            return char;
        }
    }
});

app.filter('firstSentence', function () {
    return function (input) {
        if(input != undefined) {
            return input.split(". ")[0];
        }
    }
});

app.filter('postalCode', function () {
    return function (input) {
        if(input != undefined) {
            return input.substring(0, 2) + '-' + input.substring(2, 5);
        }
    }
});

app.directive('itemCard', function () {
    return {
        templateUrl: 'templates/directives/itemCard.html'
    }
});

app.directive('itemCardShort', function () {
    return {
        templateUrl: 'templates/directives/itemCardShort.html'
    };
});

app.directive('itemCardManager', function () {
    return {
        templateUrl: 'templates/directives/itemCardManager.html'
    };
});

app.directive('itemCardStorageStatus', function () {
    return {
        templateUrl: 'templates/directives/itemCardStorageStatus.html'
    };
});

app.directive('orderCard', function () {
    return {
        templateUrl: 'templates/directives/orderDirective.html'
    };
});

app.directive('userOrderCard', function () {
    return {
        templateUrl: 'templates/directives/userOrderDirective.html'
    };
});

app.directive('itemOrder', function () {
    return {
        templateUrl: 'templates/directives/itemOrder.html'
    };
});

app.directive('offerItem', function () {
    return {
        templateUrl: 'templates/directives/offerDirective.html'
    }
});


app.run(function ($rootScope, $location, $http, AuthSharedService, Session,
                  USER_ROLES, $q, $timeout) {
// Call when the 403 response is returned by the server
    $rootScope.$on('event:auth-forbidden', function (rejection) {
        $rootScope.$evalAsync(function () {
            $location.path('/error/403').replace();
        });
    });

    $rootScope.$on('$routeChangeStart', function (event, next) {
        if (next.originalPath === "/login" && $rootScope.authenticated) {
            event.preventDefault();
        } else if (next.access && next.access.loginRequired && !$rootScope.authenticated) {
            event.preventDefault();
            $rootScope.$broadcast("event:auth-loginRequired", {});
        } else if (next.access && !AuthSharedService.isAuthorized(next.access.authorizedRoles)) {
            event.preventDefault();
            $rootScope.$broadcast("event:auth-forbidden", {});
        }
    });

    $rootScope.$on('event:auth-loginConfirmed', function (event, data) {
        $rootScope.loadingAccount = false;
        var nextLocation = ($rootScope.requestedUrl ? $rootScope.requestedUrl : "/");
        var delay = ($location.path() === "/loading" ? 1500 : 0);

        $timeout(function () {
            Session.create(data);
            $rootScope.account = Session;
            $rootScope.authenticated = true;
            $location.path(nextLocation).replace();
        }, delay);

    });

    // Call when the 401 response is returned by the server
    $rootScope.$on('event:auth-loginRequired', function (event, data) {
        if ($rootScope.loadingAccount && data.status !== 401) {
            $rootScope.requestedUrl = $location.path();
            $location.path('/loading');
        } else {
            Session.invalidate();
            $rootScope.authenticated = false;
            $rootScope.loadingAccount = false;
            $location.path('/login');
        }
    });

    AuthSharedService.getAccount();
});

app.directive('access', [
    'AuthSharedService',
    function (AuthSharedService) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var role = attrs.access;
                console.log(attrs);
                console.log('attrs');
                console.log('role' + role);
                console.log(attrs.access);
                if (AuthSharedService.checkRole(role)) {
                    element.removeClass('hide');
                } else {
                    element.addClass('hide');
                }
            }

        };
    }]);

app.directive('itemListElement', function () {
    return {
        templateUrl: 'templates/directives/itemListElement.html'
    }
});