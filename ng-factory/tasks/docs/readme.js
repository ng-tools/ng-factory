'use strict';

var gulp = require('gulp');
var config = require('./../../config'), src = config.src, docs = config.docs;
var pkg = require(process.cwd() + '/package.json');
var bower = require(process.cwd() + '/bower.json');
var _ = require('lodash');
var fs = require('fs');
var glob = require('glob');
var path = require('path');

var template = config.requireTransform('nunjucks');

// Generates a simple README for GitHub from the templates/readme/README.tpl.md
// @url https://github.com/douglasduteil/angular-utility-belt/issues/1

gulp.task('ng-factory:docs/readme', function() {

  var locals = _.extend({}, config);

  // Fetch license
  locals.license = '    ' + fs.readFileSync('LICENSE').toString().replace(/(?:\r?\n)/g, '\n    ');

  // Fetch dependencies
  locals.dependencies = _.mapValues(bower.devDependencies, function(value) {
    return value.replace('|', '&#124;');
  });

  // Fetch examples
  locals.examples = {};
  config.modules.map(function(name) {
    locals.examples[name] = glob.sync(path.join(name, 'docs', 'examples', '*'), {cwd: src.cwd}).map(function(file) {
      return {filename: path.join(src.cwd, file), basename: path.basename(file), extname: path.extname(file)};
    });
  });

  // Build readme
  return gulp.src('README.tpl.md', {cwd: path.join(config.dirname, docs.readme)})
    .pipe(template({locals: locals}))
    .pipe(gulp.dest('.'));

});
