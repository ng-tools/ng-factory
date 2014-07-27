'use strict';

var through = require('gulp-through');
var template = require('lodash.template');
var path = require('path');

var defaults = {
  strict: false,
  rename: true,
  debug: true
}

var regex = /\.tpl(\..+)$/;

module.exports = through('template', function(file, config) {
  if(config.strict && !path.basename(file.path).match(regex)) return;
  var result = template(String(file.contents), config.locals, config);
  file.contents = new Buffer(result);
  if(config.rename) {
    file.path = file.path.replace(regex, '$1');
  }
}, defaults);
