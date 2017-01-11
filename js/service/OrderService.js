/**
 * Created by Tomasz on 25.12.2016.
 */
app.service('OrderService', ['$http', function ($http) {

    //var url = 'http://localhost:8080';

    var url = 'http://85.255.8.105:8080';

    this.sendCart = function (cart) {
        return $http.post(url + '/order/cart', cart)
            .then(function success(response, status) {
                return response.data;
            })
    };

    this.getOrdersByUsername = function (username) {
        return $http.get(url + '/order/get/' + username)
            .then(function success(response, status) {
                return response.data;
            })
    };

}]);