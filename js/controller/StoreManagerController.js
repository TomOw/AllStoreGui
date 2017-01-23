/**
 * Created by Tomasz on 13.12.2016.
 */
app.controller('StoreManagerController', ['$rootScope', '$scope', '$http', '$routeParams', '$location', '$mdDialog', 'StoreService', 'ItemService', function ($rootScope, $scope, $http, $routeParams, $location, $mdDialog, StoreService, ItemService) {

    $rootScope.pageHasSideNav = true;

    var storeName = $routeParams.storeName;

    StoreService.getStoreByOwner().then(function (result) {
        $scope.store = result;
    })
        .then(function (result) {
            StoreService.getOrders(storeName).then(function (result) {
                $scope.store.orders = result;
            });
        });

    StoreService.getCategories().then(function (result) {
        $scope.categories = result;
    });

    $scope.showPromptChangeAmount = function (ev, item) {
        var confirm = $mdDialog.prompt()
            .title('Change the amount in storage')
            .textContent('Amount in stock')
            .placeholder('Amount in stock')
            .ariaLabel('Category')
            .initialValue(item.noInStock)
            .targetEvent(ev)
            .ok('OK')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function (result) {
            item.noInStock = result;
            console.log(item);
            item.store = {};
            item.store.id = $scope.store.id;
            ItemService.editItem(item);
        }, function () {
            $scope.status = '';
        });
    };

    $scope.testMsg = function (item, index) {
        console.log(index);
        console.log('clicked edit icon');
        console.log(item);
        $scope.editingItem = item;
        $scope.editingItem.index = index;
        $scope.editingItem.store = {};
        $scope.editingItem.store.id = $scope.store.id;
        $scope.showEditDialog();
    };

    $scope.hrefAndClick = function () {
        $location.path('/#/store/manager/{{store.name}}');
        console.log('clicked and hrefed');
    };

    $scope.showEditStoreDetailsDialog = function (ev) {
        $mdDialog.show({
            controller: 'StoreManagerController',
            scope: $scope,
            preserveScope: true,
            templateUrl: 'templates/editStoreDetails.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        })
    };


    $scope.showEditDialog = function (ev) {
        $mdDialog.show({
            controller: 'StoreManagerController',
            scope: $scope,
            preserveScope: true,
            templateUrl: 'templates/editItemDialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        })
    };

    $scope.saveEditedStore = function () {
        console.log($scope.store);
        StoreService.editStore($scope.store).then(function (result) {
            console.log('from promise');
            $location.path('/store/manager/' + $scope.store.name);
            $scope.hide();
        });
    };

    $scope.saveEdited = function (edited) {
        console.log(edited);
        $scope.store.items[edited.index] = edited;
        ItemService.editItem(edited);
        $scope.hide();
    };

    $scope.showPromptNewCategory = function (ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
            .title('Add new category')
            .textContent('Type a name of new category')
            .placeholder('Category')
            .ariaLabel('Category')
            .initialValue('New Category')
            .targetEvent(ev)
            .ok('Add')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function (result) {
            $scope.newCategory = result;
            $scope.newItem.category = result;
            if ($scope.categories == undefined) {
                $scope.categories = [];
                $scope.categories.push(result);
            } else {
                $scope.categories.push(result);
            }
        }, function () {
            $scope.status = '';
        });
    };

    $scope.sendItem = function () {
        $scope.store.items.push($scope.newItem);
        ItemService.sendSingleItem($scope.newItem, $scope.store.name);
    };

    $scope.hide = function () {
        $mdDialog.hide();
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.answer = function (answer) {
        $mdDialog.hide(answer);

    };
}]);