duAI([7],{12:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var s=n(0),i=r(s),a=i.default;!function(e,t,n,r){var s="docAccordionMenu",i={speed:300,showDelay:0,hideDelay:0,singleOpen:!0,clickEffect:!0},a=function(t,n){this.element=t,this.settings=e.extend({},i,n),this._defaults=i,this._name=s,this.init()};e.extend(a.prototype,{init:function(){this.openSubmenu(),this.submenuIndicators(),i.clickEffect&&this.addClickEffect()},openSubmenu:function(){e(this.element).children("ul").find("li").bind("click touchstart",function(n){if(n.stopPropagation(),n.preventDefault(),e(this).children(".submenu").length>0){if("none"===e(this).children(".submenu").css("display"))return e(this).children(".submenu").delay(i.showDelay).slideDown(i.speed),i.singleOpen&&e(this).siblings().children(".submenu").slideUp(i.speed),!1;e(this).children(".submenu").delay(i.hideDelay).slideUp(i.speed),e(this).children(".submenu").siblings("a").hasClass("submenu-indicator-minus")}t.location.href=e(this).children("a").attr("href")})},submenuIndicators:function(){e(this.element).find(".submenu").length>0},addClickEffect:function(){var t=void 0,n=void 0,r=void 0,s=void 0;e(this.element).find("a").bind("click touchstart",function(i){e(".ink").remove(),0===e(this).children(".ink").length&&e(this).prepend('<span class="ink"></span>'),t=e(this).find(".ink"),t.removeClass("animate-ink"),t.height()||t.width()||(n=Math.max(e(this).outerWidth(),e(this).outerHeight()),t.css({height:n,width:n})),r=i.pageX-e(this).offset().left-t.width()/2,s=i.pageY-e(this).offset().top-t.height()/2,t.css({top:s+"px",left:r+"px"}).addClass("animate-ink")})}}),e.fn[s]=function(t){return this.each(function(){e.data(this,"plugin_"+s)||e.data(this,"plugin_"+s,new a(this,t))}),this}}(a,window,document)},13:function(e,t){var n=!1;window.PR_SHOULD_USE_CONTINUATION=!0;var r,s;!function(){function e(e){function t(e){var t=e.charCodeAt(0);if(92!==t)return t;var n=e.charAt(1);return t=c[n],t?t:"0"<=n&&n<="7"?parseInt(e.substring(1),8):"u"===n||"x"===n?parseInt(e.substring(2),16):e.charCodeAt(1)}function n(e){if(e<32)return(e<16?"\\x0":"\\x")+e.toString(16);var t=String.fromCharCode(e);return"\\"===t||"-"===t||"]"===t||"^"===t?"\\"+t:t}function r(e){var r=e.substring(1,e.length-1).match(new RegExp("\\\\u[0-9A-Fa-f]{4}|\\\\x[0-9A-Fa-f]{2}|\\\\[0-3][0-7]{0,2}|\\\\[0-7]{1,2}|\\\\[\\s\\S]|-|[^-\\\\]","g")),s=[],i="^"===r[0],a=["["];i&&a.push("^");for(var l=i?1:0,o=r.length;l<o;++l){var u=r[l];if(/\\[bdsw]/i.test(u))a.push(u);else{var h,c=t(u);l+2<o&&"-"===r[l+1]?(h=t(r[l+2]),l+=2):h=c,s.push([c,h]),h<65||c>122||(h<65||c>90||s.push([32|Math.max(65,c),32|Math.min(h,90)]),h<97||c>122||s.push([Math.max(97,c)&-33,Math.min(h,122)&-33]))}}s.sort(function(e,t){return e[0]-t[0]||t[1]-e[1]});for(var p=[],d=[],l=0;l<s.length;++l){var f=s[l];f[0]<=d[1]+1?d[1]=Math.max(d[1],f[1]):p.push(d=f)}for(var l=0;l<p.length;++l){var f=p[l];a.push(n(f[0])),f[1]>f[0]&&(f[1]+1>f[0]&&a.push("-"),a.push(n(f[1])))}return a.push("]"),a.join("")}function s(e){for(var t=e.source.match(new RegExp("(?:\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]|\\\\u[A-Fa-f0-9]{4}|\\\\x[A-Fa-f0-9]{2}|\\\\[0-9]+|\\\\[^ux0-9]|\\(\\?[:!=]|[\\(\\)\\^]|[^\\x5B\\x5C\\(\\)\\^]+)","g")),s=t.length,l=[],o=0,u=0;o<s;++o){var h=t[o];if("("===h)++u;else if("\\"===h.charAt(0)){var c=+h.substring(1);c&&(c<=u?l[c]=-1:t[o]=n(c))}}for(var o=1;o<l.length;++o)-1===l[o]&&(l[o]=++i);for(var o=0,u=0;o<s;++o){var h=t[o];if("("===h)++u,l[u]||(t[o]="(?:");else if("\\"===h.charAt(0)){var c=+h.substring(1);c&&c<=u&&(t[o]="\\"+l[c])}}for(var o=0;o<s;++o)"^"===t[o]&&"^"!==t[o+1]&&(t[o]="");if(e.ignoreCase&&a)for(var o=0;o<s;++o){var h=t[o],p=h.charAt(0);h.length>=2&&"["===p?t[o]=r(h):"\\"!==p&&(t[o]=h.replace(/[a-zA-Z]/g,function(e){var t=e.charCodeAt(0);return"["+String.fromCharCode(t&-33,32|t)+"]"}))}return t.join("")}for(var i=0,a=!1,l=!1,o=0,u=e.length;o<u;++o){var h=e[o];if(h.ignoreCase)l=!0;else if(/[a-z]/i.test(h.source.replace(/\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi,""))){a=!0,l=!1;break}}for(var c={b:8,t:9,n:10,v:11,f:12,r:13},p=[],o=0,u=e.length;o<u;++o){var h=e[o];if(h.global||h.multiline)throw new Error(""+h);p.push("(?:"+s(h)+")")}return new RegExp(p.join("|"),l?"gi":"g")}function t(e,t){function n(e){var o=e.nodeType;if(1==o){if(r.test(e.className))return;for(var u=e.firstChild;u;u=u.nextSibling)n(u);var h=e.nodeName.toLowerCase();"br"!==h&&"li"!==h||(s[l]="\n",a[l<<1]=i++,a[l++<<1|1]=e)}else if(3==o||4==o){var c=e.nodeValue;c.length&&(c=t?c.replace(/\r\n?/g,"\n"):c.replace(/[ \t\r\n]+/g," "),s[l]=c,a[l<<1]=i,i+=c.length,a[l++<<1|1]=e)}}var r=/(?:^|\s)nocode(?:\s|$)/,s=[],i=0,a=[],l=0;return n(e),{sourceCode:s.join("").replace(/\n$/,""),spans:a}}function i(e,t,n,r,s){if(n){var i={sourceNode:e,pre:1,langExtension:null,numberLines:null,sourceCode:n,spans:null,basePos:t,decorations:null};r(i),s.push.apply(s,i.decorations)}}function a(e){for(var t=void 0,n=e.firstChild;n;n=n.nextSibling){var r=n.nodeType;t=1===r?t?e:n:3===r&&H.test(n.nodeValue)?e:t}return t===e?void 0:t}function l(t,n){var r,s={};!function(){for(var i=t.concat(n),a=[],l={},o=0,u=i.length;o<u;++o){var h=i[o],c=h[3];if(c)for(var p=c.length;--p>=0;)s[c.charAt(p)]=h;var d=h[1],f=""+d;l.hasOwnProperty(f)||(a.push(d),l[f]=null)}a.push(/[\0-\uffff]/),r=e(a)}();var a=n.length,l=function(e){for(var t=e.sourceCode,o=e.basePos,u=e.sourceNode,h=[o,q],c=0,d=t.match(r)||[],f={},g=0,m=d.length;g<m;++g){var b,v=d[g],y=f[v],x=void 0;if("string"==typeof y)b=!1;else{var k=s[v.charAt(0)];if(k)x=v.match(k[1]),y=k[0];else{for(var w=0;w<a;++w)if(k=n[w],x=v.match(k[1])){y=k[0];break}x||(y=q)}b=y.length>=5&&"lang-"===y.substring(0,5),!b||x&&"string"==typeof x[1]||(b=!1,y=M),b||(f[v]=y)}var _=c;if(c+=v.length,b){var S=x[1],C=v.indexOf(S),$=C+S.length;x[2]&&($=v.length-x[2].length,C=$-S.length);var N=y.substring(5);i(u,o+_,v.substring(0,C),l,h),i(u,o+_+C,S,p(N,S),h),i(u,o+_+$,v.substring($),l,h)}else h.push(o+_,y)}e.decorations=h};return l}function o(e){var t=[],n=[];e.tripleQuotedStrings?t.push([P,/^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/,null,"'\""]):e.multiLineStrings?t.push([P,/^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/,null,"'\"`"]):t.push([P,/^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/,null,"\"'"]),e.verbatimStrings&&n.push([P,/^@\"(?:[^\"]|\"\")*(?:\"|$)/,null]);var r=e.hashComments;r&&(e.cStyleComments?(r>1?t.push([R,/^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/,null,"#"]):t.push([R,/^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\r\n]*)/,null,"#"]),n.push([P,/^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/,null])):t.push([R,/^#[^\r\n]*/,null,"#"])),e.cStyleComments&&(n.push([R,/^\/\/[^\r\n]*/,null]),n.push([R,/^\/\*[\s\S]*?(?:\*\/|$)/,null]));var s=e.regexLiterals;if(s){var i=s>1?"":"\n\r",a=i?".":"[\\S\\s]",o="/(?=[^/*"+i+"])(?:[^/\\x5B\\x5C"+i+"]|\\x5C"+a+"|\\x5B(?:[^\\x5C\\x5D"+i+"]|\\x5C"+a+")*(?:\\x5D|$))+/";n.push(["lang-regex",RegExp("^"+F+"("+o+")")])}var u=e.types;u&&n.push([I,u]);var h=(""+e.keywords).replace(/^ | $/g,"");h.length&&n.push([T,new RegExp("^(?:"+h.replace(/[\s,]+/g,"|")+")\\b"),null]),t.push([q,/^\s+/,null," \r\n\t "]);var c="^.[^\\s\\w.$@'\"`/\\\\]*";return e.regexLiterals&&(c+="(?!s*/)"),n.push([O,/^@[a-z_$][a-z_$@0-9]*/i,null],[I,/^(?:[@_]?[A-Z]+[a-z][A-Za-z_$@0-9]*|\w+_t\b)/,null],[q,/^[a-z_$][a-z_$@0-9]*/i,null],[O,new RegExp("^(?:0x[a-f0-9]+|(?:\\d(?:_\\d+)*\\d*(?:\\.\\d*)?|\\.\\d\\+)(?:e[+\\-]?\\d+)?)[a-z]*","i"),null,"0123456789"],[q,/^\\[\s\S]?/,null],[D,new RegExp(c),null]),l(t,n)}function u(e,t,n){function r(e){var t=e.nodeType;if(1!=t||i.test(e.className)){if((3==t||4==t)&&n){var o=e.nodeValue,u=o.match(a);if(u){var h=o.substring(0,u.index);e.nodeValue=h;var c=o.substring(u.index+u[0].length);if(c){var p=e.parentNode;p.insertBefore(l.createTextNode(c),e.nextSibling)}s(e),h||e.parentNode.removeChild(e)}}}else if("br"===e.nodeName)s(e),e.parentNode&&e.parentNode.removeChild(e);else for(var d=e.firstChild;d;d=d.nextSibling)r(d)}function s(e){function t(e,n){var r=n?e.cloneNode(!1):e,s=e.parentNode;if(s){var i=t(s,1),a=e.nextSibling;i.appendChild(r);for(var l=a;l;l=a)a=l.nextSibling,i.appendChild(l)}return r}for(;!e.nextSibling;)if(e=e.parentNode,!e)return;for(var n,r=t(e.nextSibling,0);(n=r.parentNode)&&1===n.nodeType;)r=n;u.push(r)}for(var i=/(?:^|\s)nocode(?:\s|$)/,a=/\r\n?|\n/,l=e.ownerDocument,o=l.createElement("li");e.firstChild;)o.appendChild(e.firstChild);for(var u=[o],h=0;h<u.length;++h)r(u[h]);t===(0|t)&&u[0].setAttribute("value",t);var c=l.createElement("ol");c.className="linenums";for(var p=Math.max(0,t-1|0)||0,h=0,d=u.length;h<d;++h)o=u[h],o.className="L"+(h+p)%10,o.firstChild||o.appendChild(l.createTextNode(" ")),c.appendChild(o);e.appendChild(c)}function h(e){var t=/\bMSIE\s(\d+)/.exec(navigator.userAgent);t=t&&+t[1]<=8;var n=/\n/g,r=e.sourceCode,s=r.length,i=0,a=e.spans,l=a.length,o=0,u=e.decorations,h=u.length,c=0;u[h]=s;var p,d;for(d=p=0;d<h;)u[d]!==u[d+2]?(u[p++]=u[d++],u[p++]=u[d++]):d+=2;for(h=p,d=p=0;d<h;){for(var f=u[d],g=u[d+1],m=d+2;m+2<=h&&u[m+1]===g;)m+=2;u[p++]=f,u[p++]=g,d=m}h=u.length=p;var b=e.sourceNode,v="";b&&(v=b.style.display,b.style.display="none");try{for(;o<l;){var y,x=(a[o],a[o+2]||s),k=u[c+2]||s,m=Math.min(x,k),w=a[o+1];if(1!==w.nodeType&&(y=r.substring(i,m))){t&&(y=y.replace(n,"\r")),w.nodeValue=y;var _=w.ownerDocument,S=_.createElement("span");S.className=u[c+1];var C=w.parentNode;C.replaceChild(S,w),S.appendChild(w),i<x&&(a[o+1]=w=_.createTextNode(r.substring(m,x)),C.insertBefore(w,S.nextSibling))}i=m,i>=x&&(o+=2),i>=k&&(c+=2)}}finally{b&&(b.style.display=v)}}function c(e,t){for(var n=t.length;--n>=0;){var r=t[n];Q.hasOwnProperty(r)?m.console&&console.warn("cannot override language handler %s",r):Q[r]=e}}function p(e,t){return e&&Q.hasOwnProperty(e)||(e=/^\s*</.test(t)?"default-markup":"default-code"),Q[e]}function d(e){var n=e.langExtension;try{var r=t(e.sourceNode,e.pre),s=r.sourceCode;e.sourceCode=s,e.spans=r.spans,e.basePos=0,p(n,s)(e),h(e)}catch(e){m.console&&console.log(e&&e.stack||e)}}function f(e,t,n){var r=n||!1,s=t||null,i=document.createElement("div");i.innerHTML="<pre>"+e+"</pre>",i=i.firstChild,r&&u(i,r,!0);var a={langExtension:s,numberLines:r,sourceNode:i,pre:1,sourceCode:null,basePos:null,spans:null,decorations:null};return d(a),i.innerHTML}function g(e,t){function n(e){return s.getElementsByTagName(e)}function r(){for(var t=m.PR_SHOULD_USE_CONTINUATION?f.now()+250:1/0;g<o.length&&f.now()<t;g++){for(var n=o[g],s=_,l=n;l=l.previousSibling;){var h=l.nodeType,c=(7===h||8===h)&&l.nodeValue;if(c?!/^\??prettify\b/.test(c):3!==h||/\S/.test(l.nodeValue))break;if(c){s={},c.replace(/\b(\w+)=([\w:.%+-]+)/g,function(e,t,n){s[t]=n});break}}var p=n.className;if((s!==_||v.test(p))&&!y.test(p)){for(var S=!1,C=n.parentNode;C;C=C.parentNode){var $=C.tagName;if(w.test($)&&C.className&&v.test(C.className)){S=!0;break}}if(!S){n.className+=" prettyprinted";var N=s.lang;if(!N){N=p.match(b);var L;!N&&(L=a(n))&&k.test(L.tagName)&&(N=L.className.match(b)),N&&(N=N[1])}var A;if(x.test(n.tagName))A=1;else{var E=n.currentStyle,P=i.defaultView,T=E?E.whiteSpace:P&&P.getComputedStyle?P.getComputedStyle(n,null).getPropertyValue("white-space"):0;A=T&&"pre"===T.substring(0,3)}var R=s.linenums;(R="true"===R||+R)||(R=p.match(/\blinenums\b(?::(\d+))?/),R=!!R&&(!R[1]||!R[1].length||+R[1])),R&&u(n,R,A);var I={langExtension:N,sourceNode:n,numberLines:R,pre:A,sourceCode:null,basePos:null,spans:null,decorations:null};d(I)}}}g<o.length?m.setTimeout(r,250):"function"==typeof e&&e()}for(var s=t||document.body,i=s.ownerDocument||document,l=[n("pre"),n("code"),n("xmp")],o=[],h=0;h<l.length;++h)for(var c=0,p=l[h].length;c<p;++c)o.push(l[h][c]);l=null;var f=Date;f.now||(f={now:function(){return+new Date}});var g=0,b=/\blang(?:uage)?-([\w.]+)(?!\S)/,v=/\bprettyprint\b/,y=/\bprettyprinted\b/,x=/pre|xmp/i,k=/^code$/i,w=/^(?:pre|code|xmp)$/i,_={};r()}var m=window,b=["break,continue,do,else,for,if,return,while"],v=[b,"auto,case,char,const,default,double,enum,extern,float,goto,inline,int,long,register,restrict,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"],y=[v,"catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"],x=[y,"alignas,alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,delegate,dynamic_cast,explicit,export,friend,generic,late_check,mutable,namespace,noexcept,noreturn,nullptr,property,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],k=[y,"abstract,assert,boolean,byte,extends,finally,final,implements,import,instanceof,interface,null,native,package,strictfp,super,synchronized,throws,transient"],w=[y,"abstract,add,alias,as,ascending,async,await,base,bool,by,byte,checked,decimal,delegate,descending,dynamic,event,finally,fixed,foreach,from,get,global,group,implicit,in,interface,internal,into,is,join,let,lock,null,object,out,override,orderby,params,partial,readonly,ref,remove,sbyte,sealed,select,set,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,value,var,virtual,where,yield"],_="all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes",S=[y,"abstract,async,await,constructor,debugger,enum,eval,export,function,get,implements,instanceof,interface,let,null,set,undefined,var,with,yield,Infinity,NaN"],C="caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",$=[b,"and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"],N=[b,"alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"],L=[b,"case,done,elif,esac,eval,fi,function,in,local,set,then,until"],A=[x,w,k,S,C,$,N,L],E=/^(DIR|FILE|array|vector|(de|priority_)?queue|(forward_)?list|stack|(const_)?(reverse_)?iterator|(unordered_)?(multi)?(set|map)|bitset|u?(int|float)\d*)\b/,P="str",T="kwd",R="com",I="typ",O="lit",D="pun",q="pln",z="tag",j="dec",M="src",U="atn",V="atv",B="nocode",F="(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*",H=/\S/,G=o({keywords:A,hashComments:!0,cStyleComments:!0,multiLineStrings:!0,regexLiterals:!0}),Q={};c(G,["default-code"]),c(l([],[[q,/^[^<?]+/],[j,/^<!\w[^>]*(?:>|$)/],[R,/^<\!--[\s\S]*?(?:-\->|$)/],["lang-",/^<\?([\s\S]+?)(?:\?>|$)/],["lang-",/^<%([\s\S]+?)(?:%>|$)/],[D,/^(?:<[%?]|[%?]>)/],["lang-",/^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i],["lang-js",/^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i],["lang-css",/^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i],["lang-in.tag",/^(<\/?[a-z][^<>]*>)/i]]),["default-markup","htm","html","mxml","xhtml","xml","xsl"]),c(l([[q,/^[\s]+/,null," \t\r\n"],[V,/^(?:\"[^\"]*\"?|\'[^\']*\'?)/,null,"\"'"]],[[z,/^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i],[U,/^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],["lang-uq.val",/^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/],[D,/^[=<>\/]+/],["lang-js",/^on\w+\s*=\s*\"([^\"]+)\"/i],["lang-js",/^on\w+\s*=\s*\'([^\']+)\'/i],["lang-js",/^on\w+\s*=\s*([^\"\'>\s]+)/i],["lang-css",/^style\s*=\s*\"([^\"]+)\"/i],["lang-css",/^style\s*=\s*\'([^\']+)\'/i],["lang-css",/^style\s*=\s*([^\"\'>\s]+)/i]]),["in.tag"]),c(l([],[[V,/^[\s\S]+/]]),["uq.val"]),c(o({keywords:x,hashComments:!0,cStyleComments:!0,types:E}),["c","cc","cpp","cxx","cyc","m"]),c(o({keywords:"null,true,false"}),["json"]),c(o({keywords:w,hashComments:!0,cStyleComments:!0,verbatimStrings:!0,types:E}),["cs"]),c(o({keywords:k,cStyleComments:!0}),["java"]),c(o({keywords:L,hashComments:!0,multiLineStrings:!0}),["bash","bsh","csh","sh"]),c(o({keywords:$,hashComments:!0,multiLineStrings:!0,tripleQuotedStrings:!0}),["cv","py","python"]),c(o({keywords:C,hashComments:!0,multiLineStrings:!0,regexLiterals:2}),["perl","pl","pm"]),c(o({keywords:N,hashComments:!0,multiLineStrings:!0,regexLiterals:!0}),["rb","ruby"]),c(o({keywords:S,cStyleComments:!0,regexLiterals:!0}),["javascript","js","ts","typescript"]),c(o({keywords:_,hashComments:3,cStyleComments:!0,multilineStrings:!0,tripleQuotedStrings:!0,regexLiterals:!0}),["coffee"]),c(l([],[[P,/^[\s\S]+/]]),["regex"]);var Y=m.PR={createSimpleLexer:l,registerLangHandler:c,sourceDecorator:o,PR_ATTRIB_NAME:U,PR_ATTRIB_VALUE:V,PR_COMMENT:R,PR_DECLARATION:j,PR_KEYWORD:T,PR_LITERAL:O,PR_NOCODE:B,PR_PLAIN:q,PR_PUNCTUATION:D,PR_SOURCE:M,PR_STRING:P,PR_TAG:z,PR_TYPE:I,prettyPrintOne:n?m.prettyPrintOne=f:r=f,prettyPrint:s=n?m.prettyPrint=g:s=g},Z=m.define;"function"==typeof Z&&Z.amd&&Z("google-code-prettify",[],function(){return Y})}()},130:function(e,t,n){e.exports=n(19)},14:function(e,t,n){(function(t){(function(){function t(e){this.tokens=[],this.tokens.links={},this.options=e||h.defaults,this.rules=c.normal,this.options.gfm&&(this.options.tables?this.rules=c.tables:this.rules=c.gfm)}function n(e,t){if(this.options=t||h.defaults,this.links=e,this.rules=p.normal,this.renderer=this.options.renderer||new r,this.renderer.options=this.options,!this.links)throw new Error("Tokens array requires a `links` property.");this.options.gfm?this.options.breaks?this.rules=p.breaks:this.rules=p.gfm:this.options.pedantic&&(this.rules=p.pedantic)}function r(e){this.options=e||{}}function s(e){this.tokens=[],this.token=null,this.options=e||h.defaults,this.options.renderer=this.options.renderer||new r,this.renderer=this.options.renderer,this.renderer.options=this.options}function i(e,t){return e.replace(t?/&/g:/&(?!#?\w+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function a(e){return e.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g,function(e,t){return t=t.toLowerCase(),"colon"===t?":":"#"===t.charAt(0)?"x"===t.charAt(1)?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""})}function l(e,t){return e=e.source,t=t||"",function n(r,s){return r?(s=s.source||s,s=s.replace(/(^|[^\[])\^/g,"$1"),e=e.replace(r,s),n):new RegExp(e,t)}}function o(){}function u(e){for(var t,n,r=1;r<arguments.length;r++){t=arguments[r];for(n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}function h(e,n,r){if(r||"function"==typeof n){r||(r=n,n=null),n=u({},h.defaults,n||{});var a,l,o=n.highlight,c=0;try{a=t.lex(e,n)}catch(e){return r(e)}l=a.length;var p=function(e){if(e)return n.highlight=o,r(e);var t;try{t=s.parse(a,n)}catch(t){e=t}return n.highlight=o,e?r(e):r(null,t)};if(!o||o.length<3)return p();if(delete n.highlight,!l)return p();for(;c<a.length;c++)!function(e){return"code"!==e.type?--l||p():o(e.text,e.lang,function(t,n){return t?p(t):null==n||n===e.text?--l||p():(e.text=n,e.escaped=!0,void(--l||p()))})}(a[c])}else try{return n&&(n=u({},h.defaults,n)),s.parse(t.lex(e,n),n)}catch(e){if(e.message+="\nPlease report this to https://github.com/chjj/marked.",(n||h.defaults).silent)return"<p>An error occured:</p><pre>"+i(e.message+"",!0)+"</pre>";throw e}}var c={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:o,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:o,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:o,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};c.bullet=/(?:[*+-]|\d+\.)/,c.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/,c.item=l(c.item,"gm")(/bull/g,c.bullet)(),c.list=l(c.list)(/bull/g,c.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+c.def.source+")")(),c.blockquote=l(c.blockquote)("def",c.def)(),c._tag="(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b",c.html=l(c.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,c._tag)(),c.paragraph=l(c.paragraph)("hr",c.hr)("heading",c.heading)("lheading",c.lheading)("blockquote",c.blockquote)("tag","<"+c._tag)("def",c.def)(),c.normal=u({},c),c.gfm=u({},c.normal,{fences:/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,paragraph:/^/,heading:/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/}),c.gfm.paragraph=l(c.paragraph)("(?!","(?!"+c.gfm.fences.source.replace("\\1","\\2")+"|"+c.list.source.replace("\\1","\\3")+"|")(),c.tables=u({},c.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/}),t.rules=c,t.lex=function(e,n){var r=new t(n);return r.lex(e)},t.prototype.lex=function(e){return e=e.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n"),this.token(e,!0)},t.prototype.token=function(e,t,n){for(var r,s,i,a,l,o,u,h,p,e=e.replace(/^ +$/gm,"");e;)if((i=this.rules.newline.exec(e))&&(e=e.substring(i[0].length),i[0].length>1&&this.tokens.push({type:"space"})),i=this.rules.code.exec(e))e=e.substring(i[0].length),i=i[0].replace(/^ {4}/gm,""),this.tokens.push({type:"code",text:this.options.pedantic?i:i.replace(/\n+$/,"")});else if(i=this.rules.fences.exec(e))e=e.substring(i[0].length),this.tokens.push({type:"code",lang:i[2],text:i[3]||""});else if(i=this.rules.heading.exec(e))e=e.substring(i[0].length),this.tokens.push({type:"heading",depth:i[1].length,text:i[2]});else if(t&&(i=this.rules.nptable.exec(e))){for(e=e.substring(i[0].length),o={type:"table",header:i[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:i[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:i[3].replace(/\n$/,"").split("\n")},h=0;h<o.align.length;h++)/^ *-+: *$/.test(o.align[h])?o.align[h]="right":/^ *:-+: *$/.test(o.align[h])?o.align[h]="center":/^ *:-+ *$/.test(o.align[h])?o.align[h]="left":o.align[h]=null;for(h=0;h<o.cells.length;h++)o.cells[h]=o.cells[h].split(/ *\| */);this.tokens.push(o)}else if(i=this.rules.lheading.exec(e))e=e.substring(i[0].length),this.tokens.push({type:"heading",depth:"="===i[2]?1:2,text:i[1]});else if(i=this.rules.hr.exec(e))e=e.substring(i[0].length),this.tokens.push({type:"hr"});else if(i=this.rules.blockquote.exec(e))e=e.substring(i[0].length),this.tokens.push({type:"blockquote_start"}),i=i[0].replace(/^ *> ?/gm,""),this.token(i,t,!0),this.tokens.push({type:"blockquote_end"});else if(i=this.rules.list.exec(e)){for(e=e.substring(i[0].length),a=i[2],this.tokens.push({type:"list_start",ordered:a.length>1}),i=i[0].match(this.rules.item),r=!1,p=i.length,h=0;h<p;h++)o=i[h],u=o.length,o=o.replace(/^ *([*+-]|\d+\.) +/,""),~o.indexOf("\n ")&&(u-=o.length,o=this.options.pedantic?o.replace(/^ {1,4}/gm,""):o.replace(new RegExp("^ {1,"+u+"}","gm"),"")),this.options.smartLists&&h!==p-1&&(l=c.bullet.exec(i[h+1])[0],a===l||a.length>1&&l.length>1||(e=i.slice(h+1).join("\n")+e,h=p-1)),s=r||/\n\n(?!\s*$)/.test(o),h!==p-1&&(r="\n"===o.charAt(o.length-1),s||(s=r)),this.tokens.push({type:s?"loose_item_start":"list_item_start"}),this.token(o,!1,n),this.tokens.push({type:"list_item_end"});this.tokens.push({type:"list_end"})}else if(i=this.rules.html.exec(e))e=e.substring(i[0].length),this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&("pre"===i[1]||"script"===i[1]||"style"===i[1]),text:i[0]});else if(!n&&t&&(i=this.rules.def.exec(e)))e=e.substring(i[0].length),this.tokens.links[i[1].toLowerCase()]={href:i[2],title:i[3]};else if(t&&(i=this.rules.table.exec(e))){for(e=e.substring(i[0].length),o={type:"table",header:i[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:i[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:i[3].replace(/(?: *\| *)?\n$/,"").split("\n")},h=0;h<o.align.length;h++)/^ *-+: *$/.test(o.align[h])?o.align[h]="right":/^ *:-+: *$/.test(o.align[h])?o.align[h]="center":/^ *:-+ *$/.test(o.align[h])?o.align[h]="left":o.align[h]=null;for(h=0;h<o.cells.length;h++)o.cells[h]=o.cells[h].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */);this.tokens.push(o)}else if(t&&(i=this.rules.paragraph.exec(e)))e=e.substring(i[0].length),this.tokens.push({type:"paragraph",text:"\n"===i[1].charAt(i[1].length-1)?i[1].slice(0,-1):i[1]});else if(i=this.rules.text.exec(e))e=e.substring(i[0].length),this.tokens.push({type:"text",text:i[0]});else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0));return this.tokens};var p={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:o,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:o,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};p._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/,p._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/,p.link=l(p.link)("inside",p._inside)("href",p._href)(),p.reflink=l(p.reflink)("inside",p._inside)(),p.normal=u({},p),p.pedantic=u({},p.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/}),p.gfm=u({},p.normal,{escape:l(p.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:l(p.text)("]|","~]|")("|","|https?://|")()}),p.breaks=u({},p.gfm,{br:l(p.br)("{2,}","*")(),text:l(p.gfm.text)("{2,}","*")()}),n.rules=p,n.output=function(e,t,r){var s=new n(t,r);return s.output(e)},n.prototype.output=function(e){for(var t,n,r,s,a="";e;)if(s=this.rules.escape.exec(e))e=e.substring(s[0].length),a+=s[1];else if(s=this.rules.autolink.exec(e))e=e.substring(s[0].length),"@"===s[2]?(n=":"===s[1].charAt(6)?this.mangle(s[1].substring(7)):this.mangle(s[1]),r=this.mangle("mailto:")+n):(n=i(s[1]),r=n),a+=this.renderer.link(r,null,n);else if(this.inLink||!(s=this.rules.url.exec(e))){if(s=this.rules.tag.exec(e))!this.inLink&&/^<a /i.test(s[0])?this.inLink=!0:this.inLink&&/^<\/a>/i.test(s[0])&&(this.inLink=!1),e=e.substring(s[0].length),a+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(s[0]):i(s[0]):s[0];else if(s=this.rules.link.exec(e))e=e.substring(s[0].length),this.inLink=!0,a+=this.outputLink(s,{href:s[2],title:s[3]}),this.inLink=!1;else if((s=this.rules.reflink.exec(e))||(s=this.rules.nolink.exec(e))){if(e=e.substring(s[0].length),t=(s[2]||s[1]).replace(/\s+/g," "),t=this.links[t.toLowerCase()],!t||!t.href){a+=s[0].charAt(0),e=s[0].substring(1)+e;continue}this.inLink=!0,a+=this.outputLink(s,t),this.inLink=!1}else if(s=this.rules.strong.exec(e))e=e.substring(s[0].length),a+=this.renderer.strong(this.output(s[2]||s[1]));else if(s=this.rules.em.exec(e))e=e.substring(s[0].length),a+=this.renderer.em(this.output(s[2]||s[1]));else if(s=this.rules.code.exec(e))e=e.substring(s[0].length),a+=this.renderer.codespan(i(s[2],!0));else if(s=this.rules.br.exec(e))e=e.substring(s[0].length),a+=this.renderer.br();else if(s=this.rules.del.exec(e))e=e.substring(s[0].length),a+=this.renderer.del(this.output(s[1]));else if(s=this.rules.text.exec(e))e=e.substring(s[0].length),a+=this.renderer.text(i(this.smartypants(s[0])));else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0))}else e=e.substring(s[0].length),n=i(s[1]),r=n,a+=this.renderer.link(r,null,n);return a},n.prototype.outputLink=function(e,t){var n=i(t.href),r=t.title?i(t.title):null;return"!"!==e[0].charAt(0)?this.renderer.link(n,r,this.output(e[1])):this.renderer.image(n,r,i(e[1]))},n.prototype.smartypants=function(e){return this.options.smartypants?e.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014\/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014\/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…"):e},n.prototype.mangle=function(e){if(!this.options.mangle)return e;for(var t,n="",r=e.length,s=0;s<r;s++)t=e.charCodeAt(s),Math.random()>.5&&(t="x"+t.toString(16)),n+="&#"+t+";";return n},r.prototype.code=function(e,t,n){if(this.options.highlight){var r=this.options.highlight(e,t);null!=r&&r!==e&&(n=!0,e=r)}return t?'<pre><code class="'+this.options.langPrefix+i(t,!0)+'">'+(n?e:i(e,!0))+"\n</code></pre>\n":"<pre><code>"+(n?e:i(e,!0))+"\n</code></pre>"},r.prototype.blockquote=function(e){return"<blockquote>\n"+e+"</blockquote>\n"},r.prototype.html=function(e){return e},r.prototype.heading=function(e,t,n){return"<h"+t+' id="'+this.options.headerPrefix+n.toLowerCase().replace(/[^\w]+/g,"-")+'">'+e+"</h"+t+">\n"},r.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"},r.prototype.list=function(e,t){var n=t?"ol":"ul";return"<"+n+">\n"+e+"</"+n+">\n"},r.prototype.listitem=function(e){return"<li>"+e+"</li>\n"},r.prototype.paragraph=function(e){return"<p>"+e+"</p>\n"},r.prototype.table=function(e,t){return"<table>\n<thead>\n"+e+"</thead>\n<tbody>\n"+t+"</tbody>\n</table>\n"},r.prototype.tablerow=function(e){return"<tr>\n"+e+"</tr>\n"},r.prototype.tablecell=function(e,t){var n=t.header?"th":"td",r=t.align?"<"+n+' style="text-align:'+t.align+'">':"<"+n+">";return r+e+"</"+n+">\n"},r.prototype.strong=function(e){return"<strong>"+e+"</strong>"},r.prototype.em=function(e){return"<em>"+e+"</em>"},r.prototype.codespan=function(e){return"<code>"+e+"</code>"},r.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"},r.prototype.del=function(e){return"<del>"+e+"</del>"},r.prototype.link=function(e,t,n){if(this.options.sanitize){try{var r=decodeURIComponent(a(e)).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return""}if(0===r.indexOf("javascript:")||0===r.indexOf("vbscript:"))return""}var s='<a href="'+e+'"';return t&&(s+=' title="'+t+'"'),s+=">"+n+"</a>"},r.prototype.image=function(e,t,n){var r='<img src="'+e+'" alt="'+n+'"';return t&&(r+=' title="'+t+'"'),r+=this.options.xhtml?"/>":">"},r.prototype.text=function(e){return e},s.parse=function(e,t,n){var r=new s(t,n);return r.parse(e)},s.prototype.parse=function(e){this.inline=new n(e.links,this.options,this.renderer),this.tokens=e.reverse();for(var t="";this.next();)t+=this.tok();return t},s.prototype.next=function(){return this.token=this.tokens.pop()},s.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0},s.prototype.parseText=function(){for(var e=this.token.text;"text"===this.peek().type;)e+="\n"+this.next().text;return this.inline.output(e)},s.prototype.tok=function(){switch(this.token.type){case"space":return"";case"hr":return this.renderer.hr();case"heading":return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text);case"code":return this.renderer.code(this.token.text,this.token.lang,this.token.escaped);case"table":var e,t,n,r,s,i="",a="";for(n="",e=0;e<this.token.header.length;e++)r={header:!0,align:this.token.align[e]},n+=this.renderer.tablecell(this.inline.output(this.token.header[e]),{header:!0,align:this.token.align[e]});for(i+=this.renderer.tablerow(n),e=0;e<this.token.cells.length;e++){for(t=this.token.cells[e],n="",s=0;s<t.length;s++)n+=this.renderer.tablecell(this.inline.output(t[s]),{header:!1,align:this.token.align[s]});a+=this.renderer.tablerow(n)}return this.renderer.table(i,a);case"blockquote_start":for(var a="";"blockquote_end"!==this.next().type;)a+=this.tok();return this.renderer.blockquote(a);case"list_start":for(var a="",l=this.token.ordered;"list_end"!==this.next().type;)a+=this.tok();
return this.renderer.list(a,l);case"list_item_start":for(var a="";"list_item_end"!==this.next().type;)a+="text"===this.token.type?this.parseText():this.tok();return this.renderer.listitem(a);case"loose_item_start":for(var a="";"list_item_end"!==this.next().type;)a+=this.tok();return this.renderer.listitem(a);case"html":var o=this.token.pre||this.options.pedantic?this.token.text:this.inline.output(this.token.text);return this.renderer.html(o);case"paragraph":return this.renderer.paragraph(this.inline.output(this.token.text));case"text":return this.renderer.paragraph(this.parseText())}},o.exec=o,h.options=h.setOptions=function(e){return u(h.defaults,e),h},h.defaults={gfm:!0,tables:!0,breaks:!1,pedantic:!1,sanitize:!1,sanitizer:null,mangle:!0,smartLists:!1,silent:!1,highlight:null,langPrefix:"lang-",smartypants:!1,headerPrefix:"",renderer:new r,xhtml:!1},h.Parser=s,h.parser=s.parse,h.Renderer=r,h.Lexer=t,h.lexer=t.lex,h.InlineLexer=n,h.inlineLexer=n.output,h.parse=h,e.exports=h}).call(function(){return this||("undefined"!=typeof window?window:t)}())}).call(t,n(11))},19:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function s(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var i=n(0),a=r(i),l=n(14),o=r(l);n(13),n(12),n(63);var u="",h=(0,a.default)("#md_container"),c=(0,a.default)(".doc-breadcrumb .crumb"),p=(0,a.default)(".sidebar li"),d="Beginner-AccessProcess",f=function(){h.find("p").each(function(e){(0,a.default)(this).attr("id","Q"+(e+1))})},g=function(){h.find("h1, h2").each(function(e,t){var n=(0,a.default)(t);n.attr("id",n.text())}),h.find("a[href]").each(function(e,t){var n=(0,a.default)(t);n.attr("href").indexOf("#")>=0&&n.attr("target","_blank")})},m=function(e){var t=a.default.Deferred();return a.default.ajax({type:"GET",url:"/data/"+e+".md",success:function(n){u=e,h.html((0,o.default)(n)),(0,a.default)("code").addClass("prettyprint"),PR.prettyPrint(),h.scrollTop(0),g(),e.indexOf("FAQ")>0&&f(),t.resolve()}}),t},b=function(e){var t=[];e.forEach(function(e,n){n>0&&(t=[].concat(s(t),["<li>",'    <span class="divider">&gt;</span>',"</li>"])),t=[].concat(s(t),["<li>","    <span>"+e+"</span>","</li>"])}),c.html(t.join("\r"))},v=function(){(0,a.default)(".leaf, .sdk-node, .guide-node").filter("[data-md]").on("click",function(e){var t=(0,a.default)(e.currentTarget),n=(0,a.default)(this),r=t.attr("data-md");p.removeClass("active"),n.addClass("active"),n.closest(".root").addClass("active");var s=[];if(n.parents(".non-leaf, .root").andSelf().find(">a").each(function(e,t){s.push((0,a.default)(t).text().trim())}),b(s),r===u){var i=n.text().trim(),l=(0,a.default)("#"+i);l.length>0&&l.first()[0].scrollIntoView({block:"start",behavior:"smooth"})}else m(r)})},y=function(){var e=(0,a.default)(".sidebar > h1"),t=(0,a.default)(".pm-button");e.click(function(e){t.toggleClass("active"),(0,a.default)(e.currentTarget).next().find(">ul").toggle(300)})},x=function(e){var t=(0,a.default)("[data-md="+e+"]").first(),n=[];t.parents(".submenu").css({display:"block"}).end().parents(".non-leaf, .root").andSelf().find(">a").each(function(e,t){n.push((0,a.default)(t).text().trim())}),b(n),t.addClass("active"),t.parents(".root").addClass("active")},k=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;e=e||d,x(e),m(e).then(function(){if(t){var e=(0,a.default)("#"+t);e.length>0&&e[0].scrollIntoView()}})};(0,a.default)("#jquery-accordion-menu").docAccordionMenu(),y(),v();var w=window.location.hash.split("#")[1]||"";k.apply(void 0,s(w.split("_")))},63:function(e,t){}},[130]);