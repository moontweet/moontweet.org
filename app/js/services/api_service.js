var app = angular.module("t2m");

app.factory("Api", [function() {
    return {
        baseUrl: "http://api.moontweet.org",
        getUrl: function(path) {
            return this.baseUrl + path;
        }
    }
}]);
