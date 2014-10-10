'use strict';

var path = require('path');
var gutil = require('gulp-util');
var karma = require('karma').server;

module.exports = function(gulp, config) {

  var test = config.test;
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
