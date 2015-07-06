define(["swapp","/assets/vendor/angular-mocks/angular-mocks.js","/swapp/mfCompDetails/controllers/mfCompDetailsController.js"],function(){"use strict";describe("mfCompDetails Controller Test",function(){var e,t;beforeEach(function(){module("swapp"),module(function(e){e.value("socket",{get:function(){return{then:function(){}}}})})}),beforeEach(inject(function(t){e=t})),t={},t.permissions={},t.$parent={},t.$parent.modPermissions={},t.objCompanyDetails={},t.clientId=823,t.$on=function(){},it("should turn a date string in the format YYYY-MM-DD HH:MM:SS and turn it into a timestamp",function(){e("mfCompDetailsController",{$scope:t}),expect(t.formatDate("2012-12-21 00:00:00")).toEqual(13560336e5),expect(t.formatDate("2015-01-01 00:00:01")).toEqual(1420056001e3)}),it("should Format the date in ISO format for the database",function(){e("mfCompDetailsController",{$scope:t});var o=new Date(13301928e5);expect(t.formatDateForDatabase(o)).toEqual("2012-02-25 00:00:00")}),it("should always add the new object and return the length increased by 1",function(){e("mfCompDetailsController",{$scope:t}),t.phoneTypeList=[],t.objCompanyDetails.phonenos=[],t.userPhoneGridOptions={},expect(t.addNewContactPhoneType().length).toBeGreaterThan(0)}),it("should always check for any undefined property in object , return false if found",function(){e("mfCompDetailsController",{$scope:t});var o={};o.prop1="test",o.prop2="test";var n={};n.prop1=null,n.prop2=void 0,expect(t.checkObjectValues(o)).toBeTruthy(),expect(t.checkObjectValues(n)).toBeFalsy()})})});