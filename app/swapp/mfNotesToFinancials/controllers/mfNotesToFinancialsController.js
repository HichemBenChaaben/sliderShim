define(["swapp","socket-factory"],function(n){n.registerController("mfNotesToFinancialsController",["$scope","socket","$filter",function(n,t,e){n.notesToFinancials={},n.exceptions=n.$parent.modExceptions,n.permissions=n.$parent.modPermissions,n.$on("setModTranslations",function(){n.exceptions=n.$parent.modExceptions,n.permissions=n.$parent.modPermissions}),n.getPermissions=function(){return n.$parent.modPermissions},n.getExceptions=function(){return n.$parent.modExceptions};var s={task_request:"Company/getNotesToFinancials",data:""};t.get(s).then(function(t){n.notesToFinancials=t}),n.setNotesToFinancials=function(){var e={task_request:"Company/setNotesToFinancials",data:n.notesToFinancials.manager_notes};t.get(e).then(function(t){1===t.status?n.$parent.addAlert("SUCCESS","UPDATE"):n.$parent.addAlert("ERROR","UPDATE")})}}])});