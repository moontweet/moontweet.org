var app = angular.module("t2m");

app.controller("homeController", ['$scope', function($scope) {

    $scope.textLength = function(text) {
        return (text.length + (text.match(/\n/g)||[]).length)
    }
}]);