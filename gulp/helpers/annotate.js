'use strict';

var util = require('util');
var path = require('path');
var chalk = require('chalk');
var gutil = require('gulp-util');
var through = require('through2');

var annotate = require('ng-annotate');

module.exports = function(options) {
  options = options || {add: true};

  function transform(file, encoding, next) {

    if(file.isNull()) {
      return next(null, file); // pass along
    }

    try {
      file.contents = new Buffer(annotate(file.contents.toString(), options));
    } catch(err) {
      return next(new gutil.PluginError('ng-annotate', err));
    }

    if(options.debug) {
      gutil.log(util.format('File \'%s\' updated.', chalk.cyan(path.relative(process.cwd(), file.path))));
    }

    next(null, file);

  }

  return through.obj(transform);

};
