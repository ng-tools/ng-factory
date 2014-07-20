'use strict';

var through = require('gulp-through');
var less = require('less');
var gutil = require('gulp-util');
var path = require('path');

var defaults = {
  debug: true
}

module.exports = through('less', function(file, config) {
  less.render(String(file.contents), config, function(err, result) {
    if(path.extname(file.path) !== '.less') return;
    if(err) return this.emit('error', new gutil.PluginError('less', err));
    file.contents = new Buffer(result);
    file.path = gutil.replaceExtension(file.path, '.css');
  });
}, defaults);
