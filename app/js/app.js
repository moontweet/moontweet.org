var app = angular.module("t2m", ["ui.router", "angularMoment"]);


app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise("/");
    //
    // Now set up the states
    $stateProvider
        .state('home', {
            url: "/",
            views: {
                'header': {
                    templateUrl: "views/partials/header_home.html"
                },
                'container': {
                    templateUrl: "views/pages/home.html",
                    //controller: "HomeController"
                }
            },
            animation: true
        })
        .state('tweets', {
            url: "/tweets/:id",
            views: {
                'header': {
                    templateUrl: "views/partials/header_nav.html"
                },
                'container': {
                    templateUrl: "views/pages/show.html",
                    //controller: "HomeController"
                }
            },
            animation: true
        })
        .state('how', {
            url: "/how",
            views: {
                'header': {
                    templateUrl: "views/partials/header_nav.html"
                },
                'container': {
                    templateUrl: "views/pages/how.html",
                    //controller: "HomeController"
                }
            },
            animation: false
        })
}]);

function angularget(name) {
    return angular.element($("body")[0]).injector().get(name)
}
