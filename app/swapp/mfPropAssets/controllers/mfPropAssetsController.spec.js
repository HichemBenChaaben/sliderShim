define(["swapp","/assets/vendor/angular-mocks/angular-mocks.js","/swapp/mfPropAssets/controllers/mfPropAssetsController.js"],function(){"use strict";describe("mfPropAssets Controller Test",function(){var e,t;beforeEach(function(){module("swapp"),module(function(e){e.value("socket",{get:function(){return{then:function(){}}}})})}),beforeEach(inject(function(t){e=t})),t={},t.permissions={},t.$parent={},t.$parent.modPermissions={},t.$on=function(){},it("should give the template string of the template",function(){e("mfPropAssetsController",{$scope:t}),expect(t.decimalFixColFunc().length()).not.toBe(0)})})});