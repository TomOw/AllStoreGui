var app = angular.module('BlankApp', ['ngMaterial', 'ngRoute'])
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('red')
            .warnPalette('red');
    });

app.config(function ($routeProvider) {
    $routeProvider
        .when('/addItem', {
            templateUrl: 'templates/addItemForm.html',
            controller: 'ItemFormController'
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
            controller: 'StoreManagerController'
        })
        .when('/store/manager/:storeName/items', {
            templateUrl: 'templates/storeManagerItems.html',
            controller: 'StoreManagerController'
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
            templateUrl:'templates/login.html',
            controller: 'LoginController'
        })
        .otherwise({
            template: '<h1>otherwise template</h1>'
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