'use strict';

var gulp = require('gulp');
var config = require('./../../config'), readme = config.readme;

var wrapper = require('gulp-wrapper');
var rename = require('gulp-rename');

var merge = require('merge-stream');

gulp.task('ng-factory:readme/tmp', function () {

  var copyCustom = gulp.src(readme.src.target , { cwd : readme.src.cwd })
      .pipe(rename('README.md'))
      .pipe(wrapper({
        header: '{% extends "README.tpl.md" %}\n'
      }))
      .pipe(gulp.dest(readme.tmp))
    ;

  var copyDocsFiles = gulp.src('src/*/docs/**/*')

      // Safe file example files inclusion in the view
      // Don't evaluate {{ xxx }}
      .pipe(wrapper({
        header: '{% raw %}',
        footer: '{% endraw %}'
      }))

      .pipe(gulp.dest(readme.tmp))
    ;

  var copyBase = gulp.src(readme.template.target , { cwd : readme.template.cwd })
      .pipe(gulp.dest(readme.tmp))
    ;

  return merge(copyCustom,copyBase, copyDocsFiles);
});

