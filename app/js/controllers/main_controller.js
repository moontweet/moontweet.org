var app = angular.module("t2m");

app.controller("mainController", ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {
    $scope.$state = $state;
    $scope.tweetText = "#moondelivery";

    $scope.openMobileEditor = function() {
        $rootScope.$broadcast('mobile:editor:open')
    };

    $scope.closeMobileEditor = function() {
        $rootScope.$broadcast('mobile:editor:close')
    };
}]);