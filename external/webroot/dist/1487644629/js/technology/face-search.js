duAI([11],{14:function(e,t,n){"use strict";function c(e){return e&&e.__esModule?e:{default:e}}var a=n(0),s=c(a),i=(0,s.default)(".tech-case-option-btn");i.on("click",function(e){var t=e.target,n=(0,s.default)(t);if(!n.hasClass("tech-case-active")){n.addClass("tech-case-active").siblings().removeClass("tech-case-active");var c=(0,s.default)(".tech-case-item").eq(n.index());c.addClass("tech-case-active").siblings().removeClass("tech-case-active")}})},149:function(e,t,n){e.exports=n(39)},39:function(e,t,n){"use strict";function c(e){return e&&e.__esModule?e:{default:e}}var a=n(0),s=c(a),i=n(5),o=c(i);n(82),n(14),(0,s.default)(document).ready(function(){(0,s.default)(window).scroll((0,o.default)(function(){(0,s.default)(document).scrollTop()>=100&&(0,s.default)(".tech-function-demo").trigger("demo")},300)),(0,s.default)(".tech-function-demo").one("demo",function(){var e=0,t=(0,s.default)(".tech-function-demo-item"),n=setInterval(function(){t.removeClass("tech-function-scanning").eq(e).addClass("tech-function-scanning"),e++===t.length&&(t.addClass("tech-function-scanned"),clearInterval(n))},700)})})},82:function(e,t){}},[149]);