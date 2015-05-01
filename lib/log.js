'use strict';

var util = require('util');
var chalk = require('chalk');
var slice = Array.prototype.slice;

module.exports = function() {
  var args = slice.call(arguments);
  console.log(util.format.apply(util, ['[' + chalk.grey(new Date().toLocaleTimeString()) + '] ' + args[0]].concat(args.slice(1))));
};
