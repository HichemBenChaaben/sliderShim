define(["swapp","https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.14/angular-mocks.js","/swapp/directives/file-upload/file-upload-directive.js"],function(){describe("File Upload Directive Test",function(){var e,i;beforeEach(function(){module("swapp"),module(function(e){e.value("socket",{get:function(){return{then:function(){}}}})})}),beforeEach(inject(function(t,l,n){e=t,i=l;var o=null,a=new XMLHttpRequest;a.onload=function(){o=this.responseText},a.open("get","/swapp/directives/file-upload/file-upload-directive.tpl.html",!1),a.send(),n.put("/swapp/directives/file-upload/file-upload-directive.tpl.html",o)})),it("should display the file upload box",function(){})})});