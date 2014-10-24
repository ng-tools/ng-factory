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

  gulp.task('ng:src/karma~init', function(cb) {

    return gulp.src('karma.conf.js', {cwd: test.cwd})
      .pipe(inject(
        merge(
          gulp.src(bowerFiles({filter: /\.js$/, includeDev: true}), {read: false}),
          gulp.src([path.join(src.cwd, src.scripts), path.join(test.tmp, '{,*/}*.tpl.js')], {read: true}).pipe(angularFilesort()),
          gulp.src(path.join(test.cwd, test.tests), {read: true})
        ),
        {
          starttag: 'files: [',
          endtag: ']',
          transform: function (filepath, file, i, length) {
            return '  \'' + filepath.substr(1) + '\'' + (i + 1 < length ? ',' : '');
          }
        }
      ))
      .pipe(gulp.dest(test.tmp));
  });

  gulp.task('ng:src/karma', function(cb) {
    karma.start({
      configFile: path.resolve(test.tmp, 'karma.conf.js'),
      reporters: ['dots'],
      singleRun: true
    }, function(code) {
      gutil.log('Karma has exited with ' + code);
      cb(code);
    });
  });

  gulp.task('ng:src/karma:with(coverage)', function(cb) {
    karma.start({
      configFile: path.resolve(test.cwd, 'karma.conf.js'),

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
