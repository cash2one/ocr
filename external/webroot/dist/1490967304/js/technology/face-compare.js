duAI([26],{205:function(t,e,a){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}var c=a(1),u=n(c),d=a(19),l=n(d);a(286),a(325),(0,u.default)(document).ready(function(){(0,u.default)(".case-indicator > li").click(function(){var t=this;(0,u.default)(".case-indicator > li").each(function(e,a){(0,u.default)(a).toggleClass("active",e===(0,u.default)(t).index())}),(0,u.default)(".case-item").each(function(e,a){(0,u.default)(a).toggleClass("active",e===(0,u.default)(t).index())})}),(0,u.default)(window).scroll((0,l.default)(function(){(0,u.default)(document).scrollTop()>=100&&(0,u.default)(".tech-intro-detail").trigger("demo")},300)),(0,u.default)(".tech-intro-detail").one("demo",function(){(0,u.default)(".compare-group").addClass("scanned")})})},286:function(t,e){},325:function(t,e,a){t.exports=a.p+"./../../template/cloud/face-compare.html"},440:function(t,e,a){t.exports=a(205)}},[440]);