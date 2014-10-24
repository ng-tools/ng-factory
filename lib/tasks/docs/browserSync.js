'use strict';

var browserSync = require('browser-sync');

module.exports = function(gulp, config) {

  gulp.task('ng-factory:docs/browserSync', function (cb) {

    var config = {
      server: {
        baseDir: config.docs.dest
      },
      files: config.docs.dest + '/**/*',
      open: false,
      watchOptions: {
        debounceDelay: 1000
      }
    };

    browserSync(config, cb);

  });

};
