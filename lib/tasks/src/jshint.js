'use strict';

var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

module.exports = function(gulp, config) {

  var src = config.src;
  gulp.task('ng-factory:test/jshint', function() {
    return gulp.src(src.scripts, {cwd: src.cwd})
      .pipe(jshint())
      .pipe(jshint.reporter(stylish));
  });

};
