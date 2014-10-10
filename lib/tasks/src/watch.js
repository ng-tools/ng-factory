'use strict';

var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

module.exports = function(gulp, config) {

  var src = config.src;
  gulp.task('ng-factory:src/watch', function() {
    watch(src.scripts, {cwd: src.cwd}, function(files) {
      return files.pipe(reload({stream: true}));
      // return gulp.start('ng-factory:src/scripts');
    });
    watch(src.styles.replace('styles/*.', 'styles/**/*.'), {cwd: src.cwd}, function(files) {
      return gulp.start('ng-factory:src/styles');
    });
    watch([src.index, src.views], {cwd: src.cwd}, function(files) {
      return gulp.start('ng-factory:src/views');
    });
  });

};
