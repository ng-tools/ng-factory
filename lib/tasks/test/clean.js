'use strict';

var del = require('del');

module.exports = function(gulp, config) {

  var test = config.test;
  gulp.task('ng-factory:test/clean', function(cb) {
    del([test.tmp], cb);
  });

};
