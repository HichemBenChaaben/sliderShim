describe("The simple main controller", function() {
    var $controller,
        rootScope,
        scope;

    // create app using ng-mocks
    beforeEach(module('app'));

    // Injecting scope and rootScope
    // creating a scope from rootscope
    // mocking the controller with $scope as scope
    beforeEach(inject(function(_$controller_, _$rootScope_) {
        var $controller = _$controller_;
        rootScope = _$rootScope_;
        scope = rootScope.$new();
        $controller('Main as vm', {
            $scope: scope,
            $rootScope: rootScope
        });
    }));

    it('should behave a rootScope variable named pLang and should be defined', function() {
        expect(rootScope.pDir).toEqual('ltr');
    });
    it('should behave a rootscope variable named pDir', function() {
        expect(rootScope.pLang).toEqual('LTR');
    });

    it('should assign rootScope.pLang to scope.pLang', function() {
        expect(rootScope.pLang).toEqual(scope.vm.pLang);
    });

    it('should have the page language value', function() {
        expect(scope.vm.pLang).toBe('LTR');
    });

    it('should have a function that returns false', function() {
        var a = scope.doSomething();
        expect(a).toBeFalsy();
    });

    it('should behave a change language function', function() {
        expect(scope.vm.changeLanguage).toBeDefined();
    });

    it('should have formData nn', function() {
        expect(scope.vm.formData.nn).toEqual(4);
    });

    it('should have formData tt', function() {
        expect(scope.vm.formData.tt).toEqual('hello');
    });
});
