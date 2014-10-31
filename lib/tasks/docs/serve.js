'use strict';

var merge = require('merge-stream');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var _ = require('lodash');

module.exports = function(gulp, config) {

  var docs = config.docs;
  gulp.task('ng:docs/serve', function() {
    browserSync({
      port: config.ports.docs,
      notify: false,
      open: false,
      logPrefix: function () {
        return this.compile('[{gray:' + new Date().toLocaleTimeString() + '}] ');
      },
      server: _.defaults(config.server || {}, {
        middleware: config.middleware,
        baseDir: [docs.tmp, docs.cwd]
      })
    });
  });

};
