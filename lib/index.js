'use strict';

var path = require('path');
var debug = require('./utils/debug');
var _ = require('lodash');

function ngFactory(gulp, options) {

  var config = require('./config')(options);
  require('./tasks')(gulp, config);

}

ngFactory.use = function(gulp) {
  return ngFactory.bind(null, gulp)();
};

module.exports = ngFactory;
