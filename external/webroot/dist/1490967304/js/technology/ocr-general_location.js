duAI([6],{11:function(t,e,i){"use strict";var n=i(0),a=function(t){return t&&t.__esModule?t:{default:t}}(n);(0,a.default)(".tech-case-option-btn").on("click",function(t){var e=t.target,i=(0,a.default)(e);i.hasClass("tech-case-active")||(i.addClass("tech-case-active").siblings().removeClass("tech-case-active"),(0,a.default)(".tech-case-item").eq(i.index()).addClass("tech-case-active").siblings().removeClass("tech-case-active"))})},147:function(t,e){},167:function(t,e,i){t.exports=i.p+"./../../template/cloud/ocr-general_location.html"},19:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){var e=a.default.Deferred(),i=new FileReader;return i.readAsDataURL(t),i.onload=function(t){e.resolve(t.target.result)},i.onerror=e.reject,e.promise()};var n=i(0),a=function(t){return t&&t.__esModule?t:{default:t}}(n)},21:function(t,e){t.exports="//ai.bdstatic.com/dist/1490967304/ai_images/error/no-general-result.png"},22:function(t,e){t.exports="//ai.bdstatic.com/dist/1490967304/ai_images/error/timeout.png"},256:function(t,e,i){t.exports=i(87)},4:function(t,e){t.exports="//ai.bdstatic.com/dist/1490967304/ai_images/error/image-format.png"},5:function(t,e){t.exports="//ai.bdstatic.com/dist/1490967304/ai_images/error/too-large.png"},87:function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}var a=i(0),o=n(a),r=i(7),d=n(r);i(11),i(147);var c=i(19),s=n(c);i(167);var l=i(4),u=i(5),f=i(21),h=(i(22),(0,o.default)(window)),m=(0,o.default)(document),g=(0,o.default)(".tech-demo-card-item"),p=(0,o.default)("#demo-json").find("> p"),v=(0,o.default)("#demo-result"),b=(0,o.default)("#img-upload"),w=(0,o.default)("#scan-url"),_=(0,o.default)("#demo-photo-url"),C=!1;h.on("scroll.demo",(0,d.default)(function(){m.scrollTop()>=100&&(j(),h.off(".demo"))},300));var j=function(){var t=(0,o.default)(".tech-function-original-card"),e=(0,o.default)(".tech-function-scan-result");t.addClass("tech-function-scanning"),setTimeout(function(){t.removeClass("tech-function-scanning").addClass("tech-function-scanned"),e.addClass("tech-function-scanned")},3e3)},x=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";p.text(t)},y=function(t){(0,o.default)("#demo-origin").html('<img class="tech-demo-origin-img" src="'+t+'">')},M=function(){v.html('<div id="result-loading"></div>')},V=function(t){if(!t)return void v.html("");for(var e=t.words_result||[],i=[],n=0,a=e.length;n<a;n++){var o=e[n],r=o.location,d=["<tr>","    <td>"+(n+1)+"</td>","    <td>"+o.words+"</td>","    <td>"+r.left+"</td>","    <td>"+r.top+"</td>","    <td>"+r.width+"</td>","    <td>"+r.height+"</td>","</tr>"];i.push(d.join("\r"))}var c=i.length>0?['<div id="json-table">','<table cellspacing="0">',"    <thead>","        <tr>",'            <th rowspan="2" style="width:20px;">编号</th>','            <th rowspan="2" style="width:250px;">识别结果</th>','            <th colspan="4">识别结果</th>',"        </tr>","        <tr>","            <th>left</th>","            <th>top</th>","            <th>width</th>","            <th>height</th>","        </tr>","    </thead>","    <tbody>"+i.join("\r")+"</tbody>","</table>","</div>"].join("\r"):'<img src="'+f+'">';v.html(c)},k=function(t){if(V(),x(""),!t)return void y(l);switch(t){case 104:case 1:return void y(l);case 2:return void y(u);case 107:case 28:default:return void y(l)}},q=function(t,e){var i=o.default.Deferred();return C=!0,y(t||e),M(),x(""),w.prop("disabled",!0),b.prop("disabled",!0),t&&e&&i.reject(),o.default.post({url:"/aidemo",data:{type:"general_location",image:e,image_url:t}}).then(function(t){var e=t.errno,n=t.msg,a=t.data;if(C=!1,w.prop("disabled",!1),b.prop("disabled",!1),0===e)return void i.resolve(a);i.reject(e,n)},function(){C=!1,w.prop("disabled",!1),b.prop("disabled",!1),i.reject(28,"网络错误")}),i.promise()},D=function(t){x(t?JSON.stringify(t,null,"\t"):""),V(t)},O=function(t){var e=["image/jpeg","image/png","image/bmp"],i=t.type,n=t.size;return e.indexOf(i)<0?{isValid:!1,reason:1}:n>2097152?{isValid:!1,reason:2}:{isValid:!0}};g.on("click",function(t){var e=(0,o.default)(t.currentTarget);if(!e.hasClass("tech-demo-card-active")&&!C){e.addClass("tech-demo-card-active").siblings().removeClass("tech-demo-card-active");q(""+window.location.protocol+e.find("img").eq(0).attr("src")).then(function(t){D(t)},k)}}),w.on("click",function(){var t=_.val().trim();t&&q(t).then(function(t){D(t)},k)}),b.on("change",function(t){if((0,o.default)(t.target).val()){var e=t.target.files[0],i=O(e);if(!i.isValid)switch(i.reason){case 1:return void k(1);case 2:return void k(2)}(0,s.default)(e).then(function(t){q("",t).then(function(t){D(t)},k)},k)}}),q(""+window.location.protocol+g.eq(0).find("img").attr("src")).then(function(t){D(t)},k)}},[256]);