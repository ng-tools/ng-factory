'use strict';

var gulp = require('gulp');
var config = require('./../../config'), src = config.src;
var pkg = require(process.cwd() + '/package.json');

var concat = require('gulp-concat-util');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');

var less = require('./../../transforms/less');
var cleancss = require('./../../transforms/clean-css');
var prefix = require('gulp-autoprefixer');

gulp.task('ng-factory:styles~less(dist)', function() {

  // Build unified pkg.name styles
  return gulp.src([src.styles], {cwd: src.cwd})
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(prefix('last 1 version'))
    .pipe(concat(function(path) {
      var dir = path.dirname.split(path.sep).pop();
      path.basename = dir !== src.cwd ? dir : pkg.name;
      path.extname = '.css';
    }))
    .pipe(concat.header(config.banner))
    .pipe(gulp.dest(src.dist))
    .pipe(rename(function(path) { path.extname = '.min.css'; }))
    .pipe(cleancss())
    .pipe(concat.header(config.banner))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(src.dist));

});
