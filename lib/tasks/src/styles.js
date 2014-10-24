'use strict';

var reload = require('browser-sync').reload;
var plumber = require('gulp-plumber');

module.exports = function(gulp, config) {

  var channels = config.channels;

  var src = config.src;
  gulp.task('ng:src/styles', function() {
    gulp.src(src.styles, {cwd: src.cwd, base: src.cwd})
      .pipe(plumber())
      .pipe(channels.styles.src())
      .pipe(reload({stream: true}));
  });

  gulp.task('ng:dist/styles', function() {
    gulp.src(src.styles, {cwd: src.cwd, base: src.cwd})
      .pipe(channels.styles.dist());
  });

};
