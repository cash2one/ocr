duAI([15],{0:function(t,e,n){t.exports=n(45)},4:function(t,e){(function(e){function n(t,e,n){function o(e){var n=v,o=g;return v=g=void 0,N=e,b=t.apply(o,n)}function a(t){return N=t,h=setTimeout(c,e),w?o(t):b}function r(t){var n=t-y,o=t-N,i=e-n;return A?T(i,x-o):i}function f(t){var n=t-y,o=t-N;return void 0===y||n>=e||n<0||A&&o>=x}function c(){var t=O();return f(t)?s(t):void(h=setTimeout(c,r(t)))}function s(t){return h=void 0,C&&v?o(t):(v=g=void 0,b)}function d(){void 0!==h&&clearTimeout(h),N=0,v=y=g=h=void 0}function p(){return void 0===h?b:s(O())}function m(){var t=O(),n=f(t);if(v=arguments,g=this,y=t,n){if(void 0===h)return a(y);if(A)return h=setTimeout(c,e),o(y)}return void 0===h&&(h=setTimeout(c,e)),b}var v,g,x,b,h,y,N=0,w=!1,A=!1,C=!0;if("function"!=typeof t)throw new TypeError(l);return e=u(e)||0,i(n)&&(w=!!n.leading,A="maxWait"in n,x=A?j(u(n.maxWait)||0,e):x,C="trailing"in n?!!n.trailing:C),m.cancel=d,m.flush=p,m}function o(t,e,o){var a=!0,r=!0;if("function"!=typeof t)throw new TypeError(l);return i(o)&&(a="leading"in o?!!o.leading:a,r="trailing"in o?!!o.trailing:r),n(t,e,{leading:a,maxWait:e,trailing:r})}function i(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function a(t){return!!t&&"object"==typeof t}function r(t){return"symbol"==typeof t||a(t)&&y.call(t)==c}function u(t){if("number"==typeof t)return t;if(r(t))return f;if(i(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=i(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(s,"");var n=p.test(t);return n||m.test(t)?v(t.slice(2),n?2:8):d.test(t)?f:+t}var l="Expected a function",f=NaN,c="[object Symbol]",s=/^\s+|\s+$/g,d=/^[-+]0x[0-9a-f]+$/i,p=/^0b[01]+$/i,m=/^0o[0-7]+$/i,v=parseInt,g="object"==typeof e&&e&&e.Object===Object&&e,x="object"==typeof self&&self&&self.Object===Object&&self,b=g||x||Function("return this")(),h=Object.prototype,y=h.toString,j=Math.max,T=Math.min,O=function(){return b.Date.now()};t.exports=o}).call(e,function(){return this}())},23:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.DNN_DATA=[{text:"2016全国{option}卷答题模板",options:{"高考":254.68,"大考":485.32,"低考":1410.37}},{text:"床前{option}光，疑是地上霜",options:{"明月":79.07,"星星":2824.07,"白月":2071.61}},{text:"落霞与孤鹜{option}，秋水共长天一色",options:{"齐飞":20.39,"齐跑":321.93,"双飞":84.66}},{text:"众里寻{option}千百度，蓦然回首，那人却在，灯火阑珊处",options:{"他":29.71,"她":44.93,ta:158.06}},{text:"基于和谐教学法的高校{option}舞蹈教学研究",options:{"体育":82.05,"教育":250.02,"德育":237.48}},{text:"亚马逊河里的四种最危险的{option}",options:{"动物":356.63,"花朵":721.42,"水果":412.81}},{text:"新能源汽车动力电池项目正式{option}",options:{"展开":59.01,"启动":34.59,"起飞":121.29}},{text:"曲曲折折的荷塘上面,弥望的是田田的{option}",options:{"树叶":446.7,"叶子":350.22,"树木":529.83}},{text:"我国的黄土高原上为什么常年覆盖着{option}？",options:{"黄土":185.71,"山丘":247.26,"巧克力":333.96}},{text:"太阳为什么会有太阳{option}？",options:{"黑子":140.11,"白子":393.31,"黑斑":256.93}}]},45:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}var i=n(1),a=o(i),r=n(4),u=o(r),l=n(23);n(80),(0,a.default)(document).ready(function(){(0,a.default)(".case-indicator > li").click(function(){var t=this;(0,a.default)(".case-indicator > li").each(function(e,n){(0,a.default)(n).toggleClass("active",e===(0,a.default)(t).index())}),(0,a.default)(".case-item").each(function(e,n){(0,a.default)(n).toggleClass("active",e===(0,a.default)(t).index())})}),(0,a.default)(window).scroll((0,u.default)(function(){(0,a.default)(document).scrollTop()>=100&&(0,a.default)(".tech-intro-detail").trigger("demo")},300)),(0,a.default)(".tech-intro-detail").one("demo",function(){(0,a.default)(this).find(".intro-demo").addClass("scanned")});var t=0,e=0;(0,a.default)(".refresh-demo").click(function(){e=0;var n=l.DNN_DATA[t++%l.DNN_DATA.length];(0,a.default)(".demo-input").attr("data-text",n.text);var o=Object.keys(n.options).map(function(t){var o=["<li>",'    <a role="button" data-score="'+n.options[t]+'" class="btn-normal">'+t+"</a>","</li>"].join("");return e=0===e?n.options[t]:n.options[t]<e?n.options[t]:e,(0,a.default)(o)});(0,a.default)("#demo-options").html(o).find("a.btn-normal").eq(0).click()}),(0,a.default)("#demo-options").on("click","a.btn-normal",function(){(0,a.default)("#demo-options .btn-normal").removeClass("selected");var t=(0,a.default)(this);t.addClass("selected");var n=(0,a.default)(".demo-input"),o=n.attr("data-text");n.html(o.replace(/\{option\}/g,"<span>"+t.html()+"</span>"));var i=parseFloat(t.attr("data-score"));(0,a.default)(".demo-score-detail").html(i).toggleClass("good",e===i).toggleClass("bad",e!==i)}),(0,a.default)(".refresh-demo").click()})},80:function(t,e){}});