'use strict';

var gulp = require('gulp');
var config = require('./../../config');

var rimraf = require('gulp-rimraf');

gulp.task('ng-factory:docs/clean', function() {
  return gulp.src([config.docs.tmp, config.docs.dest], {read: false})
    .pipe(rimraf());
});
