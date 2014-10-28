'use strict';

exports.src = {
  cwd: 'app',
  dest: 'dist',
  tmp: '.tmp', // @todo .tmp/src breaks
  test: '{,*/}*{.spec,Spec}.js',
  index: 'index.{html,jade}',
  views: '{views,modules/*}/**/*.{html,jade}',
  scripts: '{scripts,modules/*}/**/*.js',
  styles: '{styles,modules/*}/{**/*.css,*.less}',
  images: '{images,modules/*}/{,*/}*.{jpg,png,svg}',
  fonts: '{fonts,modules/*}/{,*/}*.{otf,eot,svg,ttf,woff}',
  data: 'data/{,*/}*.json',
  config: 'config/*.json'
};

exports.bower = {
  exclude: /jquery|js\/bootstrap/
};

exports.docs = {
  cwd: 'docs',
  templates: 'templates/pages',
  readme: 'templates/readme',
  dest: 'pages',
  tmp: '.tmp',
  scripts: 'scripts/**/*.js',
  styles: 'styles/*.less',
  watchedStyles: 'styles/**/*.less',
  views: 'views/**/*.jade',
  images: 'images/{,*/}*.{jpg,png,svg}',
  index: 'index{,.tpl}.jade'
};
