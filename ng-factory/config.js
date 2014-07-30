'use strict';

var config = exports;
var gutil = require('gulp-util');
var pkg = require(process.cwd() + '/package.json');

exports.requireTransform = function(name){
  return require('./transforms/' + name);
};

exports.src = {
  cwd: 'src',
  dest: 'dist',
  tmp: '.tmp',
  scripts: '{,*/}*.js',
  styles: '{,*/}*.{less,css}',
  templates: '{,*/}*.tpl.html',
  index: 'module.js'
};

exports.docs = {
  cwd: 'docs',
  dest: 'pages',
  tmp: '.tmp',
  scripts: 'scripts/**/*.js',
  styles: 'styles/*.less',
  views: 'views/**/*.jade',
  images: 'images/{,*/}*.{jpg,png,svg}',
  index: 'index{,.tpl}.jade'
};

exports.ports = {
  docs: 9000,
  pages: 9090
};

exports.banner = gutil.template('/**\n' +
  ' * <%= pkg.name %>\n' +
  ' * @version v<%= pkg.version %> - <%= today %>\n' +
  ' * @link <%= pkg.homepage %>\n' +
  ' * @author <%= pkg.author.name %> <<%= pkg.author.email %>> (<%= pkg.author.url %>)\n' +
  ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
  ' */\n', {file: '', pkg: pkg, today: new Date().toISOString().substr(0, 10)});

var glob = require('glob');
exports.locals = {
  pkg: pkg,
  modules: glob.sync('*', {cwd: config.src.cwd}).map(function(name) {
    return {name: name, scripts: glob.sync(name + '/docs/{,*/}*.js', {cwd: config.src.cwd})};
  })
};
