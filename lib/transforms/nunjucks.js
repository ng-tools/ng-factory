'use strict';

var through = require('gulp-through');
var nunjucks = require('nunjucks');
var path = require('path');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

var defaults = {
  strict: false,
  rename: true,
  debug: true
};

var regex = /\.(tpl|nunjucks)(\..+)$/;

module.exports = through('nunjucks', function(file, config) {
  if(config.strict && !path.basename(file.path).match(regex)) return;

  var env = nunjucks.configure(config.cwd || file.base, {
    // Please don"t !
    watch: false
  });

  var result;
  try {
    result = env.renderString(String(file.contents), config.locals);
  } catch(err) {
    // Convert the keys so PluginError can read them
    err.lineNumber = err.lineNumber || err.line || NaN;
    err.fileName = err.fileName || err.filename || 'input';
    // Add a better error message
    err.message = err.message + ' in file ' + err.fileName + ' line no. ' + err.lineNumber;
    this.emit('error', new PluginError('gulp-nunjucks', err));
    return;
  }
  file.contents = new Buffer(result);
  if(config.rename) {
    file.path = file.path.replace(regex, '$2');
  }
}, defaults);
