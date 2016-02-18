var app = angular.module("t2m");

app.controller("tweetsController", ['$scope', '$state', '$http', 'Api', function($scope, $state, $http, Api) {
    var sname = $state.params.sname;

    $http.get(Api.getUrl("/tweets/" + sname)).then(
        function(res) {
            $scope.tweetID = res.data.lastTweet;
        },
        function(error) {
            console.log("[Error] Api call failed")
        }
    )


}]);