
// Debug
//

var util = require('util');
var chalk = require('chalk');
global.d = function() {
  var args = Array.prototype.slice.call(arguments);
  var time = new Date().toISOString();
  console.log(chalk.white.bgRed(time) + ' - ' + chalk.red('break') + ': ' + util.inspect.call(null, args.length === 1 ? args[0] : args, false, 10, true));
};
global.dd = function() {
  global.d.apply(null, arguments);
  var stack = new Error().stack.split('\n');
  stack.splice(1, 1);
  util.log(stack.join('\n'));
  process.exit(1);
};

// Tasks
//

require('./tasks/connect/docs.js');
require('./tasks/clean/docs.js');
require('./tasks/clean/src.js');
require('./tasks/templates/src.js');
require('./tasks/scripts/src.js');
require('./tasks/scripts/docs.js');
require('./tasks/styles/src.js');
require('./tasks/styles/docs.js');
require('./tasks/readme/src.js');
require('./tasks/views/docs.js');
require('./tasks/jshint/src');
require('./tasks/jshint/test');
