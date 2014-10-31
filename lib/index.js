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


module.exports = function(gulp, options) {

  if(!options.type) throw new Error('Required option: \'type\'');
  if(!options.pkg) throw new Error('Required option: \'pkg\'');
  var config = require('./config')(options);
  config.channels = require('gulp-channels')(gulp, config);

  require('./tasks/src/bump.js')(gulp, config);
  require('./tasks/src/changelog.js')(gulp, config);
  require('./tasks/src/clean.js')(gulp, config);
  require('./tasks/src/copy.js')(gulp, config);
  require('./tasks/src/deploy.js')(gulp, config);
  require('./tasks/src/views.js')(gulp, config);
  require('./tasks/src/serve.js')(gulp, config);
  require('./tasks/src/watch.js')(gulp, config);
  require('./tasks/src/jshint.js')(gulp, config);
  require('./tasks/src/scripts.js')(gulp, config);
  require('./tasks/src/styles.js')(gulp, config);
  require('./tasks/src/templates.js')(gulp, config);

  require('./tasks/test/clean.js')(gulp, config);
  require('./tasks/test/jshint.js')(gulp, config);
  require('./tasks/test/karma.js')(gulp, config);

  require('./tasks/docs/clean.js')(gulp, config);
  require('./tasks/docs/copy.js')(gulp, config);
  require('./tasks/docs/deploy.js')(gulp, config);
  // require('./tasks/docs/ngdocs.js')(gulp, config);
  // require('./tasks/docs/resolveDocsDependencies.js')(gulp, config);
  // require('./tasks/docs/scripts.js')(gulp, config);
  // require('./tasks/docs/styles.js')(gulp, config);
  require('./tasks/docs/readme.js')(gulp, config);
  require('./tasks/docs/views.js')(gulp, config);
  require('./tasks/docs/serve.js')(gulp, config);
  require('./tasks/docs/watch.js')(gulp, config);

};

module.exports.component = function(gulp, options) {
  options.type = 'component';
  module.exports(gulp, options);
};
module.exports.application = function(gulp, options) {
  options.type = 'application';
  module.exports(gulp, options);
};
