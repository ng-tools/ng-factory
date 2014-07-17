'use strict';

describe('RequestAnimationFrame polyfill required', function () {
  it('requestAnimationFrame', function () {
    expect(window.requestAnimationFrame).toBeDefined();
  });
  it('cancelAnimationFrame', function () {
    expect(window.cancelAnimationFrame).toBeDefined();
  });
});

describe('Directive: uiSlider', function () {

  var element, scope, compile,
    validTemplate = '<div ui-slider></div>';

  function createDirective(data, template) {
    var elm;

//    scope.data = data || defaultData;

    elm = angular.element(template || validTemplate);
    angular.element(document.body).prepend(elm);
    compile(elm)(scope);
    scope.$digest();

    return elm;
  }

  beforeEach(function () {

    module('ui.slider');

    inject(function ($rootScope, $compile) {
      scope = $rootScope.$new();
      compile = $compile;
    });

    // Spy on the requestAnimationFrame to directly trigger it
    spyOn(window, 'requestAnimationFrame').and.callFake(function (fct) {
      fct();
    });
  });

  afterEach(function () {
    if (element) element.remove();
  });

  describe('restrictions', function () {
    it('should have a expected result', function () {
      element = createDirective();
      expect(element.children().length).toBeGreaterThan(0);
    });

    it('should work as an element', function () {
      element = createDirective(null, '<ui-slider></ui-slider>');
      expect(element.children().length).toBeGreaterThan(0);
    });

    it('should work as a class', function () {
      element = createDirective(null, '<div class="ui-slider"></div>');
      expect(element.children().length).toBeGreaterThan(0);
    });
  });

  describe('static', function () {
    var track, thumb;
    beforeEach(function () {
      element = createDirective(null, '<ui-slider></ui-slider>');
      thumb = angular.element(element.children()[0]);
    });

    it('should have a track and a thumb', function () {
      expect(element).toHaveClass('ui-slider');
      expect(element[0].tagName).toBe('UI-SLIDER');
      expect(thumb[0].tagName).toBe('DIV');
      expect(thumb).toHaveClass('ui-slider__thumb');
    });

    describe('the thumb', function () {

      it('should have a ngModel attr', function () {
        expect(thumb.attr('ng-model')).toBeTruthy();
      });

      it('should have a virtual key as ngModel attr', function () {
        expect(thumb.attr('ng-model')).toMatch(/^__\w*/);
      });

      it('should move went the model change', function () {
        var $thumb = _jQuery(thumb[0]);
        var virtualModel = $thumb.attr('ng-model');
        expect($thumb.position().left).toEqual(0);
        expect($thumb).toBePristine();
        expect(scope[virtualModel]).toBeUndefined();

        scope.$apply(virtualModel + " = 50");
        expect(window.requestAnimationFrame).toHaveBeenCalled();
        expect(scope[virtualModel]).toBeDefined();

        expect($thumb).toBePristine();
        expect($thumb).toBeValid();
        expect($thumb.get(0).style.left).toEqual('50%');
      });

    });
  });

  describe('thumb ngModel', function () {
    var $thumb, thumbOriginLeft;

    function setupThumb(tpl) {
      element = createDirective(null,
          '<ui-slider class="ui-slider-default">' +
          tpl +
          '</ui-slider>'
      );
      $thumb = _jQuery(element[0]).find('ui-slider-thumb');
      thumbOriginLeft = $thumb.position().left;
    }

    it('should render at 0 if null', function () {
      setupThumb('<ui-slider-thumb ng-model="foo"></ui-slider-thumb>');
      expect($thumb.position().left).toEqual(0);

      scope.$apply("foo = null");
      expect(window.requestAnimationFrame).toHaveBeenCalled();

      expect($thumb.position().left).toEqual(0);
    });

    describe('validation', function () {
      var ngCtrl;

      beforeEach(function () {
        setupThumb('<ui-slider-thumb ng-model="foo" name="bar"></ui-slider-thumb>');
        scope.$apply("foo = 25");
        expect(window.requestAnimationFrame).toHaveBeenCalled();
        ngCtrl = angular.element($thumb[0]).data('$ngModelController');
      });

      it('should init the properties', function () {
        expect($thumb).toBePristine();
        expect($thumb).toBeValid();

        expect(ngCtrl.$viewValue).toBeDefined();
        expect(ngCtrl.$modelValue).toBeDefined();

        expect(ngCtrl.$formatters.length).toEqual(5);
        expect(ngCtrl.$parsers.length).toEqual(3);

        expect(ngCtrl.$name).toBe('bar');
      });

      it('should be valid', function () {
        expect($thumb).toBeValid();
        expect($thumb).toHaveClass('ng-valid-min ng-valid-max ng-valid-step', 'ng-invalid-min ng-invalid-max ng-invalid-step');
      });

      it('should be invalid \'cause not a number', function () {
        scope.$apply("foo = '1'");

        expect($thumb).toBeInvalid();
        expect($thumb).toHaveClass('ng-invalid-number', 'ng-valid-number');
        expect(ngCtrl.$viewValue).toBeNaN();
      });

      it('should be invalid \'cause of the min', function () {
        scope.$apply("foo = -1");

        expect($thumb).toBeInvalid();
        expect($thumb).toHaveClass('ng-invalid-min', 'ng-valid-min');
        expect(ngCtrl.$viewValue).toBeNaN();
      });

      it('should be invalid \'cause of the max', function () {
        scope.$apply("foo = 1000");

        expect($thumb).toBeInvalid();
        expect($thumb).toHaveClass('ng-invalid-max', 'ng-valid-max');
        expect(ngCtrl.$viewValue).toBeNaN();
      });

      it('should be invalid \'cause of the step', function () {
        scope.$apply("foo = 0.5");

        expect($thumb).toBeInvalid();
        expect($thumb).toHaveClass('ng-invalid-step', 'ng-valid-step');
        expect(ngCtrl.$viewValue).toBeNaN();
      });
    });

    describe('on-the-fly', function () {

      beforeEach(function () {
        scope.min = 10;
        scope.max = 20;
        scope.step = 1;
        setupThumb('<ui-slider-thumb ng-model="foo" min="{{min}}"  max="{{max}}"  step="{{step}}"></ui-slider-thumb>');
      });

      it('should validate even if min value changes', function () {
        scope.$apply("foo = 0");
        expect($thumb).toBeInvalid();
        expect($thumb).toHaveClass('ng-invalid-min', 'ng-valid-min');

        scope.$apply("min = 0");
        expect($thumb).toBeValid();
        expect($thumb).toHaveClass('ng-valid-min', 'ng-invalid-min');
      });

      it('should validate even if max value changes on-the-fly', function () {
        scope.$apply("foo = 30");
        expect($thumb).toBeInvalid();
        expect($thumb).toHaveClass('ng-invalid-max', 'ng-valid-max');

        scope.$apply("max = 30");
        expect($thumb).toBeValid();
        expect($thumb).toHaveClass('ng-valid-max', 'ng-invalid-max');
      });

      it('should validate even if step value changes on-the-fly', function () {
        scope.$apply("foo = 10.5");
        expect($thumb).toBeInvalid();
        expect($thumb).toHaveClass('ng-invalid-step', 'ng-valid-step');

        scope.$apply("step = 0.5");
        expect($thumb).toBeValid();
        expect($thumb).toHaveClass('ng-valid-step', 'ng-invalid-step');
      });

    });

  });

  describe('slider', function () {
    var $thumb;

    beforeEach(function () {
      scope.min = 10;
      scope.max = 20;
      scope.step = 1;
      spyOn(scope, "$emit").and.callThrough();
      element = createDirective(null,
          '<ui-slider class="ui-slider-default" min="{{min}}"  max="{{max}}"  step="{{step}}">' +
          '<ui-slider-thumb ng-model="foo"></ui-slider-thumb>' +
          '</ui-slider>'
      );
      $thumb = _jQuery(element[0]).find('ui-slider-thumb');
      expect(scope.$emit).toHaveBeenCalled();
      expect(scope.$emit.calls.count()).toEqual(3);
    });

    it('should influence the thumb min', function () {
      scope.$emit.calls.reset();

      scope.$apply("foo = 0");
      expect($thumb).toBeInvalid();
      expect($thumb).toHaveClass('ng-invalid-min', 'ng-valid-min');

      scope.$apply("min = 0");
      expect(scope.$emit).toHaveBeenCalledWith('global min changed');

      expect($thumb).toBeValid();
      expect($thumb).toHaveClass('ng-valid-min', 'ng-invalid-min');
    });

    it('should influence the thumb max', function () {
      scope.$emit.calls.reset();

      scope.$apply("foo = 30");
      expect($thumb).toBeInvalid();
      expect($thumb).toHaveClass('ng-invalid-max', 'ng-valid-max');

      scope.$apply("max = 30");
      expect(scope.$emit).toHaveBeenCalledWith('global max changed');

      expect($thumb).toBeValid();
      expect($thumb).toHaveClass('ng-valid-max', 'ng-invalid-max');
    });

    it('should influence the thumb step', function () {
      scope.$emit.calls.reset();

      scope.$apply("foo = 10.5");
      expect($thumb).toBeInvalid();
      expect($thumb).toHaveClass('ng-invalid-step', 'ng-valid-step');

      scope.$apply("step = 0.5");
      expect(scope.$emit).toHaveBeenCalledWith('global step changed');

      expect($thumb).toBeValid();
      expect($thumb).toHaveClass('ng-valid-step', 'ng-invalid-step');
    });

  });

  describe('range', function () {
    var $range;

    function setupRange(tpl) {
      element = createDirective(null,
          '<ui-slider class="ui-slider-default">' +
          tpl +
          '<ui-slider-thumb ng-model="foo"></ui-slider-thumb>' +
          '</ui-slider>'
      );
      $range = _jQuery(element[0]).find('ui-slider-range');
    }

    it('should be hidden (somehow)', function () {
      setupRange('<ui-slider-range></ui-slider-range>');
      expect($range.get(0).style.left).toEqual('0%');
      expect($range.get(0).style.right).toEqual('100%');
    });

    it('should display a static range that end at 50%', function () {
      setupRange('<ui-slider-range end="50"></ui-slider-range>');
      expect($range.get(0).style.left).toEqual('0%');
      expect($range.get(0).style.right).toEqual('50%');
    });

    it('should display a range from 0 to cursor', function () {
      setupRange('<ui-slider-range end="{{foo}}"></ui-slider-range>');
      expect($range.get(0).style.left).toEqual('0%');
      expect($range.get(0).style.right).toEqual('100%');

      scope.$apply("foo = 50");
      expect($range.get(0).style.left).toEqual('0%');
      // FIXME left position must be at half of the targeted thumb's width
      expect($range.get(0).style.right).toEqual('50%');
    });

    it('should display a range from cursor to 100', function () {
      setupRange('<ui-slider-range start="{{foo}}"></ui-slider-range>');
      scope.$apply("foo = 0");
      expect($range.get(0).style.left).toEqual('0%');
      expect($range.get(0).style.right).toEqual('0%');

      scope.$apply("foo = 50");
      // FIXME left position must be at half of the targeted thumb's width
      expect($range.get(0).style.left).toEqual('50%');
      expect($range.get(0).style.right).toEqual('0%');
    });

  });

});
