'use strict';

var reload = require('browser-sync').reload;
var plumber = require('gulp-plumber');

module.exports = function(gulp, config) {

  var channels = require('gulp-channels')(gulp, config);

  var src = config.src;
  gulp.task('ng:src/scripts', function() {
    gulp.src(src.scripts, {cwd: src.cwd, base: src.cwd})
      .pipe(plumber())
      .pipe(channels.scripts.src())
      .pipe(reload({stream: true}));
  });

  gulp.task('ng:dist/scripts', function() {
    gulp.src(src.scripts, {cwd: src.cwd, base: src.cwd})
      .pipe(channels.scripts.dist());
  });

};
