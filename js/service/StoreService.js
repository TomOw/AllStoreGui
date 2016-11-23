/**
 * Created by Tomasz on 20.11.2016.
 */
app.service('StoreService', ['$http', function ($http) {

    var url = 'http://85.255.8.105:8080';

    this.getStore = function () {
        return $http.get(url + '/store/Apple')
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
        return $http.get(url + '/categories')
            .then(function  success(response, status) {
                return response.data;
            })
    };


}]);