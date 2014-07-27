'use strict';

var gulp = require('gulp');
var config = require('./../../config');
var rimraf = require('gulp-rimraf');

gulp.task('ng-factory:clean/src(dist)', function() {
  return gulp.src([config.src.dist], {read: false})
    .pipe(rimraf());
});
