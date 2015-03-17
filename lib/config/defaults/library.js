'use strict';

exports.src = {
  cwd: 'src',
  dest: 'dist',
  tmp: '.tmp',
  test: '*/{,*/}*{.spec,Spec}.js',
  templates: '**/!(docs|test)/*.{html,jade}',
  scripts: '{,**/!(docs|test)/}*.{js,es6,es}',
  styles: '*/!(docs|test)/{**/*.css,*.less,*.sass,*.scss}',
  images: '*/{,*/}*.{jpg,png,svg}',
  fonts: '*/{,*/}*.{otf,eot,svg,ttf,woff,woff2}',
  docsScripts: '*/docs/{,*/}*.{js,es6,es}',
  docsViews: '*/docs/{,*/}*.{html,jade}'
};

// exports.docs = {
//   cwd: 'docs',
//   dest: 'pages',
//   tmp: '.tmp',
//   index: 'index.{html,jade}',
//   views: '{views,modules/*}/**/*.{html,jade}',
//   scripts: '{scripts,modules/*}/**/*.{js,es6,es}',
//   styles: '{styles,modules/*}/{**/*.css,*.less,*.sass,*.scss}',
//   images: '{images,modules/*}/{,*/}*.{jpg,png,svg}',
//   fonts: '{fonts,modules/*}/{,*/}*.{otf,eot,svg,ttf,woff}',
//   templates: 'templates/pages',
//   readme: 'templates/readme'
// };

exports.sourcemaps = true;

exports.test = {
  cwd: 'test',
  dest: 'test',
  tmp: '.tmp',
  unit: 'karma.conf.js',
  coverage: 'coverage',
  tests: '{,*/}*{.spec,Spec}.js'
};
