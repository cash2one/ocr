duAI([19],{129:function(e,t,n){"use strict";var r=n(2),s=function(e){return e&&e.__esModule?e:{default:e}}(r),i=s.default;!function(e,t,n,r){var s="docAccordionMenu",i={speed:300,showDelay:0,hideDelay:0,singleOpen:!0,clickEffect:!0},a=function(t,n){this.element=t,this.settings=e.extend({},i,n),this._defaults=i,this._name=s,this.init()};e.extend(a.prototype,{init:function(){this.openSubmenu(),this.submenuIndicators(),i.clickEffect&&this.addClickEffect()},openSubmenu:function(){e(this.element).children("ul").find("li").bind("click touchstart",function(n){if(n.stopPropagation(),n.preventDefault(),e(this).children(".submenu").length>0){if("none"===e(this).children(".submenu").css("display"))return e(this).children(".submenu").delay(i.showDelay).slideDown(i.speed),i.singleOpen&&e(this).siblings().children(".submenu").slideUp(i.speed),!1;e(this).children(".submenu").delay(i.hideDelay).slideUp(i.speed),e(this).children(".submenu").siblings("a").hasClass("submenu-indicator-minus")}t.location.href=e(this).children("a").attr("href")})},submenuIndicators:function(){e(this.element).find(".submenu").length},addClickEffect:function(){var t=void 0,n=void 0,r=void 0,s=void 0;e(this.element).find("a").bind("click touchstart",function(i){e(".ink").remove(),0===e(this).children(".ink").length&&e(this).prepend('<span class="ink"></span>'),t=e(this).find(".ink"),t.removeClass("animate-ink"),t.height()||t.width()||(n=Math.max(e(this).outerWidth(),e(this).outerHeight()),t.css({height:n,width:n})),r=i.pageX-e(this).offset().left-t.width()/2,s=i.pageY-e(this).offset().top-t.height()/2,t.css({top:s+"px",left:r+"px"}).addClass("animate-ink")})}}),e.fn[s]=function(t){return this.each(function(){e.data(this,"plugin_"+s)||e.data(this,"plugin_"+s,new a(this,t))}),this}}(i,window,document)},130:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function s(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;k(e),v(e).then(function(){if(t){var e=(0,a.default)("#"+t);e.length>0&&e[0].scrollIntoView()}})};var i=n(2),a=r(i),l=n(172),o=r(l);n(132);var u=n(97),c=r(u);n(129);var h="",p=(0,a.default)("#md_container"),f=(0,a.default)(".doc-breadcrumb .crumb"),d=(0,a.default)(".sidebar li"),g=function(){p.find("p").each(function(e){(0,a.default)(this).attr("id","Q"+(e+1))})},m=["简介","接入指南","鉴权认证机制","常见问题","账号问题","接口调用","其他"],b=function(){p.find("h1, h2").each(function(e,t){var n=(0,a.default)(t);n.attr("id",n.text())}),p.find("a[href]").each(function(e,t){var n=(0,a.default)(t);0!==n.attr("href").indexOf("#")&&n.attr("target","_blank")})},v=function(e){var t=a.default.Deferred();return a.default.ajax({type:"GET",url:"/data/"+e+".md?v="+Date.now(),success:function(n){h=e,p.html((0,o.default)(n)),(0,a.default)("code").addClass("prettyprint"),PR.prettyPrint(),b(),e.indexOf("FAQ")>0&&g(),t.resolve()}}),t},y=function(e){var t=[];e.forEach(function(e,n){n>0&&(t=[].concat(s(t),["<li>",'    <span class="divider">&gt;</span>',"</li>"])),t=[].concat(s(t),["<li>","    <span>"+e+"</span>","</li>"])}),f.html(t.join("\r"))},x=function(e){var t=(0,a.default)("#"+e);t.length>0&&t.first()[0].scrollIntoView({block:"start",behavior:"smooth"})},k=function(e){var t=(0,a.default)("[data-md="+e+"]").first(),n=[];t.parents(".submenu").css({display:"block"}).end().parents(".non-leaf, .root").andSelf().find(">a").each(function(e,t){n.push((0,a.default)(t).text().trim())}),y(n),t.addClass("active"),t.parents(".root").addClass("active")};(0,a.default)("#jquery-accordion-menu").docAccordionMenu(),function(){(0,a.default)(".sidebar > h1").click((0,c.default)(function(e){var t=(0,a.default)(e.currentTarget);t.find(".pm-button").toggleClass("active"),t.next().find(">ul").toggle(300)},300,{leading:!0,tailing:!1}))}(),function(){(0,a.default)(".leaf, .sdk-node, .guide-node").filter("[data-md]").on("click",function(e){var t=(0,a.default)(e.currentTarget),n=(0,a.default)(this);if(!n.hasClass("active")){var r=t.attr("data-md");d.removeClass("active"),n.addClass("active"),n.closest(".root").addClass("active");var s=[];n.parents(".non-leaf, .root").andSelf().find(">a").each(function(e,t){s.push((0,a.default)(t).text().trim())}),y(s);var i=n.text().trim();r!==h?v(r).then(function(){m.indexOf(i)<0&&x(i)}):x(i)}})}()},132:function(e,t){window.PR_SHOULD_USE_CONTINUATION=!0;var n,r;!function(){function e(e){function t(e){var t=e.charCodeAt(0);if(92!==t)return t;var n=e.charAt(1);return(t=c[n])||("0"<=n&&n<="7"?parseInt(e.substring(1),8):"u"===n||"x"===n?parseInt(e.substring(2),16):e.charCodeAt(1))}function n(e){if(e<32)return(e<16?"\\x0":"\\x")+e.toString(16);var t=String.fromCharCode(e);return"\\"===t||"-"===t||"]"===t||"^"===t?"\\"+t:t}function r(e){var r=e.substring(1,e.length-1).match(new RegExp("\\\\u[0-9A-Fa-f]{4}|\\\\x[0-9A-Fa-f]{2}|\\\\[0-3][0-7]{0,2}|\\\\[0-7]{1,2}|\\\\[\\s\\S]|-|[^-\\\\]","g")),s=[],i="^"===r[0],a=["["];i&&a.push("^");for(var l=i?1:0,o=r.length;l<o;++l){var u=r[l];if(/\\[bdsw]/i.test(u))a.push(u);else{var c,h=t(u);l+2<o&&"-"===r[l+1]?(c=t(r[l+2]),l+=2):c=h,s.push([h,c]),c<65||h>122||(c<65||h>90||s.push([32|Math.max(65,h),32|Math.min(c,90)]),c<97||h>122||s.push([-33&Math.max(97,h),-33&Math.min(c,122)]))}}s.sort(function(e,t){return e[0]-t[0]||t[1]-e[1]});for(var p=[],f=[],l=0;l<s.length;++l){var d=s[l];d[0]<=f[1]+1?f[1]=Math.max(f[1],d[1]):p.push(f=d)}for(var l=0;l<p.length;++l){var d=p[l];a.push(n(d[0])),d[1]>d[0]&&(d[1]+1>d[0]&&a.push("-"),a.push(n(d[1])))}return a.push("]"),a.join("")}for(var s=0,i=!1,a=!1,l=0,o=e.length;l<o;++l){var u=e[l];if(u.ignoreCase)a=!0;else if(/[a-z]/i.test(u.source.replace(/\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi,""))){i=!0,a=!1;break}}for(var c={b:8,t:9,n:10,v:11,f:12,r:13},h=[],l=0,o=e.length;l<o;++l){var u=e[l];if(u.global||u.multiline)throw new Error(""+u);h.push("(?:"+function(e){for(var t=e.source.match(new RegExp("(?:\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]|\\\\u[A-Fa-f0-9]{4}|\\\\x[A-Fa-f0-9]{2}|\\\\[0-9]+|\\\\[^ux0-9]|\\(\\?[:!=]|[\\(\\)\\^]|[^\\x5B\\x5C\\(\\)\\^]+)","g")),a=t.length,l=[],o=0,u=0;o<a;++o){var c=t[o];if("("===c)++u;else if("\\"===c.charAt(0)){var h=+c.substring(1);h&&(h<=u?l[h]=-1:t[o]=n(h))}}for(var o=1;o<l.length;++o)-1===l[o]&&(l[o]=++s);for(var o=0,u=0;o<a;++o){var c=t[o];if("("===c)++u,l[u]||(t[o]="(?:");else if("\\"===c.charAt(0)){var h=+c.substring(1);h&&h<=u&&(t[o]="\\"+l[h])}}for(var o=0;o<a;++o)"^"===t[o]&&"^"!==t[o+1]&&(t[o]="");if(e.ignoreCase&&i)for(var o=0;o<a;++o){var c=t[o],p=c.charAt(0);c.length>=2&&"["===p?t[o]=r(c):"\\"!==p&&(t[o]=c.replace(/[a-zA-Z]/g,function(e){var t=e.charCodeAt(0);return"["+String.fromCharCode(-33&t,32|t)+"]"}))}return t.join("")}(u)+")")}return new RegExp(h.join("|"),a?"gi":"g")}function t(e,t){function n(e){var o=e.nodeType;if(1==o){if(r.test(e.className))return;for(var u=e.firstChild;u;u=u.nextSibling)n(u);var c=e.nodeName.toLowerCase();"br"!==c&&"li"!==c||(s[l]="\n",a[l<<1]=i++,a[l++<<1|1]=e)}else if(3==o||4==o){var h=e.nodeValue;h.length&&(h=t?h.replace(/\r\n?/g,"\n"):h.replace(/[ \t\r\n]+/g," "),s[l]=h,a[l<<1]=i,i+=h.length,a[l++<<1|1]=e)}}var r=/(?:^|\s)nocode(?:\s|$)/,s=[],i=0,a=[],l=0;return n(e),{sourceCode:s.join("").replace(/\n$/,""),spans:a}}function s(e,t,n,r,s){if(n){var i={sourceNode:e,pre:1,langExtension:null,numberLines:null,sourceCode:n,spans:null,basePos:t,decorations:null};r(i),s.push.apply(s,i.decorations)}}function i(e){for(var t=void 0,n=e.firstChild;n;n=n.nextSibling){var r=n.nodeType;t=1===r?t?e:n:3===r&&q.test(n.nodeValue)?e:t}return t===e?void 0:t}function a(t,n){var r,i={};!function(){for(var s=t.concat(n),a=[],l={},o=0,u=s.length;o<u;++o){var c=s[o],h=c[3];if(h)for(var p=h.length;--p>=0;)i[h.charAt(p)]=c;var f=c[1],d=""+f;l.hasOwnProperty(d)||(a.push(f),l[d]=null)}a.push(/[\0-\uffff]/),r=e(a)}();var a=n.length,l=function(e){for(var t=e.sourceCode,o=e.basePos,u=e.sourceNode,c=[o,I],p=0,f=t.match(r)||[],d={},g=0,m=f.length;g<m;++g){var b,v=f[g],y=d[v],x=void 0;if("string"==typeof y)b=!1;else{var k=i[v.charAt(0)];if(k)x=v.match(k[1]),y=k[0];else{for(var w=0;w<a;++w)if(k=n[w],x=v.match(k[1])){y=k[0];break}x||(y=I)}b=y.length>=5&&"lang-"===y.substring(0,5),!b||x&&"string"==typeof x[1]||(b=!1,y=j),b||(d[v]=y)}var S=p;if(p+=v.length,b){var _=x[1],C=v.indexOf(_),$=C+_.length;x[2]&&($=v.length-x[2].length,C=$-_.length);var A=y.substring(5);s(u,o+S,v.substring(0,C),l,c),s(u,o+S+C,_,h(A,_),c),s(u,o+S+$,v.substring($),l,c)}else c.push(o+S,y)}e.decorations=c};return l}function l(e){var t=[],n=[];e.tripleQuotedStrings?t.push([L,/^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/,null,"'\""]):e.multiLineStrings?t.push([L,/^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/,null,"'\"`"]):t.push([L,/^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/,null,"\"'"]),e.verbatimStrings&&n.push([L,/^@\"(?:[^\"]|\"\")*(?:\"|$)/,null]);var r=e.hashComments;r&&(e.cStyleComments?(r>1?t.push([P,/^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/,null,"#"]):t.push([P,/^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\r\n]*)/,null,"#"]),n.push([L,/^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/,null])):t.push([P,/^#[^\r\n]*/,null,"#"])),e.cStyleComments&&(n.push([P,/^\/\/[^\r\n]*/,null]),n.push([P,/^\/\*[\s\S]*?(?:\*\/|$)/,null]));var s=e.regexLiterals;if(s){var i=s>1?"":"\n\r",l=i?".":"[\\S\\s]",o="/(?=[^/*"+i+"])(?:[^/\\x5B\\x5C"+i+"]|\\x5C"+l+"|\\x5B(?:[^\\x5C\\x5D"+i+"]|\\x5C"+l+")*(?:\\x5D|$))+/";n.push(["lang-regex",RegExp("^"+D+"("+o+")")])}var u=e.types;u&&n.push([T,u]);var c=(""+e.keywords).replace(/^ | $/g,"");c.length&&n.push([E,new RegExp("^(?:"+c.replace(/[\s,]+/g,"|")+")\\b"),null]),t.push([I,/^\s+/,null," \r\n\t "]);var h="^.[^\\s\\w.$@'\"`/\\\\]*";return e.regexLiterals&&(h+="(?!s*/)"),n.push([O,/^@[a-z_$][a-z_$@0-9]*/i,null],[T,/^(?:[@_]?[A-Z]+[a-z][A-Za-z_$@0-9]*|\w+_t\b)/,null],[I,/^[a-z_$][a-z_$@0-9]*/i,null],[O,new RegExp("^(?:0x[a-f0-9]+|(?:\\d(?:_\\d+)*\\d*(?:\\.\\d*)?|\\.\\d\\+)(?:e[+\\-]?\\d+)?)[a-z]*","i"),null,"0123456789"],[I,/^\\[\s\S]?/,null],[R,new RegExp(h),null]),a(t,n)}function o(e,t,n){function r(e){var t=e.nodeType;if(1!=t||i.test(e.className)){if((3==t||4==t)&&n){var o=e.nodeValue,u=o.match(a);if(u){var c=o.substring(0,u.index);e.nodeValue=c;var h=o.substring(u.index+u[0].length);if(h){var p=e.parentNode;p.insertBefore(l.createTextNode(h),e.nextSibling)}s(e),c||e.parentNode.removeChild(e)}}}else if("br"===e.nodeName)s(e),e.parentNode&&e.parentNode.removeChild(e);else for(var f=e.firstChild;f;f=f.nextSibling)r(f)}function s(e){function t(e,n){var r=n?e.cloneNode(!1):e,s=e.parentNode;if(s){var i=t(s,1),a=e.nextSibling;i.appendChild(r);for(var l=a;l;l=a)a=l.nextSibling,i.appendChild(l)}return r}for(;!e.nextSibling;)if(!(e=e.parentNode))return;for(var n,r=t(e.nextSibling,0);(n=r.parentNode)&&1===n.nodeType;)r=n;u.push(r)}for(var i=/(?:^|\s)nocode(?:\s|$)/,a=/\r\n?|\n/,l=e.ownerDocument,o=l.createElement("li");e.firstChild;)o.appendChild(e.firstChild);for(var u=[o],c=0;c<u.length;++c)r(u[c]);t===(0|t)&&u[0].setAttribute("value",t);var h=l.createElement("ol");h.className="linenums";for(var p=Math.max(0,t-1|0)||0,c=0,f=u.length;c<f;++c)o=u[c],o.className="L"+(c+p)%10,o.firstChild||o.appendChild(l.createTextNode(" ")),h.appendChild(o);e.appendChild(h)}function u(e){var t=/\bMSIE\s(\d+)/.exec(navigator.userAgent);t=t&&+t[1]<=8;var n=e.sourceCode,r=n.length,s=0,i=e.spans,a=i.length,l=0,o=e.decorations,u=o.length,c=0;o[u]=r;var h,p;for(p=h=0;p<u;)o[p]!==o[p+2]?(o[h++]=o[p++],o[h++]=o[p++]):p+=2;for(u=h,p=h=0;p<u;){for(var f=o[p],d=o[p+1],g=p+2;g+2<=u&&o[g+1]===d;)g+=2;o[h++]=f,o[h++]=d,p=g}u=o.length=h;var m=e.sourceNode,b="";m&&(b=m.style.display,m.style.display="none");try{for(;l<a;){var v,y=(i[l],i[l+2]||r),x=o[c+2]||r,g=Math.min(y,x),k=i[l+1];if(1!==k.nodeType&&(v=n.substring(s,g))){t&&(v=v.replace(/\n/g,"\r")),k.nodeValue=v;var w=k.ownerDocument,S=w.createElement("span");S.className=o[c+1];var _=k.parentNode;_.replaceChild(S,k),S.appendChild(k),s<y&&(i[l+1]=k=w.createTextNode(n.substring(g,y)),_.insertBefore(k,S.nextSibling))}s=g,s>=y&&(l+=2),s>=x&&(c+=2)}}finally{m&&(m.style.display=b)}}function c(e,t){for(var n=t.length;--n>=0;){var r=t[n];M.hasOwnProperty(r)?g.console&&console.warn("cannot override language handler %s",r):M[r]=e}}function h(e,t){return e&&M.hasOwnProperty(e)||(e=/^\s*</.test(t)?"default-markup":"default-code"),M[e]}function p(e){var n=e.langExtension;try{var r=t(e.sourceNode,e.pre),s=r.sourceCode;e.sourceCode=s,e.spans=r.spans,e.basePos=0,h(n,s)(e),u(e)}catch(e){g.console&&console.log(e&&e.stack||e)}}function f(e,t,n){var r=n||!1,s=t||null,i=document.createElement("div");return i.innerHTML="<pre>"+e+"</pre>",i=i.firstChild,r&&o(i,r,!0),p({langExtension:s,numberLines:r,sourceNode:i,pre:1,sourceCode:null,basePos:null,spans:null,decorations:null}),i.innerHTML}function d(e,t){function n(e){return s.getElementsByTagName(e)}function r(){for(var t=g.PR_SHOULD_USE_CONTINUATION?d.now()+250:1/0;m<u.length&&d.now()<t;m++){for(var n=u[m],s=S,l=n;l=l.previousSibling;){var c=l.nodeType,h=(7===c||8===c)&&l.nodeValue;if(h?!/^\??prettify\b/.test(h):3!==c||/\S/.test(l.nodeValue))break;if(h){s={},h.replace(/\b(\w+)=([\w:.%+-]+)/g,function(e,t,n){s[t]=n});break}}var f=n.className;if((s!==S||v.test(f))&&!y.test(f)){for(var _=!1,C=n.parentNode;C;C=C.parentNode){var $=C.tagName;if(w.test($)&&C.className&&v.test(C.className)){_=!0;break}}if(!_){n.className+=" prettyprinted";var A=s.lang;if(!A){A=f.match(b);var N;!A&&(N=i(n))&&k.test(N.tagName)&&(A=N.className.match(b)),A&&(A=A[1])}var L;if(x.test(n.tagName))L=1;else{var E=n.currentStyle,P=a.defaultView,T=E?E.whiteSpace:P&&P.getComputedStyle?P.getComputedStyle(n,null).getPropertyValue("white-space"):0;L=T&&"pre"===T.substring(0,3)}var O=s.linenums;(O="true"===O||+O)||(O=f.match(/\blinenums\b(?::(\d+))?/),O=!!O&&(!O[1]||!O[1].length||+O[1])),O&&o(n,O,L);p({langExtension:A,sourceNode:n,numberLines:O,pre:L,sourceCode:null,basePos:null,spans:null,decorations:null})}}}m<u.length?g.setTimeout(r,250):"function"==typeof e&&e()}for(var s=t||document.body,a=s.ownerDocument||document,l=[n("pre"),n("code"),n("xmp")],u=[],c=0;c<l.length;++c)for(var h=0,f=l[c].length;h<f;++h)u.push(l[c][h]);l=null;var d=Date;d.now||(d={now:function(){return+new Date}});var m=0,b=/\blang(?:uage)?-([\w.]+)(?!\S)/,v=/\bprettyprint\b/,y=/\bprettyprinted\b/,x=/pre|xmp/i,k=/^code$/i,w=/^(?:pre|code|xmp)$/i,S={};r()}var g=window,m=["break,continue,do,else,for,if,return,while"],b=[m,"auto,case,char,const,default,double,enum,extern,float,goto,inline,int,long,register,restrict,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"],v=[b,"catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"],y=[v,"alignas,alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,delegate,dynamic_cast,explicit,export,friend,generic,late_check,mutable,namespace,noexcept,noreturn,nullptr,property,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],x=[v,"abstract,assert,boolean,byte,extends,finally,final,implements,import,instanceof,interface,null,native,package,strictfp,super,synchronized,throws,transient"],k=[v,"abstract,add,alias,as,ascending,async,await,base,bool,by,byte,checked,decimal,delegate,descending,dynamic,event,finally,fixed,foreach,from,get,global,group,implicit,in,interface,internal,into,is,join,let,lock,null,object,out,override,orderby,params,partial,readonly,ref,remove,sbyte,sealed,select,set,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,value,var,virtual,where,yield"],w=[v,"abstract,async,await,constructor,debugger,enum,eval,export,function,get,implements,instanceof,interface,let,null,set,undefined,var,with,yield,Infinity,NaN"],S="caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",_=[m,"and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"],C=[m,"alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"],$=[m,"case,done,elif,esac,eval,fi,function,in,local,set,then,until"],A=[y,k,x,w,S,_,C,$],N=/^(DIR|FILE|array|vector|(de|priority_)?queue|(forward_)?list|stack|(const_)?(reverse_)?iterator|(unordered_)?(multi)?(set|map)|bitset|u?(int|float)\d*)\b/,L="str",E="kwd",P="com",T="typ",O="lit",R="pun",I="pln",j="src",D="(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*",q=/\S/,z=l({keywords:A,hashComments:!0,cStyleComments:!0,multiLineStrings:!0,regexLiterals:!0}),M={};c(z,["default-code"]),c(a([],[[I,/^[^<?]+/],["dec",/^<!\w[^>]*(?:>|$)/],[P,/^<\!--[\s\S]*?(?:-\->|$)/],["lang-",/^<\?([\s\S]+?)(?:\?>|$)/],["lang-",/^<%([\s\S]+?)(?:%>|$)/],[R,/^(?:<[%?]|[%?]>)/],["lang-",/^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i],["lang-js",/^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i],["lang-css",/^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i],["lang-in.tag",/^(<\/?[a-z][^<>]*>)/i]]),["default-markup","htm","html","mxml","xhtml","xml","xsl"]),c(a([[I,/^[\s]+/,null," \t\r\n"],["atv",/^(?:\"[^\"]*\"?|\'[^\']*\'?)/,null,"\"'"]],[["tag",/^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i],["atn",/^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],["lang-uq.val",/^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/],[R,/^[=<>\/]+/],["lang-js",/^on\w+\s*=\s*\"([^\"]+)\"/i],["lang-js",/^on\w+\s*=\s*\'([^\']+)\'/i],["lang-js",/^on\w+\s*=\s*([^\"\'>\s]+)/i],["lang-css",/^style\s*=\s*\"([^\"]+)\"/i],["lang-css",/^style\s*=\s*\'([^\']+)\'/i],["lang-css",/^style\s*=\s*([^\"\'>\s]+)/i]]),["in.tag"]),c(a([],[["atv",/^[\s\S]+/]]),["uq.val"]),c(l({keywords:y,hashComments:!0,cStyleComments:!0,types:N}),["c","cc","cpp","cxx","cyc","m"]),c(l({keywords:"null,true,false"}),["json"]),c(l({keywords:k,hashComments:!0,cStyleComments:!0,verbatimStrings:!0,types:N}),["cs"]),c(l({keywords:x,cStyleComments:!0}),["java"]),c(l({keywords:$,hashComments:!0,multiLineStrings:!0}),["bash","bsh","csh","sh"]),c(l({keywords:_,hashComments:!0,multiLineStrings:!0,tripleQuotedStrings:!0}),["cv","py","python"]),c(l({keywords:S,hashComments:!0,multiLineStrings:!0,regexLiterals:2}),["perl","pl","pm"]),c(l({keywords:C,hashComments:!0,multiLineStrings:!0,regexLiterals:!0}),["rb","ruby"]),c(l({keywords:w,cStyleComments:!0,regexLiterals:!0}),["javascript","js","ts","typescript"]),c(l({keywords:"all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes",hashComments:3,cStyleComments:!0,multilineStrings:!0,tripleQuotedStrings:!0,regexLiterals:!0}),["coffee"]),c(a([],[[L,/^[\s\S]+/]]),["regex"]);var U=g.PR={createSimpleLexer:a,registerLangHandler:c,sourceDecorator:l,PR_ATTRIB_NAME:"atn",PR_ATTRIB_VALUE:"atv",PR_COMMENT:P,PR_DECLARATION:"dec",PR_KEYWORD:E,PR_LITERAL:O,PR_NOCODE:"nocode",PR_PLAIN:I,PR_PUNCTUATION:R,PR_SOURCE:j,PR_STRING:L,PR_TAG:"tag",PR_TYPE:T,prettyPrintOne:n=f,prettyPrint:r=r=d},V=g.define;"function"==typeof V&&V.amd&&V("google-code-prettify",[],function(){return U})}()},172:function(e,t,n){(function(t){(function(){function t(e){this.tokens=[],this.tokens.links={},this.options=e||c.defaults,this.rules=h.normal,this.options.gfm&&(this.options.tables?this.rules=h.tables:this.rules=h.gfm)}function n(e,t){if(this.options=t||c.defaults,this.links=e,this.rules=p.normal,this.renderer=this.options.renderer||new r,this.renderer.options=this.options,!this.links)throw new Error("Tokens array requires a `links` property.");this.options.gfm?this.options.breaks?this.rules=p.breaks:this.rules=p.gfm:this.options.pedantic&&(this.rules=p.pedantic)}function r(e){this.options=e||{}}function s(e){this.tokens=[],this.token=null,this.options=e||c.defaults,this.options.renderer=this.options.renderer||new r,this.renderer=this.options.renderer,this.renderer.options=this.options}function i(e,t){return e.replace(t?/&/g:/&(?!#?\w+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function a(e){return e.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g,function(e,t){return t=t.toLowerCase(),"colon"===t?":":"#"===t.charAt(0)?"x"===t.charAt(1)?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""})}function l(e,t){return e=e.source,t=t||"",function n(r,s){return r?(s=s.source||s,s=s.replace(/(^|[^\[])\^/g,"$1"),e=e.replace(r,s),n):new RegExp(e,t)}}function o(){}function u(e){for(var t,n,r=1;r<arguments.length;r++){t=arguments[r];for(n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}function c(e,n,r){if(r||"function"==typeof n){r||(r=n,n=null),n=u({},c.defaults,n||{});var a,l,o=n.highlight,h=0;try{a=t.lex(e,n)}catch(e){return r(e)}l=a.length;var p=function(e){if(e)return n.highlight=o,r(e);var t;try{t=s.parse(a,n)}catch(t){e=t}return n.highlight=o,e?r(e):r(null,t)};if(!o||o.length<3)return p();if(delete n.highlight,!l)return p();for(;h<a.length;h++)!function(e){"code"!==e.type?--l||p():o(e.text,e.lang,function(t,n){return t?p(t):null==n||n===e.text?--l||p():(e.text=n,e.escaped=!0,void(--l||p()))})}(a[h])}else try{return n&&(n=u({},c.defaults,n)),s.parse(t.lex(e,n),n)}catch(e){if(e.message+="\nPlease report this to https://github.com/chjj/marked.",(n||c.defaults).silent)return"<p>An error occured:</p><pre>"+i(e.message+"",!0)+"</pre>";throw e}}var h={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:o,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:o,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:o,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};h.bullet=/(?:[*+-]|\d+\.)/,h.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/,h.item=l(h.item,"gm")(/bull/g,h.bullet)(),h.list=l(h.list)(/bull/g,h.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+h.def.source+")")(),h.blockquote=l(h.blockquote)("def",h.def)(),h._tag="(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b",h.html=l(h.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,h._tag)(),h.paragraph=l(h.paragraph)("hr",h.hr)("heading",h.heading)("lheading",h.lheading)("blockquote",h.blockquote)("tag","<"+h._tag)("def",h.def)(),h.normal=u({},h),h.gfm=u({},h.normal,{fences:/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,paragraph:/^/,heading:/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/}),h.gfm.paragraph=l(h.paragraph)("(?!","(?!"+h.gfm.fences.source.replace("\\1","\\2")+"|"+h.list.source.replace("\\1","\\3")+"|")(),h.tables=u({},h.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/}),t.rules=h,t.lex=function(e,n){return new t(n).lex(e)},t.prototype.lex=function(e){return e=e.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n"),this.token(e,!0)},t.prototype.token=function(e,t,n){for(var r,s,i,a,l,o,u,c,p,e=e.replace(/^ +$/gm,"");e;)if((i=this.rules.newline.exec(e))&&(e=e.substring(i[0].length),i[0].length>1&&this.tokens.push({type:"space"})),i=this.rules.code.exec(e))e=e.substring(i[0].length),i=i[0].replace(/^ {4}/gm,""),this.tokens.push({type:"code",text:this.options.pedantic?i:i.replace(/\n+$/,"")});else if(i=this.rules.fences.exec(e))e=e.substring(i[0].length),this.tokens.push({type:"code",lang:i[2],text:i[3]||""});else if(i=this.rules.heading.exec(e))e=e.substring(i[0].length),this.tokens.push({type:"heading",depth:i[1].length,text:i[2]});else if(t&&(i=this.rules.nptable.exec(e))){for(e=e.substring(i[0].length),o={type:"table",header:i[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:i[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:i[3].replace(/\n$/,"").split("\n")},c=0;c<o.align.length;c++)/^ *-+: *$/.test(o.align[c])?o.align[c]="right":/^ *:-+: *$/.test(o.align[c])?o.align[c]="center":/^ *:-+ *$/.test(o.align[c])?o.align[c]="left":o.align[c]=null;for(c=0;c<o.cells.length;c++)o.cells[c]=o.cells[c].split(/ *\| */);this.tokens.push(o)}else if(i=this.rules.lheading.exec(e))e=e.substring(i[0].length),this.tokens.push({type:"heading",depth:"="===i[2]?1:2,text:i[1]});else if(i=this.rules.hr.exec(e))e=e.substring(i[0].length),this.tokens.push({type:"hr"});else if(i=this.rules.blockquote.exec(e))e=e.substring(i[0].length),this.tokens.push({type:"blockquote_start"}),i=i[0].replace(/^ *> ?/gm,""),this.token(i,t,!0),this.tokens.push({type:"blockquote_end"});else if(i=this.rules.list.exec(e)){for(e=e.substring(i[0].length),a=i[2],this.tokens.push({type:"list_start",ordered:a.length>1}),i=i[0].match(this.rules.item),r=!1,p=i.length,c=0;c<p;c++)o=i[c],u=o.length,o=o.replace(/^ *([*+-]|\d+\.) +/,""),~o.indexOf("\n ")&&(u-=o.length,o=this.options.pedantic?o.replace(/^ {1,4}/gm,""):o.replace(new RegExp("^ {1,"+u+"}","gm"),"")),this.options.smartLists&&c!==p-1&&(l=h.bullet.exec(i[c+1])[0],a===l||a.length>1&&l.length>1||(e=i.slice(c+1).join("\n")+e,c=p-1)),s=r||/\n\n(?!\s*$)/.test(o),c!==p-1&&(r="\n"===o.charAt(o.length-1),s||(s=r)),this.tokens.push({type:s?"loose_item_start":"list_item_start"}),this.token(o,!1,n),this.tokens.push({type:"list_item_end"});this.tokens.push({type:"list_end"})}else if(i=this.rules.html.exec(e))e=e.substring(i[0].length),this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&("pre"===i[1]||"script"===i[1]||"style"===i[1]),text:i[0]});else if(!n&&t&&(i=this.rules.def.exec(e)))e=e.substring(i[0].length),this.tokens.links[i[1].toLowerCase()]={href:i[2],title:i[3]};else if(t&&(i=this.rules.table.exec(e))){for(e=e.substring(i[0].length),o={type:"table",header:i[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:i[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:i[3].replace(/(?: *\| *)?\n$/,"").split("\n")},c=0;c<o.align.length;c++)/^ *-+: *$/.test(o.align[c])?o.align[c]="right":/^ *:-+: *$/.test(o.align[c])?o.align[c]="center":/^ *:-+ *$/.test(o.align[c])?o.align[c]="left":o.align[c]=null;for(c=0;c<o.cells.length;c++)o.cells[c]=o.cells[c].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */);this.tokens.push(o)}else if(t&&(i=this.rules.paragraph.exec(e)))e=e.substring(i[0].length),this.tokens.push({type:"paragraph",text:"\n"===i[1].charAt(i[1].length-1)?i[1].slice(0,-1):i[1]});else if(i=this.rules.text.exec(e))e=e.substring(i[0].length),this.tokens.push({type:"text",text:i[0]});else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0));return this.tokens};var p={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:o,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:o,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};p._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/,p._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/,p.link=l(p.link)("inside",p._inside)("href",p._href)(),p.reflink=l(p.reflink)("inside",p._inside)(),p.normal=u({},p),p.pedantic=u({},p.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/}),p.gfm=u({},p.normal,{escape:l(p.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:l(p.text)("]|","~]|")("|","|https?://|")()}),p.breaks=u({},p.gfm,{br:l(p.br)("{2,}","*")(),text:l(p.gfm.text)("{2,}","*")()}),n.rules=p,n.output=function(e,t,r){return new n(t,r).output(e)},n.prototype.output=function(e){for(var t,n,r,s,a="";e;)if(s=this.rules.escape.exec(e))e=e.substring(s[0].length),a+=s[1];else if(s=this.rules.autolink.exec(e))e=e.substring(s[0].length),"@"===s[2]?(n=":"===s[1].charAt(6)?this.mangle(s[1].substring(7)):this.mangle(s[1]),r=this.mangle("mailto:")+n):(n=i(s[1]),r=n),a+=this.renderer.link(r,null,n);else if(this.inLink||!(s=this.rules.url.exec(e))){if(s=this.rules.tag.exec(e))!this.inLink&&/^<a /i.test(s[0])?this.inLink=!0:this.inLink&&/^<\/a>/i.test(s[0])&&(this.inLink=!1),e=e.substring(s[0].length),a+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(s[0]):i(s[0]):s[0];else if(s=this.rules.link.exec(e))e=e.substring(s[0].length),this.inLink=!0,a+=this.outputLink(s,{href:s[2],title:s[3]}),this.inLink=!1;else if((s=this.rules.reflink.exec(e))||(s=this.rules.nolink.exec(e))){if(e=e.substring(s[0].length),t=(s[2]||s[1]).replace(/\s+/g," "),!(t=this.links[t.toLowerCase()])||!t.href){a+=s[0].charAt(0),e=s[0].substring(1)+e;continue}this.inLink=!0,a+=this.outputLink(s,t),this.inLink=!1}else if(s=this.rules.strong.exec(e))e=e.substring(s[0].length),a+=this.renderer.strong(this.output(s[2]||s[1]));else if(s=this.rules.em.exec(e))e=e.substring(s[0].length),a+=this.renderer.em(this.output(s[2]||s[1]));else if(s=this.rules.code.exec(e))e=e.substring(s[0].length),a+=this.renderer.codespan(i(s[2],!0));else if(s=this.rules.br.exec(e))e=e.substring(s[0].length),a+=this.renderer.br();else if(s=this.rules.del.exec(e))e=e.substring(s[0].length),a+=this.renderer.del(this.output(s[1]));else if(s=this.rules.text.exec(e))e=e.substring(s[0].length),a+=this.renderer.text(i(this.smartypants(s[0])));else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0))}else e=e.substring(s[0].length),n=i(s[1]),r=n,a+=this.renderer.link(r,null,n);return a},n.prototype.outputLink=function(e,t){var n=i(t.href),r=t.title?i(t.title):null;return"!"!==e[0].charAt(0)?this.renderer.link(n,r,this.output(e[1])):this.renderer.image(n,r,i(e[1]))},n.prototype.smartypants=function(e){return this.options.smartypants?e.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014\/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014\/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…"):e},n.prototype.mangle=function(e){if(!this.options.mangle)return e;for(var t,n="",r=e.length,s=0;s<r;s++)t=e.charCodeAt(s),Math.random()>.5&&(t="x"+t.toString(16)),n+="&#"+t+";";return n},r.prototype.code=function(e,t,n){if(this.options.highlight){var r=this.options.highlight(e,t);null!=r&&r!==e&&(n=!0,e=r)}return t?'<pre><code class="'+this.options.langPrefix+i(t,!0)+'">'+(n?e:i(e,!0))+"\n</code></pre>\n":"<pre><code>"+(n?e:i(e,!0))+"\n</code></pre>"},r.prototype.blockquote=function(e){return"<blockquote>\n"+e+"</blockquote>\n"},r.prototype.html=function(e){return e},r.prototype.heading=function(e,t,n){return"<h"+t+' id="'+this.options.headerPrefix+n.toLowerCase().replace(/[^\w]+/g,"-")+'">'+e+"</h"+t+">\n"},r.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"},r.prototype.list=function(e,t){var n=t?"ol":"ul";return"<"+n+">\n"+e+"</"+n+">\n"},r.prototype.listitem=function(e){return"<li>"+e+"</li>\n"},r.prototype.paragraph=function(e){return"<p>"+e+"</p>\n"},r.prototype.table=function(e,t){return"<table>\n<thead>\n"+e+"</thead>\n<tbody>\n"+t+"</tbody>\n</table>\n"},r.prototype.tablerow=function(e){return"<tr>\n"+e+"</tr>\n"},r.prototype.tablecell=function(e,t){var n=t.header?"th":"td";return(t.align?"<"+n+' style="text-align:'+t.align+'">':"<"+n+">")+e+"</"+n+">\n"},r.prototype.strong=function(e){return"<strong>"+e+"</strong>"},r.prototype.em=function(e){return"<em>"+e+"</em>"},r.prototype.codespan=function(e){return"<code>"+e+"</code>"},r.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"},r.prototype.del=function(e){return"<del>"+e+"</del>"},r.prototype.link=function(e,t,n){if(this.options.sanitize){try{var r=decodeURIComponent(a(e)).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return""}if(0===r.indexOf("javascript:")||0===r.indexOf("vbscript:"))return""}var s='<a href="'+e+'"';return t&&(s+=' title="'+t+'"'),s+=">"+n+"</a>"},r.prototype.image=function(e,t,n){var r='<img src="'+e+'" alt="'+n+'"';return t&&(r+=' title="'+t+'"'),r+=this.options.xhtml?"/>":">"},r.prototype.text=function(e){return e},s.parse=function(e,t,n){return new s(t,n).parse(e)},s.prototype.parse=function(e){this.inline=new n(e.links,this.options,this.renderer),this.tokens=e.reverse();for(var t="";this.next();)t+=this.tok();return t},s.prototype.next=function(){return this.token=this.tokens.pop()},s.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0},s.prototype.parseText=function(){for(var e=this.token.text;"text"===this.peek().type;)e+="\n"+this.next().text;return this.inline.output(e)},s.prototype.tok=function(){switch(this.token.type){case"space":return"";case"hr":return this.renderer.hr();case"heading":return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text);case"code":return this.renderer.code(this.token.text,this.token.lang,this.token.escaped);case"table":var e,t,n,r,s="",i="";for(n="",e=0;e<this.token.header.length;e++)({header:!0,align:this.token.align[e]}),n+=this.renderer.tablecell(this.inline.output(this.token.header[e]),{header:!0,align:this.token.align[e]});for(s+=this.renderer.tablerow(n),e=0;e<this.token.cells.length;e++){for(t=this.token.cells[e],n="",r=0;r<t.length;r++)n+=this.renderer.tablecell(this.inline.output(t[r]),{header:!1,align:this.token.align[r]});i+=this.renderer.tablerow(n)}return this.renderer.table(s,i);case"blockquote_start":for(var i="";"blockquote_end"!==this.next().type;)i+=this.tok();return this.renderer.blockquote(i);case"list_start":for(var i="",a=this.token.ordered;"list_end"!==this.next().type;)i+=this.tok();return this.renderer.list(i,a);case"list_item_start":for(var i="";"list_item_end"!==this.next().type;)i+="text"===this.token.type?this.parseText():this.tok();return this.renderer.listitem(i);case"loose_item_start":for(var i="";"list_item_end"!==this.next().type;)i+=this.tok();return this.renderer.listitem(i);case"html":var l=this.token.pre||this.options.pedantic?this.token.text:this.inline.output(this.token.text);return this.renderer.html(l);case"paragraph":return this.renderer.paragraph(this.inline.output(this.token.text));case"text":return this.renderer.paragraph(this.parseText())}},o.exec=o,c.options=c.setOptions=function(e){return u(c.defaults,e),c},c.defaults={gfm:!0,tables:!0,breaks:!1,pedantic:!1,sanitize:!1,sanitizer:null,mangle:!0,smartLists:!1,silent:!1,highlight:null,langPrefix:"lang-",smartypants:!1,headerPrefix:"",renderer:new r,xhtml:!1},c.Parser=s,c.parser=s.parse,c.Renderer=r,c.Lexer=t,c.lexer=t.lex,c.InlineLexer=n,c.inlineLexer=n.output,c.parse=c,e.exports=c}).call(function(){return this||("undefined"!=typeof window?window:t)}())}).call(t,n(22))},301:function(e,t,n){"use strict";n(568);var r=n(130),s=function(e){return e&&e.__esModule?e:{default:e}}(r),i=window.location.hash.split("#")[1]||"",a="",l="";if(i){var o=i.split("_");a=o[0],l=o[1],a=function(e){switch(e.toLowerCase()){case"nlp":return"NLP-API";case"speech":case"speech-asr":return"Speech-Asr-O2OAndroidSDK";case"speech-tts":return"Speech-Tts-O2OAndroidSDK";case"face":return"FACE-API";case"ocr":return"OCR-API";case"antiporn":return"Antiporn-API";default:return e}}(a)}(0,s.default)(a||"Beginner-AccessProcess",l)},568:function(e,t){},728:function(e,t,n){e.exports=n(301)},97:function(e,t,n){(function(t){function n(e,t,n){function s(t){var n=g,r=m;return g=m=void 0,_=t,v=e.apply(r,n)}function i(e){return _=e,y=setTimeout(c,t),C?s(e):v}function o(e){var n=e-S,r=e-_,s=t-n;return $?k(s,b-r):s}function u(e){var n=e-S,r=e-_;return void 0===S||n>=t||n<0||$&&r>=b}function c(){var e=w();if(u(e))return h(e);y=setTimeout(c,o(e))}function h(e){return y=void 0,A&&g?s(e):(g=m=void 0,v)}function p(){void 0!==y&&clearTimeout(y),_=0,g=S=m=y=void 0}function f(){return void 0===y?v:h(w())}function d(){var e=w(),n=u(e);if(g=arguments,m=this,S=e,n){if(void 0===y)return i(S);if($)return y=setTimeout(c,t),s(S)}return void 0===y&&(y=setTimeout(c,t)),v}var g,m,b,v,y,S,_=0,C=!1,$=!1,A=!0;if("function"!=typeof e)throw new TypeError(l);return t=a(t)||0,r(n)&&(C=!!n.leading,$="maxWait"in n,b=$?x(a(n.maxWait)||0,t):b,A="trailing"in n?!!n.trailing:A),d.cancel=p,d.flush=f,d}function r(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function s(e){return!!e&&"object"==typeof e}function i(e){return"symbol"==typeof e||s(e)&&y.call(e)==u}function a(e){if("number"==typeof e)return e;if(i(e))return o;if(r(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=r(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(c,"");var n=p.test(e);return n||f.test(e)?d(e.slice(2),n?2:8):h.test(e)?o:+e}var l="Expected a function",o=NaN,u="[object Symbol]",c=/^\s+|\s+$/g,h=/^[-+]0x[0-9a-f]+$/i,p=/^0b[01]+$/i,f=/^0o[0-7]+$/i,d=parseInt,g="object"==typeof t&&t&&t.Object===Object&&t,m="object"==typeof self&&self&&self.Object===Object&&self,b=g||m||Function("return this")(),v=Object.prototype,y=v.toString,x=Math.max,k=Math.min,w=function(){return b.Date.now()};e.exports=n}).call(t,n(22))}},[728]);