'use strict';

var plumber = require('gulp-plumber');
var channels = require('gulp-ng-channels');

module.exports = function(gulp, config) {

  var src = config.src;
  gulp.task('ng:src/templates', function() {
    return gulp.src(src.templates, {cwd: src.cwd, base: src.cwd})
      .pipe(plumber(config.plumberErrorHandler))
      .pipe(channels.views.src(gulp, config)());
  });

  gulp.task('ng:dist/templates', function() {
    return gulp.src(src.templates, {cwd: src.cwd, base: src.cwd})
      .pipe(channels.views.dist(gulp, config)());
  });

  gulp.task('ng:test/templates', function() {
    return gulp.src(src.templates, {cwd: src.cwd, base: src.cwd})
      .pipe(channels.views.test(gulp, config)());
  });

};
