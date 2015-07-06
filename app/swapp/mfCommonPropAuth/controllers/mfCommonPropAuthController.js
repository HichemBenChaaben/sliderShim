define(["swapp","uiGrid","ui-bootstrap","socket-factory","/swapp/directives/address/address-directives.js","/swapp/directives/address-book/address-book-picker-directive.js"],function(e){"use strict";e.registerController("mfCommonPropAuthController",["$scope","uiGridConstants","socket","$q","$rootScope","gettext","gettextCatalog",function(e,t,o,r,a,n,s){e.appConstants=e.$parent.appConstants,e.permissions=e.$parent.modPermissions,e.exceptions=e.$parent.modExceptions,e.gridColActionMenu={},e.gridColActionMenu.isDisabled=!1,e.dateFormat=e.$parent.localTimeFormat,e.$parent.toggleOverlay(!1),e.gridOptions={},e.$on("selectedProperty",function(t,o){g(e.$parent.propertySelected.cts)});var i='<div class="ui-grid-cell-contents"><a ng-click="getExternalScopes().onEditClick(row, true)" ng-show="getExternalScopes().getPermissions(\'isUpdateAllowed\')">{{COL_FIELD | date:getExternalScopes().dateFormat}}</a></div>',d='<div class="ui-grid-cell-contents"><i class="glyphicon glyphicon-edit" ng-click="getExternalScopes().onEditClick(row);" ng-show="getExternalScopes().getPermissions(\'isUpdateAllowed\')"></i></div>',l='<div class="ui-grid-cell-contents"><i class="glyphicon glyphicon-trash" ng-click="getExternalScopes().deleteRowData(row);" ng-show="getExternalScopes().getPermissions(\'isUpdateAllowed\')"></i></div>',u='<div class="ui-grid-cell-contents"></div>',p='<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name"   ng-mouseenter="getExternalScopes().rowHover(row)"  ng-mouseleave="getExternalScopes().rowHover(row)" class="ui-grid-cell"   ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"  ui-grid-cell> </div>',c='<div class="ui-grid-cell-contents">{{COL_FIELD | translate }}</div>';e.scopeModel={onEditClick:function(t,o){e.currentlyRowBeingEdited=t,e.$parent.toggleOverlay(!0),m(t,o)},dateFormat:e.dateFormat,getPermissions:function(t){return e.permissions[t]},decimalFix:function(e){return e>=0?parseFloat(e).toFixed(2):void 0},deleteRowData:function(t){var o=n("Are you sure you want to delete this entry?");return confirm(s.getString(o))?void e.initiateDeleteRequest(t.entity):!1},rowHover:function(e){e.isSelected=e.isSelected?!1:!0}},e.initiateDeleteRequest=function(t){for(var r,a=0;a<e.gridOptions.data.length;a++)if(t.AuthorisationID===e.gridOptions.data[a].AuthorisationID){r=a;break}var n={task_request:"Property/removeCommonAuthorities",data:t};o.get(n).then(function(t){1===t?(e.gridOptions.data.splice(r,1),e.$parent.filterTrigger(e.gridOptions.data,e),e.$parent.addAlert("SUCCESS","DELETE")):e.$parent.addAlert("ERROR","DELETE")})},e.isFormattedArray=function(e){if(e){if(Array.isArray(e))return e;if(e.length<4)return[];var t=JSON.parse("["+e+"]");if(Array.isArray(t[0]))return t[0];var o=[];return o.push(t[0]),o}return[]};var m=function(t,i){e.updateCommonAuth={},e.updateLots={},e.newform="",e.updateCommonAuth.CTS=e.$parent.propertySelected.cts,e.displayData=i,e.updateLots.selectAll=!1;var d=n("Select All");e.selectAllDisplayLabel=s.getString(d);var l="Property/setCommonAuthorities",u=function(){var t=r.defer(),a={task_request:"Property/getSelectedCommonAuthoritiesLot",data:{AuthorisationID:e.updateCommonAuth.AuthorisationID}};return o.get(a).then(function(o){_.has(o,"result")||(o=e.isFormattedArray(o)),e.selectedLotsHash={};for(var r=0;r<o.length;r++)e.selectedLotsHash[o[r].lot]=o[r];e.selectedLots=o,t.resolve()}),t.promise};e.propertyAuth=function(){var t=function(){e.selectOwner=!1,e.selectOthers=!0,e.updateCommonAuth.OthName="",e.updateCommonAuth.OthStAddress="",e.updateCommonAuth.OthCity="",e.updateCommonAuth.OthPostc=""};switch(e.updateCommonAuth.type){case"tRegionDefaults.lottype":e.selectOwner=!0,e.selectOthers=!1,e.updateCommonAuth.Lot=e.lotList[0].Lot,e.lotOwnerFullDetails();break;case"Service contractor":e.addressBookConfig.defaultContactType="Contractor",e.addressBookConfig.defaultIndustryType="",e.addressBookConfig.permissions.isEditContactTypeAllowed=!1,e.addressBookConfig.permissions.isEditIndustryTypeAllowed=!0,t();break;case"Letting Agent":e.addressBookConfig.defaultContactType="Letting Agent",e.addressBookConfig.defaultIndustryType="",e.addressBookConfig.permissions.isEditContactTypeAllowed=!1,e.addressBookConfig.permissions.isEditIndustryTypeAllowed=!0,t();break;case"tRegionDefaults.tenant":e.addressBookConfig.defaultContactType="tRegionDefaults.tenant",e.addressBookConfig.defaultIndustryType="",e.addressBookConfig.permissions.isEditContactTypeAllowed=!1,e.addressBookConfig.permissions.isEditIndustryTypeAllowed=!0,t();break;default:e.addressBookConfig.defaultContactType="",e.addressBookConfig.defaultIndustryType="",e.addressBookConfig.permissions.isEditContactTypeAllowed=!0,e.addressBookConfig.permissions.isEditIndustryTypeAllowed=!0,t()}},"new"===t?(e.selectOthers=!0,e.selectedLots=[],e.newform=t,e.updateCommonAuth=e.buildDefaultVO(),e.updateCommonAuth.insertcpa=1):(e.updateCommonAuth=angular.copy(t.entity),e.updateCommonAuth.updatecpa=1,e.suburb=e.updateCommonAuth.partysuburb,e.postCodes=e.updateCommonAuth.partypostc,u()),e.propertyAuth();var p={task_request:"Property/getCommonAuthorities",data:""};o.get(p).then(function(t){e.property_auths=t.property_auths,e.nature_of_auth=t.nature_of_auth,e.auth_types=t.auth_types}),e.$on("updateAddress",function(t,o){e.updateCommonAuth.OthCity=o.pc,e.updateCommonAuth.OthPostc=o.locality});var c={task_request:"Property/getCommonAuthoritiesLotList",data:e.updateCommonAuth};o.get(c).then(function(t){var t=angular.fromJson(t);if(t){e.updateLots.lotResult=!0;for(var o=0;o<t.length;o++)t[o].isSelected=!1,t[o].loadSelected=!1,e.selectedLotsHash&&e.selectedLotsHash[t[o].Lot]&&(t[o].isSelected=!0,t[o].loadSelected=!0);e.lotList=t}else e.updateLots.lotResult=!1}),e.lotOwnerFullDetails=function(){var t={task_request:"Contact/getAddressBook",data:{lot:e.updateCommonAuth.Lot,cts:e.$parent.propertySelected.cts,clientId:a.userLoginDetailsVO.clientId,addressType:"Owner"}};o.get(t).then(function(t){var t=angular.fromJson(t);t&&(e.lotOwner=t[0],e.updateCommonAuth.OthName=e.lotOwner.cname,e.updateCommonAuth.OthStAddress=e.lotOwner.address,e.updateCommonAuth.OthCity=e.lotOwner.location,e.updateCommonAuth.OthPostc=e.lotOwner.postcode)})},e.showOwnerDetails=function(t){t.preventDefault(),t.stopPropagation(),e.addressPickerOpenStatus.isopen||(e.addressPickerOpenStatus.isopen=!e.addressPickerOpenStatus.isopen),e.lotOwnerDetails=[];var r={task_request:"Contact/getLotOwnerDetails",data:{recordid:e.lotOwner.recordid}};o.get(r).then(function(t){for(var t=angular.fromJson(t),o=0;o<t.length;o++)t[o].title&&t[o].content&&e.lotOwnerDetails.push(t[o])});var r={task_request:"Contact/getAssociatedLotOwnerDetails",data:{cts:e.$parent.propertySelected.cts}};o.get(r).then(function(t){for(var t=angular.fromJson(t),o=0;o<t.length;o++)t[o].title&&t[o].content&&e.lotOwnerDetails.push(t[o])})},e.selectAll=function(){e.updateLots.selectAll=!e.updateLots.selectAll,e.selectAllDisplayLabel=s.getString("Select All"),angular.forEach(e.lotList,function(t){t.isSelected=e.updateLots.selectAll})},e.saveCommonAuth=function(){var r={task_request:l,data:e.$parent.unformatDate(e.updateCommonAuth)};if(e.lotList){e.lotList}o.get(r).then(function(r){if(1===r.result){if(e.updateCommonAuth.AuthorisationID=r.details.result,delete e.updateCommonAuth.insertcpa,"new"===t)_.size(e.gridOptions.data)||(e.gridOptions.data=[]),e.gridOptions.data.push(e.$parent.formatDate(e.updateCommonAuth)),e.filterTrigger(e.gridOptions.data,e);else{var a=e.gridOptions.data.indexOf(t.entity);e.gridOptions.data.splice(a,1,e.$parent.formatDate(e.updateCommonAuth))}for(var n=[],s=0;s<e.lotList.length;s++)e.selectedLotsHash&&e.selectedLotsHash[e.lotList[s].Lot]?e.lotList[s].isSelected===!1&&(e.lotList[s].addLot="remove",e.lotList[s].AuthorisationID=r.details.result,n.push(e.lotList[s])):e.lotList[s].isSelected===!0&&(e.lotList[s].addLot="add",e.lotList[s].AuthorisationID=r.details.result,n.push(e.lotList[s]));var i={task_request:"Property/setCommonAuthoritiesLot",data:n};n.length>0&&o.get(i),e.$parent.addAlert("SUCCESS","SUCCESS")}else e.$parent.addAlert("ERROR","ERROR")}),e.$parent.toggleOverlay(!1)},e.cancel=function(){e.$parent.toggleOverlay(!1)},e.deleteRowData=function(t){var o=n("Are you sure you want to delete this entry?");return confirm(s.getString(o))?(e.initiateDeleteRequest(t),e.$parent.toggleOverlay(!1),!0):!1}};e.configureGrid=function(){var t={dt:n("Date"),type:n("Type"),areaOf:n("Area of Common Property Affected"),name:n("Name")};e.gridOptions={};var o={useExternalSorting:!0,enableFiltering:!1,rowTemplate:p,enableColumnResizing:!0,paginationPageSize:e.appConstants.GRID_ROWS_NUM,paginationPageSizes:e.appConstants.GRID_PAGINATION_SIZE,enableGridMenu:!1,enableRowSelection:!1,enableRowHeaderSelection:!1,multiSelect:!1,exporterLinkLabel:"get your csv here",exporterCsvFilename:"CommonAuth.csv",exporterPdfDefaultStyle:{fontSize:9},exporterPdfTableStyle:{margin:[10,10,10,10]},exporterPdfTableHeaderStyle:{fontSize:10,bold:!0,italics:!0,color:"red"},exporterPdfHeader:{text:"CommonAuth",style:"headerStyle"},exporterPdfCustomFormatter:function(e){return e.styles.headerStyle={fontSize:22,bold:!0},e.styles.footerStyle={fontSize:10,bold:!0},e},exporterPdfOrientation:"portrait",exporterPdfPageSize:"LETTER",exporterPdfMaxGridWidth:500,exporterCsvLinkElement:angular.element(document.querySelectorAll(".custom-csv-link-location")),columnDefs:[{field:"RDate",displayName:s.getString(t.dt),visible:!e.exceptions.date,enableColumnMenu:!1,width:"15%",cellTemplate:i,translationKey:"date"},{field:"type",displayName:s.getString(t.type),enableColumnMenu:!1,width:"15%",visible:!e.exceptions.mfCommonPropAuthtype,translationKey:"mfCommonPropAuthtype",cellTemplate:c},{field:"Area",displayName:s.getString(t.areaOf),enableColumnMenu:!1,visible:!e.exceptions.mfCommonPropAuthAreaofCommon},{field:"OthName",displayName:s.getString(t.name),enableFiltering:!1,visible:!e.exceptions.mfCommonPropAuthName,enableColumnMenu:!1,translationKey:"mfCommonPropAuthName",width:"15%"},{field:"Edit",displayName:"",headerCellTemplate:u,width:50,enableFiltering:!1,cellTemplate:d,enableColumnMenu:!1,visible:e.permissions.isUpdateAllowed},{field:"Delete",displayName:"",width:50,headerCellTemplate:u,enableFiltering:!1,enableColumnMenu:!1,cellTemplate:l,visible:e.permissions.isDeleteAllowed}]};e.gridOptions=o,e.gridOptions.onRegisterApi=function(t){e.gridApi=t}},e.configureGrid();var g=function(t){var r={task_request:"Property/getCommonAuthoritiesList",data:{CTS:t}};o.get(r).then(function(t){t&&(t=angular.fromJson(t),t=e.$parent.formatDate(t),_.has(t,"result")||(e.gridOptions.data=t),e.$parent.filterTrigger(t,e),e.hasLoaded=!0)})};g(e.$parent.propertySelected.cts),e.buildDefaultVO=function(){return{CTS:e.$parent.propertySelected.cts,RDate:Date.now(),Description:"",Area:"",Conditions:"",OwOrOth:!1,Lot:0,Adjudicater:!1,Orderdate:Date.now(),OthName:"",OthStAddress:"",OthSuburb:"",OthCity:"",OthPostc:"",OthPhone:"",type:"",nature:"",duration:"",number:0,authoritytype:""}},e["export"]=function(t){"csv"===t?e.gridApi.exporter.csvExport("all","all"):"pdf"===t&&e.gridApi.exporter.pdfExport("all","all")},e.addressPickerOpenStatus={isopen:!1},e.toggleDropdown=function(t){t.preventDefault(),t.stopPropagation(),e.addressPickerOpenStatus.isopen||(e.addressPickerOpenStatus.isopen=!e.addressPickerOpenStatus.isopen),a.$broadcast("fetchAddressBookPickerData",e.addressBookConfig)},e.$on("addressKeySet",function(t,o){e.updateCommonAuth.OthName=o.cname,e.updateCommonAuth.OthStAddress=o.address,e.updateCommonAuth.OthCity=o.location,e.updateCommonAuth.OthPostc=o.postcode,e.$parent.initAddressDirective(e.updateCommonAuth.OthPostc,e.updateCommonAuth.OthCity,"address1"),e.addressPickerOpenStatus.isopen=!e.addressPickerOpenStatus.isopen}),e.addressBookConfig={cts:e.$parent.propertySelected.cts,clientId:a.userLoginDetailsVO.clientId,defaultContactType:"",defaultIndustryType:"",permissions:{isAddAllowed:!0,isEditContactTypeAllowed:!0,isEditIndustryTypeAllowed:!0}}}])});