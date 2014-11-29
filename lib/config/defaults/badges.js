'use strict';

var _ = require('lodash');
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

module.exports = function(config) {

  var badges = {
    build: {
      title: 'Build Status',
      image: 'http://img.shields.io/travis/{{ repo }}.svg',
      url: 'http://travis-ci.org/{{ repo }}',
      navbar: true
    },
    coverage: {
      title: 'Coverage Status',
      image: 'http://img.shields.io/codeclimate/coverage/github/{{ repo }}.svg',
      url: 'http://repo',
      navbar: true
    },
    releases: {
      title: 'Github Releases',
      // image: 'http://img.shields.io/github/release/{{ repo }}.svg',
      image: 'http://img.shields.io/badge/release-v{{ pkg.version }}-orange.svg',
      url: 'http://github.com/{{ repo }}/releases',
      navbar: true
    },
    issues: {
      title: 'Github Issues',
      image: 'http://img.shields.io/github/issues/{{ repo }}.svg',
      url: 'http://github.com/{{ repo }}/issues'
    }
  };

  var url = config.pkg.repository.url || config.pkg.repository;
  var split = url.replace(/\.git$/, '').split('/');
  var name = split.pop();
  var owner = split.pop();
  var repo = [owner, name].join('/');

  return _.each(badges, function(badge) {
    _.keys(badge).forEach(function(key) {
      if(badge[key] && _.isString(badge[key])) {
        badge[key] = _.template(badge[key], {pkg: config.pkg, repo: repo});
      }
    });
  });

};

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

