/// <reference path="job.module.ts" />

namespace themuse.job {
    export class JobController {
        public job: api.Job;
        constructor(private museApi: api.MuseApi, $routeParams: ng.route.IRouteParamsService) {
            const jobId: string = $routeParams[JOB_ID_ROUTE_PARAM];
            console.log(jobId);
            museApi.getJob(jobId).then((response: api.Job) => {
                    console.log(response);
                    this.job = response;
                }, (errorResponse: api.ErrorResponse) => {
                    console.log('Error retrieving jobs');
                    console.log(errorResponse);
                });
        }
    }

    JobController.$inject = ['MuseApi', '$routeParams'];

    angular.module('themuse.job')
        .controller('JobController', JobController);
}
