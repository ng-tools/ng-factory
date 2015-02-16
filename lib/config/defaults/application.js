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

exports.test = {
  cwd: 'test',
  dest: 'test',
  tmp: '.tmp',
  unit: 'karma.conf.js',
  coverage: 'coverage',
  tests: '{,*/}*{.spec,Spec}.js'
};
