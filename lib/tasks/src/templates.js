'use strict';

var gulp = require('gulp');
var config = require('./../../config'), src = config.src;
var pkg = require(process.cwd() + '/package.json');

var htmlmin = require('gulp-htmlmin');
var ngtemplate = require('gulp-ngtemplate');
var concat = require('gulp-concat-util');
var rename = require('gulp-rename');
var changed = require('gulp-changed');

// var concatScripts = config.requireTransform('concat-scripts');
// var annotate = config.requireTransform('ng-annotate');
// var uglify = config.requireTransform('uglify-js');

// function compileSrcTemplates() {
//   // Build unified pkg.name compile template files
//   return gulp.src(src.templates, {cwd: src.cwd})
//     .pipe(changed(src.dest, {extension: '.js'}))
//     .pipe(htmlmin({removeComments: true, collapseWhitespace: true}))
//     .pipe(ngtemplate({module: pkg.name}))
//     .pipe(annotate())
//     .pipe(concatScripts(function (path) {
//       var dir = path.dirname.split(path.sep).pop();
//       path.basename = dir !== src.cwd ? dir : pkg.name;
//       path.extname = '.tpl.js';
//     }))
//     .pipe(concat.header(config.banner));

// }

var plumber = require('gulp-plumber');

module.exports = function(gulp, config) {

  var channels = require('gulp-channels')(gulp, config);

  var src = config.src;
  gulp.task('ng:src/templates', function() {
    gulp.src(src.templates, {cwd: src.cwd, base: src.cwd})
      .pipe(plumber())
      .pipe(channels.views.src());
  });

  gulp.task('ng:dist/templates', function() {
    gulp.src(src.templates, {cwd: src.cwd, base: src.cwd})
      .pipe(channels.views.dist());
  });

};
