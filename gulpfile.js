'use strict';

var gulp = require('gulp');
var run = require('run-sequence');

// Load ngFactory tasks
require('gulp/index.js');
// var config = require('gulp/config.js');

gulp.task('build', ['dist']);

gulp.task('dist', function() {
  run('ng-factory:clean(dist)', ['ng-factory:templates(dist)', 'ng-factory:scripts(dist)']);
});


