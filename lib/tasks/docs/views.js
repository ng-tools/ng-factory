'use strict';

var merge = require('merge-stream');
var reload = require('browser-sync').reload;
var plumber = require('gulp-plumber');
var channels = require('gulp-ng-channels');
var combine = require('stream-combiner');
var rename = require('gulp-rename');
var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');
var gulpif = require('gulp-if');
var path = require('path');
var _ = require('lodash');

module.exports = function(gulp, config) {

  var src = config.src;
  var docs = config.docs;

  gulp.task('ng:docs/views', function() {
    var views = gulp.src(docs.views, {cwd: docs.cwd, base: docs.cwd})
      .pipe(plumber(config.plumberErrorHandler))
      .pipe(channels.views.src(gulp, config)(docs))
      .pipe(reload({stream: true}));
    var index = gulp.src(docs.index, {cwd: docs.cwd, base: docs.cwd})
      .pipe(plumber(config.plumberErrorHandler))
      .pipe(combine(
        channels.index.src(gulp, config)(docs),
        inject(
          gulp.src(src.scripts, {cwd: src.cwd, base: src.cwd})
            .pipe(rename(function(path) { path.dirname = 'src/' + path.dirname; }))
            .pipe(channels.scripts.src(gulp, config)(src))
            .pipe(gulpif('**/*.js', angularFilesort())),
          {name: 'source', ignorePath: src.tmp, addRootSlash: false}
        ),
        inject(
          gulp.src(src.docsScripts, {cwd: src.cwd, base: src.cwd})
            .pipe(rename(function(path) { path.dirname = 'docs/' + path.dirname; }))
            .pipe(channels.scripts.src(gulp, config)(src))
            .pipe(gulpif('**/*.js', angularFilesort())),
          {name: 'source-docs', ignorePath: src.tmp, addRootSlash: false}
        ),
        gulp.dest(docs.tmp)
      ))
      .pipe(reload({stream: true}));
    return merge(views, index);
  });

  gulp.task('ng:pages/views', function() {
    return gulp.src(docs.index, {cwd: docs.cwd, base: docs.cwd})
      .pipe(combine(
        channels.index.dist(gulp, config)(docs, {type: 'application', name: 'docs', cdn: true, assetsDirs: [docs.tmp, src.cwd]}),
        inject(
          gulp.src(src.scripts, {cwd: src.cwd, base: src.cwd})
            .pipe(channels.scripts.dist(gulp, config)(_.defaults({dest: path.join(docs.dest, 'dist')}, docs))),
          {name: 'source', ignorePath: docs.dest, addRootSlash: false}
        ),
        inject(
          gulp.src(src.templates, {cwd: src.cwd, base: src.cwd})
            .pipe(channels.views.dist(gulp, config)(_.defaults({dest: path.join(docs.dest, 'dist')}, docs), {name: config.pkg.name})),
          {name: 'source-tpl', ignorePath: docs.dest, addRootSlash: false}
        ),
        inject(
          gulp.src(src.docsScripts, {cwd: src.cwd, base: src.cwd})
            .pipe(channels.scripts.dist(gulp, config)(_.defaults({dest: path.join(docs.dest, 'dist', 'docs')}, docs), {name: config.pkg.name + '-docs'})),
          {name: 'source-docs', ignorePath: docs.dest, addRootSlash: false}
        ),
        inject(
          gulp.src(src.docsViews, {cwd: src.cwd, base: src.cwd})
            .pipe(channels.views.dist(gulp, config)(_.defaults({dest: path.join(docs.dest, 'dist', 'docs')}, docs), {name: config.pkg.name + '-views'})),
          {name: 'source-views', ignorePath: docs.dest, addRootSlash: false}
        ),
        gulp.dest(docs.dest)
      ));
  });

};
