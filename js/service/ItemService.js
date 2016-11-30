/**
 * Created by Tomasz on 16.11.2016.
 */
app.service('ItemService', ['$http', function ($http) {

    //var url = 'http://localhost:8080';

    var url = 'http://85.255.8.105:8080';

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
        $http.post(url + '/item/add/' + storeName, item)
            .success(function (response, status) {
                console.log(response);
            })
    };

    this.sendItems = function (item, stores) {
        for (var i = 0; i < stores.length; i++){
            this.sendItem(item, stores[i]);
        }
    };

    this.getCheapestOffer = function (itemName) {
        return $http.get(url + '/item/cheapest/' + itemName)
            .then(function success(response, status) {
                return response.data;
            })
    };

    this.getOffers = function (itemName) {
        return $http.get(url + '/item/offers/' + itemName)
            .then(function success(response, status) {
                return response.data;
            })
    };

    this.getItemById = function (id) {
        return $http.get(url + '/item/byId' + id)
            .then(function success(response, status) {
                return response.data;
            })
    };

    this.getItemsByName = function (name) {
        return $http.get(url + '/item/byName/' + name)
            .then(function success(response, status) {
                return response.data;
            })
    };


}]);