'use strict';

var through = require('./gulp-through');
var uglify = require('uglify-js');

var defaults = {
  debug: true,
  fromString: true,
  output: {}
}

module.exports = through('uglify-js', function(file, config) {
  var result = uglify.minify(String(file.contents), config);
  file.contents = new Buffer(result.code);
}, defaults);
