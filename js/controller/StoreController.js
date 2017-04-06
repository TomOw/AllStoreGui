

app.controller('StoreController', ['$rootScope', '$scope', '$http', '$routeParams', 'StoreService', function ($rootScope, $scope, $http, $routeParams, StoreService) {

    $scope.test = 'testMsg';

    $rootScope.pageHasSideNav = true;

    var storeName = $routeParams.storeName;


    StoreService.getStore(storeName).then(function (result) {
        $scope.store = result;
    });

    $scope.viewUp = function (id) {
        $http.get('http://85.255.8.105:8080/viewsUp/' + id)
            .success(function (response, status) {

            })
    };

    $scope.consoletest2 = function () {
        console.log('mdinkriple');
    };

    $scope.store = {
        id: 0,
        name: '',
        rating: 0.0,
        noOfOrdersMade: 0,
        noOfRates: 0,
        storeAddress: {
            id: 0,
            country: '',
            city: '',
            street: '',
            number: '',
            postalCode: ''
        },
        items: [],
        orders: []
    };

    $scope.smth = 'gasg';

}]);