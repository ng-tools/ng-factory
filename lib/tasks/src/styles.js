'use strict';

var reload = require('browser-sync').reload;
var plumber = require('gulp-plumber');
var channels = require('gulp-ng-channels');

module.exports = function(gulp, config) {

  var src = config.src;
  gulp.task('ng:src/styles', function() {
    return gulp.src(src.styles, {cwd: src.cwd, base: src.cwd})
      .pipe(plumber(config.plumberErrorHandler))
      .pipe(channels.styles.src(gulp, config)(src))
      .pipe(reload({stream: true}));
  });

  gulp.task('ng:dist/styles', function() {
    return gulp.src(src.styles, {cwd: src.cwd, base: src.cwd})
      .pipe(channels.styles.dist(gulp, config)(src));
  });

};
