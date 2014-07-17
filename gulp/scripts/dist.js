'use strict';

var gulp = require('gulp');
var config = require('./../config'), src = config.src;
var pkg = require(process.cwd() + '/package.json');

var path = require('path');
var concat = require('gulp-concat-util');
var annotate = require('./../helpers/annotate');

// var uglify = require('gulp-uglify');
// var ngmin = require('gulp-ngmin');
// var concat = require('gulp-concat-util');
// var sourcemaps = require('gulp-sourcemaps');

gulp.task('ng-factory:scripts(dist)', function(foo) {

    return gulp.src([src.scripts], {cwd: src.cwd})
      // .pipe(sourcemaps.init())
      .pipe(annotate())
      .pipe(concat(pkg.name + '.js', {process: function(src) { return '// Source: ' + path.basename(this.path) + '\n' + (src.trim() + '\n').replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1'); }}))
      // .pipe(concat.header('(function(window, document, undefined) {\n\'use strict\';\n'))
      // .pipe(concat.footer('\n})(window, document);\n'))
      // .pipe(concat.header(banner))
      // .pipe(gulp.dest(src.dist))
      // .pipe(rename(function(path) { path.extname = '.min.js'; }))
      // .pipe(uglify())
      // .pipe(concat.header(banner))
      // .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(src.dist));

});
