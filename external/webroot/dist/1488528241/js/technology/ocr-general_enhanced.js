duAI([3],{13:function(t,e,a){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}var i=a(0),o=n(i),c=(0,o.default)(".tech-case-option-btn");c.on("click",function(t){var e=t.target,a=(0,o.default)(e);if(!a.hasClass("tech-case-active")){a.addClass("tech-case-active").siblings().removeClass("tech-case-active");var n=(0,o.default)(".tech-case-item").eq(a.index());n.addClass("tech-case-active").siblings().removeClass("tech-case-active")}})},130:function(t,e){t.exports="//ai.bdstatic.com/dist/1488528241/ai_images/technology/ocr-general_enhanced/demo-card-1.png"},131:function(t,e){t.exports="//ai.bdstatic.com/dist/1488528241/ai_images/technology/ocr-general_enhanced/demo-card-2.png"},132:function(t,e){t.exports="//ai.bdstatic.com/dist/1488528241/ai_images/technology/ocr-general_enhanced/demo-card-3.png"},133:function(t,e){t.exports="//ai.bdstatic.com/dist/1488528241/ai_images/technology/ocr-general_enhanced/demo-card-4.png"},134:function(t,e){t.exports="//ai.bdstatic.com/dist/1488528241/ai_images/technology/ocr-general_enhanced/demo-card-5.png"},135:function(t,e){t.exports="//ai.bdstatic.com/dist/1488528241/ai_images/technology/ocr-general_enhanced/demo-card-6.png"},136:function(t,e){t.exports="//ai.bdstatic.com/dist/1488528241/ai_images/technology/ocr-general_enhanced/demo-card-7.png"},137:function(t,e){t.exports="//ai.bdstatic.com/dist/1488528241/ai_images/technology/ocr-general_enhanced/demo-card-8.png"},197:function(t,e,a){t.exports=a(50)},5:function(t,e){t.exports="//ai.bdstatic.com/dist/1488528241/ai_images/error/image-format.png"},50:function(t,e,a){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}var i=a(0),o=n(i),c=a(7),r=n(c);a(13),a(93);var d=a(63),s=n(d),l=a(5),u=a(6),f=a(98),g=(a(99),[a(130),a(131),a(132),a(133),a(134),a(135),a(136),a(137)]),h=(0,o.default)(window),m=(0,o.default)(document),p=(0,o.default)(".tech-demo-card-item"),v=(0,o.default)("#demo-json").find("> p"),_=(0,o.default)("#demo-result"),b=(0,o.default)("#img-upload"),x=(0,o.default)("#scan-url"),y=(0,o.default)("#demo-photo-url"),w=1,C=2,j=!1;h.on("scroll.demo",(0,r.default)(function(){m.scrollTop()>=100&&(M(),h.off(".demo"))},300));var M=function(){var t=(0,o.default)(".tech-function-original-card"),e=(0,o.default)(".tech-function-scan-result");t.addClass("tech-function-scanning"),setTimeout(function(){t.removeClass("tech-function-scanning").addClass("tech-function-scanned"),e.addClass("tech-function-scanned")},3e3)},V=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";v.text(t)},k=function(t){var e=(0,o.default)("#demo-origin");e.html('<img class="tech-demo-origin-img" src="'+t+'">')},q=function(){_.html('<div id="result-loading"></div>')},D=function(t){if(!t)return void _.html("");for(var e=t.words_result||[],a=[],n=0,i=e.length;n<i;n++){var o=e[n],c=o.location,r=["<tr>","    <td>"+(n+1)+"</td>","    <td>"+o.words+"</td>","    <td>"+c.left+"</td>","    <td>"+c.top+"</td>","    <td>"+c.width+"</td>","    <td>"+c.height+"</td>","</tr>"];a.push(r.join("\r"))}var d=a.length>0?['<div id="json-table">','<table cellspacing="0">',"    <thead>","        <tr>",'            <th rowspan="2" style="width:20px;">编号</th>','            <th colspan="5">识别结果</th>',"        </tr>","        <tr>",'            <th style="width:250px;">文字</th>',"            <th>left</th>","            <th>top</th>","            <th>width</th>","            <th>height</th>","        </tr>","    </thead>","    <tbody>"+a.join("\r")+"</tbody>","</table>","</div>"].join("\r"):'<img src="'+f+'">';_.html(d)},O=function(t){if(D(),V(""),!t)return void k(l);switch(t){case 104:case w:return void k(l);case C:return void k(u);case 107:case 28:default:return void k(l)}},T=function(t,e){var a=o.default.Deferred();return j=!0,k(t||e),q(),V(""),x.prop("disabled",!0),b.prop("disabled",!0),t&&e&&a.reject(),o.default.post({url:"/aidemo",data:{type:"general_enhanced",image:e,image_url:t}}).then(function(t){var e=t.errno,n=t.msg,i=t.data;return j=!1,x.prop("disabled",!1),b.prop("disabled",!1),0===e?void a.resolve(i):void a.reject(e,n)},function(){j=!1,x.prop("disabled",!1),b.prop("disabled",!1),a.reject(28,"网络错误")}),a.promise()},A=function(t){V(t?JSON.stringify(t,null,"\t"):""),D(t)},R=function(t){var e=["image/jpeg","image/png","image/bmp"],a=t.type,n=t.size;return e.indexOf(a)<0?{isValid:!1,reason:w}:n>2097152?{isValid:!1,reason:C}:{isValid:!0}};p.each(function(t,e){(0,o.default)(e).find("img").attr("src",g[t])}),p.on("click",function(t){var e=(0,o.default)(t.currentTarget);if(!e.hasClass("tech-demo-card-active")&&!j){e.addClass("tech-demo-card-active").siblings().removeClass("tech-demo-card-active");var a=""+window.location.protocol+e.find("img").eq(0).attr("src");T(a).then(function(t){A(t)},O)}}),x.on("click",function(){var t=y.val().trim();t&&T(t).then(function(t){A(t)},O)}),b.on("change",function(t){if((0,o.default)(t.target).val()){var e=t.target.files[0],a=R(e);if(!a.isValid)switch(a.reason){case w:return void O(w);case C:return void O(C)}(0,s.default)(e).then(function(t){T("",t).then(function(t){A(t)},O)},O)}});var z=p.eq(0).find("img").attr("src");T(z).then(function(t){A(t)},O)},6:function(t,e){t.exports="//ai.bdstatic.com/dist/1488528241/ai_images/error/too-large.png"},63:function(t,e,a){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){var e=o.default.Deferred(),a=new FileReader;return a.readAsDataURL(t),a.onload=function(t){e.resolve(t.target.result)},a.onerror=e.reject,e.promise()};var i=a(0),o=n(i)},93:function(t,e){},98:function(t,e){t.exports="//ai.bdstatic.com/dist/1488528241/ai_images/error/no-general-result.png"},99:function(t,e){t.exports="//ai.bdstatic.com/dist/1488528241/ai_images/error/timeout.png"}},[197]);