'use strict';
var _ = require('lodash');

// Tasks
//

// require('./tasks/docs/browserSync.js');
// require('./tasks/docs/clean.js');
// require('./tasks/docs/copy.js');
// require('./tasks/docs/deploy.js');
// require('./tasks/docs/ngdocs.js');
// require('./tasks/docs/readme.js');
// require('./tasks/docs/resolveDocsDependencies.js');
// require('./tasks/docs/scripts.js');
// require('./tasks/docs/styles.js');
// require('./tasks/docs/views.js');

// require('./tasks/src/bump.js');
// require('./tasks/src/changelog.js');
// require('./tasks/src/clean.js');
// require('./tasks/src/deploy.js');
// require('./tasks/src/jshint.js');
// require('./tasks/src/scripts.js');
// require('./tasks/src/styles.js');
// require('./tasks/src/templates.js');
// require('./tasks/src/karma.js');

// require('./tasks/test/jshint.js');

require('./debug');

var defaultsDeep = _.partialRight(_.merge, function deep(value, other) {
  return _.merge(value, other, deep);
});

module.exports = function(gulp, config) {

  var defaults = require('./config');
  // @todo find something better
  if(config.src.cwd === 'app') {
    defaultsDeep(config.src, defaults.app);
  }
  defaultsDeep(config, defaults);

  require('./tasks/src/clean.js')(gulp, config);
  require('./tasks/src/views.js')(gulp, config);
  require('./tasks/src/serve.js')(gulp, config);
  require('./tasks/src/watch.js')(gulp, config);
  require('./tasks/src/copy.js')(gulp, config);
  require('./tasks/src/jshint.js')(gulp, config);
  require('./tasks/src/styles.js')(gulp, config);
  require('./tasks/src/karma.js')(gulp, config);

  require('./tasks/test/clean.js')(gulp, config);

};
