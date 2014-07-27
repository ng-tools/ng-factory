'use strict';

var gulp = require('gulp');
var config = require('./../../config'), src = config.src;
var pkg = require(process.cwd() + '/package.json');
var path = require('path');

var changed = require('gulp-changed');
var connect = require('gulp-connect');
var template = require('./../../transforms/template');

var cwd = path.resolve(__dirname, '..', '..', config.docs.cwd);
var docs = config.docs;

gulp.task('ng-factory:scripts/docs(tmp)', function() {

  var views = gulp.src(docs.scripts, {cwd: cwd, base: cwd})
    .pipe(changed(docs.tmp))
    .pipe(template({locals: {pkg: pkg}, strict: true, rename: true}))
    .pipe(gulp.dest(docs.tmp))
    .pipe(connect.reload());

});
