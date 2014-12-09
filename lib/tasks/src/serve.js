'use strict';

var merge = require('merge-stream');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var _ = require('lodash');

module.exports = function(gulp, config) {

  var src = config.src;
  gulp.task('ng:src/serve', function() {
    browserSync({
      port: config.ports.src,
      notify: false,
      open: true,
      logPrefix: function () {
        return this.compile('[{gray:' + new Date().toLocaleTimeString() + '}] ');
      },
      server: _.defaults(config.server || {}, {
        middleware: config.middleware,
        baseDir: [src.tmp, src.cwd]
      })
    });
  });

  gulp.task('ng:dist/serve', function() {
    browserSync({
      port: config.ports.dist,
      notify: false,
      open: true,
      logPrefix: function () {
        return this.compile('[{gray:' + new Date().toLocaleTimeString() + '}] ');
      },
      server: _.defaults(config.server || {}, {
        middleware: config.middleware,
        baseDir: [src.dest]
      })
    });
  });

};
