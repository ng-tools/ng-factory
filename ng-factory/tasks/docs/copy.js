'use strict';

var path = require('path');
var gulp = require('gulp');
var config = require('./../../config'), src = config.src, docs = config.docs;

var merge = require('merge-stream');
var changed = require('gulp-changed');

// Local (ngFactory) cwd
var cwd = path.join(config.dirname, docs.templates);

gulp.task('ng-factory:docs/copy:to(docs.tmp)', function () {

  var copyBase = gulp.src('./**/*', {cwd: cwd})
    .pipe(changed(docs.tmp))
    .pipe(gulp.dest(docs.tmp));

  var copySrcExamples = gulp.src('{,*/}docs{,*/}examples/**/*', {cwd: src.cwd})
    .pipe(changed(docs.tmp))
    .pipe(gulp.dest(docs.tmp));

  var copyDocs = gulp.src('docs/**/*')
    .pipe(changed(docs.tmp))
    .pipe(gulp.dest(docs.tmp));

  return merge(copyBase, copySrcExamples, copyDocs);
});

gulp.task('ng-factory:docs/copy:to(docs.dest)', function () {
  var docDest = path.join(docs.dest, src.dest);
  var copyBase = gulp.src([
      'bower_components/**/*',
      'styles/**/*',
      'scripts/**/*'
    ],
    {cwd: docs.tmp, base: docs.tmp}
  )
    .pipe(changed(docs.dest))
    .pipe(gulp.dest(docs.dest));

  var copyDistFiles = gulp.src('**/*', {cwd: src.dest})
    .pipe(changed(docDest))
    .pipe(gulp.dest(docDest));

  return merge(copyBase, copyDistFiles);
});

