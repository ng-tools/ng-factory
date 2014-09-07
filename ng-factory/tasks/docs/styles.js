'use strict';

var gulp = require('gulp');
var config = require('./../../config'), src = config.src, docs = config.docs;
var pkg = require(process.cwd() + '/package.json');
var path = require('path');

var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var connect = require('gulp-connect');
var less = config.requireTransform('less');
var cleancss = config.requireTransform('clean-css');
var prefix = require('gulp-autoprefixer');

var cwd = path.join(config.dirname, docs.cwd);

gulp.task('ng-factory:docs/styles', function() {

  return gulp.src(docs.styles, {cwd: cwd, base: cwd})
    .pipe(changed(docs.tmp))
    .pipe(plumber())
    .pipe(less({paths: ['.', cwd]}))
    .pipe(prefix('last 1 version'))
    .pipe(plumber.stop())
    .pipe(gulp.dest(docs.tmp))
    .pipe(connect.reload());

});
