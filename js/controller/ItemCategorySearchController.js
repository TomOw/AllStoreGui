
app.controller('ItemCategorySearchController', ['$rootScope', '$scope', '$routeParams', 'ItemService', 'StoreService', function ($rootScope, $scope, $routeParams, ItemService, StoreService) {

    $rootScope.pageHasSideNav = true;

    var categoryName = $routeParams.categoryName;

    StoreService.getCategories().then(function (result) {
        $scope.categories = result;
    });

    ItemService.getItemsByCategory(categoryName).then(function (result) {
        $scope.items = result;
    })

}]);