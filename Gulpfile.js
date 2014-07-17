'use strict';

var gulp = require('gulp');
var _assign = require('lodash.assign');
var $ = require('gulp-load-plugins')();

//////////////////////////////////////////////////////////////////////////////
// TASK
//////////////////////////////////////////////////////////////////////////////

gulp.task('default', ['jshint', 'karma']);
gulp.task('serve', ['dist']);
gulp.task('dist', ['uglify']);

//////////////////////////////////////////////////////////////////////////////
// KARMA
//////////////////////////////////////////////////////////////////////////////


function testConfig(configFile, customOptions) {
  var options = { configFile: configFile };
  var travisOptions = process.env.TRAVIS && { browsers: [ 'Firefox', 'PhantomJS'], reporters: ['dots'], singleRun: true  };
  return _assign(options, customOptions, travisOptions);
}


gulp.task('karma', function () {

});



//////////////////////////////////////////////////////////////////////////////
// OTHER
//////////////////////////////////////////////////////////////////////////////

gulp.task('ng-annotate', function () {
  return gulp.src('*.js', { cwd: './src' })
    .pipe($.changed('./dist'))
    .pipe($.ngAnnotate())
    .pipe(gulp.dest('./dist'));
});

var browserSync = require('browser-sync');
function startBs() {
  return browserSync.init(null, {
    server: {
      open: false,
      debounce: 200,
      baseDir: "./out/built/gh-pages/"
    }
  });
}
gulp.task('browser-sync', function () {
  startBs();
});


//////////////////////////////////////////////////////////////////////////////
// LINTING
//////////////////////////////////////////////////////////////////////////////

gulp.task('jshint:src', function (done) {
  return gulp.src('./src/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('jshint:test', function (done) {
  return gulp.src('./test/*.spec.js')
    .pipe($.jshint({
      globals: {
        "angular"    : false,
        "module"    : false,
        "inject"    : false,
        "_jQuery"    : false,
        "browserTrigger"    : false,

        "jasmine"    : false,
        "it"         : false,
        "iit"        : false,
        "xit"        : false,
        "describe"   : false,
        "ddescribe"  : false,
        "xdescribe"  : false,
        "dump"      : false,
        "beforeEach" : false,
        "afterEach"  : false,
        "expect"     : false,
        "spyOn"      : false
      }
    }))
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('jshint', ['jshint:src', 'jshint:test']);

//////////////////////////////////////////////////////////////////////////////
// MINIFYING
//////////////////////////////////////////////////////////////////////////////



gulp.task('uglify', ['ng-annotate'], function () {
  return gulp.src('./dist/*.js')
    .pipe($.changed('./dist'))
    .pipe($.rename({ suffix: '.min'}))
    .pipe($.uglify({mangle: false}))
    .pipe(gulp.dest('./dist'));
});


