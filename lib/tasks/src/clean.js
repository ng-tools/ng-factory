'use strict';

var gulp = require('gulp');
var config = require('./../../config');

var del = require('del');

gulp.task('ng-factory:src/clean', function (cb) {
  del(
    [config.src.tmp, config.src.dest],
    cb
  );
});
