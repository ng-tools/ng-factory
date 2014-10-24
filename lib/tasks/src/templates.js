'use strict';

var plumber = require('gulp-plumber');

module.exports = function(gulp, config) {

  var channels = require('gulp-channels')(gulp, config);

  var src = config.src;
  gulp.task('ng-factory:src/templates', function() {
    gulp.src(src.templates, {cwd: src.cwd, base: src.cwd})
      .pipe(plumber())
      .pipe(channels.views.src());
  });

  gulp.task('ng-factory:dist/templates', function() {
    gulp.src(src.templates, {cwd: src.cwd, base: src.cwd})
      .pipe(debug())
      .pipe(channels.views.dist());
  });

};
