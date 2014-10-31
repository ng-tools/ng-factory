'use strict';

var plumber = require('gulp-plumber');
var gutil = require('gulp-util');

module.exports = function(gulp, config) {

  var channels = require('gulp-channels')(gulp, config);

  var src = config.src;
  gulp.task('ng:src/templates', function() {
    return gulp.src(src.templates, {cwd: src.cwd, base: src.cwd})
      .pipe(plumber(function(error) {
        // @cf https://github.com/floatdrop/gulp-plumber/issues/8
        gutil.log(gutil.colors.red(error.message));
        this.emit('end');
      }))
      .pipe(channels.views.src());
  });

  gulp.task('ng:dist/templates', function() {
    return gulp.src(src.templates, {cwd: src.cwd, base: src.cwd})
      .pipe(channels.views.dist());
  });

  gulp.task('ng:test/templates', function() {
    return gulp.src(src.templates, {cwd: src.cwd, base: src.cwd})
      .pipe(channels.views.test());
  });

};
