define(["swapp","/swapp/home/services/homeService.js","socket-factory","lodash"],function(e){"use strict";e.registerFactory("propertyListService",["socket","$rootScope","homeService","swAppConstants","gettextCatalog","tmhDynamicLocale",function(e,a,o,n,r,g){function i(){return s=o.getpropertyList()}function t(e){return s?e?s[e]:s[0]:void 0}function l(e){var a={regions:[{region:1,LangCode:"001",reigonName:"DubaiLand",locale:"ae"},{region:2,LangCode:"002",regionName:"Quatar",locale:"qa"},{region:3,LangCode:"003",regionName:"Abu Dhabi",locale:"ae"},{region:4,LangCode:"004",regionName:"Dubai",locale:"ae"},{region:5,LangCode:"005",reigonName:"Lebanon",locale:"lb"},{region:6,LangCode:"006",reigonName:"DIFC",locale:"ae"},{region:7,LangCode:"007",reigonName:"Utility DXB",locale:"ae"},{region:8,LangCode:"008",reigonName:"Oman",locale:"om"},{region:9,LangCode:"009",reigonName:"Oman Utility",locale:"om"},{region:10,LangCode:"010",reigonName:"WTC",locale:"ae"},{region:101,LangCode:"011",reigonName:"Belgium",locale:"be"},{region:200,LangCode:"012",reigonName:"Jamaica",locale:"jm"},{region:201,LangCode:"013",reigonName:"Cayman Islands",locale:"ky"},{region:1e3,LangCode:"014",reigonName:"Victoria",locale:"au"},{region:1001,LangCode:"015",reigonName:"New South Wales",locale:"au"},{region:1003,LangCode:"017",reigonName:"Sanctuary Cove",locale:"au"},{region:1004,LangCode:"018",reigonName:"Western Austratlia",locale:"au"},{region:1005,LangCode:"019",reigonName:"South Australia",locale:"au"},{region:3e3,LangCode:"020",reigonName:"New Zeeland",locale:"nz"},{region:4e3,LangCode:"021",reigonName:"Malaysia",locale:"my"},{region:5e3,LangCode:"022",reigonName:"ZAF_ST",locale:"za"},{region:5001,LangCode:"023",reigonName:"ZAF_HOA",locale:"za"}]};return{langCode:_.result(_.findWhere(a.regions,{region:e}),"LangCode"),locale:_.result(_.findWhere(a.regions,{region:e}),"locale")}}function c(o){var i={},t={task_request:"Property/getDetails",data:o};return e.get(t).then(function(e){if(i=e,a.$broadcast("selectedProperty",e),"en_UK"===a.userLoginDetailsVO.userLanguage)if(1002!==e.region_fk&&"en_UK"===a.menuList.language){var o=l(e.region_fk);r.loadRemote("../../dist/translations/en_"+o.langCode+".json?"+n.RELEASE_VERSION),r.setCurrentLanguage("en_"+o.langCode),g.set("en-"+o.locale)}else r.setCurrentLanguage(r.baseLanguage)}),i}var s={};return{getPropertyList:i,setPropertySelected:t,getPropertyDetails:c}}])});