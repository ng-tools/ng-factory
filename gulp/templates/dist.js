'use strict';

var gulp = require('gulp');
var config = require('./../config'), src = config.src;
var pkg = require(process.cwd() + '/package.json');

var path = require('path');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat-util');
var annotate = require('./../helpers/annotate');

// var usemin = require('gulp-usemin');
// var nginclude = require('gulp-nginclude');

// var ngtemplate = require('gulp-ngtemplate');
// var uglify = require('gulp-uglify');
// var annotate = require('ng-annotate');

gulp.task('ng-factory:templates(dist)', function() {

  // Build unified package
  gulp.src(src.templates, {cwd: src.cwd})
    .pipe(htmlmin({removeComments: true, collapseWhitespace: true}))
    // .pipe(ngtemplate({module: createModuleName}))
    .pipe(annotate())
    .pipe(concat(pkg.name + '.tpl.js', {process: function(src) { return '// Source: ' + path.basename(this.path) + '\n' + (src.trim() + '\n').replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1'); }}))
    // .pipe(concat.header('(function(window, document, undefined) {\n\'use strict\';\n\n'))
    // .pipe(concat.footer('\n\n})(window, document);\n'))
    // .pipe(concat.header(banner))
    // .pipe(gulp.dest(src.dist))
    // .pipe(rename(function(path) { path.extname = '.min.js'; }))
    // .pipe(uglify())
    // .pipe(concat.header(banner))
    .pipe(gulp.dest(src.dist))


});
