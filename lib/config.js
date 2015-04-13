'use strict';

var fs = require('fs');
var util = require('util');
var path = require('path');
var _ = require('lodash');
var DefaultRegistry = require('undertaker-registry');
var cwd = require('cwd');

function loadJSON(file) {
  var res = {};
  try {
    res = JSON.parse(fs.readFileSync(cwd(file), 'utf8'));
  } catch(err){}
  return res;
}

function ConfigRegistry(config) {

  DefaultRegistry.call(this);

  this.config = _.merge(config, loadJSON('ngfactory.json'));
  // Get the current working directory of the user's current project
  config.cwd = cwd();
  // Load the package.json in the base of the user's current project
  config.pkg = loadJSON('package.json');

}

util.inherits(ConfigRegistry, DefaultRegistry);

ConfigRegistry.prototype.set = function set(name, fn) {
  this._tasks[name] = fn.bind(this.config);
  this._tasks[name].displayName = name;
  return this._tasks[name];
};

module.exports = ConfigRegistry;
