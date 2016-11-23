/**
 * Created by Tomasz on 19.11.2016.
 */
app.controller('ItemController', ['$scope', '$http', '$routeParams', 'ItemService', 'ReviewService', function ($scope, $http, $routeParams, ItemService, ReviewService) {

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
                        .then(function (result) {
                            ReviewService.getReviews($scope.single.name).then(function (result) {
                                $scope.reviews = result
                            })
                        })
                })
        });

    $scope.newReview = {
        description: '',
        rating: 0
    };

    $scope.newReview.rating = 4;

}]);