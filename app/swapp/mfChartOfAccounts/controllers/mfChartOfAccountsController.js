define(["swapp","uiGrid","ui-bootstrap","alert-factory","socket-factory"],function(e){e.registerController("mfChartOfAccountsController",["$scope","$modal","uiGridConstants","socket","alertFactory","$timeout","$q",function(e,t,a,n,o,r,s){e.usageCode=0,e.showUsageFlag=0,e.permissions=e.$parent.modPermissions,e.pageTranslations=e.$parent.modTranslations,e.exceptions=e.$parent.modExceptions;var i='<div class="status_col ui-grid-cell-contents "> <a ng-click="getExternalScopes().onSubCategoryClick(row)" ng-show="row.entity.editable == true && getExternalScopes().getPermissions(\'isUpdateAllowed\')">{{COL_FIELD}}</a> <span ng-show="row.entity.editable != true">{{ COL_FIELD }}</span> {{ permissions.isUpdateAllowed}}</div>',c='<div class="status_col ui-grid-cell-contents">{{ COL_FIELD === 1 ? getExternalScopes().getTranslation("mfChartOfAccountsRevenue") : (COL_FIELD === 2) ? getExternalScopes().getTranslation("mfChartOfAccountsRevenueExpense") : getExternalScopes().getTranslation("mfChartOfAccountsExpense") }} </div>',d='<div class="ui-grid-cell-contents">{{getExternalScopes().getTranslation(COL_FIELD)}}</div>',l='<div class="ui-grid-cell-contents">{{ COL_FIELD === true ? getExternalScopes().getTranslation("yes") : getExternalScopes().getTranslation("no") }}</div>',u='<a class="ui-grid-cell-contents usageamount" ng-click="getExternalScopes().getPropertyList(row)" ng-show="getExternalScopes().showUsageLink(row, \'greater\')">{{getExternalScopes().decimalFix(row.entity.usage)}}</a> <span class="ui-grid-cell-contents usageamount" ng-show="getExternalScopes().showUsageLink(row,  \'less\')">{{getExternalScopes().decimalFix(row.entity.usage)}}</span> <div class="ui-grid-cell-contents">{{getExternalScopes().getTranslation("mfChartOfAccountsloading")}}</div>';e.$on("setModTranslations",function(){e.pageTranslations=e.$parent.modTranslations?e.$parent.modTranslations:e.pageTranslations,e.pageTranslations&&e.configureGrid()}),e.changeGridHeaderName=function(){for(var t=e.gridOptions.columnDefs,n=0;n<t.length;n++)t[n].displayName=e.pageTranslations[t[n].translationKey];e.gridOptions.columnDefs=t,e.gridApi.core.notifyDataChange(e.gridApi.grid,a.dataChange.COLUMN)},e.scopeModel={onSubCategoryClick:function(a){t.open({templateUrl:"/swapp/mfChartOfAccounts/views/subCategoryPopup.tpl.html",controller:p,size:"lg",resolve:{rowdata:function(){return a},pageTranslations:function(){return e.pageTranslations},parentScope:function(){return e}},backdrop:"static"})},getTranslation:function(t){return e.pageTranslations[t]},getPermissions:function(t){return e.permissions[t]},getPropertyList:function(a){t.open({templateUrl:"/swapp/mfChartOfAccounts/views/propertyListPopup.tpl.html",controller:g,size:"lg",resolve:{rowdata:function(){return a},pageTranslations:function(){return e.pageTranslations},parentScope:function(){return e}},backdrop:"static"})},showUsageLink:function(e,t){var a=e.entity.usage||0;switch(t){case"greater":return a>0;default:return 0>=a}return!1},decimalFix:function(t){return e.setdecimal(t)}},e.setdecimal=function(e){return e>=0?parseFloat(e).toFixed(2):void 0};var p=function(e,t,o,r,s,i){e.updateChartofAccounts={},e.pageTranslations=r,e.sinkingAdminFundTypeId=4,e.sinkingFundTypeId=2,"new"===o?e.newform=o:e.updateChartofAccounts=angular.copy(o.entity),e.translateData=function(e,t,a){for(var n=0;n<=e.length-1;n++){var o=e[n][t];e[n][t]=a[o]}return e},e.sortData=function(e,t){var a=e.slice(0);return a.sort(function(e,a){var n=e[t],o=a[t];return o>n?-1:n>o?1:0}),a};var c={task_request:"Account/getHeadCategoryList",data:""};n.get(c).then(function(t){$log.debug("original Data >>",t);var a=angular.fromJson(t);$log.debug("fromJson Data >>",a);var n=e.translateData(a,"category",e.pageTranslations);n=e.sortData(n,"category"),e.headCategoryDropDown=n});var d={task_request:"Account/getReportCategoryList",data:""};n.get(d).then(function(t){for(var a=0;a<=t.length-1;a++)t[a].prefHead=""!==t[a].pref?t[a].pref:t[a].head;var n=e.translateData(t,"prefHead",e.pageTranslations);n=e.sortData(t,"prefHead"),e.reportDropDown=n});var l={task_request:"Account/getFundTypeList",data:""};n.get(l).then(function(t){var a=e.translateData(t,"fundTypeName",e.pageTranslations);a=e.sortData(a,"fundTypeName"),e.fundTypeList=a}),e.onChangeHeadCategory=function(t){e.updateChartofAccounts.headCategory=t.category,e.updateChartofAccounts.headid=t.recordid},e.onChangeReportAdmin=function(t){e.updateChartofAccounts.reportadminText=""!==t.pref?t.pref:t.head,e.updateChartofAccounts.reportadmin=t.recordid},e.onChangeReportSink=function(t){e.updateChartofAccounts.reportsinkText=""!==t.pref?t.pref:t.head,e.updateChartofAccounts.reportsink=t.recordid},e.onChangeFundType=function(t){e.updateChartofAccounts.fundTypeName=t.fundTypeName,e.updateChartofAccounts.fundTypeId=t.fundTypeId,t.fundTypeId===e.sinkingFundTypeId?(e.updateChartofAccounts.reportadminText="",e.updateChartofAccounts.reportadmin=0):t.fundTypeId!==e.sinkingAdminFundTypeId&&t.fundTypeId!==e.sinkingFundTypeId&&(e.updateChartofAccounts.reportsinkText="",e.updateChartofAccounts.reportsink=0)},e.saveAccountCode=function(){var r={task_request:"Company/setAccountCode",data:e.updateChartofAccounts};n.get(r).then(function(t){if(1===t.status){if("new"===o){if(e.updateChartofAccounts.editable=!0,i.gridOptions.data.push(e.updateChartofAccounts),1===i.showUsageFlag){var n=i.gridOptions.data.length-1,r=n,c={task_request:"company/getAccountCodeUsage",data:{headCategoryId:e.updateChartofAccounts.headid,subCategoryId:0}};i.sendUsageRequest(r,n,c)}i.gridApi.core.notifyDataChange(i.gridApi.grid,a.dataChange.COLUMN)}s.add("success",e.pageTranslations.setAccountCode_status_success,5e3),o.entity=angular.copy(e.updateChartofAccounts)}else s.add("danger",e.pageTranslations.setAccountCode_status_error,5e3)}),t.dismiss("cancel")},e.cancel=function(){t.dismiss("cancel")}},g=function(e,t,a,o,r){e.pageTranslations=o;var s={task_request:"Company/getAccountCodeUsagePropertyList",data:{headCategoryId:a.entity.headid,subCategoryId:a.entity.subid}};n.get(s).then(function(t){if(t=angular.fromJson(t))for(var a=0;a<t.length;a++)t[a].abs=r.setdecimal(t[a].abs);e.propertyListDropDown=t}),e.cancel=function(){t.dismiss("cancel")}};e.gridOptions={},e.configureGrid=function(){e.gridOptions={};var t={useExternalSorting:!0,enableFiltering:!0,enableColumnResizing:!0,paginationPageSizes:[50,100,150,200],paginationPageSize:50,enableGridMenu:!1,exporterLinkLabel:"get your csv here",exporterCsvFilename:"chartofAccounts.csv",exporterPdfDefaultStyle:{fontSize:9},exporterPdfTableStyle:{margin:[10,10,10,10]},exporterPdfTableHeaderStyle:{fontSize:10,bold:!0,italics:!0,color:"red"},exporterPdfHeader:{text:"Chart of Accounts",style:"headerStyle"},exporterPdfCustomFormatter:function(e){return e.styles.headerStyle={fontSize:22,bold:!0},e.styles.footerStyle={fontSize:10,bold:!0},e},exporterPdfOrientation:"portrait",exporterPdfPageSize:"LETTER",exporterPdfMaxGridWidth:500,exporterCsvLinkElement:angular.element(document.querySelectorAll(".custom-csv-link-location")),columnDefs:[{field:"headCategory",displayName:e.pageTranslations.mfChartOfAccountsHeadCategory,visible:!0,width:"22%",cellTemplate:d,translationKey:"mfChartOfAccountsHeadCategory"},{field:"subCategory",displayName:e.pageTranslations.mfChartOfAccountsSubCategory,width:"22%",visible:!0,cellTemplate:i,translationKey:"mfChartOfAccountsSubCategory"},{field:"reportadminText",name:e.pageTranslations.mfChartOfAccountsReportAdmin,width:"10%",cellTemplate:d,translationKey:"mfChartOfAccountsReportAdmin"},{field:"reportsinkText",name:e.pageTranslations.mfChartOfAccountsReportSink,width:"10%",cellTemplate:d,translationKey:"mfChartOfAccountsReportSink"},{field:"type",name:e.pageTranslations.type,width:"10%",cellTemplate:c,translationKey:"type",filter:{condition:function(t,a){var n=e.pageTranslations.mfChartOfAccountsRevenue.toLowerCase(),o=e.pageTranslations.mfChartOfAccountsRevenueExpense.toLowerCase(),r=e.pageTranslations.mfChartOfAccountsExpense.toLowerCase();return-1!==n.indexOf(t.toLowerCase())&&1===a?!0:-1!==o.indexOf(t.toLowerCase())&&2===a?!0:-1!==r.indexOf(t.toLowerCase())&&3===a?!0:!1}}},{field:"fundTypeName",name:e.pageTranslations.mfChartOfAccountsFundType,width:"10%",cellTemplate:d,translationKey:"mfChartOfAccountsFundType"},{field:"hide",width:"8%",name:e.pageTranslations.mfChartOfAccountsHide,cellTemplate:l,translationKey:"mfChartOfAccountsHide",filter:{condition:function(t,a){var n=e.pageTranslations.no.toLowerCase(),o=e.pageTranslations.yes.toLowerCase();return-1!==n.indexOf(t.toLowerCase())&&a===!1?!0:-1!==o.indexOf(t.toLowerCase())&&a===!0?!0:!1}}},{field:"usage",width:"8%",name:e.pageTranslations.mfChartOfAccountsUsage,cellTemplate:u,translationKey:"mfChartOfAccountsUsage",visible:!1}]};e.gridOptions=t,e.gridOptions.onRegisterApi=function(t){e.gridApi=t,e.changeGridHeaderName()}},e.pageTranslations&&e.configureGrid(),e.$on("$destroy",function(){e.gridOptions={}}),e.showUsage=function(){var t=0,n=e.gridOptions.data.length-1,o=e.gridOptions.columnDefs.length-1;e.usageCode=1,e.gridOptions.columnDefs[o].visible=!0,e.gridApi.core.notifyDataChange(e.gridApi.grid,a.dataChange.ALL),0===e.showUsageFlag&&(e.sendUsageRequest(t,n),e.showUsageFlag=1)},e.sendUsageRequest=function(t,a,o){var r=s.defer(),i=e.gridOptions.data[t].headid,c=e.gridOptions.data[t].subid;if(o)var d=o;else var d={task_request:"company/getAccountCodeUsage",data:{headCategoryId:i,subCategoryId:c}};return n.get(d).then(function(n){n=angular.fromJson(n),e.gridOptions.data[t].usage=n.usage,a>t&&(t++,e.sendUsageRequest(t,a)),r.resolve()}),r.promise},e.hideUsage=function(){if(0!==e.usageCode){e.usageCode=0;var t=e.gridOptions.columnDefs.length-1;e.gridOptions.columnDefs[t].visible=!1,e.gridApi.core.notifyDataChange(e.gridApi.grid,a.dataChange.COLUMN)}};var f=function(){var t={task_request:"company/getChartOfAccountsList",data:""};n.get(t).then(function(t){e.gridOptions.data=angular.fromJson(t)})};f(),e["export"]=function(t){if("csv"===t){var a=angular.element(document.querySelectorAll(".custom-csv-link-location"));e.gridApi.exporter.csvExport("all","all",a)}else"pdf"===t&&e.gridApi.exporter.pdfExport("all","all")}}])});