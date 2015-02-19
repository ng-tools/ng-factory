'use strict';

var _ = require('lodash');
var path = require('path');
var glob = require('glob');
var findup = require('findup-sync');
var gutil = require('gulp-util');

// https://github.com/lodash/lodash/issues/978
// defaultsDeep('{,modules/*/}{views,scripts,modules}/**/*.{jade,html}', '{views,modules/*}/**/*.{html,jade}');
var defaultsDeep = _.partialRight(_.merge, function deep(value, other) {
  if (_.isString(value) || _.isArray(value) || _.isDate(other)) return value;
  return _.merge(value, other, deep);
});

module.exports = function(options) {

  var pkgFile = findup('package.json');
  var cfgFile = findup('ngfactory.json');

  // First load the ngfactory.json as defaults
  var config = cfgFile ? require(cfgFile) : {};
  config.dirname = path.resolve(__dirname, '..');
  config.cwd = process.cwd();
  config.requireTransform = function(name){
    // console.warn('[DEPRECATED] requireTransform("' + name + '")');
    return require(path.resolve(config.dirname, 'transforms', name));
  };

  // Override with any passed options
  config = defaultsDeep(options || {}, config);
  // Expose the package.json object in our config
  config.pkg = pkgFile ? require(pkgFile) : null;
  // Load application type specific defaults
  defaultsDeep(config, require('./defaults/docs'));
  defaultsDeep(config, require('./defaults/bower'));
  defaultsDeep(config, require('./defaults/ports'));
  defaultsDeep(config, require('./defaults/' + config.type));
  // Load additional defaults
  // @TODO require only when needed
  if (!config.banner) {
    config.banner = require('./defaults/banner')(config);
  }
  if (!config.badges) {
    config.badges = require('./defaults/badges')(config);
  }

  return config;

};
