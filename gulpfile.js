'use strict';

var gulp = require('gulp');
var seqTask = require('./ng-factory/sequenceGulpTask');

// Load ngFactory tasks
require('./ng-factory');

gulp.task('build', ['dist']);
gulp.task('serve', ['docs']);

seqTask('docs', [
  'ng-factory:clean/docs(tmp)',
  [
    'ng-factory:views/docs(tmp)',
    'ng-factory:scripts/docs(tmp)',
    'ng-factory:styles/docs(tmp)',
    'ng-factory:connect/docs(tmp)'
  ],
  [
    'ng-factory:watch/docs'
    //, 'ng-factory:open/docs'
  ]
]);

seqTask('dist', [
  'ng-factory:readme/src',
  'ng-factory:clean/src(dist)',
  [
    'ng-factory:templates/src(dist)',
    'ng-factory:styles/src(dist)~less',
    'ng-factory:scripts/src(dist)'
  ]
]);

seqTask('pages', [
  'ng-factory:clean/docs(pages)',
  [
    'ng-factory:views/docs(pages)',
    'connect:src'
  ],
  [
    'open:src',
    'watch:src'
  ]
]);

seqTask('lint', [
  'ng-factory:jshint(src)',
  'ng-factory:jshint(test)'
]);

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
