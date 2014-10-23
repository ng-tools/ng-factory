'use strict';

var _ = require('lodash');
var glob = require('glob');
var defaultsDeep = _.partialRight(_.merge, function deep(value, other) {
  return _.merge(value, other, deep);
});

module.exports = function(options) {

  var config = defaultsDeep(options, require('./defaults')(options));
  config.dirname = __dirname;
  config.cwd = process.cwd();
  config.requireTransform = function(name){
    return require('./transforms/' + name);
  };

  if(config.type === 'component') {
    config.modules = glob.sync('*', {cwd: config.src.cwd});
  }

  return config;

};

