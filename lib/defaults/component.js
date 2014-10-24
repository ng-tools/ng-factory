'use strict';

exports.src = {
  cwd: 'src',
  dest: 'dist',
  tmp: '.tmp', // @todo .tmp/src breaks
  styles: '{,*/}*.{css,less,sass,scss}',
  scripts: '{,*/}*.js',
  templates: '{,*/}*.tpl.{html,jade}',
};

exports.bower = {
  exclude: /jquery|js\/bootstrap/
};

exports.test = {
  cwd: 'test',
  dest: 'test',
  tmp: '.tmp',
  unit: 'karma.conf.js',
  coverage: 'coverage',
  tests: '{,*/}*{.spec,Spec}.js'
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
