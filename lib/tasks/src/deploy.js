'use strict';

var path = require('path');
var Deployor = require('node-git-deployor');

module.exports = function(gulp, config) {

  var src = config.src, pkg = config.pkg;

  gulp.task('ng-factory:src/deploy:configPkgUpdate', function () {

    // FORCE up to date data
    // the 'package.json' can change in the previous tasks
    pkg = config.pkg;

  });

  gulp.task('ng-factory:src/deploy:src', function () {

    var srcWorkspace = new Deployor();
    srcWorkspace.commit('chore(release): v' + pkg.version + '-src');
    srcWorkspace.tag('v' + pkg.version + '-src');
    srcWorkspace.push();

  });

  gulp.task('ng-factory:src/deploy:dist', function () {
    var restoreCwd = process.cwd();

    var distWorkspace = Deployor.cloneRepoBranch({
      orphan: true,
      branch: 'dist',
      cloneLocation: '/tmp/dist'
    });

    distWorkspace.extraCleanUp();
    distWorkspace.copy(src.dest);
    distWorkspace.commit('dist(release): v' + pkg.version + '\n\nUpdate ' + new Date().toISOString());
    distWorkspace.tag(pkg.version);
    try {
      distWorkspace.push();
    }catch(e){

    }
    process.chdir(restoreCwd);
  });

}
