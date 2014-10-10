'use strict';

var gulp = require('gulp');
var config = require('./../../config');

var bump = require('gulp-bump');

gulp.task('ng-factory:src/bump', function () {
  return gulp.src('*.json', { cwd : config.cwd })
    .pipe(bump())
    .pipe(gulp.dest(config.cwd));
});
