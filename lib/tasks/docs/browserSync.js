'use strict';

var gulp = require('gulp');
var config = require('./../../config'), docs = config.docs;

var browserSync = require('browser-sync');

gulp.task('ng-factory:docs/browserSync', function (cb) {

  var config = {
    server: {
      baseDir: docs.dest
    },
    files: docs.dest + '/**/*',
    open: false,
    watchOptions: {
      debounceDelay: 1000
    }
  };

  browserSync(config, cb)

});

