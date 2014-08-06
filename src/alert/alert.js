'use strict';

// @BUG: following snippet won't compile correctly
// @TODO: submit issue to core
// '<span ng-if="title"><strong ng-bind="title"></strong>&nbsp;</span><span ng-bind-html="content"></span>' +

angular.module('mgcrea.ngStrap.alert', ['mgcrea.ngStrap.modal'])

  .provider('$alert', function() {

  /**
   * @ngdoc property
   * @name $alertProvider#defaults
   * @description
   *
   * Object containing default values for all {@link ng.$http $http} requests.
   *
   * - **`defaults.animation`** - {string} - Class to be added for animation purposes
   * Defaults value is `'am-fade'`.
   *
   * - **`defaults.prefixClass`** - {string} - Prefix prepended to class names and events
   * Defaults value is `'alert'`.
   *
   * - **`defaults.placement`** - {string} - Name of HTTP header to populate with the
   * XSRF token. Defaults value is `'X-XSRF-TOKEN'`.
   *
   * - **`defaults.placement`** - {string} - Name of HTTP header to populate with the
   * XSRF token. Defaults value is `'X-XSRF-TOKEN'`.
   *
   * - **`defaults.headers`** - {Object} - Default headers for all $http requests.
   * Refer to {@link ng.$http#setting-http-headers $http} for documentation on
   * setting default headers.
   *     - **`defaults.headers.common`**
   *     - **`defaults.headers.post`**
   *     - **`defaults.headers.put`**
   *     - **`defaults.headers.patch`**
   **/
    var defaults = this.defaults = {
      animation: 'am-fade',
      prefixClass: 'alert',
      placement: null,
      template: 'alert/alert.tpl.html',
      container: false,
      element: null,
      backdrop: false,
      keyboard: true,
      show: true,
      // Specific options
      duration: false,
      type: false,
      dismissable: true
    };

    this.$get = function($modal, $timeout) {

      function AlertFactory(config) {

        var $alert = {};

        // Common vars
        var options = angular.extend({}, defaults, config);

        $alert = $modal(options);

        // Support scope as string options [/*title, content, */ type, dismissable]
        $alert.$scope.dismissable = !!options.dismissable;
        if(options.type) {
          $alert.$scope.type = options.type;
        }

        // Support auto-close duration
        var show = $alert.show;
        if(options.duration) {
          $alert.show = function() {
            show();
            $timeout(function() {
              $alert.hide();
            }, options.duration * 1000);
          };
        }

        return $alert;

      }

      return AlertFactory;

    };

  })

  .directive('bsAlert', function($window, $location, $sce, $alert) {

    var requestAnimationFrame = $window.requestAnimationFrame || $window.setTimeout;

    return {
      restrict: 'EAC',
      scope: true,
      link: function postLink(scope, element, attr, transclusion) {

        // Directive options
        var options = {scope: scope, element: element, show: false};
        angular.forEach(['template', 'placement', 'keyboard', 'html', 'container', 'animation', 'duration', 'dismissable'], function(key) {
          if(angular.isDefined(attr[key])) options[key] = attr[key];
        });

        // Support scope as data-attrs
        angular.forEach(['title', 'content', 'type'], function(key) {
          attr[key] && attr.$observe(key, function(newValue, oldValue) {
            scope[key] = $sce.trustAsHtml(newValue);
          });
        });

        // Support scope as an object
        attr.bsAlert && scope.$watch(attr.bsAlert, function(newValue, oldValue) {
          if(angular.isObject(newValue)) {
            angular.extend(scope, newValue);
          } else {
            scope.content = newValue;
          }
        }, true);

        // Initialize alert
        var alert = $alert(options);

        // Trigger
        element.on(attr.trigger || 'click', alert.toggle);

        // Garbage collection
        scope.$on('$destroy', function() {
          alert.destroy();
          options = null;
          alert = null;
        });

      }
    };

  });
