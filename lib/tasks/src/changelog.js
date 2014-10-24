'use strict';

var fs = require('fs');
var path = require('path');

var conventionalChangelog = require('conventional-changelog');

// Might be put in the config file ?
var FILE_NAME = 'CHANGELOG.md';

module.exports = function(gulp, config) {

  var src = config.src, pkg = config.pkg;

  gulp.task('ng-factory:src/changelog', function(cb) {
    function changeParsed(err, log) {
      if (err) {
        return cb(err);
      }
      fs.writeFile(FILE_NAME, log, cb);
    }

    conventionalChangelog({
      repository: pkg.homepage,
      version: config.pkg.version,
      from: 'src' + pkg.version
    }, changeParsed);

  });

  gulp.task('ng-factory:src/changeLog:copy(dist)', function() {

    return gulp.src(FILE_NAME, {cwd: config.cwd})
      .pipe(gulp.dest(src.dest));

  });
};
