duAI([27],{322:function(t,e,a){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}var c=a(2),u=n(c),d=a(30),l=n(d);a(588),a(628),(0,u.default)(document).ready(function(){(0,u.default)(".case-indicator > li").click(function(){var t=this;(0,u.default)(".case-indicator > li").each(function(e,a){(0,u.default)(a).toggleClass("active",e===(0,u.default)(t).index())}),(0,u.default)(".case-item").each(function(e,a){(0,u.default)(a).toggleClass("active",e===(0,u.default)(t).index())})}),(0,u.default)(window).scroll((0,l.default)(function(){(0,u.default)(document).scrollTop()>=100&&(0,u.default)(".tech-intro-detail").trigger("demo")},300)),(0,u.default)(".tech-intro-detail").one("demo",function(){(0,u.default)(".compare-group").addClass("scanned")})})},588:function(t,e){},628:function(t,e,a){t.exports=a.p+"./../../template/cloud/face-compare.html"},746:function(t,e,a){t.exports=a(322)}},[746]);