define(["swapp","ui-bootstrap","ng-slider","ng-messages","socket-factory","/swapp/mfChangePassword/directives/password-strength-calculator.js"],function(e){e.registerController("mfSecDefaultsController",["$scope","$state","$rootScope","$modal","socket",function(e,a,n,t,o){function r(){var e={task_request:"User/getUserPw",data:""};o.get(e).then(function(e){})}function s(a){var n=[];n=l[a-1].split("***"),e.arrStrengthRules=angular.copy(n)}e.$on("setModTranslations",function(a){e.pageTranslations=e.$parent.modTranslations}),e.permissions=e.$parent.modPermissions,e.pageTranslations=e.$parent.modTranslations,e.strModuleName=e.$parent.modDisplayName,console.log(e.pageTranslations),r(),e.dateOptions={formatYear:"yy",startingDay:1},e.objSecurityDetails={},e.onDateChange=function(a,n){if(a){var t=a.getFullYear(),o=a.getMonth()+1,r=a.getDate();10>o&&(o="0"+o),10>r&&(r="0"+r);var s=t+"-"+o+"-"+r;e[n]=s}},e.onDatePopupOpen=function(e){e.preventDefault(),e.stopPropagation()};var l=[e.pageTranslations.PwdRule1,e.pageTranslations.PwdRule2,e.pageTranslations.PwdRule3,e.pageTranslations.PwdRule4,e.pageTranslations.PwdRule5];e.arrStrengthRules=[],s(3),e.valueSlider=3,e.id="idSlider",e.sliderOptions={from:1,to:5,step:1,scale:["weak","|","good","|","strong"],vertical:!1,css:{background:{"background-color":"silver"},before:{"background-color":"red"},"default":{"background-color":"white"},after:{"background-color":"green"},pointer:{"background-color":"blue"}},callback:function(a,n){e.arrStrengthRules=[],e.arrStrengthRules.length=0,s(a)}},e.onEnterPasswordClick=function(){var e=t.open({templateUrl:"/swapp/mfChangePassword/views/enterPasswordPopUp.tpl.html",controller:i,size:"lg",resolve:{},backdrop:"static"});e.result.then(function(){},function(){})};var i=function(e,a){e.ok=function(){a.dismiss("cancel")},e.cancel=function(){a.dismiss("cancel")}}}])});