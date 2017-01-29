/// <reference path="home.module.ts" />

namespace themuse.home {
    export class HomeController {
        constructor() {

        }
    }

    HomeController.$inject = [];

    angular.module('themuse.home')
        .controller('HomeController', HomeController);
}
