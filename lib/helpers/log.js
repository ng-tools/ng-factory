'use strict';

var chalk = require('chalk');

module.exports = function log(string) {
  console.log('[' + chalk.grey(new Date().toTimeString().slice(0, 8)) + '] ' + string);
};
