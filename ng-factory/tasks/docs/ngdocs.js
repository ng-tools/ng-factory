'use strict';

var gulp = require('gulp');
var config = require('./../../config'), docs = config.docs, src = config.src;
var pkg = require(process.cwd() + '/package.json');
var path = require('path');

var ngdocParser = require('ngdoc-parser');
var through = require('through2');

gulp.task('ng-factory:docs/ngdocs', function() {

  return gulp.src(src.scripts, {cwd: src.cwd, base: src.cwd})
  .pipe(ngdocParser())
  .pipe(through.obj(function(file, encoding, next) {
    config.ngdocs = JSON.parse(file.contents.toString());
    file.path = path.join(file.base, 'ngdoc.raw.json');
    next(null, file);
  }))
  .pipe(gulp.dest(docs.tmp));

});
