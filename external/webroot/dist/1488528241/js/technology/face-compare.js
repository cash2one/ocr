duAI([18],{187:function(t,e,a){t.exports=a(40)},40:function(t,e,a){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}var d=a(0),u=n(d),c=a(7),i=n(c);a(83),(0,u.default)(document).ready(function(){(0,u.default)(".case-indicator > li").click(function(){var t=this;(0,u.default)(".case-indicator > li").each(function(e,a){(0,u.default)(a).toggleClass("active",e===(0,u.default)(t).index())}),(0,u.default)(".case-item").each(function(e,a){(0,u.default)(a).toggleClass("active",e===(0,u.default)(t).index())})}),(0,u.default)(window).scroll((0,i.default)(function(){(0,u.default)(document).scrollTop()>=100&&(0,u.default)(".tech-intro-detail").trigger("demo")},300)),(0,u.default)(".tech-intro-detail").one("demo",function(){(0,u.default)(".compare-group").addClass("scanned")})})},83:function(t,e){}},[187]);