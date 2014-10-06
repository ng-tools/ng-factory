'use strict';

var gulp = require('gulp');
var config = require('./../../config'), docs = config.docs;

var del = require('del');

gulp.task('ng-factory:docs/clean', function (cb) {
  del(
    [docs.tmp, docs.dest],
    cb
  );
});
