duAI([6],{1:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=function e(t,n,o){null===t&&(t=Function.prototype);var r=Object.getOwnPropertyDescriptor(t,n);if(void 0===r){var i=Object.getPrototypeOf(t);return null===i?void 0:e(i,n,o)}if("value"in r)return r.value;var a=r.get;if(void 0!==a)return a.call(o)},c=n(0),u=o(c),f=n(8),d=o(f),p=n(4),h=o(p),m=function(e){function t(e){r(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return n.title="提示",n.content=e||"",n.init(),n}return a(t,e),s(t,[{key:"init",value:function(){var e=(0,h.default)({id:this.id,title:this.title,content:this.content});(0,u.default)(this.container).append(e),this.bindEvent(),l(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"show",this).call(this)}},{key:"hide",value:function(){this.getModal().hide().remove(),(0,u.default)("body").removeClass("modal-show")}},{key:"bindEvent",value:function(){var e=this;l(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"bindEvent",this).call(this),this.getModal().on("click","button.cancel",function(t){t.preventDefault(),e.hide()})}}]),t}(d.default);t.default=m},103:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=function e(t,n,o){null===t&&(t=Function.prototype);var r=Object.getOwnPropertyDescriptor(t,n);if(void 0===r){var i=Object.getPrototypeOf(t);return null===i?void 0:e(i,n,o)}if("value"in r)return r.value;var a=r.get;if(void 0!==a)return a.call(o)},c=n(0),u=o(c),f=n(8),d=o(f),p=n(172),h=o(p),m=function(e){function t(e,n){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:u.default.noop;r(this,t);var a=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return a.title=e||"确认信息",a.content=n||"",a.confirm=o,a.init(),a}return a(t,e),s(t,[{key:"init",value:function(){var e=(0,h.default)({id:this.id,title:this.title,content:this.content});(0,u.default)(this.container).append(e),this.bindEvent(),l(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"show",this).call(this)}},{key:"hide",value:function(){this.getModal().hide().remove(),(0,u.default)("body").removeClass("modal-show")}},{key:"bindEvent",value:function(){var e=this;l(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"bindEvent",this).call(this);var n=this.getModal();n.on("click","button.cancel",function(t){t.preventDefault(),e.hide()}),n.on("click","button.submit",function(t){t.preventDefault(),e.confirm(),e.hide()})}}]),t}(d.default);t.default=m},115:function(e,t,n){var o,o;!function(t){e.exports=t()}(function(){return function e(t,n,r){function i(s,l){if(!n[s]){if(!t[s]){var c="function"==typeof o&&o;if(!l&&c)return o(s,!0);if(a)return a(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[s]={exports:{}};t[s][0].call(f.exports,function(e){var n=t[s][1][e];return i(n?n:e)},f,f.exports,e,t,n,r)}return n[s].exports}for(var a="function"==typeof o&&o,s=0;s<r.length;s++)i(r[s]);return i}({1:[function(e,t,n){"use strict";function o(e,t){var o;if("/"==e.charAt(0))o=n.resolveInclude(e.replace(/^\/*/,""),t.root||"/",!0);else{if(!t.filename)throw new Error("`include` use relative path requires the 'filename' option.");o=n.resolveInclude(e,t.filename)}return o}function r(e,t){var o,r=e.filename,i=arguments.length>1;if(e.cache){if(!r)throw new Error("cache option requires a filename");if(o=n.cache.get(r))return o;i||(t=a(r).toString().replace(w,""))}else if(!i){if(!r)throw new Error("Internal EJS error: no file name or template provided");t=a(r).toString().replace(w,"")}return o=n.compile(t,e),e.cache&&n.cache.set(r,o),o}function i(e,t,n){var o;try{o=r(e)(t)}catch(e){return n(e)}return n(null,o)}function a(e){return n.fileLoader(e)}function s(e,t){var n=h.shallowCopy({},t);return n.filename=o(e,n),r(n)}function l(e,t){var n,r,i=h.shallowCopy({},t);n=o(e,i),r=a(n).toString().replace(w,""),i.filename=n;var s=new f(r,i);return s.generateSource(),{source:s.source,filename:n,template:r}}function c(e,t,n,o,r){var i=t.split("\n"),a=Math.max(o-3,0),s=Math.min(i.length,o+3),l=r(n),c=i.slice(a,s).map(function(e,t){var n=t+a+1;return(n==o?" >> ":"    ")+n+"| "+e}).join("\n");throw e.path=l,e.message=(l||"ejs")+":"+o+"\n"+c+"\n\n"+e.message,e}function u(e){return e.replace(/;(\s*$)/,"$1")}function f(e,t){t=t||{};var o={};this.templateText=e,this.mode=null,this.truncate=!1,this.currentLine=1,this.source="",this.dependencies=[],o.client=t.client||!1,o.escapeFunction=t.escape||h.escapeXML,o.compileDebug=t.compileDebug!==!1,o.debug=!!t.debug,o.filename=t.filename,o.delimiter=t.delimiter||n.delimiter||g,o.strict=t.strict||!1,o.context=t.context,o.cache=t.cache||!1,o.rmWhitespace=t.rmWhitespace,o.root=t.root,o.localsName=t.localsName||n.localsName||y,o.strict?o._with=!1:o._with=void 0===t._with||t._with,this.opts=o,this.regex=this.createRegex()}var d=e("fs"),p=e("path"),h=e("./utils"),m=!1,v=e("../package.json").version,g="%",y="locals",_=["delimiter","scope","context","debug","compileDebug","client","_with","rmWhitespace","strict","filename"],b=_.concat("cache"),w=/^\uFEFF/;n.cache=h.cache,n.fileLoader=d.readFileSync,n.localsName=y,n.resolveInclude=function(e,t,n){var o=p.dirname,r=p.extname,i=p.resolve,a=i(n?t:o(t),e);return r(e)||(a+=".ejs"),a},n.compile=function(e,t){var n;return t&&t.scope&&(m||(console.warn("`scope` option is deprecated and will be removed in EJS 3"),m=!0),t.context||(t.context=t.scope),delete t.scope),n=new f(e,t),n.compile()},n.render=function(e,t,n){var o=t||{},i=n||{};return 2==arguments.length&&h.shallowCopyFromList(i,o,_),r(i,e)(o)},n.renderFile=function(){var e,t=arguments[0],n=arguments[arguments.length-1],o={filename:t};return arguments.length>2?(e=arguments[1],3===arguments.length?e.settings&&e.settings["view options"]?h.shallowCopyFromList(o,e.settings["view options"],b):h.shallowCopyFromList(o,e,b):h.shallowCopy(o,arguments[2]),o.filename=t):e={},i(o,e,n)},n.clearCache=function(){n.cache.reset()},f.modes={EVAL:"eval",ESCAPED:"escaped",RAW:"raw",COMMENT:"comment",LITERAL:"literal"},f.prototype={createRegex:function(){var e="(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)",t=h.escapeRegExpChars(this.opts.delimiter);return e=e.replace(/%/g,t),new RegExp(e)},compile:function(){var e,t,n=this.opts,o="",r="",i=n.escapeFunction;this.source||(this.generateSource(),o+="  var __output = [], __append = __output.push.bind(__output);\n",n._with!==!1&&(o+="  with ("+n.localsName+" || {}) {\n",r+="  }\n"),r+='  return __output.join("");\n',this.source=o+this.source+r),e=n.compileDebug?"var __line = 1\n  , __lines = "+JSON.stringify(this.templateText)+"\n  , __filename = "+(n.filename?JSON.stringify(n.filename):"undefined")+";\ntry {\n"+this.source+"} catch (e) {\n  rethrow(e, __lines, __filename, __line, escapeFn);\n}\n":this.source,n.debug&&console.log(e),n.client&&(e="escapeFn = escapeFn || "+i.toString()+";\n"+e,n.compileDebug&&(e="rethrow = rethrow || "+c.toString()+";\n"+e)),n.strict&&(e='"use strict";\n'+e);try{t=new Function(n.localsName+", escapeFn, include, rethrow",e)}catch(e){throw e instanceof SyntaxError&&(n.filename&&(e.message+=" in "+n.filename),e.message+=" while compiling ejs\n\n",e.message+="If the above error is not helpful, you may want to try EJS-Lint:\n",e.message+="https://github.com/RyanZim/EJS-Lint"),e}if(n.client)return t.dependencies=this.dependencies,t;var a=function(e){var o=function(t,o){var r=h.shallowCopy({},e);return o&&(r=h.shallowCopy(r,o)),s(t,n)(r)};return t.apply(n.context,[e||{},i,o,c])};return a.dependencies=this.dependencies,a},generateSource:function(){this.opts.rmWhitespace&&(this.templateText=this.templateText.replace(/\r/g,"").replace(/^\s+|\s+$/gm,"")),this.templateText=this.templateText.replace(/[ \t]*<%_/gm,"<%_").replace(/_%>[ \t]*/gm,"_%>");var e=this,t=this.parseTemplateText(),o=this.opts.delimiter;t&&t.length&&t.forEach(function(r,i){var a,s,c,u,f,d;if(0===r.indexOf("<"+o)&&0!==r.indexOf("<"+o+o)&&(s=t[i+2])!=o+">"&&s!="-"+o+">"&&s!="_"+o+">")throw new Error('Could not find matching close tag for "'+r+'".');if((c=r.match(/^\s*include\s+(\S+)/))&&(a=t[i-1])&&(a=="<"+o||a=="<"+o+"-"||a=="<"+o+"_"))return u=h.shallowCopy({},e.opts),f=l(c[1],u),d=e.opts.compileDebug?"    ; (function(){\n      var __line = 1\n      , __lines = "+JSON.stringify(f.template)+"\n      , __filename = "+JSON.stringify(f.filename)+";\n      try {\n"+f.source+"      } catch (e) {\n        rethrow(e, __lines, __filename, __line);\n      }\n    ; }).call(this)\n":"    ; (function(){\n"+f.source+"    ; }).call(this)\n",e.source+=d,void e.dependencies.push(n.resolveInclude(c[1],u.filename));e.scanLine(r)})},parseTemplateText:function(){for(var e,t=this.templateText,n=this.regex,o=n.exec(t),r=[];o;)e=o.index,0!==e&&(r.push(t.substring(0,e)),t=t.slice(e)),r.push(o[0]),t=t.slice(o[0].length),o=n.exec(t);return t&&r.push(t),r},scanLine:function(e){function t(){n.truncate?(e=e.replace(/^(?:\r\n|\r|\n)/,""),n.truncate=!1):n.opts.rmWhitespace&&(e=e.replace(/^\n/,"")),e&&(e=e.replace(/\\/g,"\\\\"),e=e.replace(/\n/g,"\\n"),e=e.replace(/\r/g,"\\r"),e=e.replace(/"/g,'\\"'),n.source+='    ; __append("'+e+'")\n')}var n=this,o=this.opts.delimiter,r=0;switch(r=e.split("\n").length-1,e){case"<"+o:case"<"+o+"_":this.mode=f.modes.EVAL;break;case"<"+o+"=":this.mode=f.modes.ESCAPED;break;case"<"+o+"-":this.mode=f.modes.RAW;break;case"<"+o+"#":this.mode=f.modes.COMMENT;break;case"<"+o+o:this.mode=f.modes.LITERAL,this.source+='    ; __append("'+e.replace("<"+o+o,"<"+o)+'")\n';break;case o+o+">":this.mode=f.modes.LITERAL,this.source+='    ; __append("'+e.replace(o+o+">",o+">")+'")\n';break;case o+">":case"-"+o+">":case"_"+o+">":this.mode==f.modes.LITERAL&&t(),this.mode=null,this.truncate=0===e.indexOf("-")||0===e.indexOf("_");break;default:if(this.mode){switch(this.mode){case f.modes.EVAL:case f.modes.ESCAPED:case f.modes.RAW:e.lastIndexOf("//")>e.lastIndexOf("\n")&&(e+="\n")}switch(this.mode){case f.modes.EVAL:this.source+="    ; "+e+"\n";break;case f.modes.ESCAPED:this.source+="    ; __append(escapeFn("+u(e)+"))\n";break;case f.modes.RAW:this.source+="    ; __append("+u(e)+")\n";break;case f.modes.COMMENT:break;case f.modes.LITERAL:t()}}else t()}n.opts.compileDebug&&r&&(this.currentLine+=r,this.source+="    ; __line = "+this.currentLine+"\n")}},n.escapeXML=h.escapeXML,n.__express=n.renderFile,e.extensions&&(e.extensions[".ejs"]=function(e,t){var o=t||e.filename,r={filename:o,client:!0},i=a(o).toString(),s=n.compile(i,r);e._compile("module.exports = "+s.toString()+";",o)}),n.VERSION=v,n.name="ejs","undefined"!=typeof window&&(window.ejs=n)},{"../package.json":6,"./utils":2,fs:3,path:4}],2:[function(e,t,n){"use strict";function o(e){return r[e]||e}n.escapeRegExpChars=function(e){return e?String(e).replace(/[|\\{}()[\]^$+*?.]/g,"\\$&"):""};var r={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&#34;","'":"&#39;"};n.escapeXML=function(e){return void 0==e?"":String(e).replace(/[&<>\'"]/g,o)},n.escapeXML.toString=function(){return Function.prototype.toString.call(this)+';\nvar _ENCODE_HTML_RULES = {\n      "&": "&amp;"\n    , "<": "&lt;"\n    , ">": "&gt;"\n    , \'"\': "&#34;"\n    , "\'": "&#39;"\n    }\n  , _MATCH_HTML = /[&<>\'"]/g;\nfunction encode_char(c) {\n  return _ENCODE_HTML_RULES[c] || c;\n};\n'},n.shallowCopy=function(e,t){t=t||{};for(var n in t)e[n]=t[n];return e},n.shallowCopyFromList=function(e,t,n){for(var o=0;o<n.length;o++){var r=n[o];void 0!==t[r]&&(e[r]=t[r])}return e},n.cache={_data:{},set:function(e,t){this._data[e]=t},get:function(e){return this._data[e]},reset:function(){this._data={}}}},{}],3:[function(e,t,n){},{}],4:[function(e,t,n){(function(e){function t(e,t){for(var n=0,o=e.length-1;o>=0;o--){var r=e[o];"."===r?e.splice(o,1):".."===r?(e.splice(o,1),n++):n&&(e.splice(o,1),n--)}if(t)for(;n--;n)e.unshift("..");return e}function o(e,t){if(e.filter)return e.filter(t);for(var n=[],o=0;o<e.length;o++)t(e[o],o,e)&&n.push(e[o]);return n}var r=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,i=function(e){return r.exec(e).slice(1)};n.resolve=function(){for(var n="",r=!1,i=arguments.length-1;i>=-1&&!r;i--){var a=i>=0?arguments[i]:e.cwd();if("string"!=typeof a)throw new TypeError("Arguments to path.resolve must be strings");a&&(n=a+"/"+n,r="/"===a.charAt(0))}return n=t(o(n.split("/"),function(e){return!!e}),!r).join("/"),(r?"/":"")+n||"."},n.normalize=function(e){var r=n.isAbsolute(e),i="/"===a(e,-1);return e=t(o(e.split("/"),function(e){return!!e}),!r).join("/"),e||r||(e="."),e&&i&&(e+="/"),(r?"/":"")+e},n.isAbsolute=function(e){return"/"===e.charAt(0)},n.join=function(){var e=Array.prototype.slice.call(arguments,0);return n.normalize(o(e,function(e,t){if("string"!=typeof e)throw new TypeError("Arguments to path.join must be strings");return e}).join("/"))},n.relative=function(e,t){function o(e){for(var t=0;t<e.length&&""===e[t];t++);for(var n=e.length-1;n>=0&&""===e[n];n--);return t>n?[]:e.slice(t,n-t+1)}e=n.resolve(e).substr(1),t=n.resolve(t).substr(1);for(var r=o(e.split("/")),i=o(t.split("/")),a=Math.min(r.length,i.length),s=a,l=0;l<a;l++)if(r[l]!==i[l]){s=l;break}for(var c=[],l=s;l<r.length;l++)c.push("..");return c=c.concat(i.slice(s)),c.join("/")},n.sep="/",n.delimiter=":",n.dirname=function(e){var t=i(e),n=t[0],o=t[1];return n||o?(o&&(o=o.substr(0,o.length-1)),n+o):"."},n.basename=function(e,t){var n=i(e)[2];return t&&n.substr(-1*t.length)===t&&(n=n.substr(0,n.length-t.length)),n},n.extname=function(e){return i(e)[3]};var a="b"==="ab".substr(-1)?function(e,t,n){return e.substr(t,n)}:function(e,t,n){return t<0&&(t=e.length+t),e.substr(t,n)}}).call(this,e("_process"))},{_process:5}],5:[function(e,t,n){function o(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function i(e){if(f===setTimeout)return setTimeout(e,0);if((f===o||!f)&&setTimeout)return f=setTimeout,setTimeout(e,0);try{return f(e,0)}catch(t){try{return f.call(null,e,0)}catch(t){return f.call(this,e,0)}}}function a(e){if(d===clearTimeout)return clearTimeout(e);if((d===r||!d)&&clearTimeout)return d=clearTimeout,clearTimeout(e);try{return d(e)}catch(t){try{return d.call(null,e)}catch(t){return d.call(this,e)}}}function s(){v&&h&&(v=!1,h.length?m=h.concat(m):g=-1,m.length&&l())}function l(){if(!v){var e=i(s);v=!0;for(var t=m.length;t;){for(h=m,m=[];++g<t;)h&&h[g].run();g=-1,t=m.length}h=null,v=!1,a(e)}}function c(e,t){this.fun=e,this.array=t}function u(){}var f,d,p=t.exports={};!function(){try{f="function"==typeof setTimeout?setTimeout:o}catch(e){f=o}try{d="function"==typeof clearTimeout?clearTimeout:r}catch(e){d=r}}();var h,m=[],v=!1,g=-1;p.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];m.push(new c(e,t)),1!==m.length||v||i(l)},c.prototype.run=function(){this.fun.apply(null,this.array)},p.title="browser",p.browser=!0,p.env={},p.argv=[],p.version="",p.versions={},p.on=u,p.addListener=u,p.once=u,p.off=u,p.removeListener=u,p.removeAllListeners=u,p.emit=u,p.binding=function(e){throw new Error("process.binding is not supported")},p.cwd=function(){return"/"},p.chdir=function(e){throw new Error("process.chdir is not supported")},p.umask=function(){return 0}},{}],6:[function(e,t,n){t.exports={name:"ejs",description:"Embedded JavaScript templates",keywords:["template","engine","ejs"],version:"2.5.5",author:"Matthew Eernisse <mde@fleegix.org> (http://fleegix.org)",contributors:["Timothy Gu <timothygu99@gmail.com> (https://timothygu.github.io)"],license:"Apache-2.0",main:"./lib/ejs.js",repository:{type:"git",url:"git://github.com/mde/ejs.git"},bugs:"https://github.com/mde/ejs/issues",homepage:"https://github.com/mde/ejs",dependencies:{},devDependencies:{browserify:"^13.0.1",eslint:"^3.0.0","git-directory-deploy":"^1.5.1",istanbul:"~0.4.3",jake:"^8.0.0",jsdoc:"^3.4.0","lru-cache":"^4.0.1",mocha:"^3.0.2","uglify-js":"^2.6.2"},engines:{node:">=0.10.0"},scripts:{test:"mocha",lint:'eslint "**/*.js" Jakefile',coverage:"istanbul cover node_modules/mocha/bin/_mocha",doc:"jake doc",devdoc:"jake doc[dev]"}}},{}]},{},[1])(1)})},146:function(e,t){},167:function(e,t,n){e.exports=n.p+"./../../template/cloud/speech-wake.html"},172:function(e,t,n){var o=n(3);e.exports=(o.default||o).template({compiler:[7,">= 4.0.0"],main:function(e,t,n,o,r){var i,a,s=null!=t?t:{},l=n.helperMissing,c=e.escapeExpression;return'<div class="ai-modal alert" id="'+c((a=null!=(a=n.id||(null!=t?t.id:t))?a:l,"function"==typeof a?a.call(s,{name:"id",hash:{},data:r}):a))+'">\n    <header class="modal-header">\n        <h3>'+c((a=null!=(a=n.title||(null!=t?t.title:t))?a:l,"function"==typeof a?a.call(s,{name:"title",hash:{},data:r}):a))+'</h3>\n        <a class="modal-x"></a>\n    </header>\n    <section class="modal-content">\n        <div style="text-align: center; color: #666;font-size: 14px;margin-bottom: 20px;">\n            '+(null!=(a=null!=(a=n.content||(null!=t?t.content:t))?a:l,i="function"==typeof a?a.call(s,{name:"content",hash:{},data:r}):a)?i:"")+'\n        </div>\n        <div style="text-align: center;">\n            <button type="button" class="btn-primary submit">确定</button>\n            <button type="button" class="btn-normal cancel" style="margin-left: 15px;">取消</button>\n        </div>\n    </section>\n</div>\n'},useData:!0})},2:function(e,t,n){"use strict";function o(e){var t=e.image,n=void 0===t?null:t,o=e.imageUrl,r=void 0===o?null:o,i=e.success,a=void 0===i?p.default.noop:i,s=e.fail,l=void 0===s?p.default.noop:s;p.default.post("/aidemo",{type:"idcard",image:n,image_url:r}).success(a).fail(l)}function r(e){var t=e.image,n=void 0===t?null:t,o=e.imageUrl,r=void 0===o?null:o,i=e.success,a=void 0===i?p.default.noop:i,s=e.fail,l=void 0===s?p.default.noop:s;p.default.post("/aidemo",{type:"bankcard",image:n,image_url:r}).success(a).fail(l)}function i(e){var t=e.image,n=void 0===t?null:t,o=e.imageUrl,r=void 0===o?null:o,i=e.success,a=void 0===i?p.default.noop:i,s=e.fail,l=void 0===s?p.default.noop:s;p.default.post("/aidemo",{type:"commontext",image:n,image_url:r}).success(a).fail(l)}function a(e){var t=e.image,n=void 0===t?null:t,o=e.imageUrl,r=void 0===o?null:o,i=e.success,a=void 0===i?p.default.noop:i,s=e.fail,l=void 0===s?p.default.noop:s;p.default.post("/aidemo",{type:"face",image:n,image_url:r}).success(a).fail(l)}function s(e){var t=e.image,n=void 0===t?null:t,o=e.imageUrl,r=void 0===o?null:o,i=e.success,a=void 0===i?p.default.noop:i,s=e.fail,l=void 0===s?p.default.noop:s;p.default.post("/aidemo",{type:"pornography",image:n,image_url:r}).success(a).fail(l)}function l(e){var t=e.imageUrl,n=void 0===t?null:t,o=e.type,r=e.success,i=void 0===r?p.default.noop:r,a=e.fail,s=void 0===a?p.default.noop:a;p.default.post("/aidemo",{action:"getHeader",type:o,image_url:n}).success(i).fail(s)}function c(e){var t=e.words,n=void 0===t?null:t,o=e.success,r=void 0===o?p.default.noop:o,i=e.fail,a=void 0===i?p.default.noop:i;p.default.post("/aidemo",{type:"wakescore",kw:n}).success(r).fail(a)}function u(e){var t=e.words,n=void 0===t?null:t,o=e.success,r=void 0===o?p.default.noop:o;window.open("/aidemo?type=wakedownload&kw="+n,"_blank"),r()}function f(e){var t=e.data,n=void 0===t?{}:t,o=e.success,r=void 0===o?p.default.noop:o,i=e.fail,a=void 0===i?p.default.noop:i;p.default.post("/aidemo",{type:"tts",speed:n.speed,vol:n.vol,person:n.person,text:n.text}).success(r).fail(a)}Object.defineProperty(t,"__esModule",{value:!0}),t.scanIDCard=o,t.scanBankCard=r,t.scanGeneralText=i,t.scanFace=a,t.scanPornography=s,t.getHeader=l,t.evaluateWakeWords=c,t.exportWakeWords=u,t.synthesizeSpeech=f;var d=n(0),p=function(e){return e&&e.__esModule?e:{default:e}}(d)},229:function(e,t,n){e.exports=n(99)},4:function(e,t,n){var o=n(3);e.exports=(o.default||o).template({compiler:[7,">= 4.0.0"],main:function(e,t,n,o,r){var i,a,s=null!=t?t:{},l=n.helperMissing,c=e.escapeExpression;return'<div class="ai-modal alert" id="'+c((a=null!=(a=n.id||(null!=t?t.id:t))?a:l,"function"==typeof a?a.call(s,{name:"id",hash:{},data:r}):a))+'">\n    <header class="modal-header">\n        <h3>'+c((a=null!=(a=n.title||(null!=t?t.title:t))?a:l,"function"==typeof a?a.call(s,{name:"title",hash:{},data:r}):a))+'</h3>\n        <a class="modal-x"></a>\n    </header>\n    <section class="modal-content">\n        <div style="text-align: center; color: #666;font-size: 14px;margin-bottom: 20px;">\n            '+(null!=(a=null!=(a=n.content||(null!=t?t.content:t))?a:l,i="function"==typeof a?a.call(s,{name:"content",hash:{},data:r}):a)?i:"")+'\n        </div>\n        <div style="text-align: center;">\n            <button type="button" class="btn-normal cancel">确定</button>\n        </div>\n    </section>\n</div>\n'},useData:!0})},99:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var r=n(115),i=o(r),a=n(0),s=o(a),l=n(2),c=n(1),u=o(c),f=n(103),d=o(f);n(146),n(167),(0,s.default)(document).ready(function(){(0,s.default)(".case-indicator > li").click(function(){var e=this;(0,s.default)(".case-indicator > li").each(function(t,n){(0,s.default)(n).toggleClass("active",t===(0,s.default)(e).index())}),(0,s.default)(".case-item").each(function(t,n){(0,s.default)(n).toggleClass("active",t===(0,s.default)(e).index())})}),(0,s.default)(".rule-toggle").click(function(){var e=(0,s.default)(".demo-rule").hasClass("collapsed");(0,s.default)(".demo-rule").toggleClass("collapsed",!e),(0,s.default)(this).html(e?"收起内容":"展开内容")});var e=function(e,t){var n={star:0,desc:"",length:0,zl:0},o=0,r="得分低于60, 不可用作唤醒词",i="",a=["拍照","茄子","增大音量","减小音量","播放","停止","暂停","上一首","下一首","打开电灯","关闭电灯","增大亮度","减小亮度","打开手电筒","关闭手电筒"];if(s.default.inArray(e,a)>=0)n.zl=1,o=5;else if(/\d+/.test(e))o=1;else{for(var l=!1,c=0,u=0,f=0;f<e.length;f++)null!==e.charAt(f).match(/^[a-zA-Z]$/)&&c++,null===e.charAt(f).match(/^[\u4e00-\u9fa5a-zA-Z]$/)&&u++;c>2&&(l=!0,o=1,i="一个唤醒词最多只能包含两个英文字母，且唤醒词中暂时不支持英文单词，请更换别的唤醒词。"),u>0&&(l=!0,o=1,i="唤醒词不可包含汉字和英文字母以外的字符，请使用相应的汉字作为唤醒词，如非常6+7，建议您使用“非常六加七”"),l===!1&&(4===e.length?t<500?o=5:t>=500&&t<1e3?o=4:t>=1e3<1500&&(o=3):3!==e.length&&5!==e.length||(o=t<500?3:t>=500&&t<1e3?2:1))}switch(o){case 5:r="非常适用于作为唤醒词。";break;case 4:r="可以用作唤醒词，唤醒词只允许3-5个字, 并且推荐4个字。";break;case 3:r="不建议用作唤醒词，唤醒词只允许3-5个字, 并且推荐4个字。";break;default:r="不可用作唤醒词，唤醒词只允许3-5个字, 并且推荐4个字。"}return""!==i&&(r=i),n.star=o,n.desc=r,n.length=e.length,n},t=0,n=['<li data-star="<%=score.star%>">','<div class="word"><%=word%></div>','<div class="clear-float">','<div class="word-score">',"<% for (var i = 1; i <= 5; i++) { %>","<div class=\"<%=score.star >= i ? 'star' : 'no-star'%>\"></div>","<%}%>","</div>",'<div class="word-desc"><%=score.desc%></div>',"</div>","</li>"].join(""),o=function(e,t){(0,s.default)("#evaluated-words").append(i.default.render(n,{word:e,score:t}))};(0,s.default)("#evaluate").click(function(){var n=(0,s.default)("#demo-wake-word").val();if(!n)return!1;(0,l.evaluateWakeWords)({words:n,success:function(n){return 1===n.errno?(new u.default("访问接口出错，请登陆百度账号后再尝试该项服务！"),!1):0!==n.errno?(new u.default("访问接口出错，请稍候再试！"),!1):((0,s.default)("#demo-wake-word").val(""),(0,s.default)(".evaluated-result").show(),t=n.data.sCount,void Object.keys(n.data.sData).forEach(function(t){o(t,e(t,n.data.sData[t]))}))}})}),(0,s.default)("#evaluated-words").on("click","li",function(){if((0,s.default)(this).attr("data-star")<=3)return new u.default("你好，只能导出三星以上唤醒词！"),!1;(0,s.default)(this).toggleClass("checked")}),(0,s.default)("#export-evaluated-words").click(function(e){e.stopPropagation();var n=(0,s.default)("#evaluated-words").find("li.checked");if(n.length>10)return new u.default("对不起，您只能选择10个以内的唤醒词！"),!1;if(0===n.length)return new u.default("对不起，您未选择任何唤醒词！"),!1;var o=["拍照","茄子","增大音量","减小音量","播放","停止","暂停","上一首","下一首","打开电灯","关闭电灯","增大亮度","减小亮度","打开手电筒","关闭手电筒"],r=0,i=0,a=[];return n.each(function(e,t){var n=(0,s.default)(t).find(".word").html();a.push(n),r+=2===n.length?1:0,i+=o.indexOf(n)===-1?1:0}),r>3?(new u.default("对不起，您最多可以设置3个两字指令唤醒词!"),!1):i>3?(new u.default("对不起，您最多可以设置3个自定义唤醒词!"),!1):t>=3?(new u.default("对不起，您本月已导出3次唤醒词，无法再使用该服务!"),!1):(a=a.join(","),void new d.default("确认导出","您好，您本次选择提的交唤醒词是["+a+" ]，您本月还有"+(3-t)+"次提交机会，请确认提交！",function(){(0,l.exportWakeWords)({words:a}),(0,s.default)(".evaluated-result").hide(),(0,s.default)("#evaluated-words").empty()}))})})}},[229]);