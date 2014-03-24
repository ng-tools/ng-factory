'use strict';

describe('batChildScope', function() {
    var $scope, $compile;

    /**
     * Setup
     */

    beforeEach(module('bat.childScope'));

    beforeEach(inject(function(_$rootScope_, _$compile_) {
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
    }));

    function _setup(template, scope){
        template = template || '<div bat-child-scope="" ></div>';
        scope = scope || $scope;

        var element = angular.element(template);
        $compile(element)($scope);
        $scope.$digest();
        angular.element(document.body).prepend(element);

        return element;
    }

    /**
     * Tests
     */

    it('should create a empty child scope', function(){
        var element = _setup();

        expect(element.scope().$parent === $scope);

        element.remove();
    });

    it('should be initialized with a object', function(){

        var element = _setup('<div bat-child-scope="{ foo: \'bar\'}" ></div>');

        expect(element.scope().foo, 'bar');

        element.remove();
    });

});
