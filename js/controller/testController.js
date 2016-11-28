/**
 * Created by Tomasz on 07.11.2016.
 */

app.controller('StoreController', ['$rootScope', '$scope', '$http', '$routeParams', function ($rootScope, $scope, $http, $routeParams) {

    $scope.test = 'testMsg';

    $rootScope.pageHasSideNav = true;

    var storeName = $routeParams.storeName;

    $scope.getStore = function () {
        $http.get('http://85.255.8.105:8080/store/' + storeName)
            .success(function (response, status) {
                console.log('z geta' + response.toString());
                console.log('z geta' + response);
                console.log(response);
                $scope.store = response;
                //$scope.raw = data;
            })
    };

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