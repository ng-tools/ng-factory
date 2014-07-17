'use strict';

var gulp = require('gulp');
var config = require('./../config'), src = config.src;
var pkg = require(process.cwd() + '/package.json');

var htmlmin = require('gulp-htmlmin');
var ngtemplate = require('gulp-ngtemplate');
var concat = require('gulp-concat-util');
var rename = require('gulp-rename');

var concatScripts = require('./../helpers/concat-scripts');
var annotate = require('./../helpers/ng-annotate');
var uglify = require('./../helpers/uglify-js');

gulp.task('ng-factory:templates(dist)', function() {

  // Build unified pkg.name template
  gulp.src(src.templates, {cwd: src.cwd})
    .pipe(htmlmin({removeComments: true, collapseWhitespace: true}))
    .pipe(ngtemplate({module: pkg.name}))
    .pipe(annotate())
    .pipe(concatScripts(pkg.name + '.tpl.js'))
    .pipe(concat.header(config.banner))
    .pipe(gulp.dest(src.dist))
    .pipe(rename(function(path) { path.extname = '.min.js'; }))
    .pipe(uglify())
    .pipe(concat.header(config.banner))
    .pipe(gulp.dest(src.dist))

});
