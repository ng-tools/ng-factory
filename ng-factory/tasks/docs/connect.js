'use strict';

var gulp = require('gulp');
var config = require('./../../config'), src = config.src, docs = config.docs;
var pkg = require(process.cwd() + '/package.json');
var path = require('path');

var cwd = path.join(config.dirname, docs.cwd);

// CONNECT
//

var connect = require('gulp-connect');
gulp.task('ng-factory:docs/connect', function() {
  connect.server({
    root: [path.join(cwd, docs.tmp), path.join(cwd, docs.cwd), path.join(cwd, src.cwd)],
    port: config.ports.docs,
    livereload: true
  });
});
gulp.task('ng-factory:docs/connect(pages)', function() {
  connect.server({
    root: [path.join(cwd, docs.dest)],
    port: config.ports.pages,
  });
});


// WATCH
//

var watch = require('gulp-watch');
var merge = require('merge-stream');
gulp.task('ng-factory:docs/watch', function() {
  var scripts = watch({glob: [path.join(docs.cwd, docs.scripts)]}, ['ng-factory:scripts/docs(tmp)']);
  var styles = watch({glob: [path.join(docs.cwd, 'styles/**/*.less')]}, ['ng-factory:styles/docs(tmp)']);
  var views = watch({glob: [path.join(config.base, docs.views)]}, ['ng-factory:views/docs(tmp)']);
  return merge(scripts, styles, views);
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
