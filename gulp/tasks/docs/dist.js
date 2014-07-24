'use strict';

var gulp = require('gulp');
var config = require('./../../config');
var pkg = require(process.cwd() + '/package.json');
var bower = require(process.cwd() + '/bower.json');
var rename = require('gulp-rename');
var template = require('./../../transforms/template');
var fs = require('fs');
var path = require('path');


/*
https://github.com/douglasduteil/angular-utility-belt/issues/1

Generates a simple README for GitHub from the README.tpl
In the future this will also generate a gh-pages index.html doc with embedded example and more fancy stuff
*/

gulp.task('ng-factory:docs(dist)', function() {

  var bowerDependencies = bower.devDependencies;
  Object.keys(bowerDependencies).forEach(function(key) {
    bowerDependencies[key] = bowerDependencies[key].replace('|', '&#124;');
  });

  var data = {

    // todo: fancy ascii art
    logo: '# ' + pkg.name,

    // add intro from modules/docs/intro.md
    header: fs.readFileSync(path.join(config.src.cwd, config.moduleName, 'docs', 'intro.md')),

    // scan bower
    dependencies: bowerDependencies,

    // todo : link to reald badges
    badges: [
        // code climate
        'http://img.shields.io/codeclimate/github/kabisaict/flow.svg',
        'http://img.shields.io/codeclimate/coverage/github/triAGENS/ashikawa-core.svg',
        // travis
        'http://img.shields.io/travis/joyent/node.svg',
        // github
        'http://img.shields.io/github/release/qubyte/rubidium.svg',
        'http://img.shields.io/github/issues/badges/shields.svg'
    ],

    // todo : scan examples and add link (or embed)
    examples: [],

    // todo: generate ngdocs API
    ngdocs: 'minimalist ngDocs API',

    // add licence from package
    license: 'Licensed under : ' + pkg.license
  };

  // grab the intro for each example if any
  var examplesPath = path.join(process.cwd(), config.src.cwd, config.moduleName, 'docs', 'examples');
  fs.readdirSync(examplesPath).forEach(function(example) {
    var text = fs.readFileSync(path.join(examplesPath, example, example + '.md'));
    // todo : generate a direct link to the gh-pages branch
    text += '\n\n -> Link to live example';
    data.examples.push(text);
  });


  gulp.src('./gulp/tasks/docs/README.tpl')
    .pipe(template(data))
    .pipe(rename(function(path) { path.extname = '.md'; }))
    .pipe(gulp.dest(config.src.dist));

});
