'use strict';

var gulp = require('gulp');
var config = require('./../../config'), docs = config.docs, src = config.src;
var pkg = require(process.cwd() + '/package.json');
var path = require('path');

var changed = require('gulp-changed');
var connect = require('gulp-connect');
var ngdocParser = require('ngdoc-parser');
var through = require('through2');
var nunjucks = config.requireTransform('nunjucks');

// Local (ngFactory) cwd
var cwd = path.join(config.dirname, docs.templates);

gulp.task('ng-factory:docs/scripts', function() {

  return gulp.src(docs.scripts, {cwd: cwd, base: cwd})
    .pipe(changed(docs.tmp))
    .pipe(nunjucks({locals: {pkg: pkg}, strict: true, rename: true}))
    .pipe(gulp.dest(docs.tmp))
    .pipe(connect.reload());

});
