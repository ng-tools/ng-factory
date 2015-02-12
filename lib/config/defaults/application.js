'use strict';

exports.src = {
  cwd: 'app',
  dest: 'dist',
  tmp: '.tmp',
  test: '{,*/}*{.spec,Spec}.js',
  index: 'index.{html,jade}',
  views: '{views,modules/*}/**/*.{html,jade}',
  scripts: '{scripts,modules/*}/**/*.{js,es6,es}',
  styles: '{styles,modules/*}/{**/*.css,*.less,*.sass,*.scss}',
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
  scripts: '{scripts,modules/*}/**/*.js',
  styles: '{styles,modules/*}/{**/*.css,*.less,*.sass,*.scss}',
  watchedStyles: 'styles/**/*.less',
  views: 'views/**/*{,.tpl,.j2,.nunjucks}.{html,jade}',
  images: 'images/{,*/}*.{jpg,png,svg}',
  index: 'index{,.tpl,.j2,.nunjucks}.{html,jade}'
};

exports.ports = {
  src: 9000,
  dist: 8080,
  docs: 9090,
  pages: 8090
};
