define(["swapp","uiGrid","ui-bootstrap","socket-factory","/swapp/directives/bankpicker/bankpicker-directive.js"],function(e){e.registerController("mfCompAccountController",["$scope","$rootScope","socket","$filter",function(e,n,t,o){e.bankDetails={},e.permissions=e.$parent.modPermissions,e.exceptions=e.$parent.modExceptions,e.$on("setModTranslations",function(){e.exceptions=e.$parent.modExceptions}),e.bankPickerOpenStatus={isopen:!1},e.toggleDropdown=function(t){t.preventDefault(),t.stopPropagation(),e.bankPickerOpenStatus.isopen||(e.bankPickerOpenStatus.isopen=!e.bankPickerOpenStatus.isopen),n.$broadcast("fetchBankPickerData")},e.$on("bankBranchSelected",function(n,t){e.bankDetails=t,e.bankPickerOpenStatus.isopen=!e.bankPickerOpenStatus.isopen})}])});