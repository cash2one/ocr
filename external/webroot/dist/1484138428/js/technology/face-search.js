duAI([36],{0:function(t,e,a){t.exports=a(200)},200:function(t,e,a){"use strict";function l(t){return t&&t.__esModule?t:{default:t}}var n=a(18),i=l(n);(0,i.default)(document).ready(function(){(0,i.default)(".case-indicator > li").click(function(){var t=this;(0,i.default)(".case-indicator > li").each(function(e,a){(0,i.default)(a).toggleClass("active",e===(0,i.default)(t).index())}),(0,i.default)(".case-item").each(function(e,a){(0,i.default)(a).toggleClass("active",e===(0,i.default)(t).index())})}),(0,i.default)(window).scroll(function(){(0,i.default)(document).scrollTop()>=100&&(0,i.default)(".tech-intro-detail").trigger("demo")}),(0,i.default)(".tech-intro-detail").one("demo",function(){var t=0,e=setInterval(function(){var a=(0,i.default)(".face-list > li");a.each(function(e,a){(0,i.default)(a).toggleClass("scanning",e===t)}),t===a.length&&(clearInterval(e),(0,i.default)(".face-list > li").addClass("scanned")),t++},700)})})}});