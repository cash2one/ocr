duAI([14],{0:function(t,e,n){t.exports=n(47)},4:function(t,e){(function(e){function n(t,e,n){function o(e){var n=v,o=g;return v=g=void 0,A=e,h=t.apply(o,n)}function r(t){return A=t,x=setTimeout(c,e),w?o(t):h}function a(t){var n=t-y,o=t-A,i=e-n;return C?j(i,b-o):i}function f(t){var n=t-y,o=t-A;return void 0===y||n>=e||n<0||C&&o>=b}function c(){var t=O();return f(t)?s(t):void(x=setTimeout(c,a(t)))}function s(t){return x=void 0,M&&v?o(t):(v=g=void 0,h)}function d(){void 0!==x&&clearTimeout(x),A=0,v=y=g=x=void 0}function p(){return void 0===x?h:s(O())}function m(){var t=O(),n=f(t);if(v=arguments,g=this,y=t,n){if(void 0===x)return r(y);if(C)return x=setTimeout(c,e),o(y)}return void 0===x&&(x=setTimeout(c,e)),h}var v,g,b,h,x,y,A=0,w=!1,C=!1,M=!0;if("function"!=typeof t)throw new TypeError(l);return e=u(e)||0,i(n)&&(w=!!n.leading,C="maxWait"in n,b=C?T(u(n.maxWait)||0,e):b,M="trailing"in n?!!n.trailing:M),m.cancel=d,m.flush=p,m}function o(t,e,o){var r=!0,a=!0;if("function"!=typeof t)throw new TypeError(l);return i(o)&&(r="leading"in o?!!o.leading:r,a="trailing"in o?!!o.trailing:a),n(t,e,{leading:r,maxWait:e,trailing:a})}function i(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function r(t){return!!t&&"object"==typeof t}function a(t){return"symbol"==typeof t||r(t)&&y.call(t)==c}function u(t){if("number"==typeof t)return t;if(a(t))return f;if(i(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=i(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(s,"");var n=p.test(t);return n||m.test(t)?v(t.slice(2),n?2:8):d.test(t)?f:+t}var l="Expected a function",f=NaN,c="[object Symbol]",s=/^\s+|\s+$/g,d=/^[-+]0x[0-9a-f]+$/i,p=/^0b[01]+$/i,m=/^0o[0-7]+$/i,v=parseInt,g="object"==typeof e&&e&&e.Object===Object&&e,b="object"==typeof self&&self&&self.Object===Object&&self,h=g||b||Function("return this")(),x=Object.prototype,y=x.toString,T=Math.max,j=Math.min,O=function(){return h.Date.now()};t.exports=o}).call(e,function(){return this}())},24:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.SIMNET_DATA=[{text:"车头如何放置车牌",options:{"前牌照怎么装":.761517,"如何办理北京车牌":.486205,"后牌照怎么装":.697181}},{text:"信号忽强忽弱",options:{"信号忽高忽低":.949734,"信号忽左忽右":.914491,"信号忽然中断":.695907}},{text:"如何学好深度学习",options:{"深入学习习近平讲话材料":.312354,"机器学习教程":.608247,"人工智能教程":.525389}},{text:"香蕉的翻译",options:{"香蕉用英文怎么说":.826361,"香蕉怎么吃":.579909,"桔子用英文怎么说":.52152}},{text:"小儿腹泻偏方",options:{"宝宝拉肚子偏方":.903965,"小儿感冒偏方":.740181,"腹泻偏方":.810619}},{text:"英雄联盟好玩吗，怎么升级",options:{"lol攻略":.589435,"英雄联盟服务器升级":.537899,"怎么打好lol":.664038}},{text:"红米更新出错",options:{"红米升级系统出错":.900544,"红米账户出错":.778519,"如何买到小米手机":.263091}},{text:"李彦宏是百度公司创始人",options:{"百度是李彦宏创办的":.877645,"马化腾创办了腾讯公司":.682594,"姚明是NBA的著名球星":.320592}},{text:"中国有五千年的历史",options:{"中国是个历史悠久的国家":.758613,"中国有很多少数民族":.583308,"中国有13亿人口":.649412}},{text:"北京成功申办了2008年奥运会",options:{"2008年奥运会在北京举行":.809656,"伦敦奥运会在2012年举行":.532129,"东京奥运会即将举办":.481673}}]},47:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}var i=n(1),r=o(i),a=n(4),u=o(a),l=n(24);n(82),(0,r.default)(document).ready(function(){(0,r.default)(".case-indicator > li").click(function(){var t=this;(0,r.default)(".case-indicator > li").each(function(e,n){(0,r.default)(n).toggleClass("active",e===(0,r.default)(t).index())}),(0,r.default)(".case-item").each(function(e,n){(0,r.default)(n).toggleClass("active",e===(0,r.default)(t).index())})}),(0,r.default)(window).scroll((0,u.default)(function(){(0,r.default)(document).scrollTop()>=100&&(0,r.default)(".tech-intro-detail").trigger("demo")},300)),(0,r.default)(".tech-intro-detail").one("demo",function(){(0,r.default)(this).find(".intro-demo").addClass("scanned")});var t=0,e=0;(0,r.default)(".refresh-demo").click(function(){e=0;var n=l.SIMNET_DATA[t++%l.SIMNET_DATA.length];(0,r.default)(".demo-input").html(n.text);var o=Object.keys(n.options).map(function(t){var o=["<li>",'    <a role="button" data-score="'+n.options[t]+'" class="btn-normal">'+t+"</a>","</li>"].join("");return e=n.options[t]>e?n.options[t]:e,(0,r.default)(o)});(0,r.default)("#demo-options").html(o).find("a.btn-normal").eq(0).click()}),(0,r.default)("#demo-options").on("click","a.btn-normal",function(){(0,r.default)("#demo-options .btn-normal").removeClass("selected");var t=(0,r.default)(this);t.addClass("selected");var n=parseFloat(t.attr("data-score"));(0,r.default)(".demo-score-detail").html(n).toggleClass("good",e===n).toggleClass("bad",e!==n)}),(0,r.default)(".refresh-demo").click()})},82:function(t,e){}});