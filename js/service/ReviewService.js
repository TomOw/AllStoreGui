/**
 * Created by Tomasz on 22.11.2016.
 */
app.service('ReviewService', ['$http', function ($http) {

    this.getReviews = function (itemName) {
        return $http.get('http://localhost:8080/review/' + itemName)
            .then(function success(response, status) {
                return response.data;
            })
    };

}]);