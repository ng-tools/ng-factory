'use strict';

var gulp = require('gulp');
var config = require('./../../config'), src = config.src, docs = config.docs;
var pkg = require(process.cwd() + '/package.json');
var path = require('path');

// Local (ngFactory) cwd
var cwd = path.join(config.dirname, docs.templates);

// CONNECT
//

var connect = require('gulp-connect');
gulp.task('ng-factory:docs/connect', function() {
  connect.server({
    root: [path.join(config.cwd, docs.tmp), path.join(config.cwd, docs.cwd), path.join(config.cwd, src.cwd)],
    port: config.ports.docs,
    livereload: true
  });
});
gulp.task('ng-factory:docs/connect(pages)', function() {
  connect.server({
    root: [path.join(config.cwd, docs.dest)],
    port: config.ports.pages,
  });
});


// WATCH
//

var watch = require('gulp-watch');
gulp.task('ng-factory:docs/watch', function() {
  watch(docs.scripts, {cwd: cwd}, function(files) {
    return gulp.start('ng-factory:docs/scripts');
  });
  watch(docs.watchedStyles, {cwd: cwd}, function(files) {
    return gulp.start('ng-factory:docs/styles');
  });
  watch([docs.index, docs.views], {cwd: cwd}, function(files) {
    return gulp.start('ng-factory:docs/views');
  });
});


// OPEN
//

var chrome = require('gulp-open');
gulp.task('ng-factory:docs/open', function(){
  gulp.src('index.html', {cwd: docs.tmp})
  .pipe(chrome('', {url: 'http://localhost:' + config.ports.docs}));
});
gulp.task('open:pages', function(){
  gulp.src('index.html', {cwd: docs.dest})
  .pipe(chrome('', {url: 'http://localhost:' + config.ports.pages}));
});
