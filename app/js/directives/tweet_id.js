var app = angular.module("t2m");

app.directive("tweetId", [function() {
    return {
        restrict: "EA",
        controller: function() {
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
        link: function(scope, el, attr) {

            scope.$watch(
                function() {
                    return attr["tweetId"];
                },
                function(tid) {
                    if (tid)
                        injectTweet(attr["tweetId"])
                }
            )

            function injectTweet(id) {
                $("#embed-tweet").children().remove();
                twttr.ready(function () {
                    console.log("ready")
                    twttr.widgets.createTweet(id, $("#embed-tweet")[0]).then(function () {
                        var i = $(".twitter-tweet")[0]

                        $(i.contentDocument).find('.mediacard img').appendTo('.text-container').addClass('tweet-image')
                        $(i.contentDocument).find('.tweet-text').appendTo('.text-container').addClass('tweet-text')
                        $('.author').html($(i.contentDocument).find('.tweetauthor-name').text())
                        $('.date').html($(i.contentDocument).find('.dt-updated').text())
                        $('.author-picture').css('background-image', "url(" + $(i.contentDocument).find('.avatar').attr('src') + ")")

                        el.velocity({opacity: 1}, 1000)
                        el.parent().find(".mono-text").velocity({opacity: 1}, 1000)
                    })

                })
            }

            el.on("$destroy", function() {
                $("#embed-tweet").children().remove();
            })

        }
    }
}]);
