'use strict';

angular.module('ngFactory')

  .provider('$hljs', function() {

    this.$get = function($window) {
      return $window.hljs;
    };

  })

  .directive('hljs', function($hljs) {

    return {
      restrict: 'A',
      link: function(scope, element, attr, controller) {
        $hljs.highlightBlock(element[0]);
      }
    };

  });
