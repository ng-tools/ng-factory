'use strict';

exports.src = {
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

exports.sourcemaps = 'dev';

exports.test = {
  cwd: 'test',
  dest: 'test',
  tmp: '.tmp',
  unit: 'karma.conf.js',
  coverage: 'coverage',
  tests: '{,*/}*{.spec,Spec}.js'
};
