duAI([21],{212:function(t,e,o){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}var a=o(1),l=n(a),i=o(19),d=n(i),s=o(249);o(293),o(332),(0,l.default)(document).ready(function(){(0,l.default)(".case-indicator > li").click(function(){var t=this;(0,l.default)(".case-indicator > li").each(function(e,o){(0,l.default)(o).toggleClass("active",e===(0,l.default)(t).index())}),(0,l.default)(".case-item").each(function(e,o){(0,l.default)(o).toggleClass("active",e===(0,l.default)(t).index())})}),(0,l.default)(window).scroll((0,d.default)(function(){(0,l.default)(document).scrollTop()>=100&&(0,l.default)(".tech-intro-detail").trigger("demo")},300)),(0,l.default)(".tech-intro-detail").one("demo",function(){(0,l.default)(this).find(".intro-demo").addClass("scanned")});var t=0,e=0;(0,l.default)(".refresh-demo").click(function(){e=0;var o=s.SIMNET_DATA[t++%s.SIMNET_DATA.length];(0,l.default)(".demo-input").html(o.text);var n=Object.keys(o.options).map(function(t){var n=["<li>",'    <a role="button" data-score="'+o.options[t]+'" class="btn-normal">'+t+"</a>","</li>"].join("");return e=o.options[t]>e?o.options[t]:e,(0,l.default)(n)});(0,l.default)("#demo-options").html(n).find("a.btn-normal").eq(0).click()}),(0,l.default)("#demo-options").on("click","a.btn-normal",function(){(0,l.default)("#demo-options .btn-normal").removeClass("selected");var t=(0,l.default)(this);t.addClass("selected");var o=parseFloat(t.attr("data-score"));(0,l.default)(".demo-score-detail").html(o).toggleClass("good",e===o).toggleClass("bad",e!==o)}),(0,l.default)(".refresh-demo").click()})},249:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.SIMNET_DATA=[{text:"车头如何放置车牌",options:{"前牌照怎么装":.761517,"如何办理北京车牌":.486205,"后牌照怎么装":.697181}},{text:"信号忽强忽弱",options:{"信号忽高忽低":.949734,"信号忽左忽右":.914491,"信号忽然中断":.695907}},{text:"如何学好深度学习",options:{"深入学习习近平讲话材料":.312354,"机器学习教程":.608247,"人工智能教程":.525389}},{text:"香蕉的翻译",options:{"香蕉用英文怎么说":.826361,"香蕉怎么吃":.579909,"桔子用英文怎么说":.52152}},{text:"小儿腹泻偏方",options:{"宝宝拉肚子偏方":.903965,"小儿感冒偏方":.740181,"腹泻偏方":.810619}},{text:"英雄联盟好玩吗，怎么升级",options:{"lol攻略":.589435,"英雄联盟服务器升级":.537899,"怎么打好lol":.664038}},{text:"红米更新出错",options:{"红米升级系统出错":.900544,"红米账户出错":.778519,"如何买到小米手机":.263091}},{text:"李彦宏是百度公司创始人",options:{"百度是李彦宏创办的":.877645,"马化腾创办了腾讯公司":.682594,"姚明是NBA的著名球星":.320592}},{text:"中国有五千年的历史",options:{"中国是个历史悠久的国家":.758613,"中国有很多少数民族":.583308,"中国有13亿人口":.649412}},{text:"北京成功申办了2008年奥运会",options:{"2008年奥运会在北京举行":.809656,"伦敦奥运会在2012年举行":.532129,"东京奥运会即将举办":.481673}}]},293:function(t,e){},332:function(t,e,o){t.exports=o.p+"./../../template/cloud/nlp-simnet.html"},447:function(t,e,o){t.exports=o(212)}},[447]);