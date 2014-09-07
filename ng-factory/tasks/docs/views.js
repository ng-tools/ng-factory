'use strict';

var gulp = require('gulp');
var config = require('./../../config'), src = config.src, docs = config.docs;
var pkg = require(process.cwd() + '/package.json');
var path = require('path');
var glob = require('glob');
var _ = require('lodash');

var debug = require('gulp-debug');
var plumber = require('gulp-plumber');

var mainBowerFiles = require('main-bower-files');
var inject = require('gulp-inject');

var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');
var wiredep = require('wiredep').stream;
var through = require('through2');
var merge = require('merge-stream');
var connect = require('gulp-connect');

var nunjucks = config.requireTransform('nunjucks');
var jade = config.requireTransform('jade');

var cwd = path.resolve(__dirname, '..', '..', docs.cwd);


// DOCS
//

var changed = require('gulp-changed');
gulp.task('ng-factory:views/docs(tmp)', function() {

  var locals = _.extend({}, config);
  locals.examples = {};
  locals.modules.forEach(function(name) {
    locals.examples[name] = glob.sync(path.join(name, docs.cwd, 'examples', '*'), {cwd: src.cwd}).map(function(file) {
      return {filename: path.join(src.cwd, file), basename: path.basename(file), extname: path.extname(file)};
    });
  });
  locals.scripts = {};
  locals.modules.forEach(function(name) {
    locals.scripts[name] = glob.sync(path.join(name, docs.cwd, '{,(?:!examples)/}*.js'), {cwd: src.cwd});
  });

  // var views = gulp.src(docs.views, {cwd: cwd, base: cwd})
  //   // .pipe(changed(docs.tmp))
  //   .pipe(nunjucks({locals: locals, strict: true}))
  //   .pipe(jade({pretty: true}))
  //   .pipe(gulp.dest(docs.tmp))
  //   .pipe(connect.reload());
  d(docs.cwd, docs.index);
  var index = gulp.src(docs.index, {cwd: docs.cwd})
    .pipe(debug())
    .pipe(nunjucks({locals: locals, strict: true}))
    .pipe(jade({pretty: true}))
    // .pipe(through.obj(function(file, encoding, next) {
    //   // Fake path for wiredep
    //   file.path = path.join(path.resolve(process.cwd(), docs.cwd), 'index.html');
    //   d(path.join(docs.cwd, 'bower_components'));
    //   d(path.join(path.resolve(process.cwd(), 'ng-factory', docs.cwd), 'bower_components'));
    //   file.base = path.dirname(file.path);
    //   next(null, file);
    // }))
    // .pipe(wiredep({directory: path.resolve(process.cwd(), 'ng-factory', docs.cwd, 'bower_components'), exclude: [/jquery/, /js\/bootstrap/]}))
    // .pipe(inject(gulp.src(mainBowerFiles({paths: path.join('ng-factory', docs.cwd)}), {read: false}), {name: 'bower'}))
    .pipe(gulp.dest(docs.tmp));

  return merge(index);

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
      file.path = path.join(path.resolve(process.cwd(), docs.cwd), 'index.html');
      file.base = path.dirname(file.path);
      next(null, file);
    }))
    .pipe(wiredep({devDependencies: true, directory: path.join(docs.cwd, 'bower_components'), exclude: [/jquery/, /js\/bootstrap/]}))
    .pipe(gulp.dest(docs.tmp));

});
