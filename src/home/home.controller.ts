/// <reference path="home.module.ts" />

namespace themuse.home {
    export class HomeController {
        public jobs: api.Job[] = [];
        public loadingMoreJobs: boolean = false;
        public loadedAllJobs: boolean = false;
        private pageNumber: number = 0;
        private lastPageCount: number = -1;
        constructor(private museApi: api.MuseApi) {
            this.nextPage();
        }

        public nextPage(): void {
            if (this.loadingMoreJobs || this.loadedAllJobs) {
                return;
            }
            this.loadingMoreJobs = true;
            this.museApi.getJobs(this.pageNumber++, ['blah']).then((response: api.JobResponse) => {
                    this.loadingMoreJobs = false;
                    this.jobs = this.jobs.concat(response.results);
                    this.lastPageCount = response.page_count;
                    if (this.lastPageCount === this.pageNumber) {
                        this.loadedAllJobs = true;
                    }
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
