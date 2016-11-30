/**
 * Created by Tomasz on 30.11.2016.
 */
app.controller('ItemSearchController', ['$rootScope', '$scope', 'ItemService', '$mdDialog', function ($rootScope, $scope, ItemService, $mdDialog) {

    $scope.works = 'it works so much';

    $scope.x = 0;


    $scope.add = function () {
        $scope.x += 1;
    }

}]);