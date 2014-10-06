'use strict';

var gulp = require('gulp');
var config = require('./../../config'), src = config.src, docs = config.docs;
var pkg = require(process.cwd() + '/package.json');
var bower = require(process.cwd() + '/bower.json');
var _ = require('lodash');
var fs = require('fs');
var glob = require('glob');
var path = require('path');

var through = require('through2');

var template = config.requireTransform('nunjucks');
var markdown = config.requireTransform('markdown');

// Generates a simple README for GitHub from the templates/readme/README.tpl.md
// @url https://github.com/douglasduteil/angular-utility-belt/issues/1

gulp.task('ng-factory:docs/readme', function() {

  var locals = _.extend({}, config);

  // Fetch license
  locals.license = '    ' + fs.readFileSync('LICENSE').toString().replace(/(?:\r?\n)/g, '\n    ');

  // Fetch dependencies
  locals.dependencies = _.mapValues(bower.dependencies, function(value) {
    return value.replace('|', '&#124;');
  });

  // Fetch examples
  locals.examples = {};
  config.modules.map(function(name) {
    locals.examples[name] = glob.sync(path.join(name, 'docs', 'inlined', '*'), {cwd: src.cwd}).map(function(file) {
      return {filename: path.join(src.cwd, file), basename: path.basename(file), extname: path.extname(file).substr(1)};
    });
  });

  // Build readme from user-defined template that extends ng-factory's one
  return gulp.src('README.tpl.md', {cwd: docs.cwd})
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


