'use strict';

var gulp = require('gulp');
var run = require('run-sequence');

// Load ngFactory tasks
require('./ng-factory');

gulp.task('build', ['dist']);

gulp.task('dist', function() {
  run('ng-factory:clean/src(dist)', ['ng-factory:templates/src(dist)', 'ng-factory:styles/src(dist)~less', 'ng-factory:scripts/src(dist)']);
});

gulp.task('pages', function() {
  run('ng-factory:clean/docs(pages)', ['ng-factory:templates/docs(pages)', 'ng-factory:styles/docs(pages)~less', 'ng-factory:scripts/docs(pages)']);
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
