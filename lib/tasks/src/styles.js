'use strict';

var reload = require('browser-sync').reload;
var plumber = require('gulp-plumber');

module.exports = function(gulp, config) {

  var channels = require('gulp-channels')(gulp, config);

  var src = config.src;
  gulp.task('ng-factory:src/styles', function() {
    gulp.src(src.styles, {cwd: src.cwd, base: src.cwd})
      .pipe(plumber())
      .pipe(channels.styles.src())
      .pipe(reload({stream: true}));
  });

};
