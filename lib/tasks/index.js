'use strict';

var requireDir = require('gulp-bump');
var gutil = require('gulp-util');

module.exports = function(gulp, config) {

  // Customize error handler for plumber
  // @cf https://github.com/floatdrop/gulp-plumber/issues/8
  config.plumberErrorHandler = function(error) {
    gutil.log(gutil.colors.cyan('Plumber') + gutil.colors.red(' found unhandled error:\n'), error.toString());
    this.emit('end');
  };

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


  var runSequence = require('run-sequence').use(gulp);
  function noop(){}
  // requireDir('./src');

  gulp.task('default', ['ng:build']);

  //
  // Serve development workflow

  gulp.task('ng:beforeServe', noop);
  gulp.task('ng:afterServe', noop);
  if(config.type === 'application') {

    gulp.task('ng:serve', function() {
      runSequence('ng:beforeServe', 'ng:src/clean', 'ng:src/views', ['ng:src/serve', 'ng:src/watch'], 'ng:afterServe');
    });

  } else if(config.type === 'component' || config.type === 'library') {

    gulp.task('ng:serve', function() {
      runSequence('ng:beforeServe', 'ng:docs/clean', 'ng:docs/views', ['ng:docs/serve', 'ng:docs/watch'], 'ng:afterServe');
    });

  }

  //
  // Production build workflow

  gulp.task('ng:dist', ['ng:build']);
  gulp.task('ng:beforeBuild', noop);
  gulp.task('ng:afterBuild', noop);

  if(config.type === 'application') {

    gulp.task('ng:build', function() {
      runSequence('ng:beforeBuild', 'ng:dist/clean', 'ng:src/views', ['ng:dist/views', 'ng:dist/copy'], 'ng:afterBuild');
    });

  } else if(config.type === 'component' || config.type === 'library') {

    gulp.task('ng:build', function() {
      runSequence('ng:beforeBuild', 'ng:dist/clean', ['ng:dist/templates', 'ng:dist/scripts', 'ng:dist/styles'], 'ng:afterBuild');
    });

  }

  //
  // Test workflow

  gulp.task('ng:beforeTest', noop);
  gulp.task('ng:afterTest', noop);

  gulp.task('ng:test', function() {
    runSequence('ng:beforeTest', 'ng:test/clean', ['ng:test/templates', 'ng:test/karma~init'], ['ng:test/karma', 'ng:test/jshint'], 'ng:afterTest');
  });

  // gulp.task('readme', function (cb) {
  //   runSequence('ng-factory:docs/ngdocs', 'ng-factory:docs/readme', cb);
  // });

  // gulp.task('release', function(cb){
  //   run(
  //     'ng-factory:src/bump',
  //     'ng-factory:src/deploy:configPkgUpdate',
  //     'ng-factory:src/changelog',
  //     'ng-factory:src/deploy:src',
  //     cb);
  // });

};

