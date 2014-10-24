'use strict';

var bump = require('gulp-bump');

module.exports = function(gulp, config) {

  var src = config.src;

  gulp.task('ng-factory:src/bump', function() {
    return gulp.src(src.packageFiles, {cwd: config.cwd})
      .pipe(bump())
      .pipe(gulp.dest(config.cwd));
  });
};
