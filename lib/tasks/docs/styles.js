'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var pkg = require(process.cwd() + '/package.json');
var path = require('path');

var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var connect = require('gulp-connect');

var prefix = require('gulp-autoprefixer');


module.exports = function(gulp, config) {

  var src = config.src,
      docs = config.docs,
      less = config.requireTransform('less'),
      cleancss = config.requireTransform('clean-css');

  // Local (ngFactory) cwd
  var cwd = path.join(config.dirname, docs.templates);

  gulp.task('ng-factory:docs/styles', function() {

    return gulp.src(docs.styles, {cwd: cwd, base: cwd})
      .pipe(changed(docs.tmp))
      .pipe(plumber(function(error) {
        // @cf https://github.com/floatdrop/gulp-plumber/issues/8
        gutil.log(gutil.colors.red(error.message));
        this.emit('end');
      }))
      .pipe(less({paths: ['.', cwd]}))
      .pipe(prefix('last 1 version'))
      .pipe(plumber.stop())
      .pipe(gulp.dest(docs.tmp))
      .pipe(connect.reload());

  });

};
