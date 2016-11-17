/**
 * Created by Tomasz on 16.11.2016.
 */
app.service('itemService', ['$http', function ($http) {

    this.getEmptyItem = function () {
        return {
            id: null,
            name: '',
            price: 0.0,
            category: '',
            description: '',
            photo: '',
            noInStock: 0,
            avgRating: 0.0
        }
    };

    this.consoleTest = function (text) {
        console.log('z serwisu' + text);
    };

    this.sendItem = function (item, storeName) {
        $http.post('http://localhost:8080/item/add/' + storeName, item)
            .success(function (response, status) {
                console.log(response);
            })
    };

    this.sendItems = function (item, stores) {
        for (var i = 0; i < stores.length; i++){
            this.sendItem(item, stores[i]);
        }
    }


}]);