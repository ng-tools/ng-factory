
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
global.debug = require('gulp-debug');

// Tasks
//

require('./tasks/docs/browserSync.js');
require('./tasks/docs/clean.js');
require('./tasks/docs/copy.js');
require('./tasks/docs/ngdocs.js');
require('./tasks/docs/readme.js');
require('./tasks/docs/resolveDocsDependencies.js');
require('./tasks/docs/scripts.js');
require('./tasks/docs/styles.js');
require('./tasks/docs/views.js');

require('./tasks/src/clean.js');
require('./tasks/src/jshint.js');
require('./tasks/src/scripts.js');
require('./tasks/src/styles.js');
require('./tasks/src/templates.js');
require('./tasks/src/karma.js');

require('./tasks/test/jshint.js');
