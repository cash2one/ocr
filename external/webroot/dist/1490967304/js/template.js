!function(n){function a(e){if(i[e])return i[e].exports;var l=i[e]={i:e,l:!1,exports:{}};return n[e].call(l.exports,l,l.exports,a),l.l=!0,l.exports}var i={};a.m=n,a.c=i,a.i=function(n){return n},a.d=function(n,i,e){a.o(n,i)||Object.defineProperty(n,i,{configurable:!1,enumerable:!0,get:e})},a.n=function(n){var i=n&&n.__esModule?function(){return n.default}:function(){return n};return a.d(i,"a",i),i},a.o=function(n,a){return Object.prototype.hasOwnProperty.call(n,a)},a.p="//ai.bdstatic.com/dist/",a(a.s=451)}({228:function(n,a,i){n.exports='<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>{%$title%}</title>\n    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta name="keywords" content="{%$keyword%}">\n    <meta name="description" content="{%$description%}">\n    <meta name="baidu-site-verification" content="GOPjfm49Yc" />\n    <script src="https://hm.baidu.com/hm.js?fdad4351b2e90e0f489d7fbfc47c8acf"></script>\n    <!--[if lt IE 9]>\n    <script src="https://cdn.bootcss.com/modernizr/2.8.3/modernizr.min.js"></script>\n    <![endif]-->\n    <link rel="shortcut icon" href="'+i(313)+'">\n\n    <!--[if IE 9]>\n    <link rel="stylesheet" href="<%= htmlWebpackPlugin.files.chunks.ie9.css[0] %>">\n    <![endif]-->\n    <link rel="stylesheet" href="<%= htmlWebpackPlugin.files.chunks.base.css[0] %>">\n    <link rel="stylesheet" href="<%= htmlWebpackPlugin.options.cssFile %>">\n</head>\n<body class="ai-platform">\n<header class="header-nav">\n    <div class="container">\n        <div class="logo">\n            <a href="https://ai.baidu.com">\n                <img src="'+i(304)+'" alt="百度大脑">\n            </a>\n        </div>\n        <nav class="top-nav">\n            <ul>\n                <li><a href="/">首页</a></li>\n                <li>\n                    <a>技术服务</a>\n                    <ul class="sub-top-nav" id="tech-service">\n                        <li id="tech-speech">\n                            <div class="tech-title">\n                                <span class="tech-title-icon"></span>语音技术\n                            </div>\n                            <div class="sub-tech-title">\n                                <span>语音识别</span>\n                            </div>\n                            <ul class="tech-list">\n                                <li><a href="/tech/speech/asr">语音识别</a></li>\n                                <li><a href="/tech/speech/wake">语音唤醒</a></li>\n                            </ul>\n                            <div class="sub-tech-title">\n                                <span>语音合成</span>\n                            </div>\n                            <ul class="tech-list">\n                                <li><a href="/tech/speech/tts">语音合成</a></li>\n                            </ul>\n                        </li>\n                        <li id="tech-image">\n                            <div class="tech-title">\n                                <span class="tech-title-icon"></span>图像技术\n                            </div>\n                            <div class="sub-tech-title">\n                                <span>文字识别</span>\n                            </div>\n                            <ul class="tech-list">\n                                <li><a href="/tech/ocr/general">通用文字识别</a></li>\n                                <li><a href="/tech/ocr/idcard">身份证识别</a></li>\n                                <li><a href="/tech/ocr/bankcard">银行卡识别</a></li>\n                                <li>\n                                    <a href="/tech/ocr/general_enhanced" id="ocr-enhanced-link">\n                                        通用文字识别（含生僻字版）\n                                    </a>\n                                </li>\n                            </ul>\n                            <div class="sub-tech-title">\n                                <span>人脸识别</span>\n                            </div>\n                            <ul class="tech-list">\n                                <li><a href="/tech/face/detect">人脸检测</a></li>\n                                <li><a href="/tech/face/compare">人脸对比</a></li>\n                                <li><a href="/tech/face/search">人脸查找</a></li>\n                            </ul>\n                            <div class="sub-tech-title">\n                                <span>黄反识别</span>\n                            </div>\n                            <ul class="tech-list">\n                                <li><a href="/tech/antiporn">黄反识别</a></li>\n                            </ul>\n                        </li>\n                        <li id="tech-nlp">\n                            <div class="tech-title">\n                                <span class="tech-title-icon"></span>自然语言\n                            </div>\n                            <div class="sub-tech-title">\n                                <span>词汇级</span>\n                            </div>\n                            <ul class="tech-list">\n                                <li><a href="/tech/nlp/lexical">词法分析</a></li>\n                                <li><a href="/tech/nlp/word_embedding">中文词向量表示</a></li>\n                            </ul>\n                            <div class="sub-tech-title">\n                                <span>短文本级</span>\n                            </div>\n                            <ul class="tech-list">\n                                <li><a href="/tech/nlp/dnnlm_cn">中文DNN语言模型</a></li>\n                                <li><a href="/tech/nlp/simnet">短文本相似度</a></li>\n                                <li><a href="/tech/nlp/comment_tag">评论观点抽取</a></li>\n                            </ul>\n                            <div class="sub-tech-title">\n                                <span>机器翻译</span>\n                            </div>\n                            <ul class="tech-list">\n                                <li><a href="http://api.fanyi.baidu.com/api/trans/product/index" target="_blank">机器翻译平台</a></li>\n                            </ul>\n                        </li>\n                        <li id="tech-user-profile">\n                            <div class="tech-title">\n                                <span class="tech-title-icon"></span>用户画像\n                            </div>\n                            <div class="sub-tech-title">\n                                <span>用户画像</span>\n                            </div>\n                            <ul class="tech-list">\n                                <li><a href="http://datamart.baidu.com/datax-web/introduce_datax" target="_blank">用户画像平台</a></li>\n                            </ul>\n                            <div class="sub-tech-title">\n                                <span>推荐云平台</span>\n                            </div>\n                            <ul class="tech-list">\n                                <li><a href="http://recsys.baidu.com/" target="_blank">推荐云平台</a></li>\n                            </ul>\n                        </li>\n                        <li id="tech-machine-learning">\n                            <div class="tech-title">\n                                <span class="tech-title-icon"></span>机器学习\n                            </div>\n                            <div class="sub-tech-title">\n                                <span>PaddlePaddle</span>\n                            </div>\n                            <ul class="tech-list">\n                                <li><a href="http://www.paddlepaddle.org/" target="_blank">PaddlePaddle</a></li>\n                            </ul>\n                        </li>\n                        <li id="tech-ar">\n                            <div class="tech-title">\n                                <span class="tech-title-icon"></span>AR增强现实\n                            </div>\n                            <div class="sub-tech-title">\n                                <span>AR增强现实</span>\n                            </div>\n                            <ul class="tech-list">\n                                <li><a href="/tech/ar">AR内容平台</a></li>\n                            </ul>\n                        </li>\n                    </ul>\n                </li>\n                <li>\n                    <a>解决方案</a>\n                    <ul class="sub-top-nav">\n                        <li><a href="/solution/robot">机器人</a></li>\n                        <li><a href="/solution/faceprint">人脸核身</a></li>\n                        <li><a href="/solution/facegate">人脸闸机</a></li>\n                        <li><a href="/solution/dialog">号码风险识别</a></li>\n                    </ul>\n                </li>\n                <li>\n                    <a href="/docs">文档中心</a>\n                </li>\n                <li>\n                    <a href="/sdk">SDK下载</a>\n                </li>\n                <li>\n                    <a>帮助与支持</a>\n                    <ul class="sub-top-nav">\n                        <li><a href="/support/video">教学视频</a></li>\n                        <li><a href="/support/faq">常见问题</a></li>\n                        <li><a href="/support/news">新闻中心</a></li>\n                        <li><a href="http://developer.baidu.com/forum#ai">技术论坛</a></li>\n                        <li><a href="/support/about">关于我们</a></li>\n                    </ul>\n                </li>\n            </ul>\n        </nav>\n        <div class="login">\n            <ul>\n                {%if $userInfo eq Null%}\n                <li><a href="https://login.bce.baidu.com?fromai=1&redirect=https%3A%2F%2Fai.baidu.com">登录</a></li>\n                <li><a class="btn-primary free-demo" role="button" href="https://console.bce.baidu.com/?fromai=1#/aip/overview">免费试用</a></li>\n                {%/if%}\n                {%if $userInfo != Null%}\n                {%if $userInfo.internalLink !== Null%}\n                <li><a class="btn-other internal-link" role="button" href="{%$userInfo.internalLink%}">内部版本</a></li>\n                {%/if%}\n                <li>\n                    <a class="console" href="https://console.bce.baidu.com/?fromai=1#/aip/overview">控制台</a>\n                </li>\n                <li>\n                    <a>{%$userInfo.uname%}</a>\n                    <ul class="sub-top-nav">\n                        <li><a href="https://passport.baidu.com/?logout&u=https://ai.baidu.com">退出</a></li>\n                    </ul>\n                </li>\n                {%/if%}\n            </ul>\n        </div>\n    </div>\n</header>\n<div class="ai-platform page-content">\n    <%= require(\'view/\' +  htmlWebpackPlugin.options.mainContent + \'.html\') %>\n</div>\n<aside class="aside-action">\n    <ul>\n        <li class="consult">\n            <a id="ai-consult" data-spec="合作咨询"></a>\n        </li>\n        <li class="feedback">\n            <a data-spec="在线咨询"\n               href="https://ikefu.baidu.com/web/ai-platform"\n               target="_blank"\n               id="feedback-btn"></a>\n        </li>\n        <li class="back-top">\n            <a data-spec="返回顶部"></a>\n        </li>\n    </ul>\n</aside>\n<footer class="footer-nav">\n    <div class="container clear-float">\n        <div class="footer-links">\n            <nav class="quick-path">\n                <h3>控制台入口</h3>\n                <ul>\n                    <li><a href="https://console.bce.baidu.com/ai/?fromai=1#/ai/speech/overview/index">百度语音</a></li>\n                    <li><a href="https://console.bce.baidu.com/ai/?fromai=1#/ai/ocr/overview/index">文字识别</a></li>\n                    <li><a href="https://console.bce.baidu.com/ai/?fromai=1#/ai/face/overview/index">人脸识别</a></li>\n                    <li><a href="https://console.bce.baidu.com/ai/?fromai=1#/ai/nlp/overview/index">自然语言处理</a></li>\n                    <li><a href="https://console.bce.baidu.com/ai/?fromai=1#/ai/antiporn/overview/index">黄反识别</a></li>\n                </ul>\n            </nav>\n            <nav class="resource">\n                <h3>资源</h3>\n                <ul>\n                    <li><a href="/docs">新手指南</a></li>\n                    <li><a href="/docs">技术文档</a></li>\n                    <li><a href="/sdk">SDK下载</a></li>\n                </ul>\n            </nav>\n            <nav class="support">\n                <h3>支持与帮助</h3>\n                <ul>\n                    <li><a href="/support/video">教学视频</a></li>\n                    <li><a href="/support/faq">常见问题</a></li>\n                    <li><a href="/support/news">新闻中心</a></li>\n                    <li><a href="/support/about">关于我们</a></li>\n                </ul>\n            </nav>\n            <nav class="focus">\n                <h3>关注百度大脑</h3>\n                <div class="qr-code"></div>\n                <p>扫码关注官方公众号</p>\n                <a class="email-subscribe">邮件订阅</a>\n            </nav>\n        </div>\n        <div class="news">\n            <h3>新闻动态</h3>\n            <div class="news-container"></div>\n        </div>\n    </div>\n    <div class="container">\n        <nav class="friendly-links">\n            <h3>友情链接</h3>\n            <ul>\n                <li><a href="http://www.paddlepaddle.org/cn/index.html" target="_blank">PaddlePaddle机器学习平台</a></li>\n                <li><a href="http://yuyin.baidu.com/" target="_blank">百度语音</a></li>\n                <li><a href="http://fanyi.baidu.com/" target="_blank">百度翻译</a></li>\n                <li><a href="http://idl.baidu.com/" target="_blank">百度深度学习实验室</a></li>\n                <li><a href="http://bdp.baidu.com/" target="_blank">百度大数据+</a></li>\n                <li><a href="http://datamart.baidu.com/" target="_blank">百度大数据+数据开放平台</a></li>\n                <li><a href="http://recsys.baidu.com/" target="_blank">Recsys推荐云平台</a></li>\n                <li><a href="https://cloud.baidu.com/?t=cp:online-media%7Cci:%7Ccn:ai" target="_blank">百度云</a></li>\n                <li><a href="http://www.chuanke.com/" target="_blank">百度传课</a></li>\n                <li><a href="http://app.baidu.com" target="_blank">百度开发者平台</a></li>\n                <li><a href="http://zhongbao.baidu.com" target="_blank">百度数据众包</a></li>\n                <li><a href="http://union.baidu.com" target="_blank">百度联盟</a></li>\n                <li><a href="http://tongji.baidu.com" target="_blank">百度统计</a></li>\n            </ul>\n        </nav>\n    </div>\n    <div class="container">\n        <p class="copyright">©2017 Baidu <a href="https://www.baidu.com/duty/" target="_blank">使用百度必读</a></p>\n    </div>\n</footer>\n<script src="<%= htmlWebpackPlugin.options.jsCommonBundle %>"></script>\n<script src="<%= htmlWebpackPlugin.options.jsFile %>"></script>\n<script>\n    (function(){\n        var bp = document.createElement(\'script\');\n        var curProtocol = window.location.protocol.split(\':\')[0];\n        if (curProtocol === \'https\'){\n            bp.src = \'https://zz.bdstatic.com/linksubmit/push.js\';\n        }\n        else{\n            bp.src = \'http://push.zhanzhang.baidu.com/push.js\';\n        }\n        var s = document.getElementsByTagName("script")[0];\n        s.parentNode.insertBefore(bp, s);\n    })();\n</script>\n</body>\n</html>\n'},304:function(n,a){n.exports="//ai.bdstatic.com/dist/1490967304/ai_images/logo.png"},313:function(n,a){n.exports="//ai.bdstatic.com/dist/ai_images/favicon-32.ico"},451:function(n,a,i){n.exports=i(228)}});