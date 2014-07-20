'use strict';

var gulp = require('gulp');
var config = require('./../../config'), src = config.src;
var pkg = require(process.cwd() + '/package.json');

var concat = require('gulp-concat-util');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');

var concatScripts = require('./../../transforms/concat-scripts');
var annotate = require('./../../transforms/ng-annotate');
var uglify = require('./../../transforms/uglify-js');

gulp.task('ng-factory:scripts(dist)', function() {

  // Build unified pkg.name scripts
  return gulp.src([src.scripts], {cwd: src.cwd})
    .pipe(sourcemaps.init())
    .pipe(annotate())
    .pipe(concatScripts(function(path) {
      var dir = path.dirname.split(path.sep).pop();
      path.basename = dir !== src.cwd ? dir : pkg.name;
      path.extname = '.js';
    }))
    .pipe(concat.header(config.banner))
    .pipe(gulp.dest(src.dist))
    .pipe(rename(function(path) { path.extname = '.min.js'; }))
    .pipe(uglify())
    .pipe(concat.header(config.banner))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(src.dist));

});
