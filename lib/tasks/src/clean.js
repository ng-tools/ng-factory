'use strict';

var del = require('del');

module.exports = function(gulp, config) {

  var src = config.src;
  gulp.task('ng:src/clean', function(cb) {
    del([src.tmp], cb);
  });
  gulp.task('ng:dist/clean', function(cb) {
    del([src.tmp, src.dest], cb);
  });

};
