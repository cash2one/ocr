duAI([7],{19:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),s=function e(t,a,n){null===t&&(t=Function.prototype);var o=Object.getOwnPropertyDescriptor(t,a);if(void 0===o){var i=Object.getPrototypeOf(t);return null===i?void 0:e(i,a,n)}if("value"in o)return o.value;var r=o.get;if(void 0!==r)return r.call(n)},c=a(2),d=n(c),u=a(51),f=n(u),p=a(37),m=n(p),g=function(e){function t(e){o(this,t);var a=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return a.title="提示",a.content=e||"",a.init(),a}return r(t,e),l(t,[{key:"init",value:function(){var e=(0,m.default)({id:this.id,title:this.title,content:this.content});(0,d.default)(this.container).append(e),this.bindEvent(),s(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"show",this).call(this)}},{key:"hide",value:function(){this.getModal().hide().remove(),(0,d.default)("body").removeClass("modal-show")}},{key:"bindEvent",value:function(){var e=this;s(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"bindEvent",this).call(this),this.getModal().on("click","button.cancel",function(t){t.preventDefault(),e.hide()})}}]),t}(f.default);t.default=g},20:function(e,t,a){"use strict";function n(e){var t=e.image,a=void 0===t?null:t,n=e.imageUrl,o=void 0===n?null:n,i=e.success,r=void 0===i?p.default.noop:i,l=e.fail,s=void 0===l?p.default.noop:l;p.default.post("/aidemo",{type:"idcard",image:a,image_url:o}).success(r).fail(s)}function o(e){var t=e.image,a=void 0===t?null:t,n=e.imageUrl,o=void 0===n?null:n,i=e.success,r=void 0===i?p.default.noop:i,l=e.fail,s=void 0===l?p.default.noop:l;p.default.post("/aidemo",{type:"bankcard",image:a,image_url:o}).success(r).fail(s)}function i(e){var t=e.image,a=void 0===t?null:t,n=e.imageUrl,o=void 0===n?null:n,i=e.success,r=void 0===i?p.default.noop:i,l=e.fail,s=void 0===l?p.default.noop:l;p.default.post("/aidemo",{type:"commontext",image:a,image_url:o}).success(r).fail(s)}function r(e){var t=e.image,a=void 0===t?null:t,n=e.imageUrl,o=void 0===n?null:n,i=e.success,r=void 0===i?p.default.noop:i,l=e.fail,s=void 0===l?p.default.noop:l;p.default.post("/aidemo",{type:"face",image:a,image_url:o}).success(r).fail(s)}function l(e){var t=e.image,a=void 0===t?null:t,n=e.imageUrl,o=void 0===n?null:n,i=e.success,r=void 0===i?p.default.noop:i,l=e.fail,s=void 0===l?p.default.noop:l;p.default.post("/aidemo",{type:"pornography",image:a,image_url:o}).success(r).fail(s)}function s(e){var t=e.imageUrl,a=void 0===t?null:t,n=e.type,o=e.success,i=void 0===o?p.default.noop:o,r=e.fail,l=void 0===r?p.default.noop:r;p.default.post("/aidemo",{action:"getHeader",type:n,image_url:a}).success(i).fail(l)}function c(e){var t=e.words,a=void 0===t?null:t,n=e.success,o=void 0===n?p.default.noop:n,i=e.fail,r=void 0===i?p.default.noop:i;p.default.post("/aidemo",{type:"wakescore",kw:a}).success(o).fail(r)}function d(e){var t=e.words,a=void 0===t?null:t,n=e.success,o=void 0===n?p.default.noop:n;window.open("/aidemo?type=wakedownload&kw="+a,"_blank"),o()}function u(e){var t=e.data,a=void 0===t?{}:t,n=e.success,o=void 0===n?p.default.noop:n,i=e.fail,r=void 0===i?p.default.noop:i;p.default.post("/aidemo",{type:"tts",speed:a.speed,vol:a.vol,person:a.person,text:a.text}).success(o).fail(r)}Object.defineProperty(t,"__esModule",{value:!0}),t.scanIDCard=n,t.scanBankCard=o,t.scanGeneralText=i,t.scanFace=r,t.scanPornography=l,t.getHeader=s,t.evaluateWakeWords=c,t.exportWakeWords=d,t.synthesizeSpeech=u;var f=a(2),p=function(e){return e&&e.__esModule?e:{default:e}}(f)},27:function(e,t){e.exports="//ai.bdstatic.com/dist/1490967304/ai_images/error/image-format.png"},279:function(e,t){e.exports="//ai.bdstatic.com/dist/1490967304/ai_images/technology/bfr-detect/demo-card-1.jpg"},28:function(e,t){e.exports="//ai.bdstatic.com/dist/1490967304/ai_images/error/too-large.png"},280:function(e,t){e.exports="//ai.bdstatic.com/dist/1490967304/ai_images/technology/bfr-detect/demo-card-2.jpg"},281:function(e,t){e.exports="//ai.bdstatic.com/dist/1490967304/ai_images/technology/bfr-detect/demo-card-3.jpg"},282:function(e,t){e.exports="//ai.bdstatic.com/dist/1490967304/ai_images/technology/bfr-detect/demo-card-4.png"},283:function(e,t){e.exports="//ai.bdstatic.com/dist/1490967304/ai_images/technology/bfr-detect/demo-card-5.png"},284:function(e,t){e.exports="//ai.bdstatic.com/dist/1490967304/ai_images/technology/bfr-detect/demo-card-6.jpg"},285:function(e,t){e.exports="//ai.bdstatic.com/dist/1490967304/ai_images/technology/bfr-detect/demo-card-7.jpg"},286:function(e,t){e.exports="//ai.bdstatic.com/dist/1490967304/ai_images/technology/bfr-detect/demo-card-8.jpg"},319:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var o=a(2),i=n(o),r=a(29),l=n(r),s=a(55),c=n(s),d=a(20),u=a(19),f=n(u);a(582),a(621);var p=[a(279),a(280),a(281),a(282),a(283),a(284),a(285),a(286)],m=(0,i.default)("#demo-json").find("> p"),g=(0,i.default)("#result-gallery"),v=g.find("ul"),h=(0,i.default)(".tech-intro-detail"),y=(0,i.default)("#demo-result"),b=y.find(".canvas-container"),_=(0,i.default)("#demo-photo-upload").find("> input"),w=(0,i.default)("#demo-photo-url"),x=(0,i.default)("#face-details");(0,i.default)(".case-indicator > li").click(function(){var e=this;(0,i.default)(".case-indicator > li").each(function(t,a){(0,i.default)(a).toggleClass("active",t===(0,i.default)(e).index())}),(0,i.default)(".case-item").each(function(t,a){(0,i.default)(a).toggleClass("active",t===(0,i.default)(e).index())})}),(0,i.default)(window).scroll((0,l.default)(function(){(0,i.default)(document).scrollTop()>=100&&(0,i.default)(".tech-intro-detail").trigger("demo")},300)),h.one("demo",function(){h.addClass("scanned")});var k=!1,C=function(){k=!1,m.empty(),b.attr("class","canvas-container"),(0,i.default)("#demo-photo-upload, #scan-photo").removeClass("disabled"),_.val(""),g.hide(),v.empty(),x.hide().empty()},j=function(e){for(var t=y.find("canvas"),a=t.attr("data-scale"),n=t[0].getContext("2d"),o=0,i=e.length;o<i;o++){var r=e[o],l=r.location;n.save(),n.lineWidth=4/a,n.strokeStyle="rgba(0, 115, 235, 0.8)",n.translate(l.left,l.top),n.rotate(r.rotation_angle/180*Math.PI),n.rect(0,0,l.width,l.height),n.stroke(),n.restore()}},O=function(e,t){for(var a=y.find("canvas"),n=a.attr("data-scale"),o=a[0].getContext("2d"),i=t?{x:e.location.left,y:e.location.top}:{x:0,y:0},r=t?e.rotation_angle:0,l=0,s=e.landmark72.length;l<s;l++){var c=e.landmark72[l];o.beginPath(),o.lineWidth=1,o.fillStyle="rgba(0, 115, 235, 0.8)",o.strokeStyle="transparent";var d=(function(e,t){return 360*Math.atan(t/e)/(2*Math.PI)}(c.x-i.x,c.y-i.y)-r)/180*Math.PI,u=function(e,t){return Math.sqrt(Math.pow(e,2)+Math.pow(t,2))}(c.x-i.x,c.y-i.y);o.arc(u*Math.cos(d),u*Math.sin(d),2/n,0,2*Math.PI),o.fill(),o.stroke(),o.closePath()}},M=function(e){g.toggle(e)},P=function(e){var t=new Image;t.onload=function(){for(var a=0,n=e.result.length;a<n;a++){var o=e.result[a],r=(0,i.default)("<canvas>").attr("width",o.location.width).attr("height",o.location.height),l=r[0].getContext("2d");l.rotate(-o.rotation_angle*Math.PI/180),l.translate(-o.location.left,-o.location.top),l.drawImage(t,0,0);var s=(0,i.default)('<li><img src="'+r[0].toDataURL()+'"></li>');s.data("face",o).data("isAll",!1),v.append(s)}},t.src=g.find("img").eq(0).attr("src")},U=function(e,t){var a=(0,i.default)('<li class="active"><img src="'+e+'"></li>');a.data("face",t).data("isAll",!0),v.empty().append(a)},I={age:{name:"年龄",transform:function(e){return Math.round(e)}},race:{name:"人种",transform:function(e){return{yellow:"黄种人",white:"白种人",black:"黑种人",arabs:"阿拉伯人"}[e]}},gender:{name:"性别",transform:function(e){return{male:"男性",female:"女性"}[e]}},expression:{name:"表情",transform:function(e){return{0:"不笑",1:"微笑",2:"大笑"}[e]}},glasses:{name:"眼镜",transform:function(e){return{0:"无眼镜",1:"普通眼镜",2:"墨镜"}[e]}}},T=function(e,t){if(x.empty(),t)return x.hide(),!1;x.show(),Object.keys(I).forEach(function(t){var a=I[t].name,n=I[t].transform(e[t]);x.append((0,i.default)("<li></li>").html(a+" : "+n))})},D=function(e,t,a){m.empty(),M(!1),b.attr("class","canvas-container loading"),x.hide().empty();var n={success:function(e){(0,i.default)("#demo-photo-upload, #scan-photo").removeClass("disabled"),m.html(JSON.stringify(e,null,"\t")),b.removeClass("loading");var a=e.errno,n=e.msg,o=e.data;if(0!==a||!o.result_num)return b.toggleClass("error-upload-fail",107===a).toggleClass("error-timeout",28===a).toggleClass("error-image-format",106===a),b.toggleClass("error-no-result",!o||!o.result_num),b.empty(),k=!1,-1===[106,107,28,0].indexOf(a)&&new f.default(n),k;b.toggleClass("has-result",o.result_num>=1),U(t,o.result),1===o.result_num?(M(!1),O(o.result[0]),T(o.result[0],!1)):(M(!0),P(o),j(o.result),T(null,!0)),k=!1},fail:function(e){new f.default("接口发生错误："+e.status+" - "+e.statusText),C()}};"url"===e?n.imageUrl=a:"stream"===e&&(n.image=t),(0,d.scanFace)(n)};_.change(function(e){var t=(0,i.default)(e.target);if(""===t.val())return!1;if(k)return void new f.default("操作正在进行中，请稍候再试！");k=!0,(0,i.default)("#demo-photo-upload, #scan-photo").addClass("disabled");var a=t[0].files[0];new c.default({selector:"#demo-result .canvas-container",image:a,type:"stream",success:function(e){_.val(""),D("stream",e)},fail:C})}),(0,i.default)("#scan-photo").click(function(e){var t=(0,i.default)(e.target);if(k)return void new f.default("操作正在进行中，请稍候再试！");if(!t.hasClass("disabled")&&w.val()){k=!0,(0,i.default)("#demo-photo-upload, #scan-photo").addClass("disabled");var a=w.val();new c.default({selector:"#demo-result .canvas-container",image:a,type:"url",apiType:"face",success:function(e){D("url",e,a)},fail:C})}}),(0,i.default)("#demo-photo-upload").click(function(){if((0,i.default)(this).hasClass("disabled"))return!1});var E=(0,i.default)(".demo-card-list > li");E.each(function(e,t){(0,i.default)(t).find("img").attr("src",""+p[e])}),E.click(function(e){var t=(0,i.default)(e.target);if(k)return void new f.default("操作正在进行中，请稍候再试！");if(!t.hasClass("active")){k=!0,t.addClass("active").siblings().removeClass("active");var a=""+window.location.protocol+(0,i.default)(this).find("img").attr("src");(0,i.default)("#demo-photo-upload, #scan-photo").addClass("disabled"),new c.default({selector:"#demo-result .canvas-container",image:a,type:"url",success:function(e){D("url",e,a)},fail:C})}}),g.on("click","li",function(e){var t=(0,i.default)(e.target);if(!t.hasClass("active")){t.addClass("active").siblings().removeClass("active");var a=t.data("face"),n=t.data("isAll");new c.default({selector:"#demo-result .canvas-container",image:(0,i.default)(this).find("img").attr("src"),toCheck:!1,success:function(){n?j(a):O(a,!0),T(a,n)},fail:C})}}),E.eq(0).click()},37:function(e,t,a){var n=a(21);e.exports=(n.default||n).template({compiler:[7,">= 4.0.0"],main:function(e,t,a,n,o){var i,r,l=null!=t?t:{},s=a.helperMissing,c=e.escapeExpression;return'<div class="ai-modal alert" id="'+c((r=null!=(r=a.id||(null!=t?t.id:t))?r:s,"function"==typeof r?r.call(l,{name:"id",hash:{},data:o}):r))+'">\r\n    <header class="modal-header">\r\n        <h3>'+c((r=null!=(r=a.title||(null!=t?t.title:t))?r:s,"function"==typeof r?r.call(l,{name:"title",hash:{},data:o}):r))+'</h3>\r\n        <a class="modal-x"></a>\r\n    </header>\r\n    <section class="modal-content">\r\n        <div style="text-align: center; color: #666;font-size: 14px;margin-bottom: 20px;">\r\n            '+(null!=(r=null!=(r=a.content||(null!=t?t.content:t))?r:s,i="function"==typeof r?r.call(l,{name:"content",hash:{},data:o}):r)?i:"")+'\r\n        </div>\r\n        <div style="text-align: center;">\r\n            <button type="button" class="btn-normal cancel">确定</button>\r\n        </div>\r\n    </section>\r\n</div>\r\n'},useData:!0})},55:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),r=a(2),l=n(r),s=a(20),c=a(19),d=n(c),u=a(60),f=a(27),p=a(28),m=function(){function e(t){var a=this,n=t.selector,i=t.image,r=t.type,s=t.apiType,c=t.toCheck,u=void 0===c||c,f=t.scale,p=void 0===f?1:f,m=t.success,g=t.fail;if(o(this,e),!(0,l.default)(n).context)throw"DemoCanvas：未寻找到容器!";if(this.container=(0,l.default)(n),this.type=r,this.scale=p,this.apiType=s,this.image=new Image,this.success=m||l.default.noop,this.fail=g||l.default.noop,this.image.onerror=function(){a.fail(),new d.default("图片加载失败，请重试")},u){({url:this.checkByUrl,stream:this.checkByStream})[this.type](i,s).then(function(e){a.image.onload=function(){a.render(!0)},a.image.src=e},function(e){a.image.onload=function(){a.render(!1)},a.image.src=e})}else this.image.onload=function(){a.render(!0)},this.image.src=i}return i(e,[{key:"checkByUrl",value:function(e,t){var a=l.default.Deferred();return(0,s.getHeader)({imageUrl:e,type:t,success:function(e){var t=e.data["Content-Type"],n=e.data["Content-Length"];return!t&&!n||0!==e.errno?void a.reject(u):/image\/(png|bmp|jpg|jpeg)/.test(t)?n>2097152?void a.reject(p):void a.resolve(e.data.image_data):void a.reject(f)},fail:function(){a.reject(u)}}),a.promise()}},{key:"checkByStream",value:function(e){var t=l.default.Deferred(),a=new FileReader;return e?(a.readAsDataURL(e),a.onload=function(a){return/image\/(png|bmp|jpeg)/.test(e.type)?e.size>2097152?(t.reject(p),!1):void t.resolve(a.target.result):(t.reject(f),!1)},a.onerror=function(){t.reject(u)},t.promise()):(t.reject(u),t.promise())}},{key:"render",value:function(e){var t=this.container.width(),a=this.container.height(),n=this.image.width,o=this.image.height,i=(0,l.default)("<canvas>您的浏览器暂时不支持canvas，请选用现代浏览器！</canvas>").attr("width",n).attr("height",o);i[0].getContext("2d").drawImage(this.image,0,0);var r=n/t,s=o/a,c=this.scale*(r>1||s>1?1/(r>=s?r:s):1);i.css({position:"relative",left:"50%",top:"50%","-webkit-transform":"translate(-50%, -50%) scale("+c+")","-moz-transform":"translate(-50%, -50%) scale("+c+")","-o-transform":"translate(-50%, -50%) scale("+c+")",transform:"translate(-50%, -50%) scale("+c+")"}),i.attr("data-scale",c),this.container.empty().append(i),e?this.success(this.image.src):this.fail()}}]),e}();t.default=m},582:function(e,t){},60:function(e,t){e.exports="//ai.bdstatic.com/dist/1490967304/ai_images/error/not-found.png"},621:function(e,t,a){e.exports=a.p+"./../../template/cloud/face-detect.html"},738:function(e,t,a){e.exports=a(319)}},[738]);