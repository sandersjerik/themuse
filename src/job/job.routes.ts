/// <reference path="job.module.ts" />

namespace themuse.job {
    export const JOB_ID_ROUTE_PARAM: string = 'jobid';
    angular.module('themuse.job')
        .config(jobRoutes);

    jobRoutes.$inject = ['$routeProvider'];

    function jobRoutes($routeProvider: ng.route.IRouteProvider): void {
        $routeProvider.when('/jobs/:' + JOB_ID_ROUTE_PARAM, {
            templateUrl: 'public/job.html',
            controller: JobController,
            controllerAs: 'vm'
        })
    }
}
