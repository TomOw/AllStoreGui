/**
 * Created by Tomasz on 08.11.2016.
 */

app.controller('AppCtrl', ['$scope', '$rootScope', '$timeout', '$mdSidenav', '$mdDialog', '$log', 'ItemService', function ($scope, $rootScope, $timeout, $mdSidenav, $mdDialog, $log, ItemService) {

    $scope.msg = 'working msg';

    $scope.val = 10;

    if ($rootScope.cart == undefined || $rootScope.cart.items == undefined) {
        $rootScope.cart = {
            items: []
        };
    }

    $scope.getItemsByName = function () {
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

    $scope.showAlert = function(ev) {
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


    $scope.addItemToCart = function (item, offer) {
        if ($rootScope.cart.sum == undefined) {
            $rootScope.cart.sum = 0;
        }
        $rootScope.cart.sum += offer.itemPrice;
        priceChange(item, offer);
        var itemToPush = {};
        angular.copy(item, itemToPush);
        $rootScope.cart.items.push(itemToPush);
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