'use strict';

var gulp = require('gulp');
var config = require('./../../config'), src = config.src;

var jshint = require('gulp-jshint');

gulp.task('ng-factory:src/jshint', function() {
  return gulp.src(src.scripts, {cwd: src.cwd})
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});
