define(["swapp","uiGrid","ui-bootstrap","socket-factory","/swapp/directives/address/address-directives.js","/swapp/directives/address-book/address-book-picker-directive.js"],function(e){e.registerController("mfComplaintsController",["$scope","$state","$rootScope","uiGridConstants","socket","gettext","gettextCatalog",function(e,t,a,i,r,n,o){e.permissions=e.$parent.modPermissions,e.exceptions=e.$parent.modExceptions,e.gridColActionMenu={},e.gridColActionMenu.isDisabled=!1,e.dateFormat=e.$parent.localTimeFormat,e.modal={},e.$on("selectedProperty",function(t,a){m(e.$parent.propertySelected.cts)}),e.$on("LanguageUpdated",function(){e.gridApi.core.notifyDataChange(i.dataChange.ROW)});var s='<div class="ui-grid-cell-contents">{{COL_FIELD | date:getExternalScopes().dateFormat}}</div>',d='<div class="ui-grid-cell-contents"><a ng-click="getExternalScopes().openModal(row.entity);modal.isNewPage=false" ng-show="getExternalScopes().getPermissions(\'isUpdateAllowed\')">{{COL_FIELD}}</a></div>',l='<div class="ui-grid-cell-contents"><span class="glyphicon glyphicon-edit" ng-click="getExternalScopes().openModal(row.entity);modal.isNewPage=false" ng-show="getExternalScopes().getPermissions(\'isUpdateAllowed\')"></span></div>',p='<div class="ui-grid-cell-contents"><span class="glyphicon glyphicon-trash" ng-click="getExternalScopes().deleteComplaints(row);" ng-show="getExternalScopes().getPermissions(\'isUpdateAllowed\')"></span></div>',c='<div class="ui-grid-cell-contents"></div>',u='<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name"   ng-mouseenter="getExternalScopes().rowHover(row)"  ng-mouseleave="getExternalScopes().rowHover(row)" class="ui-grid-cell"   ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"  ui-grid-cell> </div>';e.states={openModal:function(t){e.updateComplaints=t,_.size(t)?(e.updateComplaints.updatecomplaint=1,e.$parent.initAddressDirective(e.updateComplaints.partypostc,e.updateComplaints.partysuburb,"address1"),e.updateComplaints.rdate=new Date(e.updateComplaints.rdate).getTime(),e.updateComplaints.resdate=new Date(e.updateComplaints.resdate).getTime()):(e.updateComplaints={},e.updateComplaints.insertcomplaint=1,e.$parent.initAddressDirective("","","address1")),e.$parent.toggleOverlay(!0)},dateFormat:e.dateFormat,getPermissions:function(t){return e.permissions[t]},decimalFix:function(e){return e>=0?parseFloat(e).toFixed(2):void 0},deleteComplaints:function(t){var a=n("Are you sure you want to delete this entry?");return confirm(o.getString(a))?void e.initiateDeleteRequest(t.entity):!1},rowHover:function(e){e.isSelected=!e.isSelected}},e.initiateDeleteRequest=function(t){for(var a,i=0;i<e.gridOptions.data.length;i++)if(t.recordid===e.gridOptions.data[i].recordid){a=i;break}var n={task_request:"Property/removeComplaints",data:t};r.get(n).then(function(t){1===t.status?(e.gridOptions.data.splice(a,1),e.$parent.filterTrigger(e.gridOptions.data,e),e.$parent.addAlert("SUCCESS","DELETE")):e.$parent.addAlert("ERROR","DELETE")})},e.$on("updateAddress",function(t,a){e.updateComplaints.partypostc=a.pc,e.updateComplaints.partysuburb=a.locality}),e.saveComplaints=function(t){if(t){var a={task_request:"Property/setComplaints",data:e.$parent.unformatDate(e.updateComplaints)};r.get(a).then(function(t){if(1===t.status){if(e.modal.isNewPage)e.updateComplaints.recordid=t.recordid.result,_.size(e.gridOptions.data)||(e.gridOptions.data=[]),e.gridOptions.data.push(e.$parent.formatDate(e.updateComplaints)),e.filterTrigger(e.gridOptions.data,parentScope);else{var a=e.gridOptions.data.indexOf(e.updateComplaints);e.gridOptions.data.splice(a,1,e.$parent.formatDate(e.updateComplaints))}e.modal.newPage?e.$parent.addAlert("SUCCESS","INSERT"):e.$parent.addAlert("SUCCESS","UPDATE")}else e.modal.newPage?e.$parent.addAlert("ERROR","INSERT"):e.$parent.addAlert("ERROR","UPDATE")}),e.$parent.toggleOverlay(!1)}},e.deleteComplaint=function(t){var a=n("Are you sure you want to delete this entry?");return confirm(o.getString(a))?(parentScope.initiateDeleteRequest(t),e.$parent.toggleOverlay(!1),!0):!1};var g={tl:n("Title"),rdate:n("Recorded Date"),ctype:n("Complaints Type"),stat:n("Status"),edit:n("Edit"),del:n("Delete")};e.configureGrid=function(){e.gridOptions={};var t={useExternalSorting:!0,enableFiltering:!1,rowTemplate:u,enableColumnResizing:!0,paginationPageSizes:[50,100,150,200],paginationPageSize:50,enableGridMenu:!1,enableRowSelection:!1,enableRowHeaderSelection:!1,multiSelect:!1,exporterLinkLabel:"get your csv here",exporterCsvFilename:"register-of-complaints.csv",exporterPdfDefaultStyle:{fontSize:9},exporterPdfTableStyle:{margin:[10,10,10,10]},exporterPdfTableHeaderStyle:{fontSize:10,bold:!0,italics:!0,color:"red"},exporterPdfHeader:{text:"Complaints",style:"headerStyle"},exporterPdfCustomFormatter:function(e){return e.styles.headerStyle={fontSize:22,bold:!0},e.styles.footerStyle={fontSize:10,bold:!0},e},exporterPdfOrientation:"portrait",exporterPdfPageSize:"LETTER",exporterPdfMaxGridWidth:500,exporterCsvLinkElement:angular.element(document.querySelectorAll(".custom-csv-link-location")),columnDefs:[{field:"title",displayName:o.getString(g.tl),visible:!e.exceptions.mfPropComplaintsTitle,enableColumnMenu:!1,width:"22%",cellTemplate:d},{field:"rdate",displayName:o.getString(g.rdate),width:"22%",visible:!e.exceptions.mfPropComplaintsRecordedDate,enableColumnMenu:!1,cellTemplate:s},{field:"ntype",displayName:o.getString(g.ctype),width:"10%",visible:!e.exceptions.mfPropComplaintsType,enableColumnMenu:!1},{field:"status",displayName:o.getString(g.stat),width:"10%",visible:!e.exceptions.mfPropComplaintsStatus,enableColumnMenu:!1},{field:"Edit",displayName:o.getString(g.edit),headerCellTemplate:c,width:50,enableFiltering:!1,visible:e.permissions.isUpdateAllowed,cellTemplate:l,enableColumnMenu:!1},{field:"Delete",displayName:o.getString(g.del),width:50,visible:e.permissions.isDeleteAllowed,headerCellTemplate:c,enableFiltering:!1,enableColumnMenu:!1,cellTemplate:p}]};e.gridOptions=t,e.gridOptions.onRegisterApi=function(t){e.gridApi=t}},e.configureGrid();var m=function(t){var a={task_request:"Property/getComplaints",data:{cts:t}};r.get(a).then(function(t){t&&(t=angular.fromJson(t),t=e.$parent.formatDate(t),_.has(t,"status")||(e.gridOptions.data=t),e.$parent.filterTrigger(t,e),e.hasLoaded=!0)});var i={task_request:"Property/getComplaintTypes",data:e.updateComplaints};r.get(i).then(function(t){t=angular.fromJson(t),e.ntypeList=t})};m(e.$parent.propertySelected.cts),e["export"]=function(t){"csv"===t?e.gridApi.exporter.csvExport("all","all"):"pdf"===t&&e.gridApi.exporter.pdfExport("all","all")},e.buildDefaultVO=function(){var t={};return t.cts=e.$parent.propertySelected.cts,t.rdate=(new Date).getTime(),t.resdate=(new Date).getTime(),t},e.resetForm=function(e){e&&(e.$setPristine(),e.$setUntouched())},e.addressPickerOpenStatus={isopen:!1},e.toggleDropdown=function(t){t.preventDefault(),t.stopPropagation(),e.addressPickerOpenStatus.isopen||(e.addressPickerOpenStatus.isopen=!e.addressPickerOpenStatus.isopen),a.$broadcast("fetchAddressBookPickerData",e.addressBookConfig)},e.$on("addressKeySet",function(t,a){e.updateComplaints.partyname=a.cname,e.updateComplaints.partyaddress=a.address,e.updateComplaints.partysuburb=a.location,e.updateComplaints.partypostc=a.postcode,e.$parent.initAddressDirective(e.updateComplaints.partypostc,e.updateComplaints.partysuburb,"address1"),e.addressPickerOpenStatus.isopen=!e.addressPickerOpenStatus.isopen}),e.addressBookConfig={cts:e.$parent.propertySelected.cts,clientId:a.userLoginDetailsVO.clientId,defaultContactType:"",defaultIndustryType:"",permissions:{isAddAllowed:!0,isEditContactTypeAllowed:!0,isEditIndustryTypeAllowed:!0}}}])});