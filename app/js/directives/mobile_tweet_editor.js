var app = angular.module("t2m");

app.directive("mobileTweetEditor", [function() {
    return {
        restrict: "EA",
        templateUrl: "views/partials/mobile_tweet.html",
        link: function(scope, el) {

            //$(el).find("textarea").on("focus", function() {
            //    var h = $(el).find(".mobile-tweet-editor").height();
            //    $(el).find(".mobile-tweet-editor").height(h - 100)
            //})



            scope.$on("mobile:editor:open", function() {
                el.children().first().velocity("transition.slideUpBigIn", 350)
            });

            scope.$on("mobile:editor:close", function() {
                el.children().first().velocity("transition.slideDownBigOut", 350)
            })

        }
    }
}]);