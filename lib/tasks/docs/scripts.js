'use strict';

var reload = require('browser-sync').reload;
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');

module.exports = function(gulp, config) {

  var channels = require('gulp-channels')(gulp, config);

  var docs = config.docs;
  gulp.task('ng:docs/scripts', function() {
    gulp.src(docs.scripts, {cwd: docs.cwd, base: docs.cwd})
      .pipe(plumber(function(error) {
        // @cf https://github.com/floatdrop/gulp-plumber/issues/8
        gutil.log(gutil.colors.red(error.message));
        this.emit('end');
      }))
      .pipe(channels.scripts.src(docs))
      .pipe(reload({stream: true}));
  });

  gulp.task('ng:pages/scripts', function() {
    gulp.src(docs.scripts, {cwd: docs.cwd, base: docs.cwd})
      .pipe(channels.scripts.dist(docs));
  });

};
