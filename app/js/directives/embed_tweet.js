var app = angular.module("t2m");

app.directive("embedTweet", ['$timeout', function ($timeout) {
    return {
        restrict: "A",
        controller: function () {
            window.twttr = (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0],
                    t = window.twttr || {};
                if (d.getElementById(id)) return t;
                js = d.createElement(s);
                js.id = id;
                js.src = "https://platform.twitter.com/widgets.js";
                fjs.parentNode.insertBefore(js, fjs);

                t._e = [];
                t.ready = function (f) {
                    t._e.push(f);
                };

                return t;
            }(document, "script", "twitter-wjs"));

        },
        scope: {
            embedTweet: "@"
        },
        link: function (scope, el, attr) {
            scope.ready = false;
            scope.$watch("embedTweet", function () {
                if (scope.embedTweet)
                    injectTweet(el.find("#tweet-content"), scope.embedTweet, function () {
                        $timeout(function() {
                            console.log(arguments)
                            console.log("ready")
                            scope.ready = true;
                            el.find("#tweet-content").velocity("transition.fadeIn", 700)
                            el.find('p').velocity("transition.fadeIn", 700)
                        })

                    });
            });


            el.on("$destroy", function () {
                $("#embed-tweet").children().remove();
            })

        }
    }

    function injectTweet(el, id, cb) {
        el.children().remove();
        twttr.ready(function () {

            twttr.widgets.createTweet(id, el[0]).then(
                cb,
                function() { 
                    console.log("error")
                }
            )

        })
    }
}]);


