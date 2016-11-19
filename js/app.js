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
            templateUrl: 'templates/first.html'
        })
        .when('/store', {
            templateUrl: 'templates/itemsInStore.html',
            controller: 'StoreController'
        })
        .otherwise({
            template: '<h1>otherwise template</h1>'
        })
});