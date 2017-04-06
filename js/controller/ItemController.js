
app.controller('ItemController', ['$rootScope', '$scope', '$http', '$routeParams', 'ItemService', 'ReviewService' ,'$mdDialog', function ($rootScope, $scope, $http, $routeParams, ItemService, ReviewService, $mdDialog) {

    $rootScope.pageHasSideNav = false;

    $scope.fooMsg = 'sample message to test something';

    var itemId = $routeParams.itemId;

    console.log(itemId);

    document.getElementById('searchInput').blur();

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
                                $scope.reviews = result;
                            })
                        })
                })
        });

    $scope.newReview = {
        description: '',
        rating: 0
    };



    $scope.setValue = function (x) {
        $scope.newReview.rating = x;
    };

    $scope.sendReview = function () {
        ReviewService.sendReview($scope.newReview, itemId).then(function (result) {
            $scope.single.avgRating = result.avgRating;
            $scope.single.noOfReviews = result.noOfReviews;
        });
        $scope.reviews.push($scope.newReview);
        $scope.tab.selected = 2;
    };

    $scope.showConfirm = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Would you like to add this review')
            .textContent('Thanks for sharing your opinion.')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Yes')
            .cancel('No');

        $mdDialog.show(confirm).then(function() {
            $scope.sendReview();
        }, function() {
            console.log('declined adding review');
        });
    };


}]);