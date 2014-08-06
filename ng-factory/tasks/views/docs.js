'use strict';

var gulp = require('gulp');
var config = require('./../../config'), docs = config.docs;
var pkg = require(process.cwd() + '/package.json');
var path = require('path');

var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');
var wiredep = require('wiredep').stream;
var through = require('through2');
var merge = require('merge-stream');
var connect = require('gulp-connect');

var debug = config.requireTransform('debug');
var nunjucks = config.requireTransform('nunjucks');
var jade = config.requireTransform('jade');

var cwd = path.resolve(__dirname, '..', '..', docs.cwd);


// DOCS
//

var changed = require('gulp-changed');
gulp.task('ng-factory:views/docs(tmp)', function() {
  d(config.locals);

  var views = gulp.src(docs.views, {cwd: cwd, base: cwd})
    // .pipe(changed(docs.tmp))
    .pipe(nunjucks({locals: config.locals, strict: true}))
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest(docs.tmp))
    .pipe(connect.reload());

  var index = gulp.src(docs.index, {cwd: cwd/*docs.cwd*/})
    .pipe(nunjucks({locals: config.locals, strict: true}))
    .pipe(jade({pretty: true}))
    .pipe(through.obj(function(file, encoding, next) {
      // Fake path for wiredep
      file.path = path.join(path.resolve(process.cwd(), 'docs'), 'index.html');
      file.base = path.dirname(file.path);
      next(null, file);
    }))
    .pipe(wiredep({devDependencies: true, directory: 'docs/bower_components', exclude: [/jquery/, /js\/bootstrap/]}))
    .pipe(gulp.dest(docs.tmp));

  return merge(views, index);

});

gulp.task('ng-factory:views/docs(pages)', function() {

  var views = gulp.src(docs.views, {cwd: cwd, base: cwd})
    .pipe(changed(docs.tmp))
    .pipe(nunjucks({locals: config.locals, strict: true}))
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest(docs.tmp))
    .pipe(connect.reload());

  var index = gulp.src(docs.index.replace('.jade', '.tpl.jade'), {cwd: cwd/*docs.cwd*/})
    .pipe(nunjucks({locals: config.locals, strict: true}))
    .pipe(rename(docs.index))
    .pipe(jade({pretty: true}))
    .pipe(through.obj(function(file, encoding, next) {
      // Fake path for wiredep
      file.path = path.join(path.resolve(process.cwd(), 'docs'), 'index.html');
      file.base = path.dirname(file.path);
      next(null, file);
    }))
    .pipe(wiredep({devDependencies: true, directory: 'docs/bower_components', exclude: [/jquery/, /js\/bootstrap/]}))
    .pipe(gulp.dest(docs.tmp));

});
