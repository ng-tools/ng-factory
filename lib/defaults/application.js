'use strict';

exports.src = {
  cwd: 'app',
  dest: 'dist',
  tmp: '.tmp', // @todo .tmp/src breaks
  test: '{,*/}*{.spec,Spec}.js',
  index: 'index.{html,jade}',
  views: '{,modules/*/}views/**/*.{html,jade}',
  scripts: '{,modules/*/}scripts/**/*.js',
  styles: '{,modules/*/}styles/{**/*.css,*.less}',
  images: '{,modules/*/}images/{,*/}*.{jpg,png,svg}',
  fonts: '{,modules/*/}fonts/{,*/}*.{otf,eot,svg,ttf,woff}',
  data: 'data/{,*/}*.json',
  config: 'config/*.json'
};

exports.bower = {
  exclude: /jquery|js\/bootstrap/
}
