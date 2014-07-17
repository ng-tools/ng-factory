'use strict';

module.exports = {
  src: {
    cwd: 'src',
    dist: 'dist',
    tmp: '.tmp',
    scripts: '**/*.js',
    templates: '**/*.tpl.html',
    index: 'module.js'
  },
  docs: {
    cwd: 'docs',
    dist: 'pages',
    tmp: '.tmp',
    scripts: 'scripts/**/*.js',
    styles: 'styles/*.less',
    images: 'images/{,*/}*.{jpg,png,svg}',
    index: 'index.html'
  },
  ports: {
    docs: 9000,
    pages: 9090
  }
};
