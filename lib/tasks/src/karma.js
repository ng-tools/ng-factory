'use strict';

var path = require('path');
var gutil = require('gulp-util');
var karma = require('karma').server;
var bowerFiles = require('main-bower-files');
var inject = require('gulp-inject');
var merge = require('merge-stream');
var angularFilesort = require('gulp-angular-filesort');

module.exports = function(gulp, config) {

  var src = config.src;
  var test = config.test;

  gulp.task('ng-factory:src/karma~init', function(cb) {
    return gulp.src('karma.conf.js', {cwd: test.cwd})
      .pipe(inject(
        merge(
          gulp.src(bowerFiles({filter: /\.js$/, includeDev: true}), {read: false}),
          gulp.src(path.join(src.cwd, src.scripts), {read: true}).pipe(angularFilesort()),
          gulp.src(path.join(test.cwd, src.test), {read: false})
        ),
        {
          starttag: 'files: [',
          endtag: ']',
          transform: function (filepath, file, i, length) {
            return (!i ? '\'' : '  \'') + filepath.substr(1) + '\'' + (i + 1 < length ? ',' : '');
          }
        }
      ))
      .pipe(gulp.dest(test.cwd));
  });

  gulp.task('ng-factory:src/karma', function(cb) {
    karma.start({
      configFile: path.join(test.cwd, 'karma.conf.js'),
      reporters: ['dots'],
      singleRun: true
    }, function(code) {
      gutil.log('Karma has exited with ' + code);
      cb(code);
    });
  });

  gulp.task('ng-factory:src/karma:with(coverage)', function(cb) {
    karma.start({
      configFile: path.join(test.cwd, 'karma.conf.js'),

      reporters: ['dots', 'coverage'],

      preprocessors: {
        'src/{,*/}*.js': 'coverage'
      },

      plugins: [
        'karma-jasmine',
        'karma-phantomjs-launcher',
        'karma-coverage'
      ],

      // Coverage reporter generates the coverage
      coverageReporter: {
        reporters:[
          {type: 'lcov', dir:'test/coverage/'},
          {type: 'text-summary', dir:'test/coverage/'}
        ]
      },

      singleRun: true
    }, function(code) {
      gutil.log('Karma has exited with ' + code);
      cb(code);
    });
  });

};
