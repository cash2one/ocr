duAI([3],{106:function(t,e){},113:function(t,e){t.exports="//ai.bdstatic.com/dist/1489655127/ai_images/error/no-general-result.png"},114:function(t,e){t.exports="//ai.bdstatic.com/dist/1489655127/ai_images/error/timeout.png"},13:function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}var i=n(0),o=a(i);(0,o.default)(".tech-case-option-btn").on("click",function(t){var e=t.target,n=(0,o.default)(e);n.hasClass("tech-case-active")||(n.addClass("tech-case-active").siblings().removeClass("tech-case-active"),(0,o.default)(".tech-case-item").eq(n.index()).addClass("tech-case-active").siblings().removeClass("tech-case-active"))})},137:function(t,e){t.exports="//ai.bdstatic.com/dist/1489655127/ai_images/technology/ocr-general_enhanced/demo-card-1.png"},138:function(t,e){t.exports="//ai.bdstatic.com/dist/1489655127/ai_images/technology/ocr-general_enhanced/demo-card-2.png"},139:function(t,e){t.exports="//ai.bdstatic.com/dist/1489655127/ai_images/technology/ocr-general_enhanced/demo-card-3.png"},140:function(t,e){t.exports="//ai.bdstatic.com/dist/1489655127/ai_images/technology/ocr-general_enhanced/demo-card-4.png"},141:function(t,e){t.exports="//ai.bdstatic.com/dist/1489655127/ai_images/technology/ocr-general_enhanced/demo-card-5.png"},142:function(t,e){t.exports="//ai.bdstatic.com/dist/1489655127/ai_images/technology/ocr-general_enhanced/demo-card-6.png"},143:function(t,e){t.exports="//ai.bdstatic.com/dist/1489655127/ai_images/technology/ocr-general_enhanced/demo-card-7.png"},144:function(t,e){t.exports="//ai.bdstatic.com/dist/1489655127/ai_images/technology/ocr-general_enhanced/demo-card-8.png"},207:function(t,e,n){t.exports=n(59)},5:function(t,e){t.exports="//ai.bdstatic.com/dist/1489655127/ai_images/error/image-format.png"},59:function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}var i=n(0),o=a(i),c=n(7),r=a(c);n(13),n(106);var d=n(73),s=a(d),l=n(5),u=n(6),f=n(113),g=(n(114),[n(137),n(138),n(139),n(140),n(141),n(142),n(143),n(144)]),h=(0,o.default)(window),m=(0,o.default)(document),p=(0,o.default)(".tech-demo-card-item"),v=(0,o.default)("#demo-json").find("> p"),_=(0,o.default)("#demo-result"),b=(0,o.default)("#img-upload"),x=(0,o.default)("#scan-url"),w=(0,o.default)("#demo-photo-url"),y=1,C=2,j=!1;h.on("scroll.demo",(0,r.default)(function(){m.scrollTop()>=100&&(M(),h.off(".demo"))},300));var M=function(){var t=(0,o.default)(".tech-function-original-card"),e=(0,o.default)(".tech-function-scan-result");t.addClass("tech-function-scanning"),setTimeout(function(){t.removeClass("tech-function-scanning").addClass("tech-function-scanned"),e.addClass("tech-function-scanned")},3e3)},V=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";v.text(t)},k=function(t){(0,o.default)("#demo-origin").html('<img class="tech-demo-origin-img" src="'+t+'">')},q=function(){_.html('<div id="result-loading"></div>')},D=function(t){if(!t)return void _.html("");for(var e=t.words_result||[],n=[],a=0,i=e.length;a<i;a++){var o=e[a],c=o.location,r=["<tr>","    <td>"+(a+1)+"</td>","    <td>"+o.words+"</td>","    <td>"+c.left+"</td>","    <td>"+c.top+"</td>","    <td>"+c.width+"</td>","    <td>"+c.height+"</td>","</tr>"];n.push(r.join("\r"))}var d=n.length>0?['<div id="json-table">','<table cellspacing="0">',"    <thead>","        <tr>",'            <th rowspan="2" style="width:20px;">编号</th>','            <th colspan="5">识别结果</th>',"        </tr>","        <tr>",'            <th style="width:250px;">文字</th>',"            <th>left</th>","            <th>top</th>","            <th>width</th>","            <th>height</th>","        </tr>","    </thead>","    <tbody>"+n.join("\r")+"</tbody>","</table>","</div>"].join("\r"):'<img src="'+f+'">';_.html(d)},O=function(t){if(D(),V(""),!t)return void k(l);switch(t){case 104:case y:return void k(l);case C:return void k(u);case 107:case 28:default:return void k(l)}},T=function(t,e){var n=o.default.Deferred();return j=!0,k(t||e),q(),V(""),x.prop("disabled",!0),b.prop("disabled",!0),t&&e&&n.reject(),o.default.post({url:"/aidemo",data:{type:"general_enhanced",image:e,image_url:t}}).then(function(t){var e=t.errno,a=t.msg,i=t.data;if(j=!1,x.prop("disabled",!1),b.prop("disabled",!1),0===e)return void n.resolve(i);n.reject(e,a)},function(){j=!1,x.prop("disabled",!1),b.prop("disabled",!1),n.reject(28,"网络错误")}),n.promise()},A=function(t){V(t?JSON.stringify(t,null,"\t"):""),D(t)},R=function(t){var e=["image/jpeg","image/png","image/bmp"],n=t.type,a=t.size;return e.indexOf(n)<0?{isValid:!1,reason:y}:a>2097152?{isValid:!1,reason:C}:{isValid:!0}};p.each(function(t,e){(0,o.default)(e).find("img").attr("src",g[t])}),p.on("click",function(t){var e=(0,o.default)(t.currentTarget);if(!e.hasClass("tech-demo-card-active")&&!j){e.addClass("tech-demo-card-active").siblings().removeClass("tech-demo-card-active");T(""+window.location.protocol+e.find("img").eq(0).attr("src")).then(function(t){A(t)},O)}}),x.on("click",function(){var t=w.val().trim();t&&T(t).then(function(t){A(t)},O)}),b.on("change",function(t){if((0,o.default)(t.target).val()){var e=t.target.files[0],n=R(e);if(!n.isValid)switch(n.reason){case y:return void O(y);case C:return void O(C)}(0,s.default)(e).then(function(t){T("",t).then(function(t){A(t)},O)},O)}}),T(""+window.location.protocol+p.eq(0).find("img").attr("src")).then(function(t){A(t)},O)},6:function(t,e){t.exports="//ai.bdstatic.com/dist/1489655127/ai_images/error/too-large.png"},73:function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){var e=o.default.Deferred(),n=new FileReader;return n.readAsDataURL(t),n.onload=function(t){e.resolve(t.target.result)},n.onerror=e.reject,e.promise()};var i=n(0),o=a(i)}},[207]);