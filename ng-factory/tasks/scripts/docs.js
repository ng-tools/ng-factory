'use strict';

var gulp = require('gulp');
var config = require('./../../config'), src = config.src;
var pkg = require(process.cwd() + '/package.json');
var path = require('path');

var connect = require('gulp-connect');
var template = require('./../../transforms/template');
var cwd = path.resolve(__dirname, '..', '..', config.docs.cwd);

//
// DOCS

var changed = require('gulp-changed');
gulp.task('ng-factory:scripts/docs(tmp)', function() {

  var views = gulp.src(config.docs.scripts, {cwd: cwd, base: cwd})
    .pipe(changed(config.docs.tmp))
    .pipe(template({locals: {pkg: pkg}, strict: true, rename: true}))
    .pipe(gulp.dest(config.docs.tmp))
    .pipe(connect.reload());

});
