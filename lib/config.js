'use strict';

var fs = require('fs');
var util = require('util');
var path = require('path');
var _ = require('lodash');
var DefaultRegistry = require('undertaker-registry');
var cwd = require('cwd');
var chalk = require('chalk');
var tildify = require('tildify');
var log = require('./helpers/log');

function loadJSON(file, options) {
  options = options || {cwd: cwd()};
  var res = {};
  var filePath = path.resolve(options.cwd, file);
  try {
    res = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch(err){
    log(chalk.red('Error: Failed to find file "%s"\n') +
      '        -> ' + chalk.yellow('You might want to `npm i -g generator-ng-factory; yo ng-factory` to fix this error.'), filePath);
    process.exit(1);
  }
  return res;
}

function ConfigRegistry(config) {

  DefaultRegistry.call(this);

  // Get the current working directory of the user's current project
  config.cwd = cwd();
  // Load the package.json in the base of the user's current project
  config.pkg = loadJSON('package.json', {cwd: config.cwd});
  if(config.pkg.ngFactory) {
    log(util.format('Using ng-factory config from %s', chalk.magenta(tildifyCwd('package.json', {cwd: config.cwd}))));
    this.config = _.merge(config, checkConfig(config.pkg.ngFactory));
  } else {
    log(util.format('Using ng-factory config file %s', chalk.magenta(tildifyCwd('ngfactory.json', {cwd: config.cwd}))));
    this.config = _.merge(config, checkConfig(loadJSON('ngfactory.json', {cwd: config.cwd})), {file: true});
  }

}

util.inherits(ConfigRegistry, DefaultRegistry);

ConfigRegistry.prototype.set = function set(name, fn) {
  this._tasks[name] = fn.bind(this.config);
  this._tasks[name].displayName = name;
  return this._tasks[name];
};

module.exports = ConfigRegistry;

function resolveCwd(file, options) {
  options = options || {cwd: cwd()};
  return path.resolve(options.cwd, file);
}

function tildifyCwd(file, options) {
  return tildify(resolveCwd(file, options));
}

function checkConfig(config, options) {
  options = options || {};
  if(options.file && config.ngVersion) {
    log(chalk.yellow('Old ng-factory configuration file detected, migrating...'));
    config = _.extend(_.pick(config, 'name'), {
      type: config.type,
      module: config.module,
      branch: config.ngVersion,
      modules: config.ngModules,
      transpilers: {
        scripts: config.jsPreprocessor,
        styles: config.cssPreprocessor,
        views: config.htmlPreprocessor
      }
    }, _.pick(config, 'username', 'locale', 'sourcemaps'));
    fs.writeFileSync(resolveCwd('ngfactory.json'), JSON.stringify(config, null, 2));
    log(chalk.yellow('Wrote updated ngfactory.json'));
  }
  return config;
}
