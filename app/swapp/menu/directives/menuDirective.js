define(["swapp","/swapp/home/services/homeService.js","socket-factory"],function(e){e.registerDirective("swMenu",["gettextCatalog","tmhDynamicLocale","swAppConstants",function(e,a,n){return{restrict:"E",templateUrl:function(e,a){return"/swapp/menu/views/menu_"+a.templateUrl+".html"},controller:function(t,s,u,g,i,r,o,l){t.$on("SwappInitialised",function(e,a){t.menuList={},t.real_user=a.real_user,t.language=a.language,t.status={isopen:!1};var n={task_request:"Session/getLanguageISOCodes",data:""};i.get(n).then(function(e){t.languages=e,l(function(){t.menuList.language=localStorage.getItem("language")})})}),t.$on("menusInitialised",function(e,a){t.menuList=a,g.menuList=t.menuList}),t.changeLanguage=function(){var s=r.$current.self.name;g.pageDir="ltr",g.pageLang=window.localStorage.getItem("language")||t.menuList.language,"home"!==s&&(s=s.replace(/home\./g,"")),"en_UK"!==t.menuList.language?(e.loadRemote("/../../dist/translations/"+t.menuList.language+".json?"+n.RELEASE_VERSION),e.setCurrentLanguage(t.menuList.language),a.set(t.menuList.language)):(e.setCurrentLanguage(e.baseLanguage),a.set("en-au")),"ar"===t.menuList.language?(g.CSS_PATH="/assets/css/sw-rtl.css",g.BOOTSTRAP_PATH="/assets/css/bootstrap.min.rtl.css",g.pageDir="rtl",a.set("ar-ae")):(g.pageDir="ltr",g.BOOTSTRAP_PATH="/assets/css/bootstrap.min.css"),g.$broadcast("LanguageUpdated"),window.localStorage.setItem("language",t.menuList.language),g.pageLang=t.menuList.language},t.$on("updateStateTranslations",function(){var e=angular.copy(t.menuList);t.menuList=[],t.menuList=angular.copy(e),g.menuList=t.menuList});var c=1e3;t.selectTab=function(e){0===e&&(e=""),c=e},t.isSelected=function(e){return c===e},t.nospace=function(e){var a=e.replace(/ /g,"");return a}}}}])});