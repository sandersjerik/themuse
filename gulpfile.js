'use strict';

var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

const outputDir = 'public/';

gulp.task('build', ['buildts', 'copyhtml']);

gulp.task('buildts', ['clean'], () => {
    return tsProject.src()
        .pipe(sourcemaps.init())
            .pipe(tsProject())
            .js
            .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(outputDir));
});

gulp.task('copyhtml', ['clean'], () => {
    return gulp.src('src/**/*.html')
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest(outputDir));
});

gulp.task('clean', () => {
    return del(outputDir);
});

gulp.task('watch', () => {
    return gulp.watch('src/**/*', ['build']);
});