duAI([8],{15:function(e,t,a){"use strict";function o(e){var t=e.image,a=void 0===t?null:t,o=e.imageUrl,n=void 0===o?null:o,i=e.success,r=void 0===i?m.default.noop:i,s=e.fail,l=void 0===s?m.default.noop:s;m.default.post("/aidemo",{type:"idcard",image:a,image_url:n}).success(r).fail(l)}function n(e){var t=e.image,a=void 0===t?null:t,o=e.imageUrl,n=void 0===o?null:o,i=e.success,r=void 0===i?m.default.noop:i,s=e.fail,l=void 0===s?m.default.noop:s;m.default.post("/aidemo",{type:"bankcard",image:a,image_url:n}).success(r).fail(l)}function i(e){var t=e.image,a=void 0===t?null:t,o=e.imageUrl,n=void 0===o?null:o,i=e.success,r=void 0===i?m.default.noop:i,s=e.fail,l=void 0===s?m.default.noop:s;m.default.post("/aidemo",{type:"commontext",image:a,image_url:n}).success(r).fail(l)}function r(e){var t=e.image,a=void 0===t?null:t,o=e.imageUrl,n=void 0===o?null:o,i=e.success,r=void 0===i?m.default.noop:i,s=e.fail,l=void 0===s?m.default.noop:s;m.default.post("/aidemo",{type:"face",image:a,image_url:n}).success(r).fail(l)}function s(e){var t=e.image,a=void 0===t?null:t,o=e.imageUrl,n=void 0===o?null:o,i=e.success,r=void 0===i?m.default.noop:i,s=e.fail,l=void 0===s?m.default.noop:s;m.default.post("/aidemo",{type:"pornography",image:a,image_url:n}).success(r).fail(l)}function l(e){var t=e.image,a=void 0===t?null:t,o=e.imageUrl,n=void 0===o?null:o,i=e.success,r=void 0===i?m.default.noop:i,s=e.fail,l=void 0===s?m.default.noop:s;m.default.post("/aidemo",{type:"terror",image:a,image_url:n}).success(r).fail(l)}function c(e){var t=e.imageUrl,a=void 0===t?null:t,o=e.type,n=e.success,i=void 0===n?m.default.noop:n,r=e.fail,s=void 0===r?m.default.noop:r;m.default.post("/aidemo",{action:"getHeader",type:o,image_url:a}).success(i).fail(s)}function u(e){var t=e.words,a=void 0===t?null:t,o=e.success,n=void 0===o?m.default.noop:o,i=e.fail,r=void 0===i?m.default.noop:i;m.default.post("/aidemo",{type:"wakescore",kw:a}).success(n).fail(r)}function d(e){var t=e.words,a=void 0===t?null:t,o=e.success,n=void 0===o?m.default.noop:o;window.open("/aidemo?type=wakedownload&kw="+a,"_blank"),n()}function f(e){var t=e.data,a=void 0===t?{}:t,o=e.success,n=void 0===o?m.default.noop:o,i=e.fail,r=void 0===i?m.default.noop:i;m.default.post("/aidemo",{type:"tts",speed:a.speed,vol:a.vol,person:a.person,text:a.text}).success(n).fail(r)}Object.defineProperty(t,"__esModule",{value:!0}),t.scanIDCard=o,t.scanBankCard=n,t.scanGeneralText=i,t.scanFace=r,t.scanPornography=s,t.scanTerrorgraphy=l,t.getHeader=c,t.evaluateWakeWords=u,t.exportWakeWords=d,t.synthesizeSpeech=f;var p=a(2),m=function(e){return e&&e.__esModule?e:{default:e}}(p)},19:function(e,t,a){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,a,o){return a&&e(t.prototype,a),o&&e(t,o),t}}(),l=function e(t,a,o){null===t&&(t=Function.prototype);var n=Object.getOwnPropertyDescriptor(t,a);if(void 0===n){var i=Object.getPrototypeOf(t);return null===i?void 0:e(i,a,o)}if("value"in n)return n.value;var r=n.get;if(void 0!==r)return r.call(o)},c=a(2),u=o(c),d=a(44),f=o(d),p=a(31),m=o(p),g=function(e){function t(e){n(this,t);var a=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return a.title="提示",a.content=e||"",a.init(),a}return r(t,e),s(t,[{key:"init",value:function(){var e=(0,m.default)({id:this.id,title:this.title,content:this.content});(0,u.default)(this.container).append(e),this.bindEvent(),l(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"show",this).call(this)}},{key:"hide",value:function(){this.getModal().hide().remove(),(0,u.default)("body").removeClass("modal-show")}},{key:"bindEvent",value:function(){var e=this;l(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"bindEvent",this).call(this),this.getModal().on("click","button.cancel",function(t){t.preventDefault(),e.hide()})}}]),t}(f.default);t.default=g},24:function(e,t){e.exports="//ai.bdstatic.com/dist/1494475882/ai_images/error/image-format.png"},25:function(e,t){e.exports="//ai.bdstatic.com/dist/1494475882/ai_images/error/too-large.png"},31:function(e,t,a){var o=a(20);e.exports=(o.default||o).template({compiler:[7,">= 4.0.0"],main:function(e,t,a,o,n){var i,r,s=null!=t?t:e.nullContext||{},l=a.helperMissing,c=e.escapeExpression;return'<div class="ai-modal alert" id="'+c((r=null!=(r=a.id||(null!=t?t.id:t))?r:l,"function"==typeof r?r.call(s,{name:"id",hash:{},data:n}):r))+'">\r\n    <header class="modal-header">\r\n        <h3>'+c((r=null!=(r=a.title||(null!=t?t.title:t))?r:l,"function"==typeof r?r.call(s,{name:"title",hash:{},data:n}):r))+'</h3>\r\n        <a class="modal-x"></a>\r\n    </header>\r\n    <section class="modal-content">\r\n        <div style="text-align: center; color: #666;font-size: 14px;margin-bottom: 20px;">\r\n            '+(null!=(r=null!=(r=a.content||(null!=t?t.content:t))?r:l,i="function"==typeof r?r.call(s,{name:"content",hash:{},data:n}):r)?i:"")+'\r\n        </div>\r\n        <div style="text-align: center;">\r\n            <button type="button" class="btn-normal cancel">确定</button>\r\n        </div>\r\n    </section>\r\n</div>\r\n'},useData:!0})},320:function(e,t,a){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var n=a(2),i=o(n),r=a(30),s=o(r),l=a(45),c=o(l),u=a(15),d=a(19),f=o(d);a(623),a(585);var p=(0,i.default)(".tech-function-detail"),m=(0,i.default)("#demo-result .canvas-container"),g=(0,i.default)(".demo-json-data"),v=(0,i.default)(".photo-upload-input"),h=(0,i.default)(".card-list-item"),y=(0,i.default)("#scan-photo"),b=(0,i.default)("#demo-photo-url"),_=[a(606),a(607),a(608),a(609),a(610),a(611),a(612),a(613)];(0,i.default)(window).scroll((0,s.default)(function(){(0,i.default)(document).scrollTop()>=100&&p.trigger("demo")},300)),p.one("demo",function(){p.find(">.scan-box").addClass("scanned")});var w=!1,j=function(){w=!1,g.empty(),v.val(""),m.attr("class","canvas-container"),y.removeClass("disabled")},x=function(e,t,a){g.empty(),m.attr("class","canvas-container loading"),(0,i.default)("#face-details").hide().empty();var o={success:function(e){if(y.removeClass("disabled"),g.html(JSON.stringify(e,null,"\t")),m.removeClass("loading"),0!==e.errno)return m.toggleClass("error-upload-fail",107===e.errno).toggleClass("error-timeout",28===e.errno).toggleClass("error-image-format",106===e.errno),m.empty(),m.toggleClass("error-no-result",!e.data),w=!1,-1===[106,107,28,0].indexOf(e.errno)&&new f.default(e.msg),!1;m.toggleClass("has-result","success"===e.msg);var t=e.data.result.toFixed(4);m.toggleClass("normal",t<.5).toggleClass("terror",t>=.5),t<=.5&&(t=1-t),m.attr("data-probability",100*t),w=!1},fail:function(e){new f.default("接口发生错误："+e.status+" - "+e.statusText),j()}};"url"===e?o.imageUrl=a:"stream"===e&&(o.image=t),(0,u.scanTerrorgraphy)(o)};v.change(function(e){if(""===(0,i.default)(this).val())return!1;if(w)return void new f.default("操作正在进行中，请稍候再试！");w=!0,y.addClass("disabled");var t=(0,i.default)(this)[0].files[0];new c.default({selector:"#demo-result .canvas-container",image:t,type:"stream",lazyRender:!0,success:function(e){v.val(""),x("stream",e)},fail:j})}),b.change(function(){h.removeClass("active")}),y.click(function(){if(w)return void new f.default("操作正在进行中，请稍候再试！");if((0,i.default)(this).hasClass("disabled")||!b.val())return!1;w=!0,y.addClass("disabled");var e=b.val();new c.default({selector:"#demo-result .canvas-container",image:e,type:"url",apiType:"terror",success:function(t){x("url",t,e)},fail:j})}),(0,i.default)("#demo-photo-upload").click(function(){if((0,i.default)(this).hasClass("disabled"))return!1}),h.each(function(e,t){(0,i.default)(t).find("img").attr("src",""+_[e])}),h.click(function(){if(w)return void new f.default("操作正在进行中，请稍候再试！");w=!0,h.removeClass("active"),(0,i.default)(this).addClass("active");var e=""+window.location.protocol+(0,i.default)(this).find("img").attr("src");y.addClass("disabled"),new c.default({selector:"#demo-result .canvas-container",image:e,type:"url",toCheck:!1,success:function(t){x("url",t,e)},fail:j})}),h[0].click()},45:function(e,t,a){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,a,o){return a&&e(t.prototype,a),o&&e(t,o),t}}(),r=a(2),s=o(r),l=a(15),c=a(19),u=o(c),d=a(49),f=a(24),p=a(25),m=function(){function e(t){var a=this,o=t.selector,i=t.image,r=t.type,l=t.apiType,c=t.toCheck,d=void 0===c||c,f=t.scale,p=void 0===f?1:f,m=t.success,g=t.fail;if(n(this,e),!(0,s.default)(o).context)throw"DemoCanvas：未寻找到容器!";if(this.container=(0,s.default)(o),this.type=r,this.scale=p,this.apiType=l,this.image=new Image,this.success=m||s.default.noop,this.fail=g||s.default.noop,this.image.onerror=function(){a.fail(),new u.default("图片加载失败，请重试")},d){({url:this.checkByUrl,stream:this.checkByStream})[this.type](i,l).then(function(e){a.image.onload=function(){a.render(!0)},a.image.src=e},function(e){a.image.onload=function(){a.render(!1)},a.image.src=e})}else this.image.onload=function(){a.render(!0)},this.image.src=i}return i(e,[{key:"checkByUrl",value:function(e,t){var a=s.default.Deferred();return(0,l.getHeader)({imageUrl:e,type:t,success:function(e){var t=e.data["Content-Type"],o=e.data["Content-Length"];return!t&&!o||0!==e.errno?void a.reject(d):/image\/(png|bmp|jpg|jpeg)/.test(t)?o>2097152?void a.reject(p):void a.resolve(e.data.image_data):void a.reject(f)},fail:function(){a.reject(d)}}),a.promise()}},{key:"checkByStream",value:function(e){var t=s.default.Deferred(),a=new FileReader;return e?(a.readAsDataURL(e),a.onload=function(a){return/image\/(png|bmp|jpeg)/.test(e.type)?e.size>2097152?(t.reject(p),!1):void t.resolve(a.target.result):(t.reject(f),!1)},a.onerror=function(){t.reject(d)},t.promise()):(t.reject(d),t.promise())}},{key:"render",value:function(e){var t=this.container.width(),a=this.container.height(),o=this.image.width,n=this.image.height,i=(0,s.default)("<canvas>您的浏览器暂时不支持canvas，请选用现代浏览器！</canvas>").attr("width",o).attr("height",n);i[0].getContext("2d").drawImage(this.image,0,0);var r=o/t,l=n/a,c=this.scale*(r>1||l>1?1/(r>=l?r:l):1);i.css({position:"relative",left:"50%",top:"50%","-webkit-transform":"translate(-50%, -50%) scale("+c+")","-moz-transform":"translate(-50%, -50%) scale("+c+")","-o-transform":"translate(-50%, -50%) scale("+c+")",transform:"translate(-50%, -50%) scale("+c+")"}),i.attr("data-scale",c),this.container.empty().append(i),e?this.success(this.image.src):this.fail()}}]),e}();t.default=m},49:function(e,t){e.exports="//ai.bdstatic.com/dist/1494475882/ai_images/error/not-found.png"},585:function(e,t){},606:function(e,t){e.exports="//ai.bdstatic.com/dist/1494475882/ai_images/technology/antiterror/demo-card-1.jpg"},607:function(e,t){e.exports="//ai.bdstatic.com/dist/1494475882/ai_images/technology/antiterror/demo-card-2.jpg"},608:function(e,t){e.exports="//ai.bdstatic.com/dist/1494475882/ai_images/technology/antiterror/demo-card-3.jpg"},609:function(e,t){e.exports="//ai.bdstatic.com/dist/1494475882/ai_images/technology/antiterror/demo-card-4.jpg"},610:function(e,t){e.exports="//ai.bdstatic.com/dist/1494475882/ai_images/technology/antiterror/demo-card-5.jpg"},611:function(e,t){e.exports="//ai.bdstatic.com/dist/1494475882/ai_images/technology/antiterror/demo-card-6.jpg"},612:function(e,t){e.exports="//ai.bdstatic.com/dist/1494475882/ai_images/technology/antiterror/demo-card-7.jpg"},613:function(e,t){e.exports="//ai.bdstatic.com/dist/1494475882/ai_images/technology/antiterror/demo-card-8.jpg"},623:function(e,t,a){e.exports=a.p+"./../../template/cloud/antiterror.html"},741:function(e,t,a){e.exports=a(320)}},[741]);