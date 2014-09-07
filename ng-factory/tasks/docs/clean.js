'use strict';

var gulp = require('gulp');
var config = require('./../../config');
var rimraf = require('gulp-rimraf');

gulp.task('ng-factory:clean/docs(pages)', function() {
  return gulp.src(config.docs.dest, {read: false})
    .pipe(rimraf());
});

gulp.task('ng-factory:clean/docs(tmp)', function() {
  return gulp.src(config.docs.tmp, {read: false})
    .pipe(rimraf());
});
