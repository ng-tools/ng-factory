'use strict';

var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

module.exports = function(gulp, config) {

  var src = config.src;
  gulp.task('ng:src/watch', function() {
    watch(src.scripts, {cwd: src.cwd}, function(files) {
      return files.pipe(reload({stream: true}));
      // return gulp.start('ng:src/scripts');
    });
    watch(src.styles.replace('styles/*.', 'styles/**/*.'), {cwd: src.cwd}, function(files) {
      return gulp.start('ng:src/styles');
    });
    watch([src.index, src.views], {cwd: src.cwd}, function(files) {
      return gulp.start('ng:src/views');
    });
  });

};
