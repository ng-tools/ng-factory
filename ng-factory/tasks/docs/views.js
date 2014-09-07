'use strict';

var gulp = require('gulp');
var config = require('./../../config'), src = config.src, docs = config.docs;
var pkg = require(process.cwd() + '/package.json');

var path = require('path');
var glob = require('glob');
var _ = require('lodash');

var plumber = require('gulp-plumber');
var changed = require('gulp-changed');
var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');
var wiredep = require('wiredep').stream;
var through = require('through2');
var merge = require('merge-stream');
var connect = require('gulp-connect');

var nunjucks = config.requireTransform('nunjucks');
var jade = config.requireTransform('jade');


// Local (ngFactory) cwd
var cwd = path.join(config.dirname, docs.templates);

gulp.task('ng-factory:docs/views', function() {

  var locals = _.extend({}, config);
  // Fetch examples
  locals.examples = {};
  locals.modules.forEach(function(name) {
    locals.examples[name] = glob.sync(path.join(name, docs.cwd, 'examples', '*'), {cwd: src.cwd}).map(function(file) {
      return {filename: path.join(src.cwd, file), basename: path.basename(file), extname: path.extname(file)};
    });
  });
  // Fetch scripts
  locals.scripts = {};
  locals.modules.forEach(function(name) {
    locals.scripts[name] = glob.sync(path.join(name, docs.cwd, '{,(?:!examples)/}*.js'), {cwd: src.cwd});
  });

  var views = gulp.src(docs.views, {cwd: cwd, base: cwd})
    .pipe(changed(docs.tmp))
    .pipe(nunjucks({locals: locals, strict: true}))
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest(docs.tmp))
    .pipe(connect.reload());

  var index = gulp.src(docs.index, {cwd: docs.cwd})
    .pipe(nunjucks({locals: locals, strict: true}))
    .pipe(jade({pretty: true}))
    .pipe(wiredep({bowerJson: require(path.resolve(config.cwd, docs.cwd, 'bower.json')), directory: path.join(docs.cwd, 'bower_components'), cwd: docs.cwd, exclude: [/jquery/, /js\/bootstrap/]}))
    .pipe(gulp.dest(docs.tmp));

  return merge(views, index);

});


// gulp.task('ng-factory:pages/views', function() {

//   var views = gulp.src(docs.views, {cwd: cwd, base: cwd})
//     .pipe(changed(docs.tmp))
//     .pipe(nunjucks({locals: config.locals, strict: true}))
//     .pipe(jade({pretty: true}))
//     .pipe(gulp.dest(docs.tmp))
//     .pipe(connect.reload());

//   var index = gulp.src(docs.index.replace('.jade', '.tpl.jade'), {cwd: cwd/*docs.cwd*/})
//     .pipe(nunjucks({locals: config.locals, strict: true}))
//     .pipe(rename(docs.index))
//     .pipe(jade({pretty: true}))
//     .pipe(through.obj(function(file, encoding, next) {
//       // Fake path for wiredep
//       file.path = path.join(path.resolve(process.cwd(), docs.cwd), 'index.html');
//       file.base = path.dirname(file.path);
//       next(null, file);
//     }))
//     .pipe(wiredep({devDependencies: true, directory: path.join(docs.cwd, 'bower_components'), exclude: [/jquery/, /js\/bootstrap/]}))
//     .pipe(gulp.dest(docs.tmp));

// });
