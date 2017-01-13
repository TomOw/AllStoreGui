/**
 * Created by Tomasz on 08.11.2016.
 */

app.controller('AppCtrl', ['$scope', '$rootScope', '$timeout', '$mdSidenav', '$mdDialog', '$log', '$location', 'ItemService', 'OrderService', function ($scope, $rootScope, $timeout, $mdSidenav, $mdDialog, $log, $location, ItemService, OrderService) {

    $scope.msg = 'working msg';

    $scope.val = 10;

    if ($rootScope.cart == undefined || $rootScope.cart.items == undefined) {
        $rootScope.cart = {
            items: []
        };
    }

    $scope.getItemsByName = function () {
        $location.path('/');
        ItemService.getItemsByName($scope.itemName).then(function (result) {
            $scope.items = result;
        })
    };

    $scope.consoleLog = function () {
        console.log('clicked cart');
    };


    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function () {
        return $mdSidenav('right').isOpen();
    };


    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
        var timer;

        return function debounced() {
            var context = $scope,
                args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function () {
                timer = undefined;
                func.apply(context, args);
            }, wait || 10);
        };
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
        return debounce(function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
        }, 200);
    }

    function buildToggler(navID) {
        return function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
        }
    }

    $scope.showAlert = function (ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Welcome')
                .textContent('This is NOT a real online store. This is my personal portfolio project')
                .ariaLabel('Alert Dialog Demo')
                .ok('Got it!')
                .targetEvent(ev)
        );
    };

    //now unused
    $scope.showAlertAddToCartFailed = function (ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Warning')
                .textContent('You cannot add to cart items from different stores')
                .ariaLabel('Alert Dialog Demo')
                .ok('Got it!')
                .targetEvent(ev)
        );
    };

    $scope.showAlertAddToCartFailedConfirm = function(ev) {
        var storename = $rootScope.cart.items[0].storeName;
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Warning')
            .textContent('You have already added item from ' + storename + '. You cannot add to cart items from different stores.')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('OK')
            .cancel('Show items from ' + storename);

        $mdDialog.show(confirm).then(function() {
            $scope.status = 'You decided to get rid of your debt.';
        }, function() {
            $location.path('/store/' + storename);
        });
    };


    //$scope.showAlert();


    //Dialogs
    $scope.showAdvanced = function (ev) {
        $mdDialog.show({
            controller: 'AppCtrl',
            scope: $rootScope,
            preserveScope: true,
            templateUrl: 'templates/cartDialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        })
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

    function priceChange(item, offer) {
        item.price = offer.itemPrice;
        item.storeName = offer.storeName;
        return item;
    }

    function isItemFromThisStore(items, item) {
        console.log('called comparing');
        console.log('item.storeName');
        console.log(item.storeName);
        for (var j = 0; j < items.length; j++) {
            console.log(items[j].storeName + ' ,');
        }

        if (items.length == 0) {
            return true;
        } else {
            for (var i = 0; i < items.length; i++) {
                if (item.storeName == items[i].storeName) {
                    console.log('return true');
                    return true;
                }
            }
        }
        console.log('return false');
        return false;
    }


    $scope.addItemToCart = function (item, offer) {
        if ($rootScope.cart.sum == undefined) {
            $rootScope.cart.sum = 0;
        }
        priceChange(item, offer);
        item.store = {};
        item.store.id = offer.storeId;
        item.id = offer.itemId;
        console.log(item.id);
        if (isItemFromThisStore($rootScope.cart.items, item)) {
            var itemToPush = {};
            angular.copy(item, itemToPush);
            $rootScope.cart.items.push(itemToPush);
            $rootScope.cart.sum += offer.itemPrice;
        } else {
            console.log('this item does not belong to store');
            $scope.showAlertAddToCartFailedConfirm();
        }
    };

    $scope.deleteFromCart = function (index) {
        $scope.cart.sum -= $scope.cart.items[index].price;
        $scope.cart.items.splice(index, 1);
    };

    $rootScope.sendCart = function () {
        console.log('called Send Cart');
        OrderService.sendCart($rootScope.cart);
    };

    $rootScope.redirectToOrderConfirm = function () {
        $location.path('/order/confirm');
    };

    $rootScope.clearCart = function () {
        $rootScope.cart = {
            items: []
        };
    };

}]);

app.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('left').close()
            .then(function () {
                $log.debug("close LEFT is done");
            });

    };

});