'use strict';

var through = require('gulp-through');
var template = require('lodash.template');

module.exports = through('template', function(file, data, config) {
  var result = template(String(file.contents), data, config);
  file.contents = new Buffer(result);
});
