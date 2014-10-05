'use strict';

var gulp = require('gulp');
var config = require('./../../config'), readme = config.readme;

var nunjucksRender = config.requireTransform('nunjucksRender');

gulp.task('ng-factory:readme/out', function () {

  return gulp.src('README.md', { cwd : readme.tmp })
    .pipe(nunjucksRender(config.computedLocals))
    .pipe(gulp.dest(readme.dest));
});
