'use strict';

var gulp = require('gulp');
var run = require('run-sequence');

// Load ngFactory tasks
require('./gulp/clean/dist.js');
require('./gulp/templates/dist.js');
require('./gulp/scripts/dist.js');
// var config = require('gulp/config.js');

gulp.task('build', ['dist']);

gulp.task('dist', function() {
  run('ng-factory:clean(dist)', ['ng-factory:templates(dist)', 'ng-factory:scripts(dist)']);
});


