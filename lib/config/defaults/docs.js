'use strict';

exports.docs = {
  cwd: 'docs',
  dest: 'pages',
  tmp: '.tmp',
  scripts: '{scripts,modules/*}/**/*.{js,es6,es}',
  styles: '{styles,modules/*}/{**/*.css,*.less,*.sass,*.scss}',
  images: '{images,modules/*}/{,*/}*.{jpg,png,svg}',
  fonts: '{fonts,modules/*}/{,*/}*.{otf,eot,svg,ttf,woff}',
  views: 'views/**/*{,.tpl,.j2,.nunjucks}.{html,jade}',
  index: 'index{,.tpl,.j2,.nunjucks}.{html,jade}',
  templates: 'templates/pages',
  readme: 'templates/readme',
  bowerJson: 'docs/bower.json'
};

// exports.docs = {
//   cwd: 'docs',
//   dest: 'pages',
//   tmp: '.tmp',
//   test: '{,*/}*{.spec,Spec}.js',
//   index: 'index.{html,jade}',
//   views: '{views,modules/*}/**/*.{html,jade}',
//   scripts: '{scripts,modules/*}/**/*.{js,es6,es}',
//   styles: '{styles,modules/*}/{**/*.css,*.less,*.sass,*.scss}',
//   images: '{images,modules/*}/{,*/}*.{jpg,png,svg}',
//   fonts: '{fonts,modules/*}/{,*/}*.{otf,eot,svg,ttf,woff}'
// };
