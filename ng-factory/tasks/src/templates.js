'use strict';

var gulp = require('gulp');
var config = require('./../../config'), src = config.src;
var pkg = require(process.cwd() + '/package.json');

var htmlmin = require('gulp-htmlmin');
var ngtemplate = require('gulp-ngtemplate');
var concat = require('gulp-concat-util');
var rename = require('gulp-rename');

var concatScripts = config.requireTransform('concat-scripts');
var annotate = config.requireTransform('ng-annotate');
var uglify = config.requireTransform('uglify-js');

gulp.task('ng-factory:src/templates', function() {

  // Build unified pkg.name compile template files
  gulp.src(src.templates, {cwd: src.cwd})
    .pipe(htmlmin({removeComments: true, collapseWhitespace: true}))
    .pipe(ngtemplate({module: pkg.name}))
    .pipe(annotate())
    .pipe(concatScripts(function(path) {
      var dir = path.dirname.split(path.sep).pop();
      path.basename = dir !== src.cwd ? dir : pkg.name;
      path.extname = '.tpl.js';
    }))
    .pipe(concat.header(config.banner))
    .pipe(gulp.dest(src.dest))
    .pipe(rename(function(path) { path.extname = '.min.js'; }))
    .pipe(uglify())
    .pipe(concat.header(config.banner))
    .pipe(gulp.dest(src.dest));

});
