'use strict';

var _ = require('lodash');
var resolve = require('resolve-dep');

var defaultsDeep = _.partialRight(_.merge, function deep(value, other) {
  if (_.isString(value) || _.isArray(value) || _.isDate(other)) return value;
  return _.merge(value, other, deep);
});

var exports = module.exports = {};
var taker;

exports.bind = function(instance) {
  taker = instance;
  return exports;
};

exports.resolve = function(pattern) {
  var resolved = resolve.npm(pattern, {type: 'devDependencies'});
  return resolved.map(function(module) {
    return require(module);
  });
};

exports.registerTasks = function(registries) {
  registries.forEach(function(module) {
    var tasks = module.tasks;
    Object.keys(tasks).forEach(function(task) {
      taker.registry(new (tasks[task])(taker));
    });
  });
};

exports.registerIndexes = function(registries) {
  registries.forEach(function(module) {
    if(module.index) {
      taker.registry(new (module.index)(taker));
    }
  });
};

exports.loadDefaults = function(registries) {
  var config = {};
  registries.forEach(function(module) {
    if(module.defaults) {
      defaultsDeep(config, module.defaults);
    }
  });
  return config;
};
