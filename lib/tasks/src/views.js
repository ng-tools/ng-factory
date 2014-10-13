'use strict';

var merge = require('merge-stream');
var reload = require('browser-sync').reload;
var plumber = require('gulp-plumber');

module.exports = function(gulp, config) {

  var channels = require('gulp-channels')(gulp, config);

  var src = config.src;
  gulp.task('ng-factory:src/views', function() {
    var views = gulp.src(src.views, {cwd: src.cwd, base: src.cwd})
      .pipe(plumber())
      .pipe(channels.views.src())
      .pipe(reload({stream: true}));
    var index = gulp.src(src.index, {cwd: src.cwd, base: src.cwd})
      .pipe(channels.index.src())
      .pipe(reload({stream: true}));
    return merge(views, index);
  });

  gulp.task('ng-factory:dist/views', function() {
    return gulp.src(src.index, {cwd: src.cwd, base: src.cwd})
      .pipe(channels.index.dist());
  });

};
