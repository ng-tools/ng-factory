'use strict';

var path = require('path');
var gulp = require('gulp');

var _ = require('lodash');
var inject = require("gulp-inject");
var mainBowerFiles = require('main-bower-files');
var changed = require('gulp-changed');

var config = require('./../../config'), src = config.src, docs = config.docs;

var nunjucks = config.requireTransform('nunjucks');


var ngdocParser = require('ngdoc-parser');
var ngdocFormatter = require('ngdoc-formatter');
var through = require('through2');
var glob = require('glob');
var rename = require('gulp-rename');

var markdown = config.requireTransform('markdown');

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
    return gulp.src(['*.nunjucks.html', '*/docs/examples/*.nunjucks.html'], {cwd: docs.tmp, base: docs.tmp})
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

