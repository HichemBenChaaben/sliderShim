(function(window) {
    'use strict';
    var app = angular.module('app.rangeSliderShim', []);
    app.directive('sliderShim', [function() {
        // Runs during compile
        return {
            restrict: 'E',
            require: 'ngModel',
            scope: {
                ngModel: '=',
                min: '@',
                max: '@',
                step: '@'
            },
            templateUrl: '/app/directives/input.tpl.html',
            link: function(scope, element, attrs, ngModelCtl) {
                // configure forms-ext features
                window.webshim.setOptions("forms-ext", {
                    replaceUI: "auto",
                    types: "range",
                    range: {
                        classes: "show-activevaluetooltip",
                        direction: 'rtl'
                    }
                });
                //load forms and forms-ext features
                window.webshim.polyfill('forms-ext');
            }
        };
    }]);
}(window));
