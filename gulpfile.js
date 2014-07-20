'use strict';

var gulp = require('gulp');
var run = require('run-sequence');

// Load ngFactory tasks
require('./gulp');

gulp.task('build', ['dist']);

gulp.task('dist', function() {
  run('ng-factory:clean(dist)', ['ng-factory:templates(dist)', 'ng-factory:styles~less(dist)', 'ng-factory:scripts(dist)']);
});

gulp.task('pages', function() {
  run('ng-factory:clean(pages)', ['ng-factory:templates(pages)', 'ng-factory:styles~less(pages)', 'ng-factory:scripts(pages)']);
});


// var runSequence = require('run-sequence');
// gulp.task('default', ['dist']);
// gulp.task('build', ['dist']);
// gulp.task('test', function() {
//   runSequence('clean:test', 'templates:test', ['jshint', 'karma:unit']);
// });
// gulp.task('test:server', function() {
//   runSequence('clean:test', 'templates:test', 'karma:server');
// });
// gulp.task('dist', function() {
//   runSequence('clean:dist', ['templates:dist', 'scripts:dist']);
// });
// gulp.task('pages', function() {
//   runSequence('clean:pages', 'styles:docs', 'views:pages', ['templates:pages', 'scripts:pages', 'copy:pages']);
// });
// gulp.task('serve', function() {
//   runSequence('clean:tmp', ['styles:docs', 'connect:docs'], ['open:docs', 'watch:docs']); // , 'watch:dev'
// });
// gulp.task('serve:pages', ['connect:pages', 'open:pages']);
