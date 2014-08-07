# bs-alert [![Build Status](http://img.shields.io/travis/douglasduteil/angular-utility-belt.svg)](http://travis-ci.org/douglasduteil/angular-utility-belt)

Alerts are styled tiny dialogs that inherit the behavior of modals.

## Examples

- **alert** - [01-directive.html](src/alert/docs/examples/01-directive.html)

``` .html
<!-- Button to trigger a default alert with a scope as an object {title:'', content:'', etc.} -->
<button type="button" class="btn btn-lg btn-primary" data-placement="top-right" data-container="body" data-duration="3" bs-alert="alert">Click to toggle alert
  <br />
  <small>(using an object)</small>
</button>

<!-- You can also use data-attrs to assign scope variables -->
<button type="button" class="btn btn-lg btn-primary" title="" data-content="" data-type="success" data-container="#alerts-container" bs-alert>Click to toggle alert
  <br />
  <small>(using data-attrs)</small>
</button>

<!-- You can use a custom html template with the `data-template` attr -->
<button type="button" class="btn btn-lg btn-danger" data-template="alert/docs/alert.demo.tpl.html" data-placement="top" data-duration="3" data-animation="am-fade-and-slide-top" data-container="body" data-keyboard="true" bs-alert="alert">Custom alert
  <br />
  <small>(using data-template)</small>
</button>

<!-- Element container to append the first alert -->
<hr>
<div id="alerts-container"></div>

```
- **alert** - [02-service.js](src/alert/docs/examples/02-service.js)

``` .js
'use strict';

angular.module('mgcrea.ngStrapDocs')

.controller('AlertDemoCtrl', function($scope, $alert) {

  // Service usage
  var myAlert = $alert({title: 'Holy guacamole!', content: 'Best check yo self, you\'re not looking too good.', placement: 'top', type: 'info', keyboard: true, show: false});
  $scope.showAlert = function() {
    myAlert.show(); // or myAlert.$promise.then(myAlert.show) if you use an external html template (async)
  };

});

```

## Usage
minimalist ngDocs API

## Dependencies

Package | Version
------- | -------
angular | **^1.3.0**
angular-animate | **^1.3.0**
bootstrap | **^3.2.0**
font-awesome | **^4.1.0**
bootstrap-additions | **~0.2.3**


## Status

[![CodeClimate status](http://img.shields.io/codeclimate/github/kabisaict/flow.svg)](http://url)

[![CodeClimate coverage](http://img.shields.io/codeclimate/coverage/github/triAGENS/ashikawa-core.svg)](http://url)

[![Travis CI](http://img.shields.io/travis/joyent/node.svg)](http://travis-ci.org/joyent/node)

[![Github release](http://img.shields.io/github/release/qubyte/rubidium.svg)](http://url)

[![Github issues](http://img.shields.io/github/issues/badges/shields.svg)](http://url)

[![NPM dependencies](http://img.shields.io/david/visionmedia/express.svg)](http://url)

[![NPM dev dependencies](http://img.shields.io/david/dev/visionmedia/express.svg)](http://url)

[![Browser support](https://ci.testling.com/substack/tape.png)](http://ci.testling.com/substack/tape)


## Contributing

Please submit all pull requests the against master branch. If your unit test contains JavaScript patches or features, you should include relevant unit tests. Thanks!

## License

    The MIT License (MIT)
    
    Copyright (c) 2014 Douglas Duteil
    
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
