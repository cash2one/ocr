duAI([6],{0:function(e,t,n){e.exports=n(39)},2:function(e,t,n){var o,o;!function(t){e.exports=t()}(function(){return function e(t,n,i){function a(s,c){if(!n[s]){if(!t[s]){var l="function"==typeof o&&o;if(!c&&l)return o(s,!0);if(r)return r(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var d=n[s]={exports:{}};t[s][0].call(d.exports,function(e){var n=t[s][1][e];return a(n?n:e)},d,d.exports,e,t,n,i)}return n[s].exports}for(var r="function"==typeof o&&o,s=0;s<i.length;s++)a(i[s]);return a}({1:[function(e,t,n){"use strict";function o(e,t){var o;if("/"==e.charAt(0))o=n.resolveInclude(e.replace(/^\/*/,""),t.root||"/",!0);else{if(!t.filename)throw new Error("`include` use relative path requires the 'filename' option.");o=n.resolveInclude(e,t.filename)}return o}function i(e,t){var o,i=e.filename,a=arguments.length>1;if(e.cache){if(!i)throw new Error("cache option requires a filename");if(o=n.cache.get(i))return o;a||(t=u.readFileSync(i).toString().replace(b,""))}else if(!a){if(!i)throw new Error("Internal EJS error: no file name or template provided");t=u.readFileSync(i).toString().replace(b,"")}return o=n.compile(t,e),e.cache&&n.cache.set(i,o),o}function a(e,t){var n=f.shallowCopy({},t);return n.filename=o(e,n),i(n)}function r(e,t){var n,i,a=f.shallowCopy({},t);n=o(e,a),i=u.readFileSync(n).toString().replace(b,""),a.filename=n;var r=new l(i,a);return r.generateSource(),{source:r.source,filename:n,template:i}}function s(e,t,n,o){var i=t.split("\n"),a=Math.max(o-3,0),r=Math.min(i.length,o+3),s=f.escapeXML(n),c=i.slice(a,r).map(function(e,t){var n=t+a+1;return(n==o?" >> ":"    ")+n+"| "+e}).join("\n");throw e.path=s,e.message=(s||"ejs")+":"+o+"\n"+c+"\n\n"+e.message,e}function c(e){return e.replace(/;(\s*$)/,"$1")}function l(e,t){t=t||{};var o={};this.templateText=e,this.mode=null,this.truncate=!1,this.currentLine=1,this.source="",this.dependencies=[],o.client=t.client||!1,o.escapeFunction=t.escape||f.escapeXML,o.compileDebug=t.compileDebug!==!1,o.debug=!!t.debug,o.filename=t.filename,o.delimiter=t.delimiter||n.delimiter||m,o.strict=t.strict||!1,o.context=t.context,o.cache=t.cache||!1,o.rmWhitespace=t.rmWhitespace,o.root=t.root,o.localsName=t.localsName||n.localsName||g,o.strict?o._with=!1:o._with="undefined"==typeof t._with||t._with,this.opts=o,this.regex=this.createRegex()}var u=e("fs"),d=e("path"),f=e("./utils"),p=!1,h=e("../package.json").version,m="%",g="locals",v="ejs",y="(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)",_=["delimiter","scope","context","debug","compileDebug","client","_with","rmWhitespace","strict","filename"],b=/^\uFEFF/;n.cache=f.cache,n.localsName=g,n.resolveInclude=function(e,t,n){var o=d.dirname,i=d.extname,a=d.resolve,r=a(n?t:o(t),e),s=i(e);return s||(r+=".ejs"),r},n.compile=function(e,t){var n;return t&&t.scope&&(p||(console.warn("`scope` option is deprecated and will be removed in EJS 3"),p=!0),t.context||(t.context=t.scope),delete t.scope),n=new l(e,t),n.compile()},n.render=function(e,t,n){var o=t||{},a=n||{};return 2==arguments.length&&f.shallowCopyFromList(a,o,_),i(a,e)(o)},n.renderFile=function(){var e,t=Array.prototype.slice.call(arguments),n=t.shift(),o=t.pop(),a=t.shift()||{},r=t.pop()||{},s=_.slice();r=f.shallowCopy({},r),s.push("cache"),3==arguments.length&&(a.settings&&a.settings["view options"]?f.shallowCopyFromList(r,a.settings["view options"],s):f.shallowCopyFromList(r,a,s)),r.filename=n;try{e=i(r)(a)}catch(e){return o(e)}return o(null,e)},n.clearCache=function(){n.cache.reset()},l.modes={EVAL:"eval",ESCAPED:"escaped",RAW:"raw",COMMENT:"comment",LITERAL:"literal"},l.prototype={createRegex:function(){var e=y,t=f.escapeRegExpChars(this.opts.delimiter);return e=e.replace(/%/g,t),new RegExp(e)},compile:function(){var e,t,n=this.opts,o="",i="",r=n.escapeFunction;this.source||(this.generateSource(),o+="  var __output = [], __append = __output.push.bind(__output);\n",n._with!==!1&&(o+="  with ("+n.localsName+" || {}) {\n",i+="  }\n"),i+='  return __output.join("");\n',this.source=o+this.source+i),e=n.compileDebug?"var __line = 1\n  , __lines = "+JSON.stringify(this.templateText)+"\n  , __filename = "+(n.filename?JSON.stringify(n.filename):"undefined")+";\ntry {\n"+this.source+"} catch (e) {\n  rethrow(e, __lines, __filename, __line);\n}\n":this.source,n.debug&&console.log(e),n.client&&(e="escape = escape || "+r.toString()+";\n"+e,n.compileDebug&&(e="rethrow = rethrow || "+s.toString()+";\n"+e)),n.strict&&(e='"use strict";\n'+e);try{t=new Function(n.localsName+", escape, include, rethrow",e)}catch(e){throw e instanceof SyntaxError&&(n.filename&&(e.message+=" in "+n.filename),e.message+=" while compiling ejs\n\n",e.message+="If the above error is not helpful, you may want to try EJS-Lint:\n",e.message+="https://github.com/RyanZim/EJS-Lint"),e}if(n.client)return t.dependencies=this.dependencies,t;var c=function(e){var o=function(t,o){var i=f.shallowCopy({},e);return o&&(i=f.shallowCopy(i,o)),a(t,n)(i)};return t.apply(n.context,[e||{},r,o,s])};return c.dependencies=this.dependencies,c},generateSource:function(){var e=this.opts;e.rmWhitespace&&(this.templateText=this.templateText.replace(/\r/g,"").replace(/^\s+|\s+$/gm,"")),this.templateText=this.templateText.replace(/[ \t]*<%_/gm,"<%_").replace(/_%>[ \t]*/gm,"_%>");var t=this,o=this.parseTemplateText(),i=this.opts.delimiter;o&&o.length&&o.forEach(function(e,a){var s,c,l,u,d,p;if(0===e.indexOf("<"+i)&&0!==e.indexOf("<"+i+i)&&(c=o[a+2],c!=i+">"&&c!="-"+i+">"&&c!="_"+i+">"))throw new Error('Could not find matching close tag for "'+e+'".');return(l=e.match(/^\s*include\s+(\S+)/))&&(s=o[a-1],s&&(s=="<"+i||s=="<"+i+"-"||s=="<"+i+"_"))?(u=f.shallowCopy({},t.opts),d=r(l[1],u),p=t.opts.compileDebug?"    ; (function(){\n      var __line = 1\n      , __lines = "+JSON.stringify(d.template)+"\n      , __filename = "+JSON.stringify(d.filename)+";\n      try {\n"+d.source+"      } catch (e) {\n        rethrow(e, __lines, __filename, __line);\n      }\n    ; }).call(this)\n":"    ; (function(){\n"+d.source+"    ; }).call(this)\n",t.source+=p,void t.dependencies.push(n.resolveInclude(l[1],u.filename))):void t.scanLine(e)})},parseTemplateText:function(){for(var e,t=this.templateText,n=this.regex,o=n.exec(t),i=[];o;)e=o.index,0!==e&&(i.push(t.substring(0,e)),t=t.slice(e)),i.push(o[0]),t=t.slice(o[0].length),o=n.exec(t);return t&&i.push(t),i},scanLine:function(e){function t(){n.truncate?(e=e.replace(/^(?:\r\n|\r|\n)/,""),n.truncate=!1):n.opts.rmWhitespace&&(e=e.replace(/^\n/,"")),e&&(e=e.replace(/\\/g,"\\\\"),e=e.replace(/\n/g,"\\n"),e=e.replace(/\r/g,"\\r"),e=e.replace(/"/g,'\\"'),n.source+='    ; __append("'+e+'")\n')}var n=this,o=this.opts.delimiter,i=0;switch(i=e.split("\n").length-1,e){case"<"+o:case"<"+o+"_":this.mode=l.modes.EVAL;break;case"<"+o+"=":this.mode=l.modes.ESCAPED;break;case"<"+o+"-":this.mode=l.modes.RAW;break;case"<"+o+"#":this.mode=l.modes.COMMENT;break;case"<"+o+o:this.mode=l.modes.LITERAL,this.source+='    ; __append("'+e.replace("<"+o+o,"<"+o)+'")\n';break;case o+o+">":this.mode=l.modes.LITERAL,this.source+='    ; __append("'+e.replace(o+o+">",o+">")+'")\n';break;case o+">":case"-"+o+">":case"_"+o+">":this.mode==l.modes.LITERAL&&t(),this.mode=null,this.truncate=0===e.indexOf("-")||0===e.indexOf("_");break;default:if(this.mode){switch(this.mode){case l.modes.EVAL:case l.modes.ESCAPED:case l.modes.RAW:e.lastIndexOf("//")>e.lastIndexOf("\n")&&(e+="\n")}switch(this.mode){case l.modes.EVAL:this.source+="    ; "+e+"\n";break;case l.modes.ESCAPED:this.source+="    ; __append(escape("+c(e)+"))\n";break;case l.modes.RAW:this.source+="    ; __append("+c(e)+")\n";break;case l.modes.COMMENT:break;case l.modes.LITERAL:t()}}else t()}n.opts.compileDebug&&i&&(this.currentLine+=i,this.source+="    ; __line = "+this.currentLine+"\n")}},n.escapeXML=f.escapeXML,n.__express=n.renderFile,e.extensions&&(e.extensions[".ejs"]=function(e,t){var o=t||e.filename,i={filename:o,client:!0},a=u.readFileSync(o).toString(),r=n.compile(a,i);e._compile("module.exports = "+r.toString()+";",o)}),n.VERSION=h,n.name=v,"undefined"!=typeof window&&(window.ejs=n)},{"../package.json":6,"./utils":2,fs:3,path:4}],2:[function(e,t,n){"use strict";function o(e){return a[e]||e}var i=/[|\\{}()[\]^$+*?.]/g;n.escapeRegExpChars=function(e){return e?String(e).replace(i,"\\$&"):""};var a={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&#34;","'":"&#39;"},r=/[&<>\'"]/g,s='var _ENCODE_HTML_RULES = {\n      "&": "&amp;"\n    , "<": "&lt;"\n    , ">": "&gt;"\n    , \'"\': "&#34;"\n    , "\'": "&#39;"\n    }\n  , _MATCH_HTML = /[&<>\'"]/g;\nfunction encode_char(c) {\n  return _ENCODE_HTML_RULES[c] || c;\n};\n';n.escapeXML=function(e){return void 0==e?"":String(e).replace(r,o)},n.escapeXML.toString=function(){return Function.prototype.toString.call(this)+";\n"+s},n.shallowCopy=function(e,t){t=t||{};for(var n in t)e[n]=t[n];return e},n.shallowCopyFromList=function(e,t,n){return n.forEach(function(n){"undefined"!=typeof t[n]&&(e[n]=t[n])}),e},n.cache={_data:{},set:function(e,t){this._data[e]=t},get:function(e){return this._data[e]},reset:function(){this._data={}}}},{}],3:[function(e,t,n){},{}],4:[function(e,t,n){(function(e){function t(e,t){for(var n=0,o=e.length-1;o>=0;o--){var i=e[o];"."===i?e.splice(o,1):".."===i?(e.splice(o,1),n++):n&&(e.splice(o,1),n--)}if(t)for(;n--;n)e.unshift("..");return e}function o(e,t){if(e.filter)return e.filter(t);for(var n=[],o=0;o<e.length;o++)t(e[o],o,e)&&n.push(e[o]);return n}var i=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,a=function(e){return i.exec(e).slice(1)};n.resolve=function(){for(var n="",i=!1,a=arguments.length-1;a>=-1&&!i;a--){var r=a>=0?arguments[a]:e.cwd();if("string"!=typeof r)throw new TypeError("Arguments to path.resolve must be strings");r&&(n=r+"/"+n,i="/"===r.charAt(0))}return n=t(o(n.split("/"),function(e){return!!e}),!i).join("/"),(i?"/":"")+n||"."},n.normalize=function(e){var i=n.isAbsolute(e),a="/"===r(e,-1);return e=t(o(e.split("/"),function(e){return!!e}),!i).join("/"),e||i||(e="."),e&&a&&(e+="/"),(i?"/":"")+e},n.isAbsolute=function(e){return"/"===e.charAt(0)},n.join=function(){var e=Array.prototype.slice.call(arguments,0);return n.normalize(o(e,function(e,t){if("string"!=typeof e)throw new TypeError("Arguments to path.join must be strings");return e}).join("/"))},n.relative=function(e,t){function o(e){for(var t=0;t<e.length&&""===e[t];t++);for(var n=e.length-1;n>=0&&""===e[n];n--);return t>n?[]:e.slice(t,n-t+1)}e=n.resolve(e).substr(1),t=n.resolve(t).substr(1);for(var i=o(e.split("/")),a=o(t.split("/")),r=Math.min(i.length,a.length),s=r,c=0;c<r;c++)if(i[c]!==a[c]){s=c;break}for(var l=[],c=s;c<i.length;c++)l.push("..");return l=l.concat(a.slice(s)),l.join("/")},n.sep="/",n.delimiter=":",n.dirname=function(e){var t=a(e),n=t[0],o=t[1];return n||o?(o&&(o=o.substr(0,o.length-1)),n+o):"."},n.basename=function(e,t){var n=a(e)[2];return t&&n.substr(-1*t.length)===t&&(n=n.substr(0,n.length-t.length)),n},n.extname=function(e){return a(e)[3]};var r="b"==="ab".substr(-1)?function(e,t,n){return e.substr(t,n)}:function(e,t,n){return t<0&&(t=e.length+t),e.substr(t,n)}}).call(this,e("_process"))},{_process:5}],5:[function(e,t,n){function o(){throw new Error("setTimeout has not been defined")}function i(){throw new Error("clearTimeout has not been defined")}function a(e){if(d===setTimeout)return setTimeout(e,0);if((d===o||!d)&&setTimeout)return d=setTimeout,setTimeout(e,0);try{return d(e,0)}catch(t){try{return d.call(null,e,0)}catch(t){return d.call(this,e,0)}}}function r(e){if(f===clearTimeout)return clearTimeout(e);if((f===i||!f)&&clearTimeout)return f=clearTimeout,clearTimeout(e);try{return f(e)}catch(t){try{return f.call(null,e)}catch(t){return f.call(this,e)}}}function s(){g&&h&&(g=!1,h.length?m=h.concat(m):v=-1,m.length&&c())}function c(){if(!g){var e=a(s);g=!0;for(var t=m.length;t;){for(h=m,m=[];++v<t;)h&&h[v].run();v=-1,t=m.length}h=null,g=!1,r(e)}}function l(e,t){this.fun=e,this.array=t}function u(){}var d,f,p=t.exports={};!function(){try{d="function"==typeof setTimeout?setTimeout:o}catch(e){d=o}try{f="function"==typeof clearTimeout?clearTimeout:i}catch(e){f=i}}();var h,m=[],g=!1,v=-1;p.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];m.push(new l(e,t)),1!==m.length||g||a(c)},l.prototype.run=function(){this.fun.apply(null,this.array)},p.title="browser",p.browser=!0,p.env={},p.argv=[],p.version="",p.versions={},p.on=u,p.addListener=u,p.once=u,p.off=u,p.removeListener=u,p.removeAllListeners=u,p.emit=u,p.binding=function(e){throw new Error("process.binding is not supported")},p.cwd=function(){return"/"},p.chdir=function(e){throw new Error("process.chdir is not supported")},p.umask=function(){return 0}},{}],6:[function(e,t,n){t.exports={name:"ejs",description:"Embedded JavaScript templates",keywords:["template","engine","ejs"],version:"2.5.4",author:"Matthew Eernisse <mde@fleegix.org> (http://fleegix.org)",contributors:["Timothy Gu <timothygu99@gmail.com> (https://timothygu.github.io)"],license:"Apache-2.0",main:"./lib/ejs.js",repository:{type:"git",url:"git://github.com/mde/ejs.git"},bugs:"https://github.com/mde/ejs/issues",homepage:"https://github.com/mde/ejs",dependencies:{},devDependencies:{browserify:"^13.0.1",eslint:"^3.0.0","git-directory-deploy":"^1.5.1",istanbul:"~0.4.3",jake:"^8.0.0",jsdoc:"^3.4.0","lru-cache":"^4.0.1",mocha:"^3.0.2","uglify-js":"^2.6.2"},engines:{node:">=0.10.0"},scripts:{test:"mocha",lint:'eslint "**/*.js" Jakefile',coverage:"istanbul cover node_modules/mocha/bin/_mocha",doc:"jake doc",devdoc:"jake doc[dev]"}}},{}]},{},[1])(1)})},3:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.MODAL_TMPL=['<div class="ai-modal" id="<%= id %>">','<header class="modal-header">',"<h3><%= title %></h3>",'<a class="modal-x"></a>',"</header>",'<section class="modal-content">',"</section>","</div>"].join(""),t.ALERT_MODAL_TMPL=['<div class="ai-modal alert" id="<%= id %>">','<header class="modal-header">',"<h3><%= title %></h3>",'<a class="modal-x"></a>',"</header>",'<section class="modal-content">','<div style="text-align: center; color: #666;font-size: 14px;margin-bottom: 20px;"><%=content%></div>','<div style="text-align: center;">','<button type="button" class="btn-normal cancel">确定</button>',"</div>","</section>","</div>"].join(""),t.CONFIRM_MODAL_TMPL=['<div class="ai-modal alert" id="<%= id %>">','<header class="modal-header">',"<h3><%= title %></h3>",'<a class="modal-x"></a>',"</header>",'<section class="modal-content">','<div style="text-align: center; color: #666;font-size: 14px;margin-bottom: 20px;"><%=content%></div>','<div style="text-align: center;">','<button type="button" class="btn-primary submit">确定</button>','<button type="button" class="btn-normal cancel" style="margin-left: 15px;">取消</button>',"</div>","</section>","</div>"].join("")},4:function(e,t){(function(t){function n(e,t,n){function o(t){var n=m,o=g;return m=g=void 0,T=t,y=e.apply(o,n)}function a(e){return T=e,_=setTimeout(u,t),E?o(e):y}function r(e){var n=e-b,o=e-T,i=t-n;return C?x(i,v-o):i}function l(e){var n=e-b,o=e-T;return void 0===b||n>=t||n<0||C&&o>=v}function u(){var e=j();return l(e)?d(e):void(_=setTimeout(u,r(e)))}function d(e){return _=void 0,k&&m?o(e):(m=g=void 0,y)}function f(){void 0!==_&&clearTimeout(_),T=0,m=b=g=_=void 0}function p(){return void 0===_?y:d(j())}function h(){var e=j(),n=l(e);if(m=arguments,g=this,b=e,n){if(void 0===_)return a(b);if(C)return _=setTimeout(u,t),o(b)}return void 0===_&&(_=setTimeout(u,t)),y}var m,g,v,y,_,b,T=0,E=!1,C=!1,k=!0;if("function"!=typeof e)throw new TypeError(c);return t=s(t)||0,i(n)&&(E=!!n.leading,C="maxWait"in n,v=C?w(s(n.maxWait)||0,t):v,k="trailing"in n?!!n.trailing:k),h.cancel=f,h.flush=p,h}function o(e,t,o){var a=!0,r=!0;if("function"!=typeof e)throw new TypeError(c);return i(o)&&(a="leading"in o?!!o.leading:a,r="trailing"in o?!!o.trailing:r),n(e,t,{leading:a,maxWait:t,trailing:r})}function i(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function a(e){return!!e&&"object"==typeof e}function r(e){return"symbol"==typeof e||a(e)&&b.call(e)==u}function s(e){if("number"==typeof e)return e;if(r(e))return l;if(i(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=i(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(d,"");var n=p.test(e);return n||h.test(e)?m(e.slice(2),n?2:8):f.test(e)?l:+e}var c="Expected a function",l=NaN,u="[object Symbol]",d=/^\s+|\s+$/g,f=/^[-+]0x[0-9a-f]+$/i,p=/^0b[01]+$/i,h=/^0o[0-7]+$/i,m=parseInt,g="object"==typeof t&&t&&t.Object===Object&&t,v="object"==typeof self&&self&&self.Object===Object&&self,y=g||v||Function("return this")(),_=Object.prototype,b=_.toString,w=Math.max,x=Math.min,j=function(){return y.Date.now()};e.exports=o}).call(t,function(){return this}())},5:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),c=function e(t,n,o){null===t&&(t=Function.prototype);var i=Object.getOwnPropertyDescriptor(t,n);if(void 0===i){var a=Object.getPrototypeOf(t);return null===a?void 0:e(a,n,o)}if("value"in i)return i.value;var r=i.get;if(void 0!==r)return r.call(o)},l=n(2),u=o(l),d=n(1),f=o(d),p=n(7),h=o(p),m=n(3),g=function(e){function t(e){i(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return n.title="提示",n.content=e||"",n.init(),n}return r(t,e),s(t,[{key:"init",value:function(){var e=u.default.render(m.ALERT_MODAL_TMPL,{id:this.id,title:this.title,content:this.content});(0,f.default)(this.container).append(e),this.bindEvent(),c(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"show",this).call(this)}},{key:"hide",value:function(){this.getModal().hide().remove(),(0,f.default)("body").removeClass("modal-show")}},{key:"bindEvent",value:function(){var e=this;c(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"bindEvent",this).call(this);var n=this.getModal();n.on("click","button.cancel",function(t){t.preventDefault(),e.hide()})}}]),t}(h.default);t.default=g},6:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function i(e){var t=e.image,n=void 0===t?null:t,o=e.imageUrl,i=void 0===o?null:o,a=e.success,r=void 0===a?h.default.noop:a,s=e.fail,c=void 0===s?h.default.noop:s;h.default.post("/aidemo",{type:"idcard",image:n,image_url:i}).success(r).fail(c)}function a(e){var t=e.image,n=void 0===t?null:t,o=e.imageUrl,i=void 0===o?null:o,a=e.success,r=void 0===a?h.default.noop:a,s=e.fail,c=void 0===s?h.default.noop:s;h.default.post("/aidemo",{type:"bankcard",image:n,image_url:i}).success(r).fail(c)}function r(e){var t=e.image,n=void 0===t?null:t,o=e.imageUrl,i=void 0===o?null:o,a=e.success,r=void 0===a?h.default.noop:a,s=e.fail,c=void 0===s?h.default.noop:s;h.default.post("/aidemo",{type:"commontext",image:n,image_url:i}).success(r).fail(c)}function s(e){var t=e.image,n=void 0===t?null:t,o=e.imageUrl,i=void 0===o?null:o,a=e.success,r=void 0===a?h.default.noop:a,s=e.fail,c=void 0===s?h.default.noop:s;h.default.post("/aidemo",{type:"face",image:n,image_url:i}).success(r).fail(c)}function c(e){var t=e.image,n=void 0===t?null:t,o=e.imageUrl,i=void 0===o?null:o,a=e.success,r=void 0===a?h.default.noop:a,s=e.fail,c=void 0===s?h.default.noop:s;h.default.post("/aidemo",{type:"pornography",image:n,image_url:i}).success(r).fail(c)}function l(e){var t=e.imageUrl,n=void 0===t?null:t,o=e.type,i=e.success,a=void 0===i?h.default.noop:i,r=e.fail,s=void 0===r?h.default.noop:r;h.default.post("/aidemo",{action:"getHeader",type:o,image_url:n}).success(a).fail(s)}function u(e){var t=e.words,n=void 0===t?null:t,o=e.success,i=void 0===o?h.default.noop:o,a=e.fail,r=void 0===a?h.default.noop:a;h.default.post("/aidemo",{type:"wakescore",kw:n}).success(i).fail(r)}function d(e){var t=e.words,n=void 0===t?null:t,o=e.success,i=void 0===o?h.default.noop:o;window.open("/aidemo?type=wakedownload&kw="+n,"_blank"),i()}function f(e){var t=e.data,n=void 0===t?{}:t,o=e.success,i=void 0===o?h.default.noop:o,a=e.fail,r=void 0===a?h.default.noop:a;h.default.post("/aidemo",{type:"tts",speed:n.speed,vol:n.vol,person:n.person,text:n.text}).success(i).fail(r)}Object.defineProperty(t,"__esModule",{value:!0}),t.scanIDCard=i,t.scanBankCard=a,t.scanGeneralText=r,t.scanFace=s,t.scanPornography=c,t.getHeader=l,t.evaluateWakeWords=u,t.exportWakeWords=d,t.synthesizeSpeech=f;var p=n(1),h=o(p)},7:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=n(3),s=n(2),c=o(s),l=n(1),u=o(l),d=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"body",n=arguments[1],o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";i(this,e),this.container=t,this.id=n||"modal-"+(new Date).getTime(),this.title=o,this.isOpen=!1}return a(e,[{key:"init",value:function(){var e=c.default.render(r.MODAL_TMPL,{id:this.id,title:this.title});(0,u.default)(this.container).append(e),this.bindEvent()}},{key:"setContent",value:function(e){this.getModal().find(".modal-content").html(e)}},{key:"show",value:function(){this.isOpen=!0,this.getModal().show(),(0,u.default)("body").addClass("modal-show")}},{key:"hide",value:function(){this.isOpen=!1,this.getModal().hide(),(0,u.default)("body").removeClass("modal-show")}},{key:"destroy",value:function(){this.hide(),this.getModal().remove()}},{key:"getModal",value:function(){return(0,u.default)("#"+this.id)}},{key:"bindEvent",value:function(){function e(){(0,u.default)(".ai-modal").trigger("close")}var t=this;this.getModal().on("click",".modal-x",function(){t.hide()}),this.getModal().on("click",function(e){e.stopPropagation()}),this.getModal().on("close",function(){t.isOpen&&t.hide()}),(0,u.default)("body").off("close",e).on("click",e)}}]),e}();t.default=d},8:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=n(1),s=o(r),c=n(6),l=n(5),u=o(l),d=n(10),f=n(9),p=n(11),h=function(){function e(t){var n=this,o=t.selector,a=t.image,r=t.type,c=t.apiType,l=t.toCheck,d=void 0===l||l,f=t.scale,p=void 0===f?1:f,h=t.success,m=t.fail;if(i(this,e),!(0,s.default)(o).context)throw"DemoCanvas：未寻找到容器!";if(this.container=(0,s.default)(o),this.type=r,this.scale=p,this.apiType=c,this.image=new Image,this.success=h||s.default.noop,this.fail=m||s.default.noop,this.image.onerror=function(){n.fail(),new u.default("图片加载失败，请重试")},d){var g={url:this.checkByUrl,stream:this.checkByStream}[this.type](a,c);s.default.when(g).then(function(e){n.image.onload=function(){n.render(!0)},n.image.src=e},function(e){n.image.onload=function(){n.render(!1)},n.image.src=e})}else this.image.onload=function(){n.render(!0)},this.image.src=a}return a(e,[{key:"checkByUrl",value:function(e,t){var n=s.default.Deferred();return(0,c.getHeader)({imageUrl:e,type:t,success:function(e){var t=e.data["Content-Type"],o=e.data["Content-Length"];return!t&&!o||0!==e.errno?void n.reject(d):/image\/(png|bmp|jpg|jpeg)/.test(t)?o>2097152?void n.reject(p):void n.resolve(e.data.image_data):void n.reject(f)},fail:function(){n.reject(d)}}),n.promise()}},{key:"checkByStream",value:function(e){var t=s.default.Deferred(),n=new FileReader;return e?(n.readAsDataURL(e),n.onload=function(n){return/image\/(png|bmp|jpeg)/.test(e.type)?e.size>2097152?(t.reject(p),!1):void t.resolve(n.target.result):(t.reject(f),!1)},n.onerror=function(){t.reject(d)},t.promise()):(t.reject(d),t.promise())}},{key:"render",value:function(e){var t=this.container.width(),n=this.container.height(),o=this.image.width,i=this.image.height,a=(0,s.default)("<canvas>您的浏览器暂时不支持canvas，请选用现代浏览器！</canvas>").attr("width",o).attr("height",i),r=a[0].getContext("2d");r.drawImage(this.image,0,0);var c=o/t,l=i/n,u=this.scale*(c>1||l>1?1/(c>=l?c:l):1);a.css({position:"relative",left:"50%",top:"50%","-webkit-transform":"translate(-50%, -50%) scale("+u+")","-moz-transform":"translate(-50%, -50%) scale("+u+")","-o-transform":"translate(-50%, -50%) scale("+u+")",transform:"translate(-50%, -50%) scale("+u+")"}),a.attr("data-scale",u),this.container.empty().append(a),e?this.success(this.image.src):this.fail()}}]),e}();t.default=h},9:function(e,t){e.exports="/ai_dist/1486524138/ai_images/error/image-format.png"},10:function(e,t){e.exports="/ai_dist/1486524138/ai_images/error/not-found.png"},11:function(e,t){e.exports="/ai_dist/1486524138/ai_images/error/too-large.png"},39:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var i=n(1),a=o(i),r=n(4),s=o(r),c=n(8),l=o(c),u=n(6),d=n(5),f=o(d);n(74);var p=[n(90),n(91),n(92),n(93),n(94),n(95),n(96),n(97)];(0,a.default)(document).ready(function(){(0,a.default)(".case-indicator > li").click(function(){var e=this;(0,a.default)(".case-indicator > li").each(function(t,n){(0,a.default)(n).toggleClass("active",t===(0,a.default)(e).index())}),(0,a.default)(".case-item").each(function(t,n){(0,a.default)(n).toggleClass("active",t===(0,a.default)(e).index())})}),(0,a.default)(window).scroll((0,s.default)(function(){(0,a.default)(document).scrollTop()>=100&&(0,a.default)(".tech-intro-detail").trigger("demo")},300)),(0,a.default)(".tech-intro-detail").one("demo",function(){(0,a.default)(".tech-intro-detail > .scan-box").addClass("scanned")});var e=!1,t=function(){e=!1,(0,a.default)("#demo-json > p").empty(),(0,a.default)("#demo-photo-upload  > input").val(""),(0,a.default)("#demo-result .canvas-container").attr("class","canvas-container"),(0,a.default)("#demo-photo-upload, #scan-photo").removeClass("disabled")},n=function(n,o,i){(0,a.default)("#demo-json > p").empty(),(0,a.default)("#demo-result .canvas-container").attr("class","canvas-container loading"),(0,a.default)("#face-details").hide().empty();var r={success:function(t){if((0,a.default)("#demo-photo-upload, #scan-photo").removeClass("disabled"),(0,a.default)("#demo-json > p").html(JSON.stringify(t,null,"\t")),(0,a.default)("#demo-result .canvas-container").removeClass("loading"),0!==t.errno||!t.data.result_num)return(0,a.default)("#demo-result .canvas-container").toggleClass("error-upload-fail",107===t.errno).toggleClass("error-timeout",28===t.errno).toggleClass("error-image-format",106===t.errno),(0,a.default)("#demo-result .canvas-container").empty(),(0,a.default)("#demo-result .canvas-container").toggleClass("error-no-result",!t.data||!t.data.result_num),e=!1,[106,107,28,0].indexOf(t.errno)===-1&&new f.default(t.msg),!1;(0,a.default)("#demo-result .canvas-container").toggleClass("has-result",t.data.result_num>=1);for(var n=null,o=0,i=t.data.result.length;o<i;o++){var r=t.data.result[o];(!n||r.probability>n.probability)&&(n=r)}(0,a.default)("#demo-result .canvas-container").attr("data-probability",Math.round(1e4*n.probability)/100).toggleClass("normal","正常"===n.class_name).toggleClass("sexy","性感"===n.class_name).toggleClass("pornography","色情"===n.class_name),e=!1},fail:function(e){new f.default("接口发生错误："+e.status+" - "+e.statusText),t()}};"url"===n?r.imageUrl=i:"stream"===n&&(r.image=o),(0,u.scanPornography)(r)};(0,a.default)("#demo-photo-upload > input").change(function(o){if(""===(0,a.default)(this).val())return!1;if(e)return void new f.default("操作正在进行中，请稍候再试！");e=!0,(0,a.default)("#demo-photo-upload, #scan-photo").addClass("disabled");var i=(0,a.default)(this)[0].files[0];new l.default({selector:"#demo-result .canvas-container",image:i,type:"stream",lazyRender:!0,success:function(e){(0,a.default)("#demo-photo-upload  > input").val(""),n("stream",e)},fail:t})}),(0,a.default)("#demo-photo-url").change(function(){(0,a.default)(".demo-card-list > li").removeClass("active")}),(0,a.default)("#scan-photo").click(function(){if(e)return void new f.default("操作正在进行中，请稍候再试！");if((0,a.default)(this).hasClass("disabled")||!(0,a.default)("#demo-photo-url").val())return!1;e=!0,(0,a.default)("#demo-photo-upload, #scan-photo").addClass("disabled");var o=(0,a.default)("#demo-photo-url").val();new l.default({selector:"#demo-result .canvas-container",image:o,type:"url",apiType:"pornography",success:function(e){n("url",e,o)},fail:t})}),(0,a.default)("#demo-photo-upload").click(function(){if((0,a.default)(this).hasClass("disabled"))return!1});var o=(0,a.default)(".demo-card-list > li");o.each(function(e,t){(0,a.default)(t).find("img").attr("src",window.location.protocol+"//"+window.location.host+p[e])}),o.click(function(){if(e)return void new f.default("操作正在进行中，请稍候再试！");e=!0,(0,a.default)(".demo-card-list > li").removeClass("active"),(0,a.default)(this).addClass("active");var o=(0,a.default)(this).find("img").attr("src");(0,a.default)("#demo-photo-upload, #scan-photo").addClass("disabled"),new l.default({selector:"#demo-result .canvas-container",image:o,type:"url",toCheck:!1,success:function(e){n("url",e,o)},fail:t})}),(0,a.default)(".demo-card-list > li")[0].click()})},74:function(e,t){},90:function(e,t){e.exports="/ai_dist/1486524138/ai_images/technology/antiporn/demo-card-1.jpg"},91:function(e,t){e.exports="/ai_dist/1486524138/ai_images/technology/antiporn/demo-card-2.jpg"},92:function(e,t){e.exports="/ai_dist/1486524138/ai_images/technology/antiporn/demo-card-3.jpg"},93:function(e,t){e.exports="/ai_dist/1486524138/ai_images/technology/antiporn/demo-card-4.jpg"},94:function(e,t){e.exports="/ai_dist/1486524138/ai_images/technology/antiporn/demo-card-5.jpg"},95:function(e,t){e.exports="/ai_dist/1486524138/ai_images/technology/antiporn/demo-card-6.jpg"},96:function(e,t){e.exports="/ai_dist/1486524138/ai_images/technology/antiporn/demo-card-7.jpg"},97:function(e,t){e.exports="/ai_dist/1486524138/ai_images/technology/antiporn/demo-card-8.jpg"}});