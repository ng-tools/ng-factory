'use strict';
var Promise = require('bluebird');
var glob = Promise.promisifyAll(require('glob'));
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');
var _ = require('lodash');
var bowerFiles = require('main-bower-files');
var GeoPattern = require('geopattern');

module.exports = function(config) {
  var locals = _.extend({}, config);
  var src = config.src;
  var docs = config.docs;

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
    locals.examples[name] = glob.sync('*', {cwd: path.join(docs.cwd, 'examples')}).map(function(folder) {
      var files = glob.sync(folder + '/*', {cwd: path.join(docs.cwd, 'examples')}).map(function(file) {
        var filePath = path.resolve(docs.cwd, 'examples', file);
        return {path: filePath, src: fs.readFileSync(filePath).toString('utf8').trim(), filename: path.join(docs.cwd, file), basename: path.basename(file), extname: path.extname(file).substr(1)};
      });
      files.sort(function(a, b) {
        var order = ['html', 'js', 'css'];
        if(a.basename  === 'index.html') return -1;
        if(b.basename  === 'index.html') return 1;
        return order.indexOf(a.extname) > order.indexOf(b.extname) ? 1 : -1;
      });
      return {name: folder, files: files};
    });
  });

  d(locals);
  d(locals.module);
  var pattern = GeoPattern.generate(config.pkg.homepage + Math.random());
  locals.geopattern = {color: pattern.svg.svg.children[0].attributes.fill, data: pattern.toDataUri()};

  return locals;
};
