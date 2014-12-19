'use strict';

var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var plumber = require('gulp-plumber');
var channels = require('gulp-ng-channels');

module.exports = function(gulp, config) {

  var src = config.src;
  gulp.task('ng:src/watch', function() {
    watch(src.scripts, {cwd: src.cwd}, function(files) {
      return files
        .pipe(plumber(config.plumberErrorHandler))
        .pipe(channels.scripts.src(gulp, config)(src))
        .pipe(reload({stream: true}));
    });
    // Watch all files
    watch(src.styles.replace(/([,{/])(\*\.)/g, '$1**/*.'), {cwd: src.cwd}, function(files) {
      // But only process root styles files
      return gulp.src(src.styles, {cwd: src.cwd})
        .pipe(plumber(config.plumberErrorHandler))
        .pipe(channels.styles.src(gulp, config)(src))
        .pipe(reload({stream: true}));
    });
    watch(src.index, {cwd: src.cwd}, function(files) {
      return files
        .pipe(plumber(config.plumberErrorHandler))
        .pipe(channels.index.src(gulp, config)())
        .pipe(reload({stream: true}));
    });
    watch(src.views, {cwd: src.cwd}, function(files) {
      return files
        .pipe(plumber(config.plumberErrorHandler))
        .pipe(channels.views.src(gulp, config)())
        .pipe(reload({stream: true}));
    });
  });

};
