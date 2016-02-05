var app = angular.module("t2m");

app.controller("mainController", ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {
    $scope.$state = $state;
    $scope.tweetText = "Hi Mom! I'm on the moon! \n\nLorem Ipsum Lorem  bla bla bla Ipsum Lorem  bla bla bla scemo chi legge!";

    $scope.openMobileEditor = function() {
        $rootScope.$broadcast('mobile:editor:open')
    };

    $scope.closeMobileEditor = function() {
        $rootScope.$broadcast('mobile:editor:close')
    };
}]);