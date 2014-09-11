'use strict';

describe('bar.jumbotron', function() {

  var bodyEl = $('body'), sandboxEl;
  var $compile, scope;

  beforeEach(function(){
    module('bar.jumbotron');

    inject(function (_$rootScope_, _$compile_) {
      scope = _$rootScope_.$new();
      bodyEl.html('');
      sandboxEl = $('<div>').attr('id', 'sandbox').appendTo($('body'));
      $compile = _$compile_;
    });
  });

  afterEach(function() {
    scope.$destroy();
    sandboxEl.remove();
  });

  // Templates

  var templates = {
    'default': {
      element: '<div bar-jumbotron ></div>'
    },
    'attr-title': {
      element: '<div bar-jumbotron bar-jumbotron-title="Bar Jumbotron !" ></div>'
    }
  };

  function compileDirective(template, locals) {
    template = templates[template];
    angular.extend(scope, template.scope || templates['default'].scope || {}, locals);
    var element = jQuery(template.element).appendTo(sandboxEl);
    element = $compile(element)(scope);
    scope.$digest();
    return jQuery(element[0]);
  }

  // Tests

  describe('with default template', function() {

    it('should had the default title', function() {
      compileDirective('default');
      expect(sandboxEl.find('h1').html()).toBe('Hello World');
    });

    it('should correctly compile inner content', function() {
      compileDirective('attr-title');
      expect(sandboxEl.find('h1').html()).toBe('Bar Jumbotron !');
    });


  });

});
