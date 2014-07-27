'use strict';

var gulp = require('gulp');
var config = require('./../../config'), src = config.src;
var pkg = require(process.cwd() + '/package.json');

var htmlmin = require('gulp-htmlmin');
var ngtemplate = require('gulp-ngtemplate');
var concat = require('gulp-concat-util');
var rename = require('gulp-rename');

var concatScripts = require('./../../transforms/concat-scripts');
var annotate = require('./../../transforms/ng-annotate');
var uglify = require('./../../transforms/uglify-js');

gulp.task('ng-factory:templates/src(dist)', function() {

  // Build unified pkg.name template
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
    .pipe(gulp.dest(src.dest))

});
