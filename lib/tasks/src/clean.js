'use strict';

var del = require('del');

module.exports = function(gulp, config) {

  var src = config.src;
  dd(src);
  gulp.task('ng-factory:src/clean', function(cb) {
    del([src.tmp], cb);
  });
  gulp.task('ng-factory:dist/clean', function(cb) {
    del([src.tmp, src.dest], cb);
  });

};
