'use strict';

var reload = require('browser-sync').reload;
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');

module.exports = function(gulp, config) {

  var channels = config.channels;

  var src = config.src;
  gulp.task('ng:src/scripts', function() {
    gulp.src(src.scripts, {cwd: src.cwd, base: src.cwd})
      .pipe(plumber(function(error) {
        // @cf https://github.com/floatdrop/gulp-plumber/issues/8
        gutil.log(gutil.colors.red(error.message));
        this.emit('end');
      }))
      .pipe(channels.scripts.src(src))
      .pipe(reload({stream: true}));
  });

  gulp.task('ng:dist/scripts', function() {
    gulp.src(src.scripts, {cwd: src.cwd, base: src.cwd})
      .pipe(channels.scripts.dist(src));
  });

};
