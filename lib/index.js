'use strict';

// $ npm i gulpjs/gulp.git#4.0 --save-dev
// @url https://github.com/jonschlinkert/time-require
// require('time-require');
// try { require('debug-utils'); } catch(e) {}
var _ = require('lodash');
var chalk = require('chalk');
var log = require('./helpers/log');

function ngFactory(taker, options) {

  if(!taker || (!options && taker && taker.constructor.name === 'Object')) {
    options = taker;
    var Undertaker = require('undertaker');
    taker = new Undertaker();
  }

  // Load all resolved undertaker tasks
  var TasksManager = require('./tasks').bind(taker);
  var tasks = TasksManager.resolve('undertaker-*');
  if(!tasks.length) {
    log(chalk.red('Error: ng-factory did not find any undertaker tasks to register.\n') +
      '        -> ' + chalk.yellow('You might want to `npm i undertaker-app-tasks` to fix this error for an application.'));
    process.exit(1);
  }
  log('Found %s undertaker-registry to load with %s', chalk.magenta(tasks.length), chalk.magenta('ng-factory'));
  var defaults = TasksManager.loadDefaults(tasks);
  TasksManager.registerTasks(tasks);

  // Initialize and fetch config
  var ConfigRegistry = require('./config');
  var configRegistry = new ConfigRegistry(_.merge(defaults, options));
  // Reset each task in the registry with
  // `ConfigRegistry.prototype.set` which will bind them to the config object.
  taker.registry(configRegistry);
  taker._config = configRegistry.config;

  // Finally load any found indexes containing meta-aliases
  // @TODO investigate why loading index registries before config breaks the fn binding
  TasksManager.registerIndexes(tasks, taker._config);

  return taker;

}

ngFactory.use = function(taker, options) {

  // Monkeypatch legacy array handling
  // eg. gulp.task('serve', ['ng:serve']);
  var taskFn = taker.task;
  taker.task = function(name, meta) {
    if(Array.isArray(meta)) {
      return taskFn.call(taker, name, taker.series(meta));
    }
    return taskFn.apply(taker, arguments);
  };

  return ngFactory.bind(null, taker)(options)._config;

};

module.exports = ngFactory;
