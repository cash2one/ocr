webpackJsonp([1,0],[function(e,n,t){e.exports=t(1)},function(e,n,t){"use strict";t(2);var r=200,i="/",a={0:"locked",1:"live",2:"score"},l=function(e){return $.ajax({url:"/static/json/config.json",type:"get",contentType:"application/x-www-form-urlencoded; charset=UTF-8",dataType:"json",success:function(n){return e(n)}})};l(function(e){var n;return n=e,r=n.delay,i=n.uri,n});var c=function(){return!!window.navigator.userAgent.match(/AppleWebKit.*Mobile.*/)};$(function(){c()?$("body").on("touchstart",function(){$("nav").css({"background-color":"rgba(18,22,31,"+Math.min($(window).scrollTop(),r)/100})}):$(window).on("scroll",function(){$("nav").css({"background-color":"rgba(18,22,31,"+Math.min($(window).scrollTop(),r)/100})}),$(".btn-more-link").attr("href",c()?"http://m.news.baidu.com/news?ssid=0&from=0&bd_page_type=1&uid=&pu=sz%401320_480%2cosname%40iphone&ext=nt&fr=bdk2#/search/%E7%99%BE%E5%BA%A6%E5%A4%A7%E8%84%91%20%E6%9C%80%E5%BC%BA%E5%A4%A7%E8%84%91?_k=5z4ajs":"http://news.baidu.com/ns?cl=2&rn=20&tn=news&word=%E7%99%BE%E5%BA%A6%E5%A4%A7%E8%84%91%20%E6%9C%80%E5%BC%BA%E5%A4%A7%E8%84%91"),$(".btn-more-viewer").on("click",function(e){return $(e.currentTarget).parent("[data-target]").find("img:eq(0)").trigger("click")});var e=function(e,n){return $.ajax({url:i+"static/json/"+e+".json",type:"get",contentType:"application/x-www-form-urlencoded; charset=UTF-8",dataType:"json",success:function(e){return n(e)}})};e("news",function(e){$("[data-target=news]")[0].innerHTML=[].reduce.call(e,function(e,n){var t=n.active?'<li class="active">\n            <a href="'+n.link+'" target="_blank">\n              <figure>\n                <img src="'+n.poster+'">\n              </figure>\n              <h3>'+n.title+"</h3>\n            </a>\n          </li>":'<li>\n            <a href="'+n.link+'" target="_blank">\n              <h3>\n                <small>'+n.source+"</small>\n                "+n.title+"\n              </h3>\n              <p>"+n.content+"</p>\n            </a>\n          </li>";return n.active?t+e:e+t},"")}),e("video",function(e){var n=$("[data-target=video]").find(".video iframe")[0],t=$("[data-target=video]").find("ul")[0];$("[data-target=video]").find(".list")[0];t.innerHTML=[].reduce.call(e,function(e,t){return t.active&&(n.src=t.iqiyi),e+'<li data-iqiyi="'+t.iqiyi+'">\n        <figure>\n          <img src="'+t.shortcut+'">\n        </figure>\n      </li>'},""),UIkit.slideset($("[data-target=video]").find(".list")[0],{default:3,small:3,medium:4,large:5}),t.onclick=function(e){if(e.target&&"img"===e.target.nodeName.toLowerCase()){var r=e.target.parentElement.parentElement;[].forEach.call(t.querySelectorAll("li"),function(e){return e.classList.remove("on-play")}),r.classList.add("on-play"),n.src=r.dataset.iqiyi||n.src}}}),e("gallery",function(e){var n=$("[data-target=gallery]").find(".gallery")[0],t=$("[data-target=gallery]").find("ul")[0];n.innerHTML='<figure><img src="'+e.shift().url+'"></figure>',t.innerHTML=[].reduce.call(e,function(e,n){return e+'<li>\n        <figure>\n          <img src="'+n.url+'">\n        </figure>\n      </li>'},""),UIkit.slideset($("[data-target=gallery]").find(".list")[0],{default:3,small:3,medium:4,large:5}),$(".gallery__wrapper").viewer({toolbar:2})}),e("moment",function(e){var n=$(".moment figure"),t=e.splice(0,n.length);[].forEach.call(n,function(e,n){$(e).html('<img src="'+t[n].url+'">')}),[].forEach.call(e,function(e){$(".moment").append('<img style="display:none" src="'+e.url+'">')}),$(".moment").viewer({toolbar:2})}),e("score",function(e){var n=(new Date).valueOf(),t=$("[data-target=score]").find("ul")[0];t.innerHTML=[].reduce.call(e,function(t,r,i){var l=0;return n>new Date(e[i].begin_time).valueOf()&&(l+=1),n>new Date(e[i].end_time).valueOf()&&(l+=1),t+'<li class="'+(1===l?"live":"")+'">\n        <figure>\n          <img src="/static/images/score/b-'+(i+1)+"-"+a[l]+'.png">\n        </figure>'},"")})})},function(e,n){}]);