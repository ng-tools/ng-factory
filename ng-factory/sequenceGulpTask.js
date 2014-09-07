'use strict';

var gulp = require('gulp');
var run = require('run-sequence');

module.exports = sequenceGulpTask;

function sequenceGulpTask (taskName, sequenceToRun) {
  gulp.task(taskName, function(cb) {
    run.apply(this, sequenceToRun.concat([cb]));
  });
}


