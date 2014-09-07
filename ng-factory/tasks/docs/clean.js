'use strict';

var gulp = require('gulp');
var config = require('./../../config'), docs = config.docs;

var rimraf = require('gulp-rimraf');

gulp.task('ng-factory:docs/clean', function() {
  return gulp.src([docs.tmp, docs.dest], {read: false})
    .pipe(rimraf());
});
