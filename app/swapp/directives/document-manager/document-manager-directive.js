"use strict";define(["swapp"],function(t){t.registerDirective("swDocsFolder",function(){return{templateUrl:"/swapp/directives/document-manager/documents-folder.tpl.html",restrict:"E",replace:!0,scope:{},link:function(t,e,n){t.docObj={},t.translations={documentsFolder:"Documents Folder",name:"Name",date:"Date",search:"Search"},t.docs=[{name:"test-doc.pdf",date:"10/3/2015"},{name:"test-doc2.pdf",date:"11/3/2015"}],t.attach=function(){},t.upload=function(){},t.download=function(){},t.email=function(){},t.version=function(){},t.publish=function(){},t.properties=function(){},t.view=function(){}}}}),t.registerDirective("swAttachments",function(){return{templateUrl:"/swapp/directives/document-manager/attachments.tpl.html",restrict:"E",replace:!0,scope:{},link:function(t,e,n){t.attachments=[{name:"test-doc.pdf",date:"10/3/2015"},{name:"test-doc2.pdf",date:"11/3/2015"}],t.translations={attachedDocs:"Attachments",name:"Name",date:"Date"},t.detach=function(){},t.upload=function(){},t.download=function(){},t.email=function(){},t.version=function(){},t.publish=function(){},t.properties=function(){},t.view=function(){}}}})});