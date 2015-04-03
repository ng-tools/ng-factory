'use strict';

var fs = require('fs');
var util = require('util');
var path = require('path');
var DefaultRegistry = require('undertaker-registry');
var cwd = require('cwd');

function loadJSON(file) {
  var res = {};
  try {
    res = JSON.parse(fs.readFileSync(cwd(file), 'utf8'));
  } catch(err){}
  return res;
}

function ConfigRegistry() {

  DefaultRegistry.call(this);

  var config = loadJSON('ngfactory.json');
  // Get the current working directory of the user's current project
  config.cwd = cwd();
  // Load the package.json in the base of the user's current project
  config.pkg = loadJSON('package.json');

  config.paths = {
    cwd: 'app',
    dest: 'dist',
    tmp: '.tmp',
    test: '{,*/}*{.spec,Spec}.js',
    index: 'index.{html,jade}',
    views: '{views,components/*,modules/*}/**/*.{html,jade}',
    scripts: '{scripts,components/*,modules/*}/**/*.{js,es6,es}',
    styles: '{styles,components/*,modules/*}/{**/*.css,*.less,*.sass,*.scss}',
    images: '{images,components/*,modules/*}/{,*/}*.{jpg,png,svg}',
    fonts: '{fonts,components/*,modules/*}/{,*/}*.{otf,eot,svg,ttf,woff,woff2}',
    data: 'data/{,*/}*.json',
    config: 'config/*.json'
  };

  config.ports = {
    src: 9000,
    dist: 8080,
    docs: 9090,
    pages: 8090
  };


  config.bower = {
    exclude: /jquery|js\/bootstrap/
  };

  this.config = config;

}

util.inherits(ConfigRegistry, DefaultRegistry);

ConfigRegistry.prototype.set = function set(name, fn) {
  return (this._tasks[name] = fn.bind(this.config));
};

module.exports = ConfigRegistry;
