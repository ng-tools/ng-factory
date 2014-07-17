
# ng-factory

A generator to scaffold for your AngularJS components

 - gives you a powerful gulpFile that you can enhance
 - generates your project unit test and CI configurations
 - generates your project documentation and README
 - automates build and deployment


## Setup

```bash
npm install ng-factory
gulp ng-factory
```

## gulp tasks

 - `serve`
    - `serve:dist`
 - `test`
 - `coverage`
 - `build`
    - `build:dist`
    - `build:pages`
 - `push`

## Project structure

```
 - src
    - module-example
        |- module-example.js
        |- module-example.tpl.html
        |- module-example.less
        |- test
        |- docs
            |- intro.md
            |- docs.css
            |- examples
                |- example 1
                    |- example-1.tpl.html
                    |- example-1.js
                    |- example-1.less
        |- bower.json
 - .travis.yml
 - .editorconfig
 - .gitignore
 - CHANGELOG.md
 - CONTRIBUTING.md
 - gulpFile.js
 - options.js
 - package.json
 - README.md
 - LICENSE
```

## CLI

 - `factory init` : scaffold your project
 - `factory update` : update the scaffold

## Todo
 - gulp
 - TU + coverage
 - branche doc
 - branche dist
 - travis
 - browserling
 - coverage
 - README
 - doc
 - changelog
