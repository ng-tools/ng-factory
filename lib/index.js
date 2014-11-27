'use strict';

var path = require('path');
require('./debug');

module.exports = function ngFactory(gulp, options) {

  if(!options.type) throw new Error('Required option: \'type\'');
  if(!options.pkg) throw new Error('Required option: \'pkg\'');
  var config = require('./config')(options);
  config.pkg.module = config.module;
  d('a');
  config.channels = require('ng-gulp-channels')(gulp, config);
  d('b');
  require('./tasks')(gulp, config);

};
