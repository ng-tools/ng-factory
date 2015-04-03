'use strict';

// Load all tasks
var resolve = require('resolve-dep');

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
