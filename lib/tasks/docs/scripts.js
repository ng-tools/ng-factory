'use strict';

var reload = require('browser-sync').reload;
var plumber = require('gulp-plumber');
var channels = require('gulp-ng-channels');
var merge = require('merge-stream');
var path = require('path');

module.exports = function(gulp, config) {

  var docs = config.docs;
  var cwd = path.join(config.dirname, 'templates', 'docs');
  gulp.task('ng:docs/scripts', function() {
    return merge(gulp.src(docs.scripts, {cwd: docs.cwd, base: docs.cwd}), gulp.src(docs.scripts, {cwd: cwd, base: cwd}))
      .pipe(plumber(config.plumberErrorHandler))
      .pipe(channels.scripts.src(gulp, config)(docs))
      .pipe(reload({stream: true}));
  });

  gulp.task('ng:pages/scripts', function() {
    return gulp.src(docs.scripts, {cwd: docs.cwd, base: docs.cwd})
      .pipe(channels.scripts.dist(gulp, config)(docs, {passthrough: true}));
  });

};
