'use strict';

var gulp = require('gulp');
var run = require('run-sequence');

// Load ngFactory tasks
require('./ng-factory');

gulp.task('build', ['dist']);
gulp.task('serve', ['docs']);

gulp.task('readme', function() {
  run('ng-factory:docs/ngdocs', 'ng-factory:docs/readme');
});

gulp.task('dist', function() {
  run('ng-factory:src/clean', ['ng-factory:src/templates', 'ng-factory:src/styles', 'ng-factory:src/scripts']);
});

gulp.task('docs', function() {
  run(
    'ng-factory:docs/clean',
    ['ng-factory:docs/views', 'ng-factory:docs/scripts', 'ng-factory:docs/styles', 'ng-factory:docs/connect'],
    ['ng-factory:docs/watch', 'ng-factory:docs/open']
  );
});

gulp.task('pages', function() {
  run('ng-factory:clean/docs(pages)', ['ng-factory:views/docs(pages)', 'connect:src'], ['open:src', 'watch:src']);
});

gulp.task('lint', function() {
  return run(['ng-factory:jshint(src)', 'ng-factory:jshint(test)']);
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
