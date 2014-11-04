'use strict';

var Promise = require('bluebird');
var globAsync = Promise.promisify(require('glob'));
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');
var _ = require('lodash');
var bowerFiles = require('main-bower-files');
var GeoPattern = require('geopattern');
var ngdocParser = require('ngdoc-parser');
var ngdocFormatter = require('ngdoc-formatter');
var through = require('through2');
// var File = require('vinyl');

module.exports = function(gulp, config) {

  var markdown = config.requireTransform('markdown');

  var pkg = config.pkg, src = config.src, docs = config.docs;

  var locals = _.extend({}, config);

  locals.license = globAsync('LICENSE*').then(function fetchLicense(files) {
    if(files.length) {
      return fs.readFileAsync(files[0]).call('toString', 'utf8');
    } else if(pkg.licenses && pkg.licenses.length) {
      return pkg.licenses[0].type + ' : ' + pkg.licenses[0].url;
    }
    return '';
  });

  var cwdExamples = path.join(docs.cwd, 'examples');
  locals.examples = Promise.resolve().then(function fetchExamples() {
    return config.multiple ? globAsync('*', {cwd: config.src.cwd}) : [config.pkg.name];
  }).map(function(module) {
    return Promise.props({
      name: module,
      examples: globAsync('*', {cwd: cwdExamples}).map(function forEachExample(folder) {
        return globAsync(folder + '/*', {cwd: cwdExamples}).map(function forEachExampleFiles(file) {
          var filePath = path.resolve(cwdExamples, file);
          return fs.readFileAsync(filePath).then(function readExampleFile(buffer) {
            return {
              path: filePath,
              contents: buffer.toString('utf8').trim(),
              basename: path.basename(file),
              extname: path.extname(file).substr(1)
            };
          });
        }).call('sort', function(a, b) {
          var order = ['html', 'js', 'css'];
          if(a.basename  === 'index.html') return -1;
          if(b.basename  === 'index.html') return 1;
          return order.indexOf(a.extname) > order.indexOf(b.extname) ? 1 : -1;
        }).then(function(files) {
          return {name: folder, files: files};
        });
      })
    });
  }).then(function(examples) {
    return _.indexBy(examples, 'name');
  });

  locals.ngdocs = new Promise(function(resolve, reject) {
    var ngdocs = [];
    gulp.src(src.scripts, {cwd: src.cwd, base: src.cwd})
      .pipe(ngdocParser())
      .pipe(ngdocFormatter({
        hLevel: 3
      }))
      .pipe(markdown())
      .pipe(through.obj(function(file, encoding, next) {
        ngdocs.push({path: file.path, contents: file.contents.toString('utf8')});
        next();
      }, function flush(cb) {
        resolve(ngdocs);
      }));
  });

  locals.geopattern = globAsync('fileWhereThePatternShouldBeCached.png', {cwd: docs.cwd}).then(function fetchGeoPattern(files) {
    if(files.length) {
      // @todo
    }
    var pattern = GeoPattern.generate(pkg.homepage + Math.random());
    return {color: pattern.svg.svg.children[0].attributes.fill, data: pattern.toDataUri()};
  });

  return Promise.props(locals);

};
