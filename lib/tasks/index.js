'use strict';

var requireDir = require('gulp-bump');

module.exports = function(gulp, config) {

  var runSequence = require('run-sequence').use(gulp);
  function noop(){}
  // requireDir('./src');

  require('./src/bump.js')(gulp, config);
  require('./src/changelog.js')(gulp, config);
  require('./src/clean.js')(gulp, config);
  require('./src/copy.js')(gulp, config);
  require('./src/deploy.js')(gulp, config);
  require('./src/views.js')(gulp, config);
  require('./src/serve.js')(gulp, config);
  require('./src/watch.js')(gulp, config);
  require('./src/jshint.js')(gulp, config);
  require('./src/scripts.js')(gulp, config);
  require('./src/styles.js')(gulp, config);
  require('./src/templates.js')(gulp, config);

  require('./test/clean.js')(gulp, config);
  require('./test/jshint.js')(gulp, config);
  require('./test/karma.js')(gulp, config);

  require('./docs/clean.js')(gulp, config);
  require('./docs/copy.js')(gulp, config);
  require('./docs/deploy.js')(gulp, config);
  // require('./docs/ngdocs.js')(gulp, config);
  // require('./docs/resolveDocsDependencies.js')(gulp, config);
  // require('./docs/scripts.js')(gulp, config);
  require('./docs/styles.js')(gulp, config);
  require('./docs/scripts.js')(gulp, config);
  require('./docs/readme.js')(gulp, config);
  require('./docs/views.js')(gulp, config);
  require('./docs/serve.js')(gulp, config);
  require('./docs/watch.js')(gulp, config);




  gulp.task('default', ['build']);
  gulp.task('dist', ['build']);
  gulp.task('test', function() {
    runSequence('ng:test/clean', 'ng:src/karma~init', 'ng:src/karma');
  });
  gulp.task('build', function() {
    runSequence('ng:dist/clean', 'ng:src/views', ['ng:dist/views', 'ng:dist/copy'], 'dist/copy');
  });

  //
  // Serve development workflow

  gulp.task('ng:beforeServe', noop);
  gulp.task('ng:afterServe', noop);
  gulp.task('serve', function() {
    runSequence('ng:beforeServe', 'ng:src/clean', 'ng:src/views', ['ng:src/serve', 'ng:src/watch'], 'ng:afterServe');
  });

};

