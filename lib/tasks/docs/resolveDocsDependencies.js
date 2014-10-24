/**
 * Here is BIG HACK to resolve the bower dependencies of the docs.
 * I'm not directly asking for a `bower` dependency, so I'm going around case.
 */

'use strict';

var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

var gutil = require('gulp-util');
var through = require('through2');


module.exports = function(gulp, config) {

  gulp.task('ng-factory:docs/resolveDocsDependencies', function (cb) {

    function ninjaNpmInstallBower() {

      gutil.log('Run', gutil.colors.gray('npm install bower'));

      var child = spawn('npm', ['install', 'bower'], {
        stdio: 'inherit'
      });

      child.on('close', function (code) {
        if (code > 0) {
          cb(new gutil.PluginError('ng-factory', 'Can\'t install bower as local node_modules'));
        } else {
          installDependenciesUsingBower(true);
        }
      });
    }

    function installDependenciesUsingBower(isUsingLocal) {
      // Force boolean
      isUsingLocal = !!isUsingLocal;
      var bowerPath = isUsingLocal ? '../../node_modules/.bin/bower' : 'bower';
      gutil.log('Installing dependencies with "', gutil.colors.cyan(bowerPath), '" found !');

      var child = spawn(bowerPath, ['install'], {
        cwd: '.tmp/docs',
        stdio: 'inherit'
      });

      child.on('close', function (code) {
        if (code > 0) {
          cb(new gutil.PluginError('ng-factory', 'Can\'t run "bower install"'));
        } else {
          cb();
        }
      });
    }

    function tryFindGlobalBower() {
      var child = exec('bower -v');
      child.on('close', function (code) {
        if (code > 0) {
          gutil.log(gutil.colors.yellow('bower'), 'not found !');
          ninjaNpmInstallBower();
        } else {
          gutil.log('Global', gutil.colors.cyan('bower'), 'found !');
          installDependenciesUsingBower();
        }
      });
    }


    // Start the stream
    tryFindGlobalBower();
  });

};
