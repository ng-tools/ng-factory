'use strict';

// @url https://github.com/jonschlinkert/time-require
// require('time-require');
require('debug-utils');

var Undertaker = require('undertaker');

var taker = module.exports = new Undertaker();

// Initialize and fetch config
var ConfigRegistry = require('./config');
var configRegistry = new ConfigRegistry();
var config = configRegistry.config;

// Load all resolved undertaker tasks
var TasksManager = require('./tasks').bind(taker);
var tasks = TasksManager.resolve('undertaker-*');
TasksManager.registerTasks(tasks);

// Reset each task in the registry with
// `ConfigRegistry.prototype.set` which will bind them to the config object.
taker.registry(configRegistry);

// Finally load any found indexes containing meta-aliases
// @TODO investigate why loading index registries before config breaks the fn binding
TasksManager.registerIndexes(tasks);
