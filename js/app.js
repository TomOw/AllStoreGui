var app = angular.module('BlankApp', ['ngMaterial', 'ngRoute'])
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('red')
            .warnPalette('red');
    });

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/first.html'
        })
        .when('/second', {
            templateUrl: 'templates/second.html'
        })
        .otherwise({
            template: '<h1>otherwise template</h1>'
        })
})