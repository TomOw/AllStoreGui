/**
 * Created by Tomasz on 07.11.2016.
 */

app.controller('TestCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.test = 'testMsg';

    $scope.getStore = function () {
        $http.get('http://localhost:8080/store/eigth')
            .success(function (response, status) {
                console.log('z geta' + response.toString());
                console.log('z geta' + response);
                console.log(response);
                $scope.store = response;
                //$scope.raw = data;
            })
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