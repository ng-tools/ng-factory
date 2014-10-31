'use strict';

var path = require('path');
var merge = require('merge-stream');
var reload = require('browser-sync').reload;
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var concat = require('gulp-concat-util'), header = concat.header, footer = concat.footer;
var gulpif = require('gulp-if');
var combine = require('stream-combiner');
var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');

var bowerFiles = require('main-bower-files');
var bowerFilter = function(file) { return !/jquery|js\/bootstrap/.test(file); };

module.exports = function(gulp, config) {

  var channels = require('gulp-channels')(gulp, config);
  var template = config.requireTransform('nunjucks');
  var markdown = config.requireTransform('markdown');

  var docs = config.docs;
  var cwd = path.join(config.dirname, 'templates', 'docs');
  gulp.task('ng:docs/views', function() {

    var locals = require('./locals')(config);

    var views = gulp.src(docs.views, {cwd: docs.cwd, base: docs.cwd})
    // var views = merge(gulp.src(docs.views, {cwd: docs.cwd, base: docs.cwd}), gulp.src(docs.views, {cwd: cwd, base: cwd}))
      .pipe(plumber(function(error) {
        // @cf https://github.com/floatdrop/gulp-plumber/issues/8
        gutil.log(gutil.colors.cyan('Plumber') + gutil.colors.red(' found unhandled error:\n'), error.toString());
        this.emit('end');
      }))
      .pipe(channels.views.src())
      .pipe(reload({stream: true}));
    var index = gulp.src(docs.index, {cwd: docs.cwd, base: docs.cwd})
      .pipe(plumber(function(error) {
        // @cf https://github.com/floatdrop/gulp-plumber/issues/8
        gutil.log(gutil.colors.cyan('Plumber') + gutil.colors.red(' found unhandled error:\n'), error.toString());
        this.emit('end');
      }))
      .pipe(header('{% extends "index.nunjucks.html" %}'))
      .pipe(template({cwd: cwd, locals: locals}))
      // .pipe(channels.index.src(config.docs))
      .pipe(combine(
        inject(
          gulp.src(bowerFiles({paths: {bowerDirectory: path.join(config.cwd, docs.cwd, 'bower_components'), bowerJson: path.join(config.cwd, docs.cwd, 'bower.json')}, filter: bowerFilter}), {cwd: docs.cwd, read: false}),
          {name: 'bower', addRootSlash: false}
        ),
        inject(
          merge(gulp.src(docs.scripts, {cwd: docs.cwd, base: docs.cwd}), gulp.src(docs.scripts, {cwd: cwd, base: cwd}))
            .pipe(gulpif('**/*.tpl.js', template({cwd: cwd, locals: locals})))
            .pipe(channels.scripts.src(gulp, config))
            .pipe(angularFilesort()),
          {ignorePath: docs.tmp, addRootSlash: false}
        ),
        inject(
          merge(gulp.src(docs.styles, {cwd: docs.cwd, base: docs.cwd}), gulp.src(docs.styles, {cwd: cwd, base: cwd}))
            .pipe(channels.styles.src(gulp, config)),
          {ignorePath: docs.tmp, addRootSlash: false}
        ),
        gulp.dest(docs.tmp)
      ))
      .pipe(reload({stream: true}));
    return merge(views, index);

  });

  gulp.task('ng:pages/views', function() {
    return gulp.src(docs.index, {cwd: docs.cwd, base: docs.cwd})
      .pipe(channels.index.dist());
  });

};

/*
var path = require('path');

var _ = require('lodash');
var inject = require('gulp-inject');
var mainBowerFiles = require('main-bower-files');
var changed = require('gulp-changed');


var ngdocParser = require('ngdoc-parser');
var ngdocFormatter = require('ngdoc-formatter');
var through = require('through2');
var glob = require('glob');
var rename = require('gulp-rename');


module.exports = function(gulp, config) {


  var src = config.src,
      docs = config.docs,
      markdown = config.requireTransform('markdown'),
      nunjucks = config.requireTransform('nunjucks');


  // Local (ngFactory) cwd
  var cwd = path.join(config.dirname, docs.templates);

  gulp.task('ng-factory:docs/compileViews:to(docs.dest)', function (cb) {

    var bwr = require(path.join(config.cwd, docs.tmp, '/bower.json'));

    var locals = _.extend({}, config);
    // Assign temporal pkg file version  by hand here. No getter.
    locals.pkg = config.pkg;

    // HACK
    function postLocalsPopulation(then) {

      // Fetch examples
      locals.examples = {};
      config.modules.map(function(name) {
        locals.examples[name] = glob.sync(path.join(name, 'docs', 'examples', '*'), {cwd: src.cwd}).map(function(file) {
          var exampleFilename = path.basename(file).replace(/\.(tpl|nunjucks)(\..+)$/, '$2');
          return {
            name : exampleFilename,
            ref: path.join(name, 'docs', 'examples', exampleFilename),
            filename: path.join(src.cwd, file),
            basename: path.basename(file),
            extname: path.extname(file)
          };
        });
      });

      return gulp.src(src.scripts, {cwd: src.cwd, base: src.cwd})
        .pipe(ngdocParser())
        .pipe(ngdocFormatter({
          hLevel: 3
        }))
        .pipe(markdown())
        .pipe(through.obj(function (file, encoding, next) {
          // handle multi files ?
          locals.ngdocs = file.contents.toString();
          next(null, file);
        }))
        .pipe(through.obj(then));

    }

    function renderTheViews(){
      return gulp.src(['*.nunjucks.html', '*\/docs/examples/*.nunjucks.html'], {cwd: docs.tmp, base: docs.tmp})
        //.pipe(changed(docs.tmp, { extension : '.html' }))
        .pipe(nunjucks({locals: locals, strict: true}))

        .pipe(inject(gulp.src(mainBowerFiles({paths: docs.tmp}), {
          cwd: docs.tmp,
          base: docs.tmp,
          read: false
        }), {
          name: 'bowerDependencies',
          relative: true
        }))

        .pipe(inject(gulp.src(bwr.main, {
          cwd: docs.tmp,
          base: docs.tmp,
          read: false
        }), {
          name: 'themeDependencies',
          relative: true
        }))

        .pipe(gulp.dest(docs.dest))
        .on('end', cb);

    }

    // HACK
    postLocalsPopulation(renderTheViews);

  });
};
*/
