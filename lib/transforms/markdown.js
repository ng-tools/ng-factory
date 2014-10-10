'use strict';

var through = require('gulp-through');
var marked = require('marked');
var path = require('path');

var defaults = {
  // TODO config highlight
  gfm: true,
  gfmBreaks: true,
  tables: true,
  //breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: true
};

module.exports = through('markdown', function(file, config) {
  marked.setOptions(config);
  file.contents = new Buffer(marked(file.contents.toString()));
}, defaults);
