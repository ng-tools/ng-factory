'use strict';

var through = require('gulp-through');
var beautify = require('js-beautify');
var gutil = require('gulp-util');

var defaults = {
  indent_size: 2,
  debug: true
}

module.exports = through('js-beautify', function(file, config) {
  var result = beautify(String(file.contents), config);
  file.contents = new Buffer(result);
}, defaults);
