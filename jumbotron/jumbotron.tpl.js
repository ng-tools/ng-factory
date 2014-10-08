/**
 * bar.jumbotron
 * @version v0.0.1 - 2014-10-08
 * @link https://github.com/douglasduteil/angular-utility-belt
 * @author Foo Bar <foo@bar.com> (https://github.com/foo)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

angular.module('bar.jumbotron').run(['$templateCache', function($templateCache) {

  $templateCache.put('jumbotron/jumbotron.tpl.html', '<div class="jumbotron" ng-class="jumbotron.class"><div class="container"><h1>{{ jumbotron.title }}</h1></div></div>');

}]);