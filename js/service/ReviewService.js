/**
 * Created by Tomasz on 22.11.2016.
 */
app.service('ReviewService', ['$http', function ($http) {

    //var url = 'http://localhost:8080';

    var url = 'http://85.255.8.105:8080';

    this.getReviews = function (itemName) {
        return $http.get(url + '/review/' + itemName)
            .then(function success(response, status) {
                return response.data;
            })
    };

    this.sendReview = function (review, id) {
        $http.post(url + '/review/add/' + id, review)
            .success(function (response, status) {
                console.log(response);
            });
    }

}]);