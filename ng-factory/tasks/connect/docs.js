'use strict';

var gulp = require('gulp');
var config = require('./../../config'), src = config.src;
var pkg = require(process.cwd() + '/package.json');
var path = require('path');

var cwd = process.cwd();
var docs = config.docs;

// CONNECT
//

var connect = require('gulp-connect');
gulp.task('ng-factory:connect/docs(tmp)', function() {
  connect.server({
    root: [path.join(cwd, docs.tmp), path.join(cwd, '.dev'), path.join(cwd, docs.cwd), path.join(cwd, src.cwd)],
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


// WATCH
//

var watch = require('gulp-watch');
var merge = require('merge-stream');
var base = path.resolve(__dirname, '..', '..', docs.cwd);
gulp.task('ng-factory:watch/docs', function() {
  var scripts = watch({glob: [path.join(base, docs.scripts), path.join(docs.cwd, docs.scripts)]}, ['ng-factory:scripts/docs(tmp)']);
  var styles = watch({glob: [path.join(base, 'styles/**/*.less'), path.join(docs.cwd, 'styles/**/*.less')]}, ['ng-factory:styles/docs(tmp)']);
  var views = watch({glob: [path.join(base, docs.index), path.join(base, docs.views)]}, ['ng-factory:views/docs(tmp)']);
  return merge(scripts, styles, views);
});


// OPEN
//

var chrome = require('gulp-open');
gulp.task('ng-factory:open/docs', function(){
  gulp.src('index.html', {cwd: docs.tmp})
  .pipe(chrome('', {url: 'http://localhost:' + config.ports.docs}));
});
gulp.task('open:pages', function(){
  gulp.src('index.html', {cwd: docs.dest})
  .pipe(chrome('', {url: 'http://localhost:' + config.ports.pages}));
});
