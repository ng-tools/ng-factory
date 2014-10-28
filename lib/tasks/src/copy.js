'use strict';

module.exports = function(gulp, config) {

  var src = config.src;
  gulp.task('ng:dist/copy', function() {
    return gulp.src(['favicon.ico', src.images, src.fonts, src.config], {cwd: src.cwd, base: src.cwd})
      .pipe(gulp.dest(src.dest));
  });

};
