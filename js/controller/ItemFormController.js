/**
 * Created by Tomasz on 08.11.2016.
 */

app.controller('ItemFormController', ['$scope', '$http', '$mdDialog', function ($scope, $http, $mdDialog) {

    $scope.test = 'testMsg';

    $scope.getStore = function () {
        $http.get('http://localhost:8080/store/eigth')
            .success(function (response, status) {
                console.log('z geta' + response.toString());
                console.log('z geta' + response);
                console.log(response);
                $scope.store = response;
                //$scope.raw = data;
            })
    };

    $scope.getCategories = function () {
        $http.get('http://localhost:8080/categories')
            .success(function (response, status) {
                $scope.categories = response;
            })
    };

    $scope.showPrompt = function(ev) {
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

        $mdDialog.show(confirm).then(function(result) {
            $scope.newCategory = result;
            $scope.item.category = result;
            if($scope.categories == undefined) {
                $scope.categories = [];
                $scope.categories.push(result);
            } else {
                $scope.categories.push(result);
            }
        }, function() {
            $scope.status = '';
        });
    };

    $scope.store = {
        id: 0,
        name: '',
        rating: 0.0,
        noOfOrdersMade: 0,
        noOfRates: 0,
        storeAddress: {
            id: 0,
            country: '',
            city: '',
            street: '',
            number: '',
            postalCode: ''
        },
        items: [],
        orders: []
    };

    $scope.smth = 'gasg';


    //checkboxes
    $scope.items = [1,2,3,4,5];
    $scope.selected = [1];
    $scope.toggle = function (item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) {
            list.splice(idx, 1);
        }
        else {
            list.push(item);
        }
    };

    $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
    };

    $scope.isIndeterminate = function() {
        return ($scope.selected.length !== 0 &&
        $scope.selected.length !== $scope.items.length);
    };

    $scope.isChecked = function() {
        return $scope.selected.length === $scope.items.length;
    };

    $scope.toggleAll = function() {
        if ($scope.selected.length === $scope.items.length) {
            $scope.selected = [];
        } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
            $scope.selected = $scope.items.slice(0);
        }
    };


}]);