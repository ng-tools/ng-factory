'use strict';

exports.src = {
  cwd: 'src',
  dest: 'dist',
  tmp: '.tmp',
  test: '*/{,*/}*{.spec,Spec}.js',
  templates: '**/!(docs|test)/*.{html,jade}',
  scripts: '**/!(docs|test)/*.{js,es6,es}',
  styles: '*/{**/*.css,*.less,*.sass,*.scss}',
  images: '*/{,*/}*.{jpg,png,svg}',
  fonts: '*/{,*/}*.{otf,eot,svg,ttf,woff}'
};
