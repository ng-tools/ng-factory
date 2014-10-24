'use strict';

var merge = require('merge-stream');
var jshint = require('gulp-jshint');

module.exports = function(gulp, config) {

  var src = config.src;
  var test = config.test;
  gulp.task('ng:test/jshint', function() {
    var scripts = gulp.src(src.scripts, {cwd: src.cwd});
    var tests = gulp.src(test.tests, {cwd: src.test});
    return merge(scripts, tests)
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'));
  });

};
