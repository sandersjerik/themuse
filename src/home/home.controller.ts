/// <reference path="home.module.ts" />

namespace themuse.home {
    export class HomeController {
        public jobs: api.Job[];
        constructor(private museApi: api.MuseApi) {
            museApi.getJobs().then((response: api.JobResponse) => {
                    console.log(response);
                    this.jobs = response.results;
                }, (errorResponse: api.ErrorResponse) => {
                    console.log('Error retrieving jobs');
                    console.log(errorResponse);
                });
        }
    }

    HomeController.$inject = ['MuseApi'];

    angular.module('themuse.home')
        .controller('HomeController', HomeController);
}
