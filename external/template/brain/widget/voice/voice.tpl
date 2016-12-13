<div class="introduction" style="position: fixed;top: 0;width: 100%;left: 0;color: transparent !important;z-index: -1;">
    <h1>语音技术</h1>
    <p><b>多场景语音服务支持专家，让你的应用长上耳朵、开口说话</b></p>
    <ul>
        <li><b>语音识别</b></li>
        <li><b>语音合成</b></li>
    </ul>
</div>
<div class="top-section">
    <div class="top-pic">
            <!--<a class="btn-bg-blue"
                style="position: absolute; height: 45px; width: 140px; left: 758px; top: 318px;"
            href="http://hetu.baidu.com/api/?categoryId=188" target="_blank"></a>-->
    </div>
</div>
<div class="intro-section" id="intro">
    <div class="intro-pic">
        <a href="http://yuyin.baidu.com/asr?from=baiduAI" target="_blank">
            <div class="intro-detail" 
                style="left: 195px;"
            >查看详情</div>
        </a>
        <a href="http://yuyin.baidu.com/?from=baiduAI#try" target="_blank">
            <div class="intro-detail"
                style="left: 285px;"
            >技术体验</div>
        </a>
        <a href="http://yuyin.baidu.com/tts?from=baiduAI" target="_blank">
            <div class="intro-detail"
                style="left: 835px;"
            >查看详情</div>
        </a>
        <a href="http://yuyin.baidu.com/?from=baiduAI#try" target="_blank">
            <div class="intro-detail"
                style="left: 925px;"
            >技术体验</div>
        </a>
        <!--<a href="mailto:ai-bp@baidu.com">
            <div class="intro-detail"
                style="left: 989px;"
            >技术咨询</div>
        </a>-->
    </div>
</div>
<!--<div class="sep-line"></div>-->
<div class="advan-section">
    <div class="advan-pic">
    </div>
</div>
<!--<div class="sep-line"></div>-->
<div class="app-case"></div>
<div class="product-section">
    <div class="product-pic" style="overflow: hidden;">
        <ul class="scroll">
            <li class="slide-1"></li>
            <li class="slide-2"></li>
            <li class="slide-3"></li>
            <li class="slide-4"></li>
            <li class="slide-1"></li>
        </ul>
        <ul class="scroll-btn">
            <li class="tip-btn">语音搜索</li>
            <li class="tip-btn">智能电视</li>
            <li class="tip-btn">语音输入</li>
            <li class="tip-btn">小说阅读</li>
        </ul>
    </div>
</div>
<!--
<div class="experience-section">
    <div class="experience-pic">
        <a href="http://yuyin.baidu.com/#try" target="_blank">
            <div class="exp-detail exp-vr"></div>
            <div class="exp-detail exp-vr-hover"><span class="magic-bar"></span>语音识别</div>
        </a>
        <a href="http://yuyin.baidu.com/#try" target="_blank">
            <div class="exp-detail exp-vc"></div>
            <div class="exp-detail exp-vc-hover"><span class="magic-bar"></span>语音合成</div>
        </a>
        <div class="exp-detail exp-vwr"></div>
    </div>
</div>
<div class="api-section">
    <div class="api-pic">
        <a href="http://hetu.baidu.com/api/platform/index?platformId=1" target="_blank">
            <div class="api-detail api-vr"></div>
        </a>
        <a href="http://hetu.baidu.com/api/platform/index?platformId=754" target="_blank">
            <div class="api-detail api-vc"></div>
        </a>
        <div class="api-detail api-vwr"></div>
    </div>
</div>
-->
<div class="contact-section" id="contact-us">
    <div class="contact-pic">
        <a href="#" class="contact consult" style="text-align: left; outline: none; position: absolute;left: 125px;top: 107px;height: 30px; line-height: 24px;">立即提交</a>
        <a href="#" class="subscribe contact" style="text-align: left; outline: none; position: absolute;left: 369px;top: 107px;height: 30px; line-height: 24px;">邮件订阅</a>
        <a href="#" class="contact get-qr-code" role="button" style="width: 75px; height: 25px; position: absolute;width:175px; left: 550px; top: 107px; line-height: 24px;">
            <span>点击获取公众号二维码</span>
            <img src="/index/static/brain/page/home/img/qr-code.png" style="display:none; position: absolute; left: 50%; top: 50%;margin: -70px 0 0 -70px;">
        </a>
    </div>
</div>
{%script%}
    var voice = require('brain:widget/voice/voice.js');
    voice.init();
{%/script%}
