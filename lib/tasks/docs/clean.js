'use strict';

var del = require('del');

module.exports = function(gulp, config) {

  var docs = config.docs;
  gulp.task('ng:docs/clean', function(cb) {
    del([docs.tmp], cb);
  });
  gulp.task('ng:pages/clean', function(cb) {
    del([docs.tmp, docs.dest], cb);
  });

};
