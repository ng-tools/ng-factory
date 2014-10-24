'use strict';

var Deployor = require('node-git-deployor');

module.exports = function(gulp, config) {

  var docs = config.docs;

  gulp.task('ng-factory:docs/deploy:pages', function () {
    var restoreCwd = process.cwd();

    // Assign temporal pkg file version by hand here. No getter.
    var pkg = config.pkg;

    var distWorkspace = Deployor.cloneRepoBranch({
      orphan: true,
      branch: 'gh-pages',
      cloneLocation: '/tmp/pages'
    });

    distWorkspace.extraCleanUp();
    distWorkspace.copy(docs.dest);
    distWorkspace.commit('demo(release): v' + pkg.version + '\n\nUpdate ' + new Date().toISOString());
    distWorkspace.push();

    process.chdir(restoreCwd);

  });

};
