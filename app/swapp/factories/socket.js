define(["swapp"],function(e){e.registerFactory("socket",function(e,a,s,t){function o(e,a){var s=i();y[s]={time:new Date,cb:e},"Binary/image"===a.task_request&&(f=s),a.message_id=s,a.session_key="Session/getSession"===a.task_request?localStorage.local_key:localStorage.session_key,l.send(JSON.stringify(a))}function n(e){var s={binary_envelope:e};a.$apply(function(){y[f].cb.resolve(s)})}function r(e){if(e.message_id){var s=e,o=s.data;t.debug("Data Received",e),y.hasOwnProperty(s.message_id)&&("array"==typeof s.data||"string"==typeof s.data||"object"==typeof s.data?""!==s.data&&(o=s.data,"Session/getSession"===s.task_request&&localStorage.setItem("session_key",o.session_key)):o=s.data),a.$apply(function(){y[s.message_id].cb.resolve(o)}),delete y[s.message_id]}}function i(){return u+=1,u>1e4&&(u=0),u}function c(e){var a=d(e);return a}function d(a){t.debug("Data Send",a);var s=e.defer();return 0===l.readyState?l.onopen=function(){o(s,a)}:1===l.readyState?o(s,a):2===l.readyState,s.promise}var l,y={},u=0,f=0;return swGlobals.localKey===localStorage.local_key?(l=new WebSocket(swGlobals.wsUrl),l.binaryType="arraybuffer"):window.location="/",l.onmessage=function(e){var a,s=0;try{a=JSON.parse(e.data)}catch(t){a=e,s=1}1===s?n(a):r(a)},l.onclose=function(){a.$broadcast("addSessionAlert",{msgType:"sessionclose"})},l.onerror=function(){a.$broadcast("addSessionAlert",{msgType:"sessionerror"})},{get:c}})});