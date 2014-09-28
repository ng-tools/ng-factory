# bar.jumbotron
[![Build Status](http://img.shields.io/travis/douglasduteil/angular-utility-belt.svg)](http://travis-ci.org/douglasduteil/angular-utility-belt) [![Coverage Status](http://img.shields.io/codeclimate/coverage/github/douglasduteil/angular-utility-belt.svg)](http://url) [![Github Releases](http://img.shields.io/badge/release-v0.1.0-orange.svg)](http://github.com/douglasduteil/angular-utility-belt/releases) [![Github Issues](http://img.shields.io/github/issues/douglasduteil/angular-utility-belt.svg)](http://github.com/douglasduteil/angular-utility-belt/issues) 

<img align="right" height="200" src="http://icons.iconarchive.com/icons/igh0zt/ios7-style-metro-ui/512/MetroUI-Apps-Foobar-icon.png">

> Jumbotron are styled web site header.

Bar's jumbotron  showcase key content on your site seamless integration of [Bootstrap 3.0+](https://github.com/twbs/bootstrap) into your [AngularJS 1.2+](https://github.com/angular/angular.js) app.

<br/>

## Install

``` sh
$ bower install bar.jumbotron --save
```

## Examples

- **jumbotron** - [01-directive.html](src/jumbotron/docs/examples/01-directive.html)

``` .html
<!-- Default 'Hello World' jumbotron -->
<div
  data-bar-jumbotron
  ></div>


<!-- You can also use data-bar-jumbotron-title to change the title -->
<div
  data-bar-jumbotron
  data-bar-jumbotron-title="S'Up !"
  ></div>


<!-- or the inner class -->
<div
  data-bar-jumbotron
  data-bar-jumbotron-class="jumbotron--baaaar"
  ></div>


```
- **jumbotron** - [02-config.js](src/jumbotron/docs/examples/02-config.js)

``` .js
'use strict';

angular.module('foo.example')

  .config(function (barJumbotronConfig) {
    barJumbotronConfig.class = 'jumbotron--baaaar';
  });

```

## Usage








### directive








#### jumbotronDirective


The jumbotron directive. Have a sweet header.








##### Arguments


<table>
  <thead>
    <tr>
      <th>Param</th>
      <th>Type</th>
      <th>Details</th>
    </tr>
  </thead>
  <tbody>


<tr>
  <td>
    title  <em>(optional)</em>
  </td>
  <td>
    
    <code>string</code>
    
  </td>
  <td>
    <p>The jumbotron title.</p>

    Defaults : <code>'Hello World'</code>
  </td>
</tr>

<tr>
  <td>
    class  <em>(optional)</em>
  </td>
  <td>
    
    <code>string</code>
    
  </td>
  <td>
    <p>The jumbotron additional class.</p>

    Defaults : <code>'jumbotron--bar'</code>
  </td>
</tr>



  </tbody>
</table>




### object








#### barJumbotronConfig










##### Properties


<table>
  <thead>
    <tr>
      <th>Param</th>
      <th>Type</th>
      <th>Details</th>
    </tr>
  </thead>
  <tbody>


<tr>
  <td>
    class  
  </td>
  <td>
    
    <code>string</code>
    
  </td>
  <td>
    <p>the class name</p>

    
  </td>
</tr>

<tr>
  <td>
    title  
  </td>
  <td>
    
    <code>string</code>
    
  </td>
  <td>
    <p>the title</p>

    
  </td>
</tr>

<tr>
  <td>
    templateUrl  
  </td>
  <td>
    
    <code>string</code>
    
  </td>
  <td>
    <p>the used template URL</p>

    
  </td>
</tr>



  </tbody>
</table>







## Dependencies

Package | Version
------- | -------
angular-mocks | **^1**
jquery | **^2**


## Browser Support

[![Browser Support](https://ci.testling.com/douglasduteil/angular-utility-belt.png)](http://ci.testling.com/douglasduteil/angular-utility-belt)

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
