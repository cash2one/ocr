webpackJsonp([58],{0:function(e,t,n){e.exports=n(316)},20:function(e,t,n){var o,o;!function(t){e.exports=t()}(function(){return function e(t,n,i){function r(s,l){if(!n[s]){if(!t[s]){var c="function"==typeof o&&o;if(!l&&c)return o(s,!0);if(a)return a(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var d=n[s]={exports:{}};t[s][0].call(d.exports,function(e){var n=t[s][1][e];return r(n?n:e)},d,d.exports,e,t,n,i)}return n[s].exports}for(var a="function"==typeof o&&o,s=0;s<i.length;s++)r(i[s]);return r}({1:[function(e,t,n){"use strict";function o(e,t){var o;if("/"==e.charAt(0))o=n.resolveInclude(e.replace(/^\/*/,""),t.root||"/",!0);else{if(!t.filename)throw new Error("`include` use relative path requires the 'filename' option.");o=n.resolveInclude(e,t.filename)}return o}function i(e,t){var o,i=e.filename,r=arguments.length>1;if(e.cache){if(!i)throw new Error("cache option requires a filename");if(o=n.cache.get(i))return o;r||(t=u.readFileSync(i).toString().replace(_,""))}else if(!r){if(!i)throw new Error("Internal EJS error: no file name or template provided");t=u.readFileSync(i).toString().replace(_,"")}return o=n.compile(t,e),e.cache&&n.cache.set(i,o),o}function r(e,t){var n=f.shallowCopy({},t);return n.filename=o(e,n),i(n)}function a(e,t){var n,i,r=f.shallowCopy({},t);n=o(e,r),i=u.readFileSync(n).toString().replace(_,""),r.filename=n;var a=new c(i,r);return a.generateSource(),{source:a.source,filename:n,template:i}}function s(e,t,n,o){var i=t.split("\n"),r=Math.max(o-3,0),a=Math.min(i.length,o+3),s=f.escapeXML(n),l=i.slice(r,a).map(function(e,t){var n=t+r+1;return(n==o?" >> ":"    ")+n+"| "+e}).join("\n");throw e.path=s,e.message=(s||"ejs")+":"+o+"\n"+l+"\n\n"+e.message,e}function l(e){return e.replace(/;(\s*$)/,"$1")}function c(e,t){t=t||{};var o={};this.templateText=e,this.mode=null,this.truncate=!1,this.currentLine=1,this.source="",this.dependencies=[],o.client=t.client||!1,o.escapeFunction=t.escape||f.escapeXML,o.compileDebug=t.compileDebug!==!1,o.debug=!!t.debug,o.filename=t.filename,o.delimiter=t.delimiter||n.delimiter||m,o.strict=t.strict||!1,o.context=t.context,o.cache=t.cache||!1,o.rmWhitespace=t.rmWhitespace,o.root=t.root,o.localsName=t.localsName||n.localsName||v,o.strict?o._with=!1:o._with="undefined"==typeof t._with||t._with,this.opts=o,this.regex=this.createRegex()}var u=e("fs"),d=e("path"),f=e("./utils"),p=!1,h=e("../package.json").version,m="%",v="locals",g="ejs",y="(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)",b=["delimiter","scope","context","debug","compileDebug","client","_with","rmWhitespace","strict","filename"],_=/^\uFEFF/;n.cache=f.cache,n.localsName=v,n.resolveInclude=function(e,t,n){var o=d.dirname,i=d.extname,r=d.resolve,a=r(n?t:o(t),e),s=i(e);return s||(a+=".ejs"),a},n.compile=function(e,t){var n;return t&&t.scope&&(p||(console.warn("`scope` option is deprecated and will be removed in EJS 3"),p=!0),t.context||(t.context=t.scope),delete t.scope),n=new c(e,t),n.compile()},n.render=function(e,t,n){var o=t||{},r=n||{};return 2==arguments.length&&f.shallowCopyFromList(r,o,b),i(r,e)(o)},n.renderFile=function(){var e,t=Array.prototype.slice.call(arguments),n=t.shift(),o=t.pop(),r=t.shift()||{},a=t.pop()||{},s=b.slice();a=f.shallowCopy({},a),s.push("cache"),3==arguments.length&&(r.settings&&r.settings["view options"]?f.shallowCopyFromList(a,r.settings["view options"],s):f.shallowCopyFromList(a,r,s)),a.filename=n;try{e=i(a)(r)}catch(e){return o(e)}return o(null,e)},n.clearCache=function(){n.cache.reset()},c.modes={EVAL:"eval",ESCAPED:"escaped",RAW:"raw",COMMENT:"comment",LITERAL:"literal"},c.prototype={createRegex:function(){var e=y,t=f.escapeRegExpChars(this.opts.delimiter);return e=e.replace(/%/g,t),new RegExp(e)},compile:function(){var e,t,n=this.opts,o="",i="",a=n.escapeFunction;this.source||(this.generateSource(),o+="  var __output = [], __append = __output.push.bind(__output);\n",n._with!==!1&&(o+="  with ("+n.localsName+" || {}) {\n",i+="  }\n"),i+='  return __output.join("");\n',this.source=o+this.source+i),e=n.compileDebug?"var __line = 1\n  , __lines = "+JSON.stringify(this.templateText)+"\n  , __filename = "+(n.filename?JSON.stringify(n.filename):"undefined")+";\ntry {\n"+this.source+"} catch (e) {\n  rethrow(e, __lines, __filename, __line);\n}\n":this.source,n.debug&&console.log(e),n.client&&(e="escape = escape || "+a.toString()+";\n"+e,n.compileDebug&&(e="rethrow = rethrow || "+s.toString()+";\n"+e)),n.strict&&(e='"use strict";\n'+e);try{t=new Function(n.localsName+", escape, include, rethrow",e)}catch(e){throw e instanceof SyntaxError&&(n.filename&&(e.message+=" in "+n.filename),e.message+=" while compiling ejs\n\n",e.message+="If the above error is not helpful, you may want to try EJS-Lint:\n",e.message+="https://github.com/RyanZim/EJS-Lint"),e}if(n.client)return t.dependencies=this.dependencies,t;var l=function(e){var o=function(t,o){var i=f.shallowCopy({},e);return o&&(i=f.shallowCopy(i,o)),r(t,n)(i)};return t.apply(n.context,[e||{},a,o,s])};return l.dependencies=this.dependencies,l},generateSource:function(){var e=this.opts;e.rmWhitespace&&(this.templateText=this.templateText.replace(/\r/g,"").replace(/^\s+|\s+$/gm,"")),this.templateText=this.templateText.replace(/[ \t]*<%_/gm,"<%_").replace(/_%>[ \t]*/gm,"_%>");var t=this,o=this.parseTemplateText(),i=this.opts.delimiter;o&&o.length&&o.forEach(function(e,r){var s,l,c,u,d,p;if(0===e.indexOf("<"+i)&&0!==e.indexOf("<"+i+i)&&(l=o[r+2],l!=i+">"&&l!="-"+i+">"&&l!="_"+i+">"))throw new Error('Could not find matching close tag for "'+e+'".');return(c=e.match(/^\s*include\s+(\S+)/))&&(s=o[r-1],s&&(s=="<"+i||s=="<"+i+"-"||s=="<"+i+"_"))?(u=f.shallowCopy({},t.opts),d=a(c[1],u),p=t.opts.compileDebug?"    ; (function(){\n      var __line = 1\n      , __lines = "+JSON.stringify(d.template)+"\n      , __filename = "+JSON.stringify(d.filename)+";\n      try {\n"+d.source+"      } catch (e) {\n        rethrow(e, __lines, __filename, __line);\n      }\n    ; }).call(this)\n":"    ; (function(){\n"+d.source+"    ; }).call(this)\n",t.source+=p,void t.dependencies.push(n.resolveInclude(c[1],u.filename))):void t.scanLine(e)})},parseTemplateText:function(){for(var e,t=this.templateText,n=this.regex,o=n.exec(t),i=[];o;)e=o.index,0!==e&&(i.push(t.substring(0,e)),t=t.slice(e)),i.push(o[0]),t=t.slice(o[0].length),o=n.exec(t);return t&&i.push(t),i},scanLine:function(e){function t(){n.truncate?(e=e.replace(/^(?:\r\n|\r|\n)/,""),n.truncate=!1):n.opts.rmWhitespace&&(e=e.replace(/^\n/,"")),e&&(e=e.replace(/\\/g,"\\\\"),e=e.replace(/\n/g,"\\n"),e=e.replace(/\r/g,"\\r"),e=e.replace(/"/g,'\\"'),n.source+='    ; __append("'+e+'")\n')}var n=this,o=this.opts.delimiter,i=0;switch(i=e.split("\n").length-1,e){case"<"+o:case"<"+o+"_":this.mode=c.modes.EVAL;break;case"<"+o+"=":this.mode=c.modes.ESCAPED;break;case"<"+o+"-":this.mode=c.modes.RAW;break;case"<"+o+"#":this.mode=c.modes.COMMENT;break;case"<"+o+o:this.mode=c.modes.LITERAL,this.source+='    ; __append("'+e.replace("<"+o+o,"<"+o)+'")\n';break;case o+o+">":this.mode=c.modes.LITERAL,this.source+='    ; __append("'+e.replace(o+o+">",o+">")+'")\n';break;case o+">":case"-"+o+">":case"_"+o+">":this.mode==c.modes.LITERAL&&t(),this.mode=null,this.truncate=0===e.indexOf("-")||0===e.indexOf("_");break;default:if(this.mode){switch(this.mode){case c.modes.EVAL:case c.modes.ESCAPED:case c.modes.RAW:e.lastIndexOf("//")>e.lastIndexOf("\n")&&(e+="\n")}switch(this.mode){case c.modes.EVAL:this.source+="    ; "+e+"\n";break;case c.modes.ESCAPED:this.source+="    ; __append(escape("+l(e)+"))\n";break;case c.modes.RAW:this.source+="    ; __append("+l(e)+")\n";break;case c.modes.COMMENT:break;case c.modes.LITERAL:t()}}else t()}n.opts.compileDebug&&i&&(this.currentLine+=i,this.source+="    ; __line = "+this.currentLine+"\n")}},n.escapeXML=f.escapeXML,n.__express=n.renderFile,e.extensions&&(e.extensions[".ejs"]=function(e,t){var o=t||e.filename,i={filename:o,client:!0},r=u.readFileSync(o).toString(),a=n.compile(r,i);e._compile("module.exports = "+a.toString()+";",o)}),n.VERSION=h,n.name=g,"undefined"!=typeof window&&(window.ejs=n)},{"../package.json":6,"./utils":2,fs:3,path:4}],2:[function(e,t,n){"use strict";function o(e){return r[e]||e}var i=/[|\\{}()[\]^$+*?.]/g;n.escapeRegExpChars=function(e){return e?String(e).replace(i,"\\$&"):""};var r={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&#34;","'":"&#39;"},a=/[&<>\'"]/g,s='var _ENCODE_HTML_RULES = {\n      "&": "&amp;"\n    , "<": "&lt;"\n    , ">": "&gt;"\n    , \'"\': "&#34;"\n    , "\'": "&#39;"\n    }\n  , _MATCH_HTML = /[&<>\'"]/g;\nfunction encode_char(c) {\n  return _ENCODE_HTML_RULES[c] || c;\n};\n';n.escapeXML=function(e){return void 0==e?"":String(e).replace(a,o)},n.escapeXML.toString=function(){return Function.prototype.toString.call(this)+";\n"+s},n.shallowCopy=function(e,t){t=t||{};for(var n in t)e[n]=t[n];return e},n.shallowCopyFromList=function(e,t,n){return n.forEach(function(n){"undefined"!=typeof t[n]&&(e[n]=t[n])}),e},n.cache={_data:{},set:function(e,t){this._data[e]=t},get:function(e){return this._data[e]},reset:function(){this._data={}}}},{}],3:[function(e,t,n){},{}],4:[function(e,t,n){(function(e){function t(e,t){for(var n=0,o=e.length-1;o>=0;o--){var i=e[o];"."===i?e.splice(o,1):".."===i?(e.splice(o,1),n++):n&&(e.splice(o,1),n--)}if(t)for(;n--;n)e.unshift("..");return e}function o(e,t){if(e.filter)return e.filter(t);for(var n=[],o=0;o<e.length;o++)t(e[o],o,e)&&n.push(e[o]);return n}var i=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,r=function(e){return i.exec(e).slice(1)};n.resolve=function(){for(var n="",i=!1,r=arguments.length-1;r>=-1&&!i;r--){var a=r>=0?arguments[r]:e.cwd();if("string"!=typeof a)throw new TypeError("Arguments to path.resolve must be strings");a&&(n=a+"/"+n,i="/"===a.charAt(0))}return n=t(o(n.split("/"),function(e){return!!e}),!i).join("/"),(i?"/":"")+n||"."},n.normalize=function(e){var i=n.isAbsolute(e),r="/"===a(e,-1);return e=t(o(e.split("/"),function(e){return!!e}),!i).join("/"),e||i||(e="."),e&&r&&(e+="/"),(i?"/":"")+e},n.isAbsolute=function(e){return"/"===e.charAt(0)},n.join=function(){var e=Array.prototype.slice.call(arguments,0);return n.normalize(o(e,function(e,t){if("string"!=typeof e)throw new TypeError("Arguments to path.join must be strings");return e}).join("/"))},n.relative=function(e,t){function o(e){for(var t=0;t<e.length&&""===e[t];t++);for(var n=e.length-1;n>=0&&""===e[n];n--);return t>n?[]:e.slice(t,n-t+1)}e=n.resolve(e).substr(1),t=n.resolve(t).substr(1);for(var i=o(e.split("/")),r=o(t.split("/")),a=Math.min(i.length,r.length),s=a,l=0;l<a;l++)if(i[l]!==r[l]){s=l;break}for(var c=[],l=s;l<i.length;l++)c.push("..");return c=c.concat(r.slice(s)),c.join("/")},n.sep="/",n.delimiter=":",n.dirname=function(e){var t=r(e),n=t[0],o=t[1];return n||o?(o&&(o=o.substr(0,o.length-1)),n+o):"."},n.basename=function(e,t){var n=r(e)[2];return t&&n.substr(-1*t.length)===t&&(n=n.substr(0,n.length-t.length)),n},n.extname=function(e){return r(e)[3]};var a="b"==="ab".substr(-1)?function(e,t,n){return e.substr(t,n)}:function(e,t,n){return t<0&&(t=e.length+t),e.substr(t,n)}}).call(this,e("_process"))},{_process:5}],5:[function(e,t,n){function o(){throw new Error("setTimeout has not been defined")}function i(){throw new Error("clearTimeout has not been defined")}function r(e){if(d===setTimeout)return setTimeout(e,0);if((d===o||!d)&&setTimeout)return d=setTimeout,setTimeout(e,0);try{return d(e,0)}catch(t){try{return d.call(null,e,0)}catch(t){return d.call(this,e,0)}}}function a(e){if(f===clearTimeout)return clearTimeout(e);if((f===i||!f)&&clearTimeout)return f=clearTimeout,clearTimeout(e);try{return f(e)}catch(t){try{return f.call(null,e)}catch(t){return f.call(this,e)}}}function s(){v&&h&&(v=!1,h.length?m=h.concat(m):g=-1,m.length&&l())}function l(){if(!v){var e=r(s);v=!0;for(var t=m.length;t;){for(h=m,m=[];++g<t;)h&&h[g].run();g=-1,t=m.length}h=null,v=!1,a(e)}}function c(e,t){this.fun=e,this.array=t}function u(){}var d,f,p=t.exports={};!function(){try{d="function"==typeof setTimeout?setTimeout:o}catch(e){d=o}try{f="function"==typeof clearTimeout?clearTimeout:i}catch(e){f=i}}();var h,m=[],v=!1,g=-1;p.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];m.push(new c(e,t)),1!==m.length||v||r(l)},c.prototype.run=function(){this.fun.apply(null,this.array)},p.title="browser",p.browser=!0,p.env={},p.argv=[],p.version="",p.versions={},p.on=u,p.addListener=u,p.once=u,p.off=u,p.removeListener=u,p.removeAllListeners=u,p.emit=u,p.binding=function(e){throw new Error("process.binding is not supported")},p.cwd=function(){return"/"},p.chdir=function(e){throw new Error("process.chdir is not supported")},p.umask=function(){return 0}},{}],6:[function(e,t,n){t.exports={name:"ejs",description:"Embedded JavaScript templates",keywords:["template","engine","ejs"],version:"2.5.4",author:"Matthew Eernisse <mde@fleegix.org> (http://fleegix.org)",contributors:["Timothy Gu <timothygu99@gmail.com> (https://timothygu.github.io)"],license:"Apache-2.0",main:"./lib/ejs.js",repository:{type:"git",url:"git://github.com/mde/ejs.git"},bugs:"https://github.com/mde/ejs/issues",homepage:"https://github.com/mde/ejs",dependencies:{},devDependencies:{browserify:"^13.0.1",eslint:"^3.0.0","git-directory-deploy":"^1.5.1",istanbul:"~0.4.3",jake:"^8.0.0",jsdoc:"^3.4.0","lru-cache":"^4.0.1",mocha:"^3.0.2","uglify-js":"^2.6.2"},engines:{node:">=0.10.0"},scripts:{test:"mocha",lint:'eslint "**/*.js" Jakefile',coverage:"istanbul cover node_modules/mocha/bin/_mocha",doc:"jake doc",devdoc:"jake doc[dev]"}}},{}]},{},[1])(1)})},24:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=n(25),s=n(20),l=o(s),c=n(18),u=o(c),d=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"body",n=arguments[1],o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";i(this,e),this.container=t,this.id=n||"modal-"+(new Date).getTime(),this.title=o,this.isOpen=!1}return r(e,[{key:"init",value:function(){var e=l.default.render(a.MODAL_TMPL,{id:this.id,title:this.title});(0,u.default)(this.container).append(e),this.bindEvent()}},{key:"setContent",value:function(e){this.getModal().find(".modal-content").html(e)}},{key:"show",value:function(){this.isOpen=!0,this.getModal().show(),(0,u.default)("body").addClass("modal-show")}},{key:"hide",value:function(){this.isOpen=!1,this.getModal().hide(),(0,u.default)("body").removeClass("modal-show")}},{key:"destroy",value:function(){this.hide(),this.getModal().remove()}},{key:"getModal",value:function(){return(0,u.default)("#"+this.id)}},{key:"bindEvent",value:function(){function e(){(0,u.default)(".ai-modal").trigger("close")}var t=this;this.getModal().on("click",".modal-x",function(){t.hide()}),this.getModal().on("click",function(e){e.stopPropagation()}),this.getModal().on("close",function(){t.isOpen&&t.hide()}),(0,u.default)("body").off("close",e).on("click",e)}}]),e}();t.default=d},25:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.MODAL_TMPL=['<div class="ai-modal" id="<%= id %>">','<header class="modal-header">',"<h3><%= title %></h3>",'<a class="modal-x"></a>',"</header>",'<section class="modal-content">',"</section>","</div>"].join(""),t.ALERT_MODAL_TMPL=['<div class="ai-modal alert" id="<%= id %>">','<header class="modal-header">',"<h3><%= title %></h3>",'<a class="modal-x"></a>',"</header>",'<section class="modal-content">','<div style="text-align: center; color: #666;font-size: 14px;margin-bottom: 20px;"><%=content%></div>','<div style="text-align: center;">','<button type="button" class="btn-normal cancel">确定</button>',"</div>","</section>","</div>"].join(""),t.CONFIRM_MODAL_TMPL=['<div class="ai-modal alert" id="<%= id %>">','<header class="modal-header">',"<h3><%= title %></h3>",'<a class="modal-x"></a>',"</header>",'<section class="modal-content">','<div style="text-align: center; color: #666;font-size: 14px;margin-bottom: 20px;"><%=content%></div>','<div style="text-align: center;">','<button type="button" class="btn-primary submit">确定</button>','<button type="button" class="btn-normal cancel" style="margin-left: 15px;">取消</button>',"</div>","</section>","</div>"].join("")},127:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function i(e){var t=e.image,n=void 0===t?null:t,o=e.imageUrl,i=void 0===o?null:o,r=e.success,a=void 0===r?h.default.noop:r,s=e.fail,l=void 0===s?h.default.noop:s;h.default.post("/aidemo",{type:"idcard",image:n,image_url:i}).success(a).fail(l)}function r(e){var t=e.image,n=void 0===t?null:t,o=e.imageUrl,i=void 0===o?null:o,r=e.success,a=void 0===r?h.default.noop:r,s=e.fail,l=void 0===s?h.default.noop:s;h.default.post("/aidemo",{type:"bankcard",image:n,image_url:i}).success(a).fail(l)}function a(e){var t=e.image,n=void 0===t?null:t,o=e.imageUrl,i=void 0===o?null:o,r=e.success,a=void 0===r?h.default.noop:r,s=e.fail,l=void 0===s?h.default.noop:s;h.default.post("/aidemo",{type:"commontext",image:n,image_url:i}).success(a).fail(l)}function s(e){var t=e.image,n=void 0===t?null:t,o=e.imageUrl,i=void 0===o?null:o,r=e.success,a=void 0===r?h.default.noop:r,s=e.fail,l=void 0===s?h.default.noop:s;h.default.post("/aidemo",{type:"face",image:n,image_url:i}).success(a).fail(l)}function l(e){var t=e.image,n=void 0===t?null:t,o=e.imageUrl,i=void 0===o?null:o,r=e.success,a=void 0===r?h.default.noop:r,s=e.fail,l=void 0===s?h.default.noop:s;h.default.post("/aidemo",{type:"pornography",image:n,image_url:i}).success(a).fail(l)}function c(e){var t=e.imageUrl,n=void 0===t?null:t,o=e.type,i=e.success,r=void 0===i?h.default.noop:i,a=e.fail,s=void 0===a?h.default.noop:a;h.default.post("/aidemo",{action:"getHeader",type:o,image_url:n}).success(r).fail(s)}function u(e){var t=e.words,n=void 0===t?null:t,o=e.success,i=void 0===o?h.default.noop:o,r=e.fail,a=void 0===r?h.default.noop:r;h.default.post("/aidemo",{type:"wakescore",kw:n}).success(i).fail(a)}function d(e){var t=e.words,n=void 0===t?null:t,o=e.success,i=void 0===o?h.default.noop:o;window.open("/aidemo?type=wakedownload&kw="+n,"_blank"),i()}function f(e){var t=e.data,n=void 0===t?{}:t,o=e.success,i=void 0===o?h.default.noop:o,r=e.fail,a=void 0===r?h.default.noop:r;h.default.post("/aidemo",{type:"tts",speed:n.speed,vol:n.vol,person:n.person,text:n.text}).success(i).fail(a)}Object.defineProperty(t,"__esModule",{value:!0}),t.scanIDCard=i,t.scanBankCard=r,t.scanGeneralText=a,t.scanFace=s,t.scanPornography=l,t.getHeader=c,t.evaluateWakeWords=u,t.exportWakeWords=d,t.synthesizeSpeech=f;var p=n(18),h=o(p)},128:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=function e(t,n,o){null===t&&(t=Function.prototype);var i=Object.getOwnPropertyDescriptor(t,n);if(void 0===i){var r=Object.getPrototypeOf(t);return null===r?void 0:e(r,n,o)}if("value"in i)return i.value;var a=i.get;if(void 0!==a)return a.call(o)},c=n(20),u=o(c),d=n(18),f=o(d),p=n(24),h=o(p),m=n(25),v=function(e){function t(e){i(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return n.title="提示",n.content=e||"",n.init(),n}return a(t,e),s(t,[{key:"init",value:function(){var e=u.default.render(m.ALERT_MODAL_TMPL,{id:this.id,title:this.title,content:this.content});(0,f.default)(this.container).append(e),this.bindEvent(),l(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"show",this).call(this)}},{key:"hide",value:function(){this.getModal().hide().remove(),(0,f.default)("body").removeClass("modal-show")}},{key:"bindEvent",value:function(){var e=this;l(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"bindEvent",this).call(this);var n=this.getModal();n.on("click","button.cancel",function(t){t.preventDefault(),e.hide()})}}]),t}(h.default);t.default=v},316:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r=n(20),a=o(r),s=n(18),l=o(s),c=n(127),u=n(128),d=o(u),f=n(317),p=o(f);(0,l.default)(document).ready(function(){(0,l.default)(".case-indicator > li").click(function(){var e=this;(0,l.default)(".case-indicator > li").each(function(t,n){(0,l.default)(n).toggleClass("active",t===(0,l.default)(e).index())}),(0,l.default)(".case-item").each(function(t,n){(0,l.default)(n).toggleClass("active",t===(0,l.default)(e).index())})}),(0,l.default)(".rule-toggle").click(function(){var e=(0,l.default)(".demo-rule").hasClass("collapsed");(0,l.default)(".demo-rule").toggleClass("collapsed",!e),(0,l.default)(this).html(e?"收起内容":"展开内容")});var e=function(e,t){var n={star:0,desc:"",length:0,zl:0},o=0,i="得分低于60, 不可用作唤醒词",r="",a=["拍照","茄子","增大音量","减小音量","播放","停止","暂停","上一首","下一首","打开电灯","关闭电灯","增大亮度","减小亮度","打开手电筒","关闭手电筒"];if(l.default.inArray(e,a)>=0)n.zl=1,o=5;else if(/\d+/.test(e))o=1;else{for(var s=!1,c=0,u=0,d=0;d<e.length;d++)null!==e.charAt(d).match(/^[a-zA-Z]$/)&&c++,null===e.charAt(d).match(/^[\u4e00-\u9fa5a-zA-Z]$/)&&u++;c>2&&(s=!0,o=1,r="一个唤醒词最多只能包含两个英文字母，且唤醒词中暂时不支持英文单词，请更换别的唤醒词。"),u>0&&(s=!0,o=1,r="唤醒词不可包含汉字和英文字母以外的字符，请使用相应的汉字作为唤醒词，如非常6+7，建议您使用“非常六加七”"),s===!1&&(4===e.length?t<500?o=5:t>=500&&t<1e3?o=4:t>=1e3<1500&&(o=3):3!==e.length&&5!==e.length||(o=t<500?3:t>=500&&t<1e3?2:1))}switch(o){case 5:i="非常适用于作为唤醒词。";break;case 4:i="可以用作唤醒词，唤醒词只允许3-5个字, 并且推荐4个字。";break;case 3:i="不建议用作唤醒词，唤醒词只允许3-5个字, 并且推荐4个字。";break;default:i="不可用作唤醒词，唤醒词只允许3-5个字, 并且推荐4个字。"}return""!==r&&(i=r),n.star=o,n.desc=i,n.length=e.length,n},t=0,n=['<li data-star="<%=score.star%>">','<div class="word"><%=word%></div>','<div class="clear-float">','<div class="word-score">',"<% for (var i = 1; i <= 5; i++) { %>","<div class=\"<%=score.star >= i ? 'star' : 'no-star'%>\"></div>","<%}%>","</div>",'<div class="word-desc"><%=score.desc%></div>',"</div>","</li>"].join(""),o=function(e,t){(0,l.default)("#evaluated-words").append(a.default.render(n,{word:e,score:t}))};(0,l.default)("#evaluate").click(function(){var n=(0,l.default)("#demo-wake-word").val();return!!n&&void(0,c.evaluateWakeWords)({words:n,success:function(n){if(1===n.errno)return new d.default("访问接口出错，请登陆百度账号后再尝试该项服务！"),!1;if(0!==n.errno)return new d.default("访问接口出错，请稍候再试！"),!1;(0,l.default)("#demo-wake-word").val(""),(0,l.default)(".evaluated-result").show(),t=n.data.sCount;for(var i in n.data.sData){var r=e(i,n.data.sData[i]);o(i,r)}}})}),(0,l.default)("#evaluated-words").on("click","li",function(){var e=(0,l.default)(this).attr("data-star");return e<=3?(new d.default("你好，只能导出三星以上唤醒词！"),!1):void(0,l.default)(this).toggleClass("checked")}),(0,l.default)("#export-evaluated-words").click(function(e){e.stopPropagation();var n=(0,l.default)("#evaluated-words").find("li.checked");if(n.length>10)return new d.default("对不起，您只能选择10个以内的唤醒词！"),!1;if(0===n.length)return new d.default("对不起，您未选择任何唤醒词！"),!1;var o=function(){var e=["拍照","茄子","增大音量","减小音量","播放","停止","暂停","上一首","下一首","打开电灯","关闭电灯","增大亮度","减小亮度","打开手电筒","关闭手电筒"],o=0,i=0,r=[];return n.each(function(t,n){var a=(0,l.default)(n).find(".word").html();r.push(a),o+=2===a.length?1:0,i+=e.indexOf(a)===-1?1:0}),o>3?(new d.default("对不起，您最多可以设置3个两字指令唤醒词!"),{v:!1}):i>3?(new d.default("对不起，您最多可以设置3个自定义唤醒词!"),{v:!1}):t>=3?(new d.default("对不起，您本月已导出3次唤醒词，无法再使用该服务!"),{v:!1}):(r=r.join(","),void new p.default("确认导出","您好，您本次选择提的交唤醒词是["+r+" ]，您本月还有"+(3-t)+"次提交机会，请确认提交！",function(){(0,c.exportWakeWords)({words:r}),(0,l.default)(".evaluated-result").hide(),(0,l.default)("#evaluated-words").empty()}))}();return"object"===("undefined"==typeof o?"undefined":i(o))?o.v:void 0})})},317:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=function e(t,n,o){null===t&&(t=Function.prototype);var i=Object.getOwnPropertyDescriptor(t,n);if(void 0===i){var r=Object.getPrototypeOf(t);return null===r?void 0:e(r,n,o)}if("value"in i)return i.value;var a=i.get;if(void 0!==a)return a.call(o)},c=n(20),u=o(c),d=n(18),f=o(d),p=n(24),h=o(p),m=n(25),v=function(e){function t(e,n){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:f.default.noop;i(this,t);var a=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return a.title=e||"确认信息",a.content=n||"",a.confirm=o,a.init(),a}return a(t,e),s(t,[{key:"init",value:function(){var e=u.default.render(m.CONFIRM_MODAL_TMPL,{id:this.id,title:this.title,content:this.content});(0,f.default)(this.container).append(e),this.bindEvent(),l(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"show",this).call(this)}},{key:"hide",value:function(){this.getModal().hide().remove(),(0,f.default)("body").removeClass("modal-show")}},{key:"bindEvent",value:function(){var e=this;l(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"bindEvent",this).call(this);var n=this.getModal();n.on("click","button.cancel",function(t){t.preventDefault(),e.hide()}),n.on("click","button.submit",function(t){t.preventDefault(),e.confirm(),e.hide()})}}]),t}(h.default);t.default=v}});