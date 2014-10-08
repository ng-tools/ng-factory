'use strict';

var gulp = require('gulp');
var run = require('run-sequence');

// Load ngFactory tasks
require('./ng-factory');
require('./.ng-factory/tasks');

gulp.task('default', ['lint', 'karma']);
gulp.task('build', ['dist']);


gulp.task('serve', function (cb) {
  run(
    'pages',
    [
      'ng-factory:docs/browserSync',
//      'ng-factory:docs/watch'
      'my:doc/watch' // CUSTOM WATCH
    ],
    cb);
});

gulp.task('pages', function (cb) {
  run(
    'ng-factory:docs/clean',

    'ng-factory:docs/copy:to(docs.tmp)',
    //
    'ng-factory:docs/resolveDocsDependencies',
    //
    'ng-factory:docs/readme:cacheGettingStarted',
    [
      'ng-factory:docs/compileViews:to(docs.dest)',

      // flatten dist
      'ng-factory:src/templates:to(src.dest)',
      'ng-factory:src/styles',
      'ng-factory:src/scripts'
    ],
    'ng-factory:docs/copy:to(docs.dest)',

    cb);
});


gulp.task('pages:update', function (cb) {
  run(
    'ng-factory:docs/copy:to(docs.tmp)',
    'ng-factory:docs/readme:cacheGettingStarted',
    [
      'ng-factory:docs/compileViews:to(docs.dest)',

      // flatten dist
      'ng-factory:src/templates:to(src.dest)',
      'ng-factory:src/styles',
      'ng-factory:src/scripts'
    ],
    'ng-factory:docs/copy:to(docs.dest)',
    cb);
});

gulp.task('readme', function (cb) {
  run(
    'ng-factory:docs/ngdocs',
    'ng-factory:docs/readme',
    cb);
});

gulp.task('dist', function (cb) {
  run(
    'ng-factory:src/clean',
    [
      'ng-factory:src/templates:to(src.dest)',
      'ng-factory:src/styles', 'ng-factory:src/scripts'
    ],
    cb);
});

gulp.task('docs', function () {
  run(
    'ng-factory:docs/clean',
    ['ng-factory:docs/views', 'ng-factory:docs/scripts', 'ng-factory:docs/styles', 'ng-factory:docs/connect'],
    ['ng-factory:docs/watch', 'ng-factory:docs/open']
  );
});

gulp.task('lint', function (cb) {
  run([
    'ng-factory:src/jshint',
    'ng-factory:test/jshint'
  ], cb);
});

gulp.task('karma', function (cb) {
  run(
    'ng-factory:src/clean',
    'ng-factory:src/templates:to(src.tmp)',
    'ng-factory:src/karma',
    cb);
});

gulp.task('coverage', function (cb) {
  run(
    'ng-factory:src/clean',
    'ng-factory:src/templates:to(src.tmp)',
    'ng-factory:src/karma:with(coverage)',
    cb);
});

gulp.task('release', function(cb){
  run(
    'ng-factory:src/bump',
    'ng-factory:src/deploy:configPkgUpdate',
    'ng-factory:src/changelog',
    'ng-factory:src/deploy:src',
    cb);
});

gulp.task('publish', function(cb){
  run(
    'dist',
    'ng-factory:src/changeLog:copy(dist)',
    'ng-factory:src/deploy:dist',

    'pages',
    'ng-factory:src/deploy:pages',
    cb);
});

gulp.task('ng-factory:ci:publish', function (cb) {

  var allowPushOnRepo =
    // On TRAVIS source tag.
    (process.env.TRAVIS == 'true') && // on travis
    (process.env.TRAVIS_PULL_REQUEST == 'false') && //  no a PR
    /^src\d+\.\d+\.\d+.*$/.test(process.env.TRAVIS_BRANCH); // is a source tag

  if (!allowPushOnRepo) {
    return cb();
  }

  run('publish', cb);
});
