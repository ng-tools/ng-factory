'use strict';

var bower = require(process.cwd() + '/bower.json');
var _ = require('lodash');
var fs = require('fs');
var glob = require('glob');
var path = require('path');

var through = require('through2');
var concat = require('gulp-concat-util');
var inject = require('gulp-inject');
// var header = require('gulp-header');


// Generates a simple README for GitHub from the templates/readme/README.tpl.md
// @url https://github.com/douglasduteil/angular-utility-belt/issues/1

module.exports = function(gulp, config) {

  var src = config.src,
      docs = config.docs;

  var template = config.requireTransform('nunjucks');
  var markdown = config.requireTransform('markdown');

  gulp.task('ng:docs/readme', function() {

    var locals = require('./locals')(config);

    // Build readme from user-defined template that extends ng-factory's one
    return gulp.src('README.tpl.md', {cwd: docs.cwd})
      .pipe(concat.header('{% extends "node_modules/ng-factory/lib/templates/readme/README.tpl.md" %}'))
      .pipe(template({
        cwd : process.cwd(),
        locals: locals
      }))
      .pipe(gulp.dest('.'));

  });


  gulp.task('ng-factory:docs/readme:cacheGettingStarted', function(){
    return gulp.src('getting-started.md', {cwd: docs.cwd})
      .pipe(markdown())
      .pipe(through.obj(function (file, enc, callback) {
        config.gettingStarted = file.contents.toString();
        callback(null, file);
      }));
  });

};


