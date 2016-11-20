/**
 * Created by Tomasz on 19.11.2016.
 */
app.controller('ItemController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {

    $scope.fooMsg = 'sample message to test something';

    var itemId = $routeParams.itemId;

    $scope.getItemById = function () {
        console.log('getting data');
        $http.get('http://localhost:8080/item/' + itemId)
            .success(function (response, status) {
                $scope.single = response;
                console.log('response: ' + JSON.stringify(response.data));
                console.log('scope: ' + $scope.item);
            })
    };

}]);