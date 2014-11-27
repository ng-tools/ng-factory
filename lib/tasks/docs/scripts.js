'use strict';

var reload = require('browser-sync').reload;
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var merge = require('merge-stream');
var path = require('path');

module.exports = function(gulp, config) {

  var channels = config.channels;

  var docs = config.docs;
  var cwd = path.join(config.dirname, 'templates', 'docs');
  gulp.task('ng:docs/scripts', function() {
    return merge(gulp.src(docs.scripts, {cwd: docs.cwd, base: docs.cwd}), gulp.src(docs.scripts, {cwd: cwd, base: cwd}))
    // gulp.src(docs.scripts, {cwd: docs.cwd, base: docs.cwd})
      .pipe(plumber(function(error) {
        // @cf https://github.com/floatdrop/gulp-plumber/issues/8
        gutil.log(gutil.colors.red(error.message));
        this.emit('end');
      }))
      .pipe(channels.scripts.src(docs))
      .pipe(reload({stream: true}));
  });

  gulp.task('ng:pages/scripts', function() {
    return gulp.src(docs.scripts, {cwd: docs.cwd, base: docs.cwd})
      .pipe(channels.scripts.dist(docs));
  });

};
