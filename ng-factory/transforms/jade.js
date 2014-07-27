'use strict';

var through = require('gulp-through');
var jade = require('jade');
var gutil = require('gulp-util');
var path = require('path');
var util = require('util');
var chalk = require('chalk');
var merge = require('lodash.assign');

var defaults = {
  locals: {},
  strict: false,
  pretty: false,
  debug: false
}

module.exports = through('jade', function(file, config, skip) {
  if(config.strict && path.extname(file.path) !== '.jade') return;
  try {
    var result = jade.render(String(file.contents), merge(config, config.locals));
  } catch(err) {
    return skip(err);
  }
  file.contents = new Buffer(result);
  file.path = gutil.replaceExtension(file.path, '.html');
}, defaults);
