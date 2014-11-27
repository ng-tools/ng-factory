'use strict';

var reload = require('browser-sync').reload;
var plumber = require('gulp-plumber');
var channels = require('gulp-ng-channels');
var path = require('path');

module.exports = function(gulp, config) {

  var docs = config.docs;
  gulp.task('ng:docs/styles', function() {
    gulp.src(docs.styles, {cwd: docs.cwd, base: docs.cwd})
      .pipe(plumber(config.plumberErrorHandler))
      .pipe(channels.styles.src(gulp, config)(docs))
      .pipe(reload({stream: true}));
  });

  var cwd = path.join(config.dirname, 'templates', 'docs');
  gulp.task('ng:docs/styles~dev', function() {
    gulp.src(docs.styles, {cwd: cwd, base: cwd})
      .pipe(plumber(config.plumberErrorHandler))
      .pipe(channels.styles.src(gulp, config)(docs))
      .pipe(reload({stream: true}));
  });

  gulp.task('ng:pages/styles', function() {
    gulp.src(docs.styles, {cwd: docs.cwd, base: docs.cwd})
      .pipe(channels.styles.dist(gulp, config)(docs));
  });

};
