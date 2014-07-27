'use strict';

var gulp = require('gulp');
var config = require('./../../config');
var pkg = require(process.cwd() + '/package.json');
var bower = require(process.cwd() + '/bower.json');
var rename = require('gulp-rename');
var template = require('./../../transforms/template');
var fs = require('fs');
var path = require('path');
var through = require('through2');


/*
https://github.com/douglasduteil/angular-utility-belt/issues/1

Generates a simple README for GitHub from the README.tpl
In the future this will also generate a gh-pages index.html doc with embedded example and more fancy stuff
*/

gulp.task('ng-factory:readme/src', function() {

  var bowerDependencies = bower.devDependencies;
  Object.keys(bowerDependencies).forEach(function(key) {
    bowerDependencies[key] = bowerDependencies[key].replace('|', '&#124;');
  });

  var badges = [
    {
        title: 'CodeClimate status',
        image: 'http://img.shields.io/codeclimate/github/kabisaict/flow.svg',
        url: 'http://url'
    }, {
        title: 'CodeClimate coverage',
        image: 'http://img.shields.io/codeclimate/coverage/github/triAGENS/ashikawa-core.svg',
        url: 'http://url'
    }, {
        title: 'Travis CI',
        image: 'http://img.shields.io/travis/joyent/node.svg',
        url: 'http://travis-ci.org/joyent/node'
    }, {
        title: 'Github release',
        image: 'http://img.shields.io/github/release/qubyte/rubidium.svg',
        url: 'http://url'
    }, {
        title: 'Github issues',
        image: 'http://img.shields.io/github/issues/badges/shields.svg',
        url: 'http://url'
    }, {
        title: 'NPM dependencies',
        image: 'http://img.shields.io/david/visionmedia/express.svg',
        url: 'http://url'
    }, {
        title: 'NPM dev dependencies',
        image: 'http://img.shields.io/david/dev/visionmedia/express.svg',
        url: 'http://url'
    }, {
        title: 'Browser support',
        image: 'https://ci.testling.com/substack/tape.png',
        url: 'http://ci.testling.com/substack/tape'
    }
  ];

  var data = {

    // todo: fancy ascii art
    logo: '# ' + pkg.name,

    // add intro from modules/docs/intro.md
    header: fs.readFileSync(path.join(config.src.cwd, pkg.name, 'docs', 'intro.md')),

    // scan bower
    dependencies: bowerDependencies,

    // todo : link to reald badges
    badges: badges,

    // todo : scan examples and add link (or embed)
    examples: [],

    // todo: generate ngdocs API
    ngdocs: 'minimalist ngDocs API',

    // add licence from package
    license: 'Licensed under : ' + pkg.license
  };

  // grab the intro for each example if any
  // todo : add support for multiple modules
  var examplesPath = path.join(process.cwd(), config.src.cwd, pkg.name, 'docs', 'examples');
  fs.readdirSync(examplesPath).forEach(function(example) {
    var text = fs.readFileSync(path.join(examplesPath, example, example + '.md'));
    // todo : generate a direct link to the gh-pages branch
    text += '\n\n -> Link to live example';
    data.examples.push(text);
  });

  d(config);
  gulp.src('README.tpl.md', {cwd: __dirname})
    // .pipe(through(function(file, encoding, next) { d(file); next(); }))
    .pipe(template({locals: data}))
    .pipe(rename('README.md'))
    .pipe(gulp.dest('.'));

});
