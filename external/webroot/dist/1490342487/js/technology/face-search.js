duAI([11],{13:function(e,t,c){"use strict";var n=c(0),a=function(e){return e&&e.__esModule?e:{default:e}}(n);(0,a.default)(".tech-case-option-btn").on("click",function(e){var t=e.target,c=(0,a.default)(t);c.hasClass("tech-case-active")||(c.addClass("tech-case-active").siblings().removeClass("tech-case-active"),(0,a.default)(".tech-case-item").eq(c.index()).addClass("tech-case-active").siblings().removeClass("tech-case-active"))})},134:function(e,t){},155:function(e,t,c){e.exports=c.p+"./../../template/cloud/face-search.html"},217:function(e,t,c){e.exports=c(87)},87:function(e,t,c){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var a=c(0),s=n(a),o=c(7),i=n(o);c(134),c(13),c(155);var u=(0,s.default)(".tech-function-demo");(0,s.default)(window).scroll((0,i.default)(function(){(0,s.default)(document).scrollTop()>=100&&u.trigger("demo")},300)),u.one("demo",function(){var e=0,t=(0,s.default)(".tech-function-demo-item"),c=setInterval(function(){t.removeClass("tech-function-scanning").eq(e).addClass("tech-function-scanning"),e++===t.length&&(t.addClass("tech-function-scanned"),clearInterval(c))},700)})}},[217]);