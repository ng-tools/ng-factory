'use strict';

var merge = require('merge-stream');
var reload = require('browser-sync').reload;
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');

module.exports = function(gulp, config) {

  var channels = config.channels;

  var src = config.src;
  gulp.task('ng:src/views', function() {
    var views = gulp.src(src.views, {cwd: src.cwd, base: src.cwd})
      .pipe(plumber(function(error) {
        // @cf https://github.com/floatdrop/gulp-plumber/issues/8
        gutil.log(gutil.colors.red(error.message));
        this.emit('end');
      }))
      .pipe(channels.views.src())
      .pipe(reload({stream: true}));
    var index = gulp.src(src.index, {cwd: src.cwd, base: src.cwd})
      .pipe(plumber(function(error) {
        // @cf https://github.com/floatdrop/gulp-plumber/issues/8
        gutil.log(gutil.colors.red(error.message));
        this.emit('end');
      }))
      .pipe(channels.index.src())
      .pipe(reload({stream: true}));
    return merge(views, index);
  });

  gulp.task('ng:dist/views', function() {
    return gulp.src(src.index, {cwd: src.cwd, base: src.cwd})
      .pipe(channels.index.dist());
  });

};
