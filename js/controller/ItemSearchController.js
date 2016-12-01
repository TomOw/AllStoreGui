/**
 * Created by Tomasz on 30.11.2016.
 */
app.controller('ItemSearchController', ['$rootScope', '$scope', 'ItemService', 'StoreService', '$mdDialog', function ($rootScope, $scope, ItemService, StoreService, $mdDialog) {

    $scope.works = 'it works so much';

    $scope.x = 0;


    $scope.add = function () {
        $scope.x += 1;
    };

    StoreService.getCategories().then(function (result) {
        $scope.categories = result;
    });

}]);