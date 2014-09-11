'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var config = require('./../../config'), src = config.src;
var path = require('path');

var cwd = process.cwd();

var karma = require('karma').server;

gulp.task('ng-factory:src/karma', function(cb) {
  karma.start({
    configFile: path.join(cwd, 'test/karma.conf.js'),
    reporters: ['dots'],
    singleRun: true
  }, function(code) {
    gutil.log('Karma has exited with ' + code);
    cb(code);
  });
});

gulp.task('ng-factory:src/karma:with(coverage)', function(cb) {
  karma.start({
    configFile: path.join(cwd, 'test/karma.conf.js'),

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
