# Getting started


## Quick start

Install bar.jumbotron with [Bower](https://github.com/bower/bower).

```bash
$ bower install bar.jumbotron --save
```

Include the required libraries is your `index.html`:

```bash
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/jumbotron/jumbotron.min.js"></script>
<script src="bower_components/jumbotron/jumbotron.tpl.min.js"></script>
```

Inject the `bar.jumbotron` module into your app:


```bash
angular.module('myApp', ['mgcrea.ngStrap']);
```


## Developers

Clone the repo, `git clone git://github.com/douglasduteil/angular-utility-belt/.git`, [download the latest release](https://github.com/douglasduteil/angular-utility-belt/zipball/master) or install with bower `bower install bar.jumbotron#master --save`.

AngularStrap is tested with `karma` against the latest stable release of AngularJS.

```bash
$ npm install
$ gulp test
```

You can build the latest version using `gulp`.

```bash
$ gulp dist
```

You can quickly hack around (the docs) with:


```bash
$ gulp serve
```


## Contributing

Please submit all pull requests the against master branch. If your unit test contains JavaScript patches or features, you should include relevant unit tests. Thanks!

