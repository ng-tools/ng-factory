/**
 * Here is my custom tasks for the pages processing
 */

'use strict';


var gulp = require('gulp');
var run = require('run-sequence');

gulp.task('my:doc/watch', function(){

  gulp.watch('docs/bower.json', ['ng-factory:docs/resolveDocsDependencies']);

  gulp.watch([
    'docs/*',
    '!docs/bower.json',

    'src/*/*',
    'src/*/docs/**/*'
  ], ['pages:update']);

});

