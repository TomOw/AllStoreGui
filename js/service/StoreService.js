/**
 * Created by Tomasz on 20.11.2016.
 */
app.service('StoreService', ['$http', function ($http) {

    this.getStore = function () {
        return $http.get('http://localhost:8080/store/Apple')
            .then(function success(response, status) {
                return response.data;
            })
    };

    this.getStoreNames = function () {
        console.log('getStoreNames called');
        return $http.get('http://localhost:8080/storys')
            .then(function success(response, status) {
                console.log(response.data);
                return response.data;
            })
    };


}]);