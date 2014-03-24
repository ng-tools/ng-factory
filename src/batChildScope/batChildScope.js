'use strict';

/**
 * @ngdoc overview
 * @name bat.childScope
 *
 * @description
 * Directive to describe a child scope
 *
 * @example
 <div bat-child-scope="{ foo: bar }"></div>
 */

angular.module('bat.childScope', [])
    .directive('batChildScope', function() {

        return {
            restrict: 'A',
            scope: true,
            link: {
                pre: function preLink(scope, iElement, iAttrs) {
                    angular.extend(scope, scope.$eval(iAttrs.batChildScope));
                }
            }
        };

    })
;
