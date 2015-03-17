'use strict';

var merge = require('merge-stream');

module.exports = function(gulp, config) {

  var src = config.src;
  var docs = config.docs;
  gulp.task('ng:pages/copy', function() {
    return merge(
      gulp.src(['favicon.ico', docs.images, docs.fonts], {cwd: docs.cwd, base: docs.cwd})//,
      // gulp.src('**', {cwd: src.dest, base: config.cwd})
    ).pipe(gulp.dest(docs.dest));
  });

};



// 'use strict';

// var path = require('path');
// var merge = require('merge-stream');
// var changed = require('gulp-changed');

// module.exports = function(gulp, config) {

//   // Local (ngFactory) cwd
//   var src = config.src,
//       docs = config.docs,
//       cwd = path.join(config.dirname, docs.templates);

//   gulp.task('ng-factory:docs/copy:to(docs.tmp)', function () {
//     var copyBase = gulp.src('./**/*', {cwd: cwd})
//       .pipe(changed(docs.tmp))
//       .pipe(gulp.dest(docs.tmp));

//     var copySrcExamples = gulp.src('{,*/}docs{,*/}examples/**/*', {cwd: src.cwd})
//       .pipe(changed(docs.tmp))
//       .pipe(gulp.dest(docs.tmp));

//     return merge(copyBase, copySrcExamples)
//       .on('end', function () {
//         gulp.src('docs/**/*')
//           // Commented due to file conflict
//           //.pipe(changed(docs.tmp))
//           .pipe(gulp.dest(docs.tmp));
//       });
//   });

//   gulp.task('ng-factory:docs/copy:to(docs.dest)', function () {
//     var docDest = path.join(docs.dest, src.dest);
//     var copyBase = gulp.src([
//         'bower_components/**/*',
//         'styles/**/*',
//         'scripts/**/*'
//       ],
//       {cwd: docs.tmp, base: docs.tmp}
//     )
//       .pipe(changed(docs.dest))
//       .pipe(gulp.dest(docs.dest));

//     var copyDistFiles = gulp.src('**/*', {cwd: src.dest})
//       .pipe(changed(docDest))
//       .pipe(gulp.dest(docDest));

//     return merge(copyBase, copyDistFiles);
//   });
// };
