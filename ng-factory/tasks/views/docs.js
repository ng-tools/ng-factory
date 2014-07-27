'use strict';

var gulp = require('gulp');
var config = require('./../../config'), src = config.src;
var pkg = require(process.cwd() + '/package.json');
var path = require('path');

var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');
var wiredep = require('wiredep').stream;
var through = require('through2');
var merge = require('merge-stream');
var connect = require('gulp-connect');

var debug = require('./../../transforms/debug');
var template = require('./../../transforms/template');
var jade = require('./../../transforms/jade');

var cwd = path.resolve(__dirname, '..', '..', config.docs.cwd);


// DOCS
//

var changed = require('gulp-changed');
gulp.task('ng-factory:views/docs(tmp)', function() {

  var views = gulp.src(config.docs.views, {cwd: cwd, base: cwd})
    // .pipe(changed(config.docs.tmp))
    .pipe(template({locals: {pkg: pkg}, strict: true}))
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest(config.docs.tmp))
    .pipe(connect.reload());

  var index = gulp.src(config.docs.index, {cwd: cwd/*config.docs.cwd*/})
    .pipe(template({locals: {pkg: pkg}, strict: true}))
    .pipe(jade({pretty: true}))
    .pipe(through.obj(function(file, encoding, next) {
      // Fake path for wiredep
      file.path = path.join(path.resolve(process.cwd(), 'docs'), 'index.html');
      file.base = path.dirname(file.path);
      next(null, file);
    }))
    .pipe(wiredep({devDependencies: true, directory: 'docs/bower_components', exclude: [/jquery/, /js\/bootstrap/]}))
    .pipe(gulp.dest(config.docs.tmp));

  return merge(views, index);

});

gulp.task('ng-factory:views/docs(pages)', function() {

  var views = gulp.src(config.docs.views, {cwd: cwd, base: cwd})
    .pipe(changed(config.docs.tmp))
    .pipe(template({locals: {pkg: pkg}, strict: true}))
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest(config.docs.tmp))
    .pipe(connect.reload());

  var index = gulp.src(config.docs.index.replace('.jade', '.tpl.jade'), {cwd: cwd/*config.docs.cwd*/})
    .pipe(template({locals: {pkg: pkg}, strict: true}))
    .pipe(rename(config.docs.index))
    .pipe(jade({pretty: true}))
    .pipe(through.obj(function(file, encoding, next) {
      // Fake path for wiredep
      file.path = path.join(path.resolve(process.cwd(), 'docs'), 'index.html');
      file.base = path.dirname(file.path);
      next(null, file);
    }))
    .pipe(wiredep({devDependencies: true, directory: 'docs/bower_components', exclude: [/jquery/, /js\/bootstrap/]}))
    .pipe(gulp.dest(config.docs.tmp));

});
