/// <reference path="home.module.ts" />

namespace themuse.home {
    export class HomeController {
        public jobs: api.Job[];
        public loadingMoreJobs: boolean;
        public loadedAllJobs: boolean;
        public company: string;
        private cancelJobsCall: ng.IDeferred<void>;
        private pageNumber: number;
        private lastPageCount: number;
        constructor(private museApi: api.MuseApi, private $q: ng.IQService) {
            this.filterChanged();
        }

        public filterChanged(): void {
            this.jobs = [];
            this.pageNumber = 0;
            this.lastPageCount = -1;
            this.loadedAllJobs = false;
            this.loadingMoreJobs = false;
            if (this.cancelJobsCall != null) {
                this.cancelJobsCall.resolve();
            }
            this.nextPage();
        }

        public nextPage(): void {
            if (this.loadingMoreJobs || this.loadedAllJobs) {
                return;
            }
            this.loadingMoreJobs = true;
            this.cancelJobsCall = this.$q.defer<void>();
            const companies: string[] = (this.company == null) ? [] : this.company.split(',').map(c => c.trim());
            this.museApi.getJobs(this.pageNumber++, [], companies, this.cancelJobsCall.promise).then((response: api.JobResponse) => {
                    this.loadingMoreJobs = false;
                    this.jobs = this.jobs.concat(response.results);
                    this.lastPageCount = response.page_count;
                    if (this.pageNumber >= this.lastPageCount) {
                        this.loadedAllJobs = true;
                    }
                }, (errorResponse: api.ErrorResponse) => {
                    console.log('Error retrieving jobs');
                    console.log(errorResponse);
                });
        }
    }

    HomeController.$inject = ['MuseApi', '$q'];

    angular.module('themuse.home')
        .controller('HomeController', HomeController);
}
