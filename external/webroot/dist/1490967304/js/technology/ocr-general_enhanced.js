duAI([12],{17:function(t,e){t.exports="//ai.bdstatic.com/dist/1490967304/ai_images/error/image-format.png"},18:function(t,e){t.exports="//ai.bdstatic.com/dist/1490967304/ai_images/error/too-large.png"},218:function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}var i=n(1),o=a(i),r=n(19),d=a(r);n(25),n(297);var c=n(45),s=a(c);n(326);var l=n(17),u=n(18),f=n(46),h=(n(47),(0,o.default)(window)),m=(0,o.default)(document),v=(0,o.default)(".tech-demo-card-item"),g=(0,o.default)("#demo-json").find("> p"),p=(0,o.default)("#demo-result"),b=(0,o.default)("#img-upload"),w=(0,o.default)("#scan-url"),_=(0,o.default)("#demo-photo-url"),C=!1;h.on("scroll.demo",(0,d.default)(function(){m.scrollTop()>=100&&(j(),h.off(".demo"))},300));var j=function(){var t=(0,o.default)(".tech-function-original-card"),e=(0,o.default)(".tech-function-scan-result");t.addClass("tech-function-scanning"),setTimeout(function(){t.removeClass("tech-function-scanning").addClass("tech-function-scanned"),e.addClass("tech-function-scanned")},3e3)},x=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";g.text(t)},y=function(t){(0,o.default)("#demo-origin").html('<img class="tech-demo-origin-img" src="'+t+'">')},M=function(){p.html('<div id="result-loading"></div>')},V=function(t){if(!t)return void p.html("");for(var e=t.words_result||[],n=[],a=0,i=e.length;a<i;a++){var o=e[a],r=o.location,d=["<tr>","    <td>"+(a+1)+"</td>","    <td>"+o.words+"</td>","    <td>"+r.left+"</td>","    <td>"+r.top+"</td>","    <td>"+r.width+"</td>","    <td>"+r.height+"</td>","</tr>"];n.push(d.join("\r"))}var c=n.length>0?['<div id="json-table">','<table cellspacing="0">',"    <thead>","        <tr>",'            <th rowspan="2" style="width:20px;">编号</th>','            <th colspan="5">识别结果</th>',"        </tr>","        <tr>",'            <th style="width:250px;">文字</th>',"            <th>left</th>","            <th>top</th>","            <th>width</th>","            <th>height</th>","        </tr>","    </thead>","    <tbody>"+n.join("\r")+"</tbody>","</table>","</div>"].join("\r"):'<img src="'+f+'">';p.html(c)},k=function(t){if(V(),x(""),!t)return void y(l);switch(t){case 104:case 1:return void y(l);case 2:return void y(u);case 107:case 28:default:return void y(l)}},q=function(t,e){var n=o.default.Deferred();return C=!0,y(t||e),M(),x(""),w.prop("disabled",!0),b.prop("disabled",!0),t&&e&&n.reject(),o.default.post({url:"/aidemo",data:{type:"general_enhanced",image:e,image_url:t}}).then(function(t){var e=t.errno,a=t.msg,i=t.data;if(C=!1,w.prop("disabled",!1),b.prop("disabled",!1),0===e)return void n.resolve(i);n.reject(e,a)},function(){C=!1,w.prop("disabled",!1),b.prop("disabled",!1),n.reject(28,"网络错误")}),n.promise()},D=function(t){x(t?JSON.stringify(t,null,"\t"):""),V(t)},O=function(t){var e=["image/jpeg","image/png","image/bmp"],n=t.type,a=t.size;return e.indexOf(n)<0?{isValid:!1,reason:1}:a>2097152?{isValid:!1,reason:2}:{isValid:!0}};v.on("click",function(t){var e=(0,o.default)(t.currentTarget);if(!e.hasClass("tech-demo-card-active")&&!C){e.addClass("tech-demo-card-active").siblings().removeClass("tech-demo-card-active");var n=""+window.location.protocol+e.find("img").eq(0).attr("src");q(n).then(function(t){D(t)},k)}}),w.on("click",function(){var t=_.val().trim();t&&q(t).then(function(t){D(t)},k)}),b.on("change",function(t){if((0,o.default)(t.target).val()){var e=t.target.files[0],n=O(e);if(!n.isValid)switch(n.reason){case 1:return void k(1);case 2:return void k(2)}(0,s.default)(e).then(function(t){q("",t).then(function(t){D(t)},k)},k)}});var T=""+window.location.protocol+v.eq(0).find("img").attr("src");q(T).then(function(t){D(t)},k)},25:function(t,e,n){"use strict";var a=n(1),i=function(t){return t&&t.__esModule?t:{default:t}}(a);(0,i.default)(".tech-case-option-btn").on("click",function(t){var e=t.target,n=(0,i.default)(e);n.hasClass("tech-case-active")||(n.addClass("tech-case-active").siblings().removeClass("tech-case-active"),(0,i.default)(".tech-case-item").eq(n.index()).addClass("tech-case-active").siblings().removeClass("tech-case-active"))})},297:function(t,e){},326:function(t,e,n){t.exports=n.p+"./../../template/cloud/ocr-general_enhanced.html"},440:function(t,e,n){t.exports=n(218)},45:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){var e=i.default.Deferred(),n=new FileReader;return n.readAsDataURL(t),n.onload=function(t){e.resolve(t.target.result)},n.onerror=e.reject,e.promise()};var a=n(1),i=function(t){return t&&t.__esModule?t:{default:t}}(a)},46:function(t,e){t.exports="//ai.bdstatic.com/dist/1490967304/ai_images/error/no-general-result.png"},47:function(t,e){t.exports="//ai.bdstatic.com/dist/1490967304/ai_images/error/timeout.png"}},[440]);