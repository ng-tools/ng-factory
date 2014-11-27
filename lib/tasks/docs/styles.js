'use strict';

var reload = require('browser-sync').reload;
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var path = require('path');

module.exports = function(gulp, config) {

  var channels = config.channels;

  var docs = config.docs;
  gulp.task('ng:docs/styles', function() {
    gulp.src(docs.styles, {cwd: docs.cwd, base: docs.cwd})
      .pipe(plumber(function(error) {
        // @cf https://github.com/floatdrop/gulp-plumber/issues/8
        gutil.log(gutil.colors.red(error.message));
        this.emit('end');
      }))
      .pipe(channels.styles.src(docs))
      .pipe(reload({stream: true}));
  });

  var cwd = path.join(config.dirname, 'templates', 'docs');
  gulp.task('ng:docs/styles~dev', function() {
    gulp.src(docs.styles, {cwd: cwd, base: cwd})
      .pipe(plumber(function(error) {
        // @cf https://github.com/floatdrop/gulp-plumber/issues/8
        gutil.log(gutil.colors.red(error.message));
        this.emit('end');
      }))
      .pipe(channels.styles.src(docs))
      .pipe(reload({stream: true}));
  });

  gulp.task('ng:pages/styles', function() {
    gulp.src(docs.styles, {cwd: docs.cwd, base: docs.cwd})
      .pipe(channels.styles.dist(docs));
  });

};
