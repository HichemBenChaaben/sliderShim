define(["swapp","uiGrid","ui-bootstrap","socket-factory","/swapp/directives/address/address-directives.js"],function(e){"use strict";e.registerController("mfPropByLawsController",["$scope","uiGridConstants","socket","$q","$filter","gettext","gettextCatalog",function(e,t,a,r,i,n,o){e.appConstants=e.$parent.appConstants,e.permissions=e.$parent.modPermissions,e.exceptions=e.$parent.modExceptions,e.gridColActionMenu={},e.gridColActionMenu.isDisabled=!1,e.dateFormat=e.$parent.localTimeFormat,e.$parent.toggleOverlay(!1),e.gridOptions={},e.$on("selectedProperty",function(t,a){g(e.$parent.propertySelected.cts)}),e.$on("LanguageUpdated",function(){e.gridApi.core.notifyDataChange(t.dataChange.ROW)});var s='<div class="ui-grid-cell-contents"><a ng-click="getExternalScopes().onEditClick(row, true);" ng-show="getExternalScopes().getPermissions(\'isUpdateAllowed\')">{{COL_FIELD | date:getExternalScopes().dateFormat}}</a></div>',l='<div class="ui-grid-cell-contents"><i class="glyphicon glyphicon-edit" ng-click="getExternalScopes().onEditClick(row);" ng-show="getExternalScopes().getPermissions(\'isUpdateAllowed\')"></i></div>',d='<div class="ui-grid-cell-contents"><i class="glyphicon glyphicon-trash" ng-click="getExternalScopes().deleteRowData(row);" ng-show="getExternalScopes().getPermissions(\'isUpdateAllowed\')"></i></div>',p='<div class="ui-grid-cell-contents"></div>',c='<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name"   ng-mouseenter="getExternalScopes().rowHover(row)"  ng-mouseleave="getExternalScopes().rowHover(row)" class="ui-grid-cell"   ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"  ui-grid-cell> </div>';e.scopeModel={onEditClick:function(t,a){e.currentlyRowBeingEdited=t,e.$parent.toggleOverlay(!0),u(t,a)},getPermissions:function(t){return e.permissions[t]},decimalFix:function(e){return e>=0?parseFloat(e).toFixed(2):void 0},deleteRowData:function(t){"editingPage"===t&&(t=e.currentlyRowBeingEdited);var a=n("Are you sure you want to delete this entry?");return confirm(o.getString(a))?void e.initiateDeleteRequest(t.entity):!1},rowHover:function(e){e.isSelected=!e.isSelected}},e.initiateDeleteRequest=function(t){for(var r,i=0;i<e.gridOptions.data.length;i++)if(t.RecordID===e.gridOptions.data[i].RecordID){r=i;break}var n={task_request:"Property/removeByLaws",data:t};a.get(n).then(function(t){1===t.status?(e.gridOptions.data.splice(r,1),e.$parent.filterTrigger(e.gridOptions.data,e),e.$parent.addAlert("SUCCESS","DELETE")):e.$parent.addAlert("ERROR","DELETE")})},e.isFormattedArray=function(e){if(e){if(Array.isArray(e))return e;if(e.length<4)return[];var t=JSON.parse("["+e+"]");if(Array.isArray(t[0]))return t[0];var a=[];return a.push(t[0]),a}return[]};var u=function(s,l){e.updateByLaws={},e.updateLots={},e.newform="",e.updateByLaws.CTS=e.$parent.propertySelected.cts,e.displayData=l,e.updateLots.selectAll=!1,e.selectAllDisplayLabel=o.getString("Select All");var d="Property/setByLaws",p=function(){var t=r.defer(),i={task_request:"Property/getByLawsSelectedLots",data:{RecordID:e.updateByLaws.RecordID}};return a.get(i).then(function(a){_.has(a,"status")||(a=e.isFormattedArray(a)),e.selectedLotsHash={};for(var r=0;r<a.length;r++)e.selectedLotsHash[a[r].Lot]=a[r];e.selectedLots=a,t.resolve()}),t.promise};"new"===s?(e.newform=s,e.selectedLots=[],e.updateByLaws=e.buildDefaultVO(),e.updateByLaws.insertbylaws=1,e.updateByLaws.RecordID=1):(e.updateByLaws=angular.copy(s.entity),e.updateByLaws.updatebylaws=1,e.suburb=e.updateByLaws.partysuburb,e.postCodes=e.updateByLaws.partypostc,p()),e.updateByLaws.FormDate=i("date")(new Date(e.updateByLaws.FormDate).getTime(),e.dateFormat),e.updateByLaws.FinYear=i("date")(new Date(e.updateByLaws.FinYear).getTime(),e.dateFormat);var c={task_request:"Property/getByLawsType",data:e.updateByLaws};a.get(c).then(function(t){t=angular.fromJson(t),e.ntypeList=t}),e.$on("updateAddress",function(t,a){e.updateByLaws.partypostc=a.pc,e.updateByLaws.partysuburb=a.locality});var c={task_request:"Property/getByLawsLots",data:e.updateByLaws};a.get(c).then(function(t){if(t=angular.fromJson(t)){e.updateLots.lotResult=!0;for(var a=0;a<t.length;a++)t[a].isSelected=!1,t[a].loadSelected=!1,e.selectedLotsHash&&e.selectedLotsHash[t[a].Lot]&&(t[a].isSelected=!0,t[a].loadSelected=!0);e.lotList=t}else e.updateLots.lotResult=!1}),e.selectAll=function(){e.updateLots.selectAll=!e.updateLots.selectAll,angular.forEach(e.lotList,function(t){t.isSelected=e.updateLots.selectAll})},e.saveByLaws=function(){var r={task_request:d,data:e.$parent.unformatDate(e.updateByLaws)};if(e.lotList){e.lotList}a.get(r).then(function(r){if(1===r.status){if("new"===s)_.isArray(e.gridOptions.data)||(e.gridOptions.data=[]),e.updateByLaws.RecordID=r.recordid,delete e.updateByLaws.insertbylaws,e.gridOptions.data.push(e.$parent.formatDate(e.updateByLaws)),e.filterTrigger(e.gridOptions.data,e);else{var i=e.gridOptions.data.indexOf(s.entity);e.gridOptions.data.splice(i,1,e.$parent.formatDate(e.updateByLaws))}for(var n=[],o=0;o<e.lotList.length;o++)e.selectedLotsHash&&e.selectedLotsHash[e.lotList[o].Lot]?e.lotList[o].isSelected===!1&&(e.lotList[o].addLot="remove",e.lotList[o].RecordID=r.recordid,n.push(e.lotList[o])):e.lotList[o].isSelected===!0&&(e.lotList[o].addLot="add",e.lotList[o].RecordID=r.recordid,n.push(e.lotList[o]));var l={task_request:"Property/setByLawsLot",data:n};_.size(n)&&a.get(l),e.gridApi.core.notifyDataChange(e.gridApi.grid,t.dataChange.COLUMN),"new"===s?e.$parent.addAlert("SUCCESS","INSERT"):e.$parent.addAlert("SUCCESS","UPDATE")}else"new"===s?e.$parent.addAlert("ERROR","INSERT"):e.$parent.addAlert("ERROR","UPDATE")}),e.$parent.toggleOverlay(!1)},e.cancel=function(){e.$parent.toggleOverlay(!1),e.updateByLaws=e.buildDefaultVO(),e.$apply},e.deleteRowData=function(t){var a=n("Are you sure you want to delete this entry?");return confirm(o.getString(a))?(e.initiateDeleteRequest(t),e.$parent.toggleOverlay(!1),!0):!1}};e.configureGrid=function(){var t={fy:n("Fin Year"),bt:n("By Law Title"),nm:n("Number"),msg:n("Get your csv here")};e.gridOptions={};var a={useExternalSorting:!0,rowTemplate:c,enableColumnResizing:!0,enableFiltering:!1,paginationPageSize:e.appConstants.GRID_ROWS_NUM,paginationPageSizes:e.appConstants.GRID_PAGINATION_SIZE,enableGridMenu:!1,enableRowSelection:!1,enableRowHeaderSelection:!0,multiSelect:!1,exporterLinkLabel:o.getString(t.msg),exporterCsvFilename:"ByLaws.csv",exporterPdfDefaultStyle:{fontSize:9},exporterPdfTableStyle:{margin:[10,10,10,10]},exporterPdfTableHeaderStyle:{fontSize:10,bold:!0,italics:!0,color:"red"},exporterPdfHeader:{text:"ByLaws",style:"headerStyle"},exporterPdfCustomFormatter:function(e){return e.styles.headerStyle={fontSize:22,bold:!0},e.styles.footerStyle={fontSize:10,bold:!0},e},exporterPdfOrientation:"portrait",exporterPdfPageSize:"LETTER",exporterPdfMaxGridWidth:500,exporterCsvLinkElement:angular.element(document.querySelectorAll(".custom-csv-link-location")),columnDefs:[{field:"FinYear",name:o.getString(t.fy),visible:!0,enableColumnMenu:!1,width:"15%",cellTemplate:s},{field:"ByLawTitle",name:o.getString(t.bt),enableColumnMenu:!1,width:"15%",visible:!0},{field:"number",name:o.getString(t.nm),enableColumnMenu:!1,width:"15%"},{field:"Edit",headerCellTemplate:p,width:50,enableFiltering:!1,cellTemplate:l,enableColumnMenu:!1},{field:"Delete",width:50,headerCellTemplate:p,enableFiltering:!1,enableColumnMenu:!1,cellTemplate:d}]};e.gridOptions=a,e.gridOptions.onRegisterApi=function(t){e.gridApi=t}},e.configureGrid(),e.gridOptions.data={};var g=function(t){var r={task_request:"Property/getByLaws",data:{cts:t}};a.get(r).then(function(t){t&&(t=angular.fromJson(t),t=e.$parent.formatDate(t),_.has(t,"cts")||(e.gridOptions.data=t),e.$parent.filterTrigger(t,e),e.hasLoaded=!0)})};g(e.$parent.propertySelected.cts),e.buildDefaultVO=function(){return{CTS:e.$parent.propertySelected.cts,Payment:0,FormDate:Date.now(),ByLawTitle:"",Details:"",Type:0,Repeat:!1,AdminOrSink:!1,Occurance:0,FinYear:Date.now(),Exclusive:!1,levy:!1,responsible:!1,number:"",bylawtype:!1,amended:"",registered:!1}},e.resetForm=function(e){e&&(e.$setPristine(),e.$setUntouched())},e["export"]=function(t){"csv"===t?e.gridApi.exporter.csvExport("all","all"):"pdf"===t&&e.gridApi.exporter.pdfExport("all","all")}}])});