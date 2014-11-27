'use strict';

var reload = require('browser-sync').reload;
var plumber = require('gulp-plumber');
var channels = require('gulp-ng-channels');

module.exports = function(gulp, config) {

  var src = config.src;
  gulp.task('ng:src/scripts', function() {
    gulp.src(src.scripts, {cwd: src.cwd, base: src.cwd})
      .pipe(plumber(config.plumberErrorHandler))
      .pipe(channels.scripts.src(gulp, config)(src))
      .pipe(reload({stream: true}));
  });

  gulp.task('ng:dist/scripts', function() {
    gulp.src(src.scripts, {cwd: src.cwd, base: src.cwd})
      .pipe(channels.scripts.dist(gulp, config)(src));
  });

};
