/**
 * Created by Tomasz on 20.11.2016.
 */
app.service('StoreService', ['$http', function ($http) {

    var url = 'http://85.255.8.105:8080';

    //var url = 'http://localhost:8080';

    this.getStore = function (name) {
        return $http.get(url + '/store/byName/' + name)
            .then(function success(response, status) {
                return response.data;
            })
    };

    this.getStoreNames = function () {
        console.log('getStoreNames called');
        return $http.get(url + '/storys')
            .then(function success(response, status) {
                console.log(response.data);
                return response.data;
            })
    };

    this.getCategories = function () {
        return $http.get(url + '/category/all')
            .then(function success(response, status) {
                return response.data;
            })
    };

    this.getOrders = function (name) {
        return $http.get(url + '/store/orders/' + name)
            .then(function success(response, status) {
                return response.data;
            });
    };

    this.editStore = function (editedStore) {
        return $http.put(url + '/store/edit', editedStore)
            .then(function success(response, status) {
                return response.data;
            });
    };


}]);