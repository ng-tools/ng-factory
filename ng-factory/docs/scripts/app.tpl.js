'use strict';

angular.module('ngDocs', ['ngAnimate'])

  .constant('version', 'v<%= pkg.version %>')

  .config(function($locationProvider, $sceProvider) {

    // Configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode(false);

    // Disable strict context
    $sceProvider.enabled(false);

  })

  .controller('MainCtrl', function ($scope, $rootScope, $location) {

    $scope.$location = $location;

  })

  .directive('code', function() {
    return {restrict: 'E', terminal: true};
  });
