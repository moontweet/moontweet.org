var app = angular.module("t2m");

app.directive("intro", ['$state', function($state) {
    return {
        restrict: "A",
        link: function(scope, el) {

            if ($state.params.a == 0 || window.outerWidth < 500) return;

            $('header, #stars, .card, .desktop .headline, .desktop .counter, .desktop .scroll-mouse').hide();

            $.Velocity.animate($('#headline1'), "fadeIn", {delay: 1000, duration: 1000})
                .then(function () {
                    return $.Velocity.animate($('#headline1'), "fadeOut", {delay: 1000, duration: 1000})
                })
                .then(function() {
                    return $.Velocity.animate($('#headline2'), "fadeIn", {delay: 100, duration: 1000})
                })
                .then(function() {
                    return $.Velocity.animate($('#headline2'), "fadeOut", {delay: 1000, duration: 1000})
                })
                .then(function() {
                    $.Velocity.animate($('#stars'), "fadeIn", {delay: 100, duration: 1000})
                    $.Velocity.animate($('.card'), "fadeIn", {delay: 1500, duration: 1000})
                    $.Velocity.animate($('.counter'), "fadeIn", {delay: 2000, duration: 1000})
                    $.Velocity.animate($('.scroll-mouse'), "fadeIn", {delay: 2000, duration: 1000})
                    $.Velocity.animate($('header'), "fadeIn", {delay: 2000, duration: 1000})
                })

        }
    }
}]);