'use strict';

var gulp = require('gulp');
var config = require('./../../config');

var rimraf = require('gulp-rimraf');

gulp.task('ng-factory:src/clean', function() {
  return gulp.src([config.src.tmp, config.src.dest], {read: false})
    .pipe(rimraf());
});
