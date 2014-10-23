'use strict';

var through = require('gulp-through');
var gutil = require('gulp-util');
var path = require('path');
var jade = require('jade');
var extend = require('lodash.assign');

var defaults = {
  locals: {},
  strict: false,
  rename: true,
  pretty: false,
  debug: false,
  safe: true
};

module.exports = through('jade', function(file, config) {
  if(config.strict && path.extname(file.path) !== '.jade') return;
  var result = jade.render(String(file.contents), extend(config, config.locals));
  file.contents = new Buffer(result);
  if(config.rename) {
    file.path = gutil.replaceExtension(file.path, '.html');
  }
}, defaults);
