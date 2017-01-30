namespace themuse {
    angular.module('themuse', [
        'ngRoute',
        'ngSanitize',
        'themuse.api',
        'themuse.home',
        'themuse.job'
    ]);
}