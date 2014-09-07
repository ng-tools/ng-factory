'use strict';

var through = require('gulp-through');
var annotate = require('ng-annotate');
var gutil = require('gulp-util');

var defaults = {
  debug: true,
  add: true
};

module.exports = through('ng-annotate', function(file, config) {
  var result = annotate(String(file.contents), config);
  if(result.errors && result.errors.length) return this.emit('error', new gutil.PluginError('ng-annotate', result.errors.join('\n')));
  file.contents = new Buffer(result.src);
}, defaults);
