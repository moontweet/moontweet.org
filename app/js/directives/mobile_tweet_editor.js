var app = angular.module("t2m");

app.directive("mobileTweetEditor", [function() {
    return {
        restrict: "EA",
        templateUrl: "views/partials/mobile_tweet.html",
        link: function(scope, el) {

            scope.$on("mobile:editor:open", function() {
                el.children().first().velocity("transition.slideUpBigIn", 350)
            });

            scope.$on("mobile:editor:close", function() {
                el.children().first().velocity("transition.slideDownBigOut", 350)
            })

        }
    }
}]);