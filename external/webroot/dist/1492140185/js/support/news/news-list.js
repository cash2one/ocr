duAI([28],{314:function(n,t,e){"use strict";var a=e(2),i=function(n){return n&&n.__esModule?n:{default:n}}(a);e(366),e(578);var l=parseInt((0,i.default)(".pg").data("total"),10)||1,u=parseInt((0,i.default)(".pg").data("offset"),10)||1,c=(0,i.default)(".pg").data("tag")||"",s=(0,i.default)(".pg").page({pageNum:10});s.onChange(function(n){location.href="/support/news?tag="+c+"&offset="+(n.index+1)}),s(10*l,u-1)},366:function(n,t,e){"use strict";function a(n,t,e){var a='<ul class="pn">';t.forEach(function(n){a+='<li data-l="'+n+'">'+n+"</li>"}),a+="</ul>",n.html(a),n.find("li").on("click",function(){e((0,l.default)(this).data("l"))})}var i=e(2),l=function(n){return n&&n.__esModule?n:{default:n}}(i);l.default.extend(l.default.fn,{page:function(n){function t(){var n='<div class="cfx" style="text-align: center">';n+=e(),n+=i(),n+="</div>",d.html(n)}function e(){for(var n='<div class="page" style="display: inline-block; vertical-align: middle"><span class="pg-func prev'+(0===r?" disabled":"")+'">上一页</span>',t=u(f,o),e=0;e<t;e++)e===r-3&&e>0&&(n+="<span>...</span>"),(e<r+3&&e>r-3||e===t-1||0===e)&&(n+='<span class="page-num'+(e===r?" pg-on":"")+'" data-index="'+e+'">'+(e+1)+"</span>"),e===r+3&&e<t-1&&(n+="<span>...</span>");return n+='<span class="pg-func next'+(r===t-1?" disabled":"")+'">下一页</span></div>'}function i(){return'<div style="display: inline-block; vertical-align: middle"><span style="margin-left: 20px"><form style="display: inline-block" class="sl-index" >去第<input style="text-align: center; margin:0 10px;width: 30px;height: 20px;color: #333333;" type="text" value="'+(r+1)+'"/>页</form></span></div>'}function u(n,t){return 1+~~((n-.1)/t)}function c(){t(),p.forEach(function(n){n({pageNum:o,index:r})})}function s(n,e){f=n,r=e||0,t()}var f,o=n.pageNum||10,r=0,p=[],d=this;return d.on("click",".prev",function(){r>0&&r--,c()}),d.on("click",".next",function(){var n=u(f,o);r<n-1&&r++,c()}),d.on("click",".page-num",function(){var n=(0,l.default)(this).data("index");r=~~n,c()}),d.on("click",".first",function(){r=0,c()}),d.on("click",".last",function(){r=u(f,o)-1,c()}),d.on("click",".page-tip",function(){var n=(0,l.default)(".pan",d);if(n.children().length)return void n.empty();a(n,[10,20,50],function(n){o=n,r=0,c()})}),d.on("submit",".sl-index",function(n){n.preventDefault();var t=parseInt((0,l.default)(this).find("input").val(),10);isNaN(t)&&(t=0),t<1&&(t=1),t>u(f,o)&&(t=u(f,o)),r=t-1,c()}),s.onChange=function(n){p.push(n)},Object.defineProperties(s,{pageNum:{get:function(){return o}},index:{get:function(){return r}}}),s}})},578:function(n,t){},726:function(n,t,e){n.exports=e(314)}},[726]);