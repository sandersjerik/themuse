/// <reference path="api.module.ts" />

namespace themuse.api {
    const API_KEY: string = '5610ac1502ff33f6ca51eb9f68661f59d6bb972024d888e786e69f49454303d4';
    const BASE_URL: string = 'https://api-v2.themuse.com/';
    export class MuseApi {
        constructor(private $http: ng.IHttpService, private $q: ng.IQService) {
        }

        public getJobs(page: number = 0, locations: string[] = [], companies: string[] = [], cancelPromise?: ng.IPromise<void>): MusePromise<JobResponse> {
            let url: string = BASE_URL + 'jobs?api_key=' + API_KEY + '&descending=true';
            url += '&page=' + page;
            for (let location of locations) {
                url += '&location=' + encodeURIComponent(location);
            }
            for (let company of companies) {
                url += '&company=' + encodeURIComponent(company);
            }
            return this.$http.get<JobResponse>(url, { timeout: cancelPromise })
                    .then((response: ng.IHttpPromiseCallbackArg<JobResponse>) => {
                        return response.data;
                    }, (errorResponse: ng.IHttpPromiseCallbackArg<ErrorResponse>) => {
                        return this.$q.reject(errorResponse.data);
                    });
        }

        public getJob(id: string | number): MusePromise<Job> {
            let url: string = BASE_URL + 'jobs/' + id + '?api_key=' + API_KEY;
            return this.$http.get<Job>(url)
                    .then((response: ng.IHttpPromiseCallbackArg<Job>) => {
                        return response.data;
                    }, (errorResponse: ng.IHttpPromiseCallbackArg<ErrorResponse>) => {
                        return this.$q.reject(errorResponse.data);
                    });
        }
    }

    function museApiConfig($http: ng.IHttpService, $q: ng.IQService) {
        return new MuseApi($http, $q);
    }

    museApiConfig.$inject = ['$http', '$q'];

    angular.module('themuse.api')
        .factory('MuseApi', museApiConfig);
}