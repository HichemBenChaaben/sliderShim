define(["swapp"],function(e){"use strict";e.registerDirective("swCheckPasswordStrength",function(){return{replace:!1,restrict:"EACM",link:function(e,r,n){var t={minimumLength:{min:angular.isDefined(e.rulesParam.minLength)?e.rulesParam.minLength:6,strength:function(e){if(0===t.minimumLength.min)return!0;if(e){var r=e.length;return r>=t.minimumLength.min}return!1}},uppercaseLetters:{min:angular.isDefined(e.rulesParam.minUpperCaseChars)?e.rulesParam.minUpperCaseChars:0,strength:function(e){if(0===t.uppercaseLetters.min)return!0;if(e){var r=e.match(/[A-Z]/g);return r&&r.length>=t.uppercaseLetters.min?!0:!1}return!1}},lowercaseLetters:{min:angular.isDefined(e.rulesParam.minLowerCaseChars)?e.rulesParam.minLowerCaseChars:0,strength:function(e){if(0===t.lowercaseLetters.min)return!0;if(e){var r=e.match(/[a-z]/g);return r&&r.length>=t.lowercaseLetters.min?!0:!1}return!1}},symbols:{min:angular.isDefined(e.rulesParam.minSpecialChars)?e.rulesParam.minSpecialChars:0,strength:function(e){if(0===t.symbols.min)return!0;if(e){var r=e.match(/[@#%$-/:-?{-~!\"^_`\[\]]/g);return r&&r.length>=t.symbols.min?!0:!1}return!1}},spaces:{min:0,strength:function(e){if(e){var r=e.match(/\s/);return r&&r.length>=t.spaces.min?!1:!0}return!0}},numbers:{min:angular.isDefined(e.rulesParam.minNumerals)?e.rulesParam.minNumerals:0,strength:function(e){if(0===t.numbers.min)return!0;if(e){var r=e.match(/[0-9]/g);return r&&r.length>=t.numbers.min?!0:!1}return!1}},duplicates:{max:3,strength:function(e){if(0===t.duplicates.max)return!0;if(e){var r=0,n=e.match(new RegExp("(.)\\1{"+t.duplicates.max+",}","g"));return angular.forEach(n,function(e){r+=20*(e.length-t.duplicates.max)}),r>0?!1:!0}return!1}},keyboardConsecutive:{max:angular.isDefined(e.rulesParam.maxKeyboardConsecutiveChars)?e.rulesParam.maxKeyboardConsecutiveChars:0,strength:function(e){if(0===t.keyboardConsecutive.max)return!0;if(e){for(var r="qwertyuiopasdfghjklzxcvbnm",n=!1,s=0;s<e.length;s++){var a=e.substr(s,t.keyboardConsecutive.max+1);if(r.indexOf(a)>-1){n=a.length>3;break}}return!n}return!1}},consecutive:{max:angular.isDefined(e.rulesParam.maxConsecutiveChars)?e.rulesParam.maxConsecutiveChars:0,weight:-10,strength:function(e){if(0===t.consecutive.max)return!0;if(e){for(var r=0,n=0,s=!0,a=0,i=0;i<=e.length;i++){var u=-99;i<e.length&&(u=e.charCodeAt(i)),u===n+1?(s?a++:a=2,s=!0):u===n-1?(s?a=2:a++,s=!1):(r+=a>t.consecutive.max?(a-t.consecutive.max)*t.consecutive.weight:0,a=1),n=u}return r>0?!1:!0}return!1}}},s={colors:["#F00","#ff8000","#008000"],measureStrength:function(r){var n=0,t=0,s=[];return angular.forEach(e.matchAspects,function(e){e.strength(r)&&n++,t++,s.push({test:e,resu:e.strength(r)})}),Math.round(n/t*100)},getColor:function(e){var r=0,n=0;return 60>e&&e>=30?(r=0,n=2):100>e&&e>=60?(r=1,n=4):100===e&&(r=2,n=5),{idx:n,col:this.colors[r]}}};e.$watch(n.swCheckPasswordStrength,function(){if(e.matchAspects={minimumLength:t.minimumLength,number:t.numbers,lowercaseLetters:t.lowercaseLetters,uppercaseLetters:t.uppercaseLetters,symbols:t.symbols,spaces:t.spaces,duplicates:t.duplicates,consecutive:t.consecutive,keyboardConsecutive:t.keyboardConsecutive},""===e.strPassword)r.css({display:"none"});else{var n=s.getColor(s.measureStrength(e.strPassword));r.css({display:"inline"}),r.children("li").css({background:"#DDD"}).slice(0,n.idx).css({background:n.col})}})},template:'<li class="point"></li><li class="point"></li><li class="point"></li><li class="point"></li><li class="point"></li>'}}),e.registerDirective("compareTo",function(){return{require:"ngModel",scope:{otherModelValue:"=compareTo"},link:function(e,r,n,t){t.$validators.compareTo=function(r){return r===e.otherModelValue},e.$watch("otherModelValue",function(){t.$validate()})}}})});