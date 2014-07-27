'use strict';

var gulp = require('gulp');
var config = require('./../../config'), src = config.src;
var pkg = require(process.cwd() + '/package.json');
var path = require('path');

var connect = require('gulp-connect');

var cwd = process.cwd();
var docs = config.docs;

// CONNECT
//

gulp.task('ng-factory:connect/docs(tmp)', function() {
  connect.server({
    root: [path.join(cwd, docs.tmp), path.join(cwd, '.dev'), path.join(cwd, docs.cwd)],
    port: config.ports.docs,
    livereload: true
  });
});
gulp.task('ng-factory:connect/docs(dist)', function() {
  connect.server({
    root: [path.join(cwd, docs.dest)],
    port: config.ports.pages,
  });
});
var chrome = require('gulp-open');
gulp.task('ng-factory:open/docs', function(){
  gulp.src('index.html', {cwd: docs.tmp})
  .pipe(chrome('', {url: 'http://localhost:' + config.ports.docs}));
});
gulp.task('open:pages', function(){
  gulp.src('index.html', {cwd: docs.dest})
  .pipe(chrome('', {url: 'http://localhost:' + config.ports.pages}));
});
