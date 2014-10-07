/**
 * bar.jumbotron
 * @version v0.0.0 - 2014-10-07
 * @link https://github.com/douglasduteil/angular-utility-belt
 * @author Foo Bar <foo@bar.com> (https://github.com/foo)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

/**
 * @namespace bar.jumbotron
 */

angular.module('bar.jumbotron', [])
  .constant('barJumbotronConfig',
  /**
   * @ngdoc object
   * @memberOf bar.jumbotron
   * @name barJumbotronConfig
   *
   * @property {string} class - the class name
   * @property {string} title - the title
   * @property {string} templateUrl - the used template URL
   */
  {
    class: 'jumbotron--bar',
    title: 'Hello World',
    templateUrl: 'jumbotron/jumbotron.tpl.html'
  })
  .directive('barJumbotron', barJumbotronDirective);


/**
 * @ngInject
 *
 * @param {barJumbotronConfig} barJumbotronConfig
 */
function barJumbotronDirective(barJumbotronConfig) {

  var ATTR_OPTIONS_TO_COPY = ['title', 'class'];
  var ATTR_PREFIX = 'barJumbotron';


  /**
   * @ngdoc directive
   * @memberOf bar.jumbotron
   * @name jumbotronDirective
   * @restrict A
   *
   * @description
   * The jumbotron directive. Have a sweet header.
   *
   * @param {string} [title='Hello World'] - The jumbotron title.
   * @param {string} [class='jumbotron--bar'] - The jumbotron additional class.
   *
   */
  return {
    restrict: 'A',
    templateUrl: barJumbotronConfig.templateUrl,
    scope: true,
    link: function postLink(scope, element, attr) {

      var options = {};
      angular.forEach(ATTR_OPTIONS_TO_COPY, function (key) {
        var prefixedKey = ATTR_PREFIX + key[0].toUpperCase() + key.substr(1);
        if (angular.isDefined(attr[prefixedKey])) options[key] = attr[prefixedKey];
      });

      scope.jumbotron = angular.extend({}, barJumbotronConfig, options);

    }
  };
}
barJumbotronDirective.$inject = ["barJumbotronConfig"];


