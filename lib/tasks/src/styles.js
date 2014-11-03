'use strict';

var reload = require('browser-sync').reload;
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');

module.exports = function(gulp, config) {

  var channels = config.channels;

  var src = config.src;
  gulp.task('ng:src/styles', function() {
    gulp.src(src.styles, {cwd: src.cwd, base: src.cwd})
      .pipe(plumber(function(error) {
        // @cf https://github.com/floatdrop/gulp-plumber/issues/8
        gutil.log(gutil.colors.red(error.message));
        this.emit('end');
      }))
      .pipe(channels.styles.src(src))
      .pipe(reload({stream: true}));
  });

  gulp.task('ng:dist/styles', function() {
    gulp.src(src.styles, {cwd: src.cwd, base: src.cwd})
      .pipe(channels.styles.dist(src));
  });

};
