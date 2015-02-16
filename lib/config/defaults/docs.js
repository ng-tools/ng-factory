'use strict';

exports.docs = {
  cwd: 'docs',
  dest: 'pages',
  tmp: '.tmp',
  scripts: '{scripts,modules/*}/**/*.js',
  styles: '{styles,modules/*}/{**/*.css,*.less,*.sass,*.scss}',
  views: 'views/**/*{,.tpl,.j2,.nunjucks}.{html,jade}',
  images: 'images/{,*/}*.{jpg,png,svg}',
  index: 'index{,.tpl,.j2,.nunjucks}.{html,jade}',
  templates: 'templates/pages',
  readme: 'templates/readme'
};
