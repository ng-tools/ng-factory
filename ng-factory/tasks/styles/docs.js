'use strict';

var gulp = require('gulp');
var config = require('./../../config'), src = config.src;
var pkg = require(process.cwd() + '/package.json');
var path = require('path');

var concat = require('gulp-concat-util');
var less = require('./../../transforms/less');
var connect = require('gulp-connect');
var cleancss = require('./../../transforms/clean-css');
var prefix = require('gulp-autoprefixer');

var cwd = path.resolve(__dirname, '..', '..', config.docs.cwd);
var docs = config.docs;

gulp.task('ng-factory:styles/docs(tmp)', function() {

  return gulp.src(docs.styles, {cwd: cwd, base: cwd})
    .pipe(less({paths: ['.', path.join(process.cwd(), docs.cwd)]}))
    .pipe(prefix('last 1 version'))
    .pipe(gulp.dest(docs.tmp))
    .pipe(connect.reload());

});
