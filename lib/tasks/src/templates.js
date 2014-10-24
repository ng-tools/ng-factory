'use strict';

var plumber = require('gulp-plumber');

module.exports = function(gulp, config) {

  var channels = require('gulp-channels')(gulp, config);

  var src = config.src;
  gulp.task('ng:src/templates', function() {
    gulp.src(src.templates, {cwd: src.cwd, base: src.cwd})
      .pipe(plumber())
      .pipe(channels.views.src());
  });

  gulp.task('ng:dist/templates', function() {
    gulp.src(src.templates, {cwd: src.cwd, base: src.cwd})
      .pipe(channels.views.dist());
  });

};
