"use strict";define(["swapp","socket-factory","ui-select","ui-bootstrap","lodash"],function(e){e.registerDirective("swPostCodes",["$rootScope","socket",function(e,t){return{templateUrl:"/swapp/directives/address/post-codes.tpl.html",restrict:"E",replace:!0,require:"^ngModel",scope:{swPostCodes:"@",postCode:"=ngModel",placeholder:"@placeholder"},link:function(o,s,r){function d(e){if(o.postCodes.model&&o.postCodes.model.length>=e){var s={task_request:"Contact/getPostcodes",data:o.postCodes.model};return t.get(s).then(function(e){o.addresses=e,o.showResults=!0})}return""}o.postCodes={model:o.postCode||""},o.refreshPostCodes=_.debounce(d,200),o.updatePostCodeItem=function(t){t.uniqueId=r.uniqueId,o.postCode=t.pc,o.postCodes.model=t.pc,o.showResults=!1,e.$broadcast("updateAddress",t)},o.$on("updateAddress",function(e,t){t.uniqueId===r.uniqueId&&(o.postCode=t.pc,o.postCodes.model=t.pc)})}}}]),e.registerDirective("swSuburbState",["$rootScope","socket",function(e,t){return{templateUrl:"/swapp/directives/address/suburb-state.tpl.html",restrict:"E",require:"^ngModel",replace:!0,scope:{selectedSuburb:"=ngModel",placeholder:"@placeholder"},link:function(o,s,r){function d(e){if(o.suburb.model&&o.suburb.model.length>=e){var s={task_request:"Contact/getPostcodes",data:o.suburb.model};return t.get(s).then(function(e){o.addresses=e,o.showResults=!0})}return""}o.suburb={model:o.selectedSuburb},o.refreshPostCodes=_.debounce(d,200),o.updatePostCodeItem=function(t){t.uniqueId=r.uniqueId,o.selectedSuburb=t.locality+" "+t.state,o.suburb.model=t.locality+" "+t.state,o.showResults=!1,e.$broadcast("updateAddress",t)},o.$on("updateAddress",function(e,t){t.uniqueId===r.uniqueId&&(t.state&&"undefined"!==t.state?(o.selectedSuburb=t.locality+" "+t.state,o.suburb.model=t.locality+" "+t.state):(o.selectedSuburb=t.locality,o.suburb.model=t.locality))})}}}]),e.registerDirective("swRegionId",["socket",function(e){return{templateUrl:"/swapp/directives/address/region-id.tpl.html",restrict:"E",require:"^ngModel",replace:!0,scope:{regionName:"=ngModel",regionFk:"=regionFk",placeholder:"@placeholder"},link:function(t,o,s){t.regionId={model:t.regionName},t.refreshRegions=function(o){if(t.regionId.model&&t.regionId.model.length>=o){var s={task_request:"Contact/getRegionDetails",data:t.regionId.model};return e.get(s).then(function(e){t.regions=angular.fromJson(e),t.showResults=!0})}return""},t.updateRegion=function(e){t.regionId.model=e.region,t.regionName=e.region,t.regionFk=e.recordid,t.showResults=!1}}}}])});