define(["routeDefs"],function(){var a=angular.module("swapp");a.run(["$couchPotato","$state","$stateParams","$rootScope","gettextCatalog","tmhDynamicLocale",function(e,t,o,n,r,l){a.lazy=e,n.$state=t,n.$stateParams=o,r.setCurrentLanguage("en"),l.set("en-au"),r.debug=!0}]).config(["tmhDynamicLocaleProvider","$logProvider",function(a,e){e.debugEnabled(!0),a.localeLocationPattern("../../assets/vendor/angular-i18n/angular-locale_{{locale}}.js")}])});