'use strict';

var merge = require('merge-stream');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

module.exports = function(gulp, config) {

  var src = config.src;
  gulp.task('ng-factory:src/serve', function() {
    browserSync({
      notify: false,
      logPrefix: function () {
        return this.compile('[{gray:' + new Date().toLocaleTimeString() + '}] ');
      },
      server: {
        baseDir: [src.tmp, src.cwd]
      }
    });
  });

};
