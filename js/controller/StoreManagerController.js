/**
 * Created by Tomasz on 13.12.2016.
 */
app.controller('StoreManagerController', ['$rootScope', '$scope', '$http', '$routeParams', 'StoreService', function ($rootScope, $scope, $http, $routeParams, StoreService) {

    $rootScope.pageHasSideNav = true;

    var storeName = $routeParams.storeName;

    StoreService.getStore(storeName).then(function (result) {
        $scope.store = result;
    });


}]);