/**
 * Created by Tomasz on 07.11.2016.
 */

app.controller('TestCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.test = 'testMsg';

    $scope.getStore = function () {
        $http.get('http://localhost:8080/store/store')
            .success(function (response, status) {
                console.log('z geta' + response.toString());
                console.log('z geta' + response);
                $scope.store = response.toString();
                $scope.raw = response;
            })
    };

}]);