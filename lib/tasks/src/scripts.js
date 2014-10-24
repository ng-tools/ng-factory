'use strict';

var plumber = require('gulp-plumber');

module.exports = function(gulp, config) {

  var channels = require('gulp-channels')(gulp, config);

  var src = config.src;
  gulp.task('ng:src/scripts', function() {
    gulp.src(src.scripts, {cwd: src.cwd, base: src.cwd})
      .pipe(plumber())
      .pipe(channels.scripts.src());
  });

  gulp.task('ng:dist/scripts', function() {
    gulp.src(src.scripts, {cwd: src.cwd, base: src.cwd})
      .pipe(debug())
      .pipe(channels.scripts.dist());
  });

};


/*

var gulp = require('gulp');
var config = require('./../../config'), src = config.src;
var pkg = require(process.cwd() + '/package.json');

var concat = require('gulp-concat-util');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var changed = require('gulp-changed');

var concatScripts = config.requireTransform('concat-scripts');
var annotate = config.requireTransform('ng-annotate');
var uglify = config.requireTransform('uglify-js');

gulp.task('ng-factory:src/scripts', function() {

  // @todo coffee/es6?
  return gulp.src(src.scripts, {cwd: src.cwd})
    .pipe(gulp.dest(src.tmp));

});

gulp.task('ng-factory:dist/scripts', function() {

  // Build unified pkg.name scripts
  return gulp.src(src.scripts, {cwd: src.cwd})
    .pipe(changed(src.dest))
    .pipe(sourcemaps.init())
    .pipe(annotate())
    .pipe(concatScripts(function(path) {
      var dir = path.dirname.split(path.sep).pop();
      path.basename = dir !== src.cwd ? dir : pkg.name;
      path.extname = '.js';
    }))
    .pipe(concat.header(config.banner))
    .pipe(gulp.dest(src.dest))
    .pipe(rename(function(path) { path.extname = '.min.js'; }))
    .pipe(uglify())
    .pipe(concat.header(config.banner))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(src.dest));

});

*/
