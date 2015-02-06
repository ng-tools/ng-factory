'use strict';

var bump = require('gulp-bump');
var semver = require('semver');

module.exports = function(gulp, config) {

  var src = config.src, pkg = config.pkg;
  var version = semver.inc(pkg.version, 'patch');

  gulp.task('ng-factory:src/bump', function() {
    return gulp.src(['./bower.json', './component.json', './package.json'], {cwd: config.cwd})
      .pipe(bump({version: version}))
      .pipe(gulp.dest(config.cwd));
  });
};
