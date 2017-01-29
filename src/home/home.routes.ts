/// <reference path="home.module.ts" />

namespace themuse.home {
    angular.module('themuse.home')
        .config(homeRoutes);

    homeRoutes.$inject = ['$routeProvider'];

    function homeRoutes($routeProvider: ng.route.IRouteProvider): void {
        $routeProvider.when('/home', {
            templateUrl: 'public/home.html',
            controller: HomeController,
            controllerAs: 'vm'
        })
    }
}
