var app = angular.module("t2m");

app.directive("stamp", [function() {
    return {
        restrict: "EA",
        templateUrl: "images/stamp.svg"
    }
}]);