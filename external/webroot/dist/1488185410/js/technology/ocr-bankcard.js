duAI([4],{1:function(e,t,a){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,a,o){return a&&e(t.prototype,a),o&&e(t,o),t}}(),s=function e(t,a,o){null===t&&(t=Function.prototype);var n=Object.getOwnPropertyDescriptor(t,a);if(void 0===n){var i=Object.getPrototypeOf(t);return null===i?void 0:e(i,a,o)}if("value"in n)return n.value;var r=n.get;if(void 0!==r)return r.call(o)},u=a(3),d=o(u),c=a(0),f=o(c),p=a(4),m=o(p),g=a(7),v=function(e){function t(e){n(this,t);var a=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return a.title="提示",a.content=e||"",a.init(),a}return r(t,e),l(t,[{key:"init",value:function(){var e=d.default.render(g.ALERT_MODAL_TMPL,{id:this.id,title:this.title,content:this.content});(0,f.default)(this.container).append(e),this.bindEvent(),s(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"show",this).call(this)}},{key:"hide",value:function(){this.getModal().hide().remove(),(0,f.default)("body").removeClass("modal-show")}},{key:"bindEvent",value:function(){var e=this;s(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"bindEvent",this).call(this);var a=this.getModal();a.on("click","button.cancel",function(t){t.preventDefault(),e.hide()})}}]),t}(m.default);t.default=v},10:function(e,t){e.exports="/ai_dist/1488185410/ai_images/error/too-large.png"},110:function(e,t){e.exports="/ai_dist/1488185410/ai_images/technology/ocr-bankcard/demo-card-1.png"},111:function(e,t){e.exports="/ai_dist/1488185410/ai_images/technology/ocr-bankcard/demo-card-2.png"},112:function(e,t){e.exports="/ai_dist/1488185410/ai_images/technology/ocr-bankcard/demo-card-3.png"},113:function(e,t){e.exports="/ai_dist/1488185410/ai_images/technology/ocr-bankcard/demo-card-4.png"},114:function(e,t){e.exports="/ai_dist/1488185410/ai_images/technology/ocr-bankcard/demo-card-5.png"},115:function(e,t){e.exports="/ai_dist/1488185410/ai_images/technology/ocr-bankcard/demo-card-6.png"},155:function(e,t,a){e.exports=a(44)},2:function(e,t,a){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function n(e){var t=e.image,a=void 0===t?null:t,o=e.imageUrl,n=void 0===o?null:o,i=e.success,r=void 0===i?m.default.noop:i,l=e.fail,s=void 0===l?m.default.noop:l;m.default.post("/aidemo",{type:"idcard",image:a,image_url:n}).success(r).fail(s)}function i(e){var t=e.image,a=void 0===t?null:t,o=e.imageUrl,n=void 0===o?null:o,i=e.success,r=void 0===i?m.default.noop:i,l=e.fail,s=void 0===l?m.default.noop:l;m.default.post("/aidemo",{type:"bankcard",image:a,image_url:n}).success(r).fail(s)}function r(e){var t=e.image,a=void 0===t?null:t,o=e.imageUrl,n=void 0===o?null:o,i=e.success,r=void 0===i?m.default.noop:i,l=e.fail,s=void 0===l?m.default.noop:l;m.default.post("/aidemo",{type:"commontext",image:a,image_url:n}).success(r).fail(s)}function l(e){var t=e.image,a=void 0===t?null:t,o=e.imageUrl,n=void 0===o?null:o,i=e.success,r=void 0===i?m.default.noop:i,l=e.fail,s=void 0===l?m.default.noop:l;m.default.post("/aidemo",{type:"face",image:a,image_url:n}).success(r).fail(s)}function s(e){var t=e.image,a=void 0===t?null:t,o=e.imageUrl,n=void 0===o?null:o,i=e.success,r=void 0===i?m.default.noop:i,l=e.fail,s=void 0===l?m.default.noop:l;m.default.post("/aidemo",{type:"pornography",image:a,image_url:n}).success(r).fail(s)}function u(e){var t=e.imageUrl,a=void 0===t?null:t,o=e.type,n=e.success,i=void 0===n?m.default.noop:n,r=e.fail,l=void 0===r?m.default.noop:r;m.default.post("/aidemo",{action:"getHeader",type:o,image_url:a}).success(i).fail(l)}function d(e){var t=e.words,a=void 0===t?null:t,o=e.success,n=void 0===o?m.default.noop:o,i=e.fail,r=void 0===i?m.default.noop:i;m.default.post("/aidemo",{type:"wakescore",kw:a}).success(n).fail(r)}function c(e){var t=e.words,a=void 0===t?null:t,o=e.success,n=void 0===o?m.default.noop:o;window.open("/aidemo?type=wakedownload&kw="+a,"_blank"),n()}function f(e){var t=e.data,a=void 0===t?{}:t,o=e.success,n=void 0===o?m.default.noop:o,i=e.fail,r=void 0===i?m.default.noop:i;m.default.post("/aidemo",{type:"tts",speed:a.speed,vol:a.vol,person:a.person,text:a.text}).success(n).fail(r)}Object.defineProperty(t,"__esModule",{value:!0}),t.scanIDCard=n,t.scanBankCard=i,t.scanGeneralText=r,t.scanFace=l,t.scanPornography=s,t.getHeader=u,t.evaluateWakeWords=d,t.exportWakeWords=c,t.synthesizeSpeech=f;var p=a(0),m=o(p)},44:function(e,t,a){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var n=a(0),i=o(n),r=a(5),l=o(r),s=a(6),u=o(s),d=a(2),c=a(1),f=o(c);a(88);var p=[a(110),a(111),a(112),a(113),a(114),a(115)];(0,i.default)(document).ready(function(){(0,i.default)(".case-indicator > li").click(function(){var e=this;(0,i.default)(".case-indicator > li").each(function(t,a){(0,i.default)(a).toggleClass("active",t===(0,i.default)(e).index())}),(0,i.default)(".case-item").each(function(t,a){(0,i.default)(a).toggleClass("active",t===(0,i.default)(e).index())})}),(0,i.default)(window).scroll((0,l.default)(function(){(0,i.default)(document).scrollTop()>=100&&(0,i.default)(".tech-intro-detail").trigger("demo")},300)),(0,i.default)(".tech-intro-detail").one("demo",function(){(0,i.default)(".original-card").addClass("scanning"),setTimeout(function(){(0,i.default)(".original-card").removeClass("scanning").addClass("scanned"),(0,i.default)(".scan-result").addClass("scanned")},3e3)});var e=!1,t=function(){(0,i.default)("#demo-json > p").empty(),(0,i.default)("#demo-photo-upload  > input").val(""),(0,i.default)("#demo-result .result-background").attr("class","result-background"),(0,i.default)("#demo-photo-upload, #scan-photo").removeClass("disabled"),e=!1},a=function(a,o,n){(0,i.default)("#demo-json > p").empty(),(0,i.default)("#demo-result .result-background").attr("class","result-background loading");var r={success:function(t){if((0,i.default)("#demo-photo-upload, #scan-photo").removeClass("disabled"),(0,i.default)("#demo-json > p").html(JSON.stringify(t,null,"\t")),(0,i.default)("#demo-result .result-background").removeClass("loading"),0!==t.errno)return(0,i.default)("#demo-result .result-background").toggleClass("has-result man female",!1).toggleClass("error-upload-fail",107===t.errno).toggleClass("error-timeout",28===t.errno).toggleClass("error-no-result",216631===t.errno||216630===t.errno).toggleClass("error-image-format",106===t.errno),e=!1,[106,107,28,216631,216630].indexOf(t.errno)===-1&&new f.default(t.msg),!1;var a=!t.data.result.bank_card_number;(0,i.default)("#demo-result .result-background").find(".bank-card-num").html(t.data.result.bank_card_number),(0,i.default)("#demo-result .result-background").toggleClass("has-result",!a).toggleClass("error-no-result",a),e=!1},fail:function(e){new f.default("接口发生错误："+e.status+" - "+e.statusText),t()}};"url"===a?r.imageUrl=n:"stream"===a&&(r.image=o),(0,d.scanBankCard)(r)};(0,i.default)("#demo-photo-upload  > input").change(function(o){if(""===(0,i.default)(this).val())return!1;if(e)return void new f.default("操作正在进行中，请稍候再试！");e=!0,(0,i.default)("#demo-photo-upload, #scan-photo").addClass("disabled");var n=(0,i.default)(this)[0].files[0];new u.default({selector:"#demo-origin",image:n,type:"stream",success:function(e){(0,i.default)("#demo-photo-upload  > input").val(""),a("stream",e)},fail:t})}),(0,i.default)("#demo-photo-url").change(function(){(0,i.default)(".demo-card-list > li").removeClass("active")}),(0,i.default)("#scan-photo").click(function(){if(e)return void new f.default("操作正在进行中，请稍候再试！");if((0,i.default)(this).hasClass("disabled")||!(0,i.default)("#demo-photo-url").val())return!1;e=!0,(0,i.default)("#demo-photo-upload, #scan-photo").addClass("disabled");var o=(0,i.default)("#demo-photo-url").val();new u.default({selector:"#demo-origin",image:o,type:"url",apiType:"bankcard",success:function(e){a("url",e,o)},fail:t})}),(0,i.default)("#demo-photo-upload").click(function(){if((0,i.default)(this).hasClass("disabled"))return!1});var o=(0,i.default)(".demo-card-list > li");o.each(function(e,t){(0,i.default)(t).find("img").attr("src",""+p[e])}),o.click(function(){if(e)return void new f.default("操作正在进行中，请稍候再试！");e=!0,(0,i.default)(".demo-card-list > li").removeClass("active"),(0,i.default)(this).addClass("active");var o=""+window.location.protocol+(0,i.default)(this).find("img").attr("src");(0,i.default)("#demo-photo-upload, #scan-photo").addClass("disabled"),new u.default({selector:"#demo-origin",image:o,type:"url",toCheck:!1,success:function(e){a("url",e,o)},fail:t})}),(0,i.default)(".demo-card-list > li")[0].click()})},6:function(e,t,a){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,a,o){return a&&e(t.prototype,a),o&&e(t,o),t}}(),r=a(0),l=o(r),s=a(2),u=a(1),d=o(u),c=a(9),f=a(8),p=a(10),m=function(){function e(t){var a=this,o=t.selector,i=t.image,r=t.type,s=t.apiType,u=t.toCheck,c=void 0===u||u,f=t.scale,p=void 0===f?1:f,m=t.success,g=t.fail;if(n(this,e),!(0,l.default)(o).context)throw"DemoCanvas：未寻找到容器!";if(this.container=(0,l.default)(o),this.type=r,this.scale=p,this.apiType=s,this.image=new Image,this.success=m||l.default.noop,this.fail=g||l.default.noop,this.image.onerror=function(){a.fail(),new d.default("图片加载失败，请重试")},c){var v={url:this.checkByUrl,stream:this.checkByStream}[this.type](i,s);v.then(function(e){a.image.onload=function(){a.render(!0)},a.image.src=e},function(e){a.image.onload=function(){a.render(!1)},a.image.src=e})}else this.image.onload=function(){a.render(!0)},this.image.src=i}return i(e,[{key:"checkByUrl",value:function(e,t){var a=l.default.Deferred();return(0,s.getHeader)({imageUrl:e,type:t,success:function(e){var t=e.data["Content-Type"],o=e.data["Content-Length"];return!t&&!o||0!==e.errno?void a.reject(c):/image\/(png|bmp|jpg|jpeg)/.test(t)?o>2097152?void a.reject(p):void a.resolve(e.data.image_data):void a.reject(f)},fail:function(){a.reject(c)}}),a.promise()}},{key:"checkByStream",value:function(e){var t=l.default.Deferred(),a=new FileReader;return e?(a.readAsDataURL(e),a.onload=function(a){return/image\/(png|bmp|jpeg)/.test(e.type)?e.size>2097152?(t.reject(p),!1):void t.resolve(a.target.result):(t.reject(f),!1)},a.onerror=function(){t.reject(c)},t.promise()):(t.reject(c),t.promise())}},{key:"render",value:function(e){var t=this.container.width(),a=this.container.height(),o=this.image.width,n=this.image.height,i=(0,l.default)("<canvas>您的浏览器暂时不支持canvas，请选用现代浏览器！</canvas>").attr("width",o).attr("height",n),r=i[0].getContext("2d");r.drawImage(this.image,0,0);var s=o/t,u=n/a,d=this.scale*(s>1||u>1?1/(s>=u?s:u):1);i.css({position:"relative",left:"50%",top:"50%","-webkit-transform":"translate(-50%, -50%) scale("+d+")","-moz-transform":"translate(-50%, -50%) scale("+d+")","-o-transform":"translate(-50%, -50%) scale("+d+")",transform:"translate(-50%, -50%) scale("+d+")"}),i.attr("data-scale",d),this.container.empty().append(i),e?this.success(this.image.src):this.fail()}}]),e}();t.default=m},8:function(e,t){e.exports="/ai_dist/1488185410/ai_images/error/image-format.png"},88:function(e,t){},9:function(e,t){e.exports="/ai_dist/1488185410/ai_images/error/not-found.png"}},[155]);