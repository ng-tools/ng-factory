'use strict';

var through = require('gulp-through');
var gutil = require('gulp-util');
var CleanCSS = require('clean-css');

var defaults = {
  debug: true
}

module.exports = through('clean-css', function(file, config) {
  var cleancss = new CleanCSS(config);
  var result = cleancss.minify(String(file.contents));
  file.contents = new Buffer(result);
}, defaults);
