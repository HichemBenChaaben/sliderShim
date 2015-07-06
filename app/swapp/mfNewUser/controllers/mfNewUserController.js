define(["swapp","socket-factory","/swapp/directives/validation/validation-directive.js","/swapp/directives/file-upload/file-upload-directive.js"],function(e){e.registerController("mfNewUserController",["$scope","socket",function(e,t){e.objProfileData={notificationsUpdated:!0,jobTitleChanged:!1,isdeptChanged:!1,isUserGroupChanged:!1,editPortal:!1,accessPortal:!1,dsa_changed:0,clientId:window.client_id},e.showUsername=!0,e.translations=e.$parent.modTranslations,e.permissions=e.$parent.modPermissions,e.canEditSecuritySettings=!0,e.selectAllText=e.$parent.modTranslations.mfNewUserSelectAll;var a={task_request:"User/getNewUserDetails",data:""};t.get(a).then(function(t){e.objProfileData.digitalSigAuth=angular.fromJson(t.dig_sig_auth),e.objProfileData.userGroupDropdownArr=angular.fromJson(t.user_group),e.objProfileData.jobTitleList=angular.fromJson(t.company_position),e.objProfileData.departmentList=angular.fromJson(t.bus_unit_details)});var a={task_request:"User/getPropertyAccessList",data:""};t.get(a).then(function(t){e.objProfileData.propertyAccessList=angular.fromJson(t)}),e.selectAll=function(){e.selectAllText=e.objProfileData.selectAll?e.$parent.modTranslations.mfNewUserDeselectAll:e.$parent.modTranslations.mfNewUserSelectAll,angular.forEach(e.objProfileData.propertyAccessList,function(t){t.sel=e.objProfileData.selectAll})},e.$on("fileUploaded",function(t,a){e.objProfileData[a.name]=a.base64}),e.$on("fileDeleted",function(t,a){e.objProfileData[a.name]=null}),e.$on("fileUploadError",function(){e.$parent.addAlert("ERROR","INSERT")}),e.onSaveProfileDataClick=function(){var a=angular.copy(e.objProfileData);if(a.profilepicture){var r={task_request:"User/setProfilePicture",data:{profile_pic_base64:a.profilepicture.replace(/(data).+;base64,/,"")}};t.get(r)}if(a.profilesignature){var r={task_request:"User/setProfileSignature",data:{profile_signature_base64:a.profilesignature.replace(/(data).+;base64,/,"")}};t.get(r)}a.profilepicture=null,a.departmentList=null,a.jobTitleList=null,a.userGroupList=null,a.propertyAccessList=null,a.userGroupDropdownArr=null,a.profilepicture=null,a.profilesignature=null,a.bcmPositionid=a.jobTitle,a.selectAll=null;var i=[];angular.forEach(a.digitalSigAuth,function(e){e.value&&i.push(e)}),a.digitalSigAuth=i,e.newUser&&(a.userId=null);var r={task_request:"User/setProfile",data:a};t.get(r).then(function(){e.$parent.addAlert("SUCCESS","INSERT")})}}])});