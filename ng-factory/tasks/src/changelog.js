'use strict';

var fs = require('fs');
var path = require('path');

var gulp = require('gulp');
var config = require('./../../config'), src = config.src;

var conventionalChangelog = require('conventional-changelog');

// Might be put in the config file ?
var FILE_NAME = 'CHANGELOG.md';

gulp.task('ng-factory:src/changelog', function(cb){
  function changeParsed(err, log){
    if (err) {
      return cb(err);
    }
    fs.writeFile(FILE_NAME, log, cb);
  }

  // FORCE up to date data
  // the 'package.json' can change in the previous tasks
  var pkg = require(path.resolve(process.cwd(), 'package.json'));

  conventionalChangelog({
    repository: pkg.homepage,
    version: pkg.version
  }, changeParsed);

});

gulp.task('ng-factory:src/changeLog:copy(dist)', function(){

  return gulp.src(FILE_NAME, {cwd: config.cwd})
    .pipe(gulp.dest(src.dest));

});
