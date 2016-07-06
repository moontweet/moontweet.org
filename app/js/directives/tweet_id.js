var app = angular.module("t2m");

app.directive("tweetId", ['$timeout', '$state', function ($timeout, $state) {
    return {
        restrict: "EA",
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
        link: function (scope, el, attr) {


            scope.$watch(
                function () {
                    return attr["tweetId"];
                },
                function (tid) {
                    if (tid)
                        injectTweet(attr["tweetId"], scope)
                }
            )

            function injectTweet(id, scope) {
                $("#embed-tweet").children().remove();
                twttr.ready(function () {

                    twttr.widgets.createTweet(id, $("#embed-tweet")[0]).then(function () {
                        var i = $(".twitter-tweet")[0]


                        if ($(i.shadowRoot).find('.Icon--playCircle').length > 0) {
                            $(i.shadowRoot).find('.Icon--playCircle').click();
                            $(i.shadowRoot).find('.MediaCard-mediaAsset').appendTo('.text-container').addClass('tweet-image')
                        } else {
                            $(i.shadowRoot).find('.mediacard img').appendTo('.text-container').addClass('tweet-image')
                        }

                        $(i.shadowRoot).find('.Tweet-text').appendTo('.text-container').addClass('tweet-text');
                        $(".author-link").attr("href", "https://www.twitter.com/" + $state.params.sname);
                        $('.author').html($(i.shadowRoot).find('.TweetAuthor-name').text())
                        $('.date').html($(i.shadowRoot).find('.dt-updated').text())
                        $('.author-picture').css('background-image', "url(" + $(i.shadowRoot).find('.Avatar').attr('src') + ")")

                        el.velocity({opacity: 1}, 1000);
                        el.parent().find(".mono-text").velocity({opacity: 1}, 1000)
                        $timeout(function () {
                            scope.ready = true;
                            scope.screen_name = $state.params.sname;
                            scope.tweet_text = "This tweet by @" + scope.screen_name + " is going to be sent to the moon!"
                        })

                    })

                })
            }

            el.on("$destroy", function () {
                $("#embed-tweet").children().remove();
            })

        }
    }
}]);
