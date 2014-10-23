'use strict';

var gutil = require('gulp-util');

module.exports = function(options) {

  var defaults = require('./' + options.type);
  var pkg = options.pkg;

  var url = pkg.repository.url || pkg.repository;
  var split = url.replace(/\.git$/, '').split('/');
  pkg.repository.name = split.pop();
  pkg.repository.owner = split.pop();
  pkg.repository.url = [pkg.repository.owner, pkg.repository.name].join('/'),

  defaults.ports = {
    src: 9000,
    dist: 8080,
    docs: 9090,
    pages: 8090
  };

  defaults.banner = gutil.template('/**\n' +
    ' * <%= pkg.name %>\n' +
    ' * @version v<%= pkg.version %> - <%= today %>\n' +
    ' * @link <%= pkg.homepage %>\n' +
    ' * @author <%= pkg.author.name %> <<%= pkg.author.email %>> (<%= pkg.author.url %>)\n' +
    ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
    ' */\n', {file: '', pkg: pkg, today: new Date().toISOString().substr(0, 10)});

  defaults.badges = [
    {
      title: 'Build Status',
      image: 'http://img.shields.io/travis/{{ url }}.svg',
      url: 'http://travis-ci.org/{{ url }}',
      navbar: true
    }, {
      title: 'Coverage Status',
      image: 'http://img.shields.io/codeclimate/coverage/github/{{ url }}.svg',
      url: 'http://url',
      navbar: true
    }, {
      title: 'Github Releases',
      // image: 'http://img.shields.io/github/release/{{ url }}.svg',
      image: 'http://img.shields.io/badge/release-v{{ pkg.version }}-orange.svg',
      url: 'http://github.com/{{ url }}/releases',
      navbar: true
    }, {
      title: 'Github Issues',
      image: 'http://img.shields.io/github/issues/{{ url }}.svg',
      url: 'http://github.com/{{ url }}/issues'
    }
    /*, {
      title: 'CodeClimate status',
      image: 'http://img.shields.io/codeclimate/github/kabisaict/flow.svg',
      url: 'http://url'
    }, {
      title: 'NPM dependencies',
      image: 'http://img.shields.io/david/visionmedia/express.svg',
      url: 'http://url'
    }, {
      title: 'NPM dev dependencies',
      image: 'http://img.shields.io/david/dev/visionmedia/express.svg',
      url: 'http://url'
    }, {
      title: 'Browser support',
      image: 'https://ci.testling.com/substack/tape.png',
      url: 'http://ci.testling.com/substack/tape'
    }*/
  ].map(function(badge) {
    Object.keys(badge).forEach(function(key) {
      if(typeof badge[key] === 'string') badge[key] = badge[key].replace('{{ url }}', pkg.repository.url).replace('{{ pkg.version }}', pkg.version);
    });
    return badge;
  });

  return defaults;

};


