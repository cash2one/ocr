duAI([29],{323:function(t,e,a){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}var c=a(2),u=n(c),d=a(30),l=n(d);a(591),a(631),(0,u.default)(document).ready(function(){(0,u.default)(".case-indicator > li").click(function(){var t=this;(0,u.default)(".case-indicator > li").each(function(e,a){(0,u.default)(a).toggleClass("active",e===(0,u.default)(t).index())}),(0,u.default)(".case-item").each(function(e,a){(0,u.default)(a).toggleClass("active",e===(0,u.default)(t).index())})}),(0,u.default)(window).scroll((0,l.default)(function(){(0,u.default)(document).scrollTop()>=100&&(0,u.default)(".tech-intro-detail").trigger("demo")},300)),(0,u.default)(".tech-intro-detail").one("demo",function(){(0,u.default)(".compare-group").addClass("scanned")})})},591:function(t,e){},631:function(t,e,a){t.exports=a.p+"./../../template/cloud/face-compare.html"},752:function(t,e,a){t.exports=a(323)}},[752]);