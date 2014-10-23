'use strict';

var del = require('del');

module.exports = function(gulp, config) {

  var docs = config.docs;
  gulp.task('ng-factory:docs/clean', function(cb) {
    del([docs.tmp], cb);
  });
  gulp.task('ng-factory:pages/clean', function(cb) {
    del([docs.tmp, docs.dest], cb);
  });

};
