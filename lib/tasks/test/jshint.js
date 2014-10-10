'use strict';

var gulp = require('gulp');
var config = require('./../../config'), src = config.src;

var jshint = require('gulp-jshint');

gulp.task('ng-factory:test/jshint', function() {
  return gulp.src(src.test, {cwd: src.cwd})
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});
