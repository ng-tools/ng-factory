'use strict';

// Load all tasks
var resolve = require('resolve-dep');

var exports = module.exports = {
  _modules: []
};

exports.resolve = function(pattern) {
  exports._resolved = resolve.npm(pattern, {type: 'devDependencies'});
  exports._modules = exports._resolved.map(function(module) {
    return require(module);
  });
};

exports.register = function(taker) {
  exports._modules.forEach(function(module) {
    var tasks = module.tasks;
    Object.keys(tasks).forEach(function(task) {
      taker.registry(new (tasks[task])(taker));
    });
  });
};

exports.registerIndex = function(taker) {
  exports._modules.forEach(function(module) {
    if(module.index) {
      taker.registry(new (module.index)(taker));
    }
  });
};
