'use strict';

angular.module('ngFactory')

  .provider('$hljs', function() {

    this.$get = function($window) {
      return $window.hljs;
    };

  });
