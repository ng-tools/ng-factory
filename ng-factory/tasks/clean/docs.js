'use strict';

var gulp = require('gulp');
var config = require('./../../config');
var rimraf = require('gulp-rimraf');

gulp.task('ng-factory:clean/docs(pages)', function() {
  return gulp.src([config.src.pages], {read: false})
    .pipe(rimraf());
});
