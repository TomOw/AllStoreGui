/**
 * Created by Tomasz on 19.11.2016.
 */
app.controller('ItemController', ['$scope', '$http', '$routeParams', 'ItemService', function ($scope, $http, $routeParams, ItemService) {

    var url = 'http://localhost:8080';

    $scope.fooMsg = 'sample message to test something';

    var itemId = $routeParams.itemId;

    ItemService.getItemById(itemId).then(function (result) {
        $scope.single = result;
    })
        .then(function (result) {
            ItemService.getCheapestOffer($scope.single.name).then(function (result) {
                $scope.cheapest = result;
            })
                .then(function (result) {
                    ItemService.getOffers($scope.single.name).then(function (result) {
                        $scope.offers = result;
                    })
                })
        });

}]);