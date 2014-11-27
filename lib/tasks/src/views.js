'use strict';

var merge = require('merge-stream');
var reload = require('browser-sync').reload;
var plumber = require('gulp-plumber');
var channels = require('gulp-ng-channels');

module.exports = function(gulp, config) {

  var src = config.src;
  gulp.task('ng:src/views', function() {
    var views = gulp.src(src.views, {cwd: src.cwd, base: src.cwd})
      .pipe(plumber(config.plumberErrorHandler))
      .pipe(channels.views.src(gulp, config)())
      .pipe(reload({stream: true}));
    var index = gulp.src(src.index, {cwd: src.cwd, base: src.cwd})
      .pipe(plumber(config.plumberErrorHandler))
      .pipe(channels.index.src(gulp, config)())
      .pipe(reload({stream: true}));
    return merge(views, index);
  });

  gulp.task('ng:dist/views', function() {
    return gulp.src(src.index, {cwd: src.cwd, base: src.cwd})
      .pipe(channels.index.dist(gulp, config)());
  });

};
