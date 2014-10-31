'use strict';

var pkg = require(process.cwd() + '/package.json');
var path = require('path');

var ngdocParser = require('ngdoc-parser');
var ngdocFormatter = require('ngdoc-formatter');
var through = require('through2');

module.exports = function(gulp, config) {

  var docs = config.docs,
      src = config.src;

  gulp.task('ng-factory:docs/ngdocs', function () {

    return gulp.src(src.scripts, {cwd: src.cwd, base: src.cwd})
      .pipe(ngdocParser())
      .pipe(ngdocFormatter({
        hLevel: 3
      }))
      .pipe(through.obj(function (file, encoding, next) {
        config.ngdocs = file.contents.toString();
        next(null, file);
      }))
      .pipe(gulp.dest(docs.tmp));

  });

};
