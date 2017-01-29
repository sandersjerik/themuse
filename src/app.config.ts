/// <reference path="app.module.ts" />

namespace themuse {
    angular
        .module('themuse')
        .config(themuseConfig);

    themuseConfig.$inject = ['$routeProvider', '$locationProvider'];

    function themuseConfig($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider) {
        $routeProvider.otherwise({ redirectTo: '/home' });
        $locationProvider.hashPrefix('!').html5Mode(true);
    }
}
