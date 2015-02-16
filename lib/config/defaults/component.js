'use strict';

exports.src = {
  cwd: 'src',
  dest: 'dist',
  tmp: '.tmp', // @todo .tmp/src breaks
  styles: '{,*/}*.{css,less,sass,scss}',
  scripts: '{,*/}*.js',
  templates: '{,*/}*.tpl.{html,jade}',
  packageFiles : '{bower,package}.json'
};

exports.sourcemaps = true;

exports.test = {
  cwd: 'test',
  dest: 'test',
  tmp: '.tmp',
  unit: 'karma.conf.js',
  coverage: 'coverage',
  tests: '{,*/}*{.spec,Spec}.js'
};
