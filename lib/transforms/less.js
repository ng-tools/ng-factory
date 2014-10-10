'use strict';

var through = require('gulp-through');
var Promise = require('bluebird');
var less = Promise.promisifyAll(require('less'));
var gutil = require('gulp-util');
var path = require('path');

var defaults = {
  strict: false,
  rename: true,
  debug: true,
  safe: true
}

module.exports = through('less', function(file, config) {
  var self = this;
  if(config.strict && path.extname(file.path) !== '.less') return;

  return less.renderAsync(String(file.contents), config)
  .then(function(result) {
    file.contents = new Buffer(result);
    if(config.rename) {
      file.path = gutil.replaceExtension(file.path, '.css');
    }
  });

}, defaults);
