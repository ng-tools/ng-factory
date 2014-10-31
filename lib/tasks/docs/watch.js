'use strict';

var path = require('path');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

module.exports = function(gulp, config) {

  var docs = config.docs;
  gulp.task('ng:docs/watch', function() {
    watch(docs.scripts, {cwd: docs.cwd}, function(files) {
      return gulp.start('ng:docs/scripts');
    });
    watch(docs.styles.replace('styles/*.', 'styles/**/*.'), {cwd: docs.cwd}, function(files) {
      return gulp.start('ng:docs/styles');
    });
    watch([docs.index, docs.views], {cwd: docs.cwd}, function(files) {
      return gulp.start('ng:docs/views');
    });
  });

  var cwd = path.join(config.dirname, 'templates', 'docs');
  gulp.task('ng:docs/watch~dev', function() {
    watch(docs.scripts, {cwd: cwd}, function(files) {
      return gulp.start('ng:docs/scripts');
    });
    watch(docs.styles.replace('styles/*.', 'styles/**/*.'), {cwd: cwd}, function(files) {
      return gulp.start('ng:docs/styles');
    });
    watch([docs.index, docs.views], {cwd: cwd}, function(files) {
      return gulp.start('ng:docs/views');
    });
  });

};
