/// <reference path="api.module.ts" />

namespace themuse.api {
    class ListResponse<T> {
        public page_count: number;
        public page: number;
        public results: T[];
    }

    export class JobResponse extends ListResponse<Job> {
        public took: number;
        public timed_out: boolean;
        public total: number;
    }

    export class Job {
        /** HTML string with job description */
        public contents: string;
        public name: string;
        public type: string;
        public publication_date: Date;
        public short_name: string;
        public model_type: "jobs";
        public id: number;
        public locations: Location[];
        public categories: Category[];
        public levels: Level[];
        public tags: Tag[];
        public refs: Ref[];
        public company: Company;
    }

    export class Location {
        public name: string;
    }

    export class Category {
        public name: string;
    }

    export class Level {
        public name: string;
        public short_name: string;
    }

    export class Tag {
        public name: string;
        public short_name: string;
    }

    export class Ref {
        public landing_page: string;
    }

    export class Company {
        public id: number;
        public short_name: string;
        public name: string;
    }

    export class ErrorResponse {
        public code: number;
        public error: string;
    }

    export interface MusePromise<T> extends ng.IPromise<T> {
        then<TResult>(successCallback: (promiseValue: T) => ng.IPromise<TResult>|TResult, errorCallback?: (reason: ErrorResponse) => any, notifyCallback?: (state: any) => any): ng.IPromise<TResult>;
    }
}
