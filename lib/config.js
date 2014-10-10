'use strict';

var config = exports;
var gutil = require('gulp-util');
var glob = require('glob');
var fs = require('fs');

exports.requireTransform = function(name){
  return require('./transforms/' + name);
};

Object.defineProperty(exports, 'pkg', {
  get: function() { return JSON.parse(fs.readFileSync(process.cwd() + '/package.json', 'utf8')); },
  set: function(){}
});
var pkg = exports.pkg;
exports.dirname = __dirname;
exports.cwd = process.cwd();

var url = pkg.repository.url || pkg.repository;
var split = url.replace(/\.git$/, '').split('/');
pkg.repository.name = split.pop();
pkg.repository.owner = split.pop();
exports.url = [pkg.repository.owner, pkg.repository.name].join('/'),


// exports.base = 'node_modules/ng-factory';
exports.dirname = __dirname;
exports.cwd = process.cwd();

exports.src = {
  cwd: 'src',
  dest: 'dist',
  tmp: '.tmp/src',
  test: '{,*/}test{,*/}*.spec.js',
  index: 'module.js'
};

exports.app = {
  cwd: 'src',
  dest: 'dist',
  tmp: '.tmp/src',
  index: 'index.{html,jade}',
  views: '{,modules/*/}views/**/*.{html,jade}',
  scripts: '{,modules/*/}scripts/**/*.js',
  styles: '{,modules/*/}styles/*.{css,less}',
  images: '{,modules/*/}images/{,*/}*.{jpg,png,svg}',
  fonts: '{,modules/*/}fonts/{,*/}*.{otf,eot,svg,ttf,woff}',
  test: '{,*/}*{.spec,Spec}.js',
  config: 'config/*.json',
  data: 'data/{,*/}*.json'
};

exports.test = {
  cwd: 'test',
  dest: 'test',
  tmp: '.tmp/test',
  coverage: 'coverage',
  scripts: '{,*/}*{.spec,Spec}.js'
};

exports.docs = {
  cwd: 'docs',
  templates: 'templates/pages',
  readme: 'templates/readme',
  dest: 'pages',
  tmp: '.tmp/docs',
  scripts: 'scripts/**/*.js',
  styles: 'styles/*.less',
  watchedStyles: 'styles/**/*.less',
  views: 'views/**/*.jade',
  images: 'images/{,*/}*.{jpg,png,svg}',
  index: 'index{,.tpl}.jade'
};

exports.ports = {
  src: 9000,
  dist: 8080,
  docs: 9090,
  pages: 8090
};

exports.banner = gutil.template('/**\n' +
  ' * <%= pkg.name %>\n' +
  ' * @version v<%= pkg.version %> - <%= today %>\n' +
  ' * @link <%= pkg.homepage %>\n' +
  ' * @author <%= pkg.author.name %> <<%= pkg.author.email %>> (<%= pkg.author.url %>)\n' +
  ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
  ' */\n', {file: '', pkg: pkg, today: new Date().toISOString().substr(0, 10)});

exports.modules = glob.sync('*', {cwd: config.src.cwd});

exports.badges = [
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
    if(typeof badge[key] === 'string') badge[key] = badge[key].replace('{{ url }}', exports.url).replace('{{ pkg.version }}', pkg.version);
  });
  return badge;
});

