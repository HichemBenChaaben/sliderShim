(function(window) {
    'use strict';
    var app = angular.module('app', ['app.rangeSliderShim']);
    app.controller('Main', Main);
    Main.$inject = ['$scope', '$rootScope'];
    function Main($scope, $rootScope) {
        var vm = this;
        // Form example data
        vm.formData = {
            nn: 4,
            tt: 'hello'
        };
        // Page language
        vm.pLang = 'LTR';
        vm.pDir = 'ltr';
        $rootScope.pLang = vm.pLang;
        $rootScope.pDir = vm.pDir;

        $scope.doSomething = function() {
            return false;
        };

        // change the language of the page
        vm.changeLanguage = function() {
            $rootScope.pLang = vm.Plang;
            $rootScope.pDir = vm.pDir;
        };
    }
}(window));
