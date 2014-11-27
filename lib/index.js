'use strict';

var path = require('path');
var debug = require('./utils/debug');

module.exports = function ngFactory(gulp, options) {

  if(!options.type) throw new Error('Required option: \'type\'');
  if(!options.pkg) throw new Error('Required option: \'pkg\'');
  var config = require('./config')(options);
  config.pkg.module = config.module;
  require('./tasks')(gulp, config);

};
