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
          {name: 'docs', ignorePath: src.tmp, addRootSlash: false}
        ),
        gulp.dest(src.tmp)
      ))
      .pipe(reload({stream: true}));
    return merge(views, index);
  });

  gulp.task('ng:pages/views', function() {
    return gulp.src(docs.index, {cwd: docs.cwd, base: docs.cwd})
      .pipe(channels.index.dist(gulp, config)(docs));
  });

};
