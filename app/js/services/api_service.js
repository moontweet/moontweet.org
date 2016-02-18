var app = angular.module("t2m");

app.factory("Api", [function() {
    return {
        baseUrl: "http://localhost:5000",
        getUrl: function(path) {
            return this.baseUrl + path;
        }
    }
}]);