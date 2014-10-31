'use strict';
var glob = require('glob');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var bowerFiles = require('main-bower-files');

module.exports = function(config) {
  var locals = _.extend({}, config);
  var src = config.src;

  // Fetch license
  locals.license = glob.sync('LICENSE*').map(function(file) {
    return '    ' + fs.readFileSync(file).toString().replace(/(?:\r?\n)/g, '\n    ');
  });
  if (!locals.license) {
    if (config.pkg && config.pkg.licenses) {
      locals.license = config.pkg.licenses[0].type + ' : ' + config.pkg.licenses[0].url;
    }
  }

  // Fetch dependencies
  // locals.dependencies = _.mapValues(bower.dependencies, function(value) {
  //   return value.replace('|', '&#124;');
  // });

  // Fetch examples
  locals.examples = {};
  config.modules.map(function(name) {
    locals.examples[name] = glob.sync('{*/docs,docs}/examples/*', {cwd: src.cwd}).map(function(file) {
      return {filename: path.join(src.cwd, file), basename: path.basename(file), extname: path.extname(file).substr(1)};
    });
  });

  d(locals);

  var GeoPattern = require('geopattern');
  var pattern = GeoPattern.generate(config.pkg.homepage + Math.random());
  locals.geopattern = {color: pattern.svg.svg.children[0].attributes.fill, data: pattern.toDataUri()};

  return locals;
};
