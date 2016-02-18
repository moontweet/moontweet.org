var app = angular.module("t2m");

app.factory("Api", [function() {
    return {
        baseUrl: "http://149.202.8.167:32773",
        getUrl: function(path) {
            return this.baseUrl + path;
        }
    }
}]);