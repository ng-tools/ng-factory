'use strict';

angular.module('bar.jumbotron', [])
  .constant('barJumbotronConfig', {
    class: 'jumbotron--bar',
    title: 'Hello World',
    templateUrl: 'jumbotron/jumbotron.tpl.html'
  })
  .directive('barJumbotron', barJumbotronDirective);


/**
 * @ngInject
 */
function barJumbotronDirective(barJumbotronConfig) {

  var ATTR_OPTIONS_TO_COPY = ['title'];
  var ATTR_PREFIX = 'barJumbotron';

  return {
    restrict: 'A',
    templateUrl: barJumbotronConfig.templateUrl,
    scope: true,
    link: function postLink(scope, element, attr) {

      var options = {};
      angular.forEach(ATTR_OPTIONS_TO_COPY, function(key) {
        var prefixedKey = ATTR_PREFIX + key[0].toUpperCase() + key.substr(1);
        if (angular.isDefined(attr[prefixedKey])) options[key] = attr[prefixedKey];
      });

      scope.jumbotron = angular.extend({}, barJumbotronConfig, options);

    }
  };
}


