{%extends file="brain/page/layout/layout.tpl"%}

{%block name="title"%}自然语言-百度大脑{%/block%}
{%block name="seo_keywords"%}百度大脑,Baidu Brain,百度AI,百度大脑开放平台,自然语言{%/block%}
{%block name="seo_description"%}自然语言，基于自然语言处理技术，结合基于大数据挖掘产生的知识图谱及相关技术，对人类自然语言进行分析、理解、生成、翻译，实现自然的人机对话交互。{%/block%}
{%block name="head_static"%}
{%require name="brain:page/language/laguage.css"%}
{%require name="brain:page/language/language.js"%}
{%/block%}
{%block name="content"%}
<div class="introduction" style="position: fixed;top: 0;width: 100%;left: 0;color: transparent !important;z-index: -1;">
    <h1>自然语言</h1>
    <p><b>基于自然语言处理技术，结合基于大数据挖掘产生的知识图谱及相关技术，对人类自然语言进行分析、理解、生成、翻译，实现自然的人机对话交互</b></p>
    <ul>
        <li><b>NLP Cloud</b></li>
        <li><b>机器翻译</b></li>
    </ul>
</div>
<div class="body">
    <div class="a" style="height: 500px; background-size: 100% 100%">
        <div class="sprite" style="height: 100%;background-position: center 0">
            <!--
            <a class="absolute btn-bg-blue"
               style="height: 45px; width: 140px; left: 761px; top: 353px;"
               href="http://hetu.baidu.com/api/?categoryId=187" target="_blank"></a>
               -->
        </div>
    </div>
    <div class="sprite relative" style="height: 466px;background-position: center -500px" id="intro">
        <a class="absolute btn-bg-white"
           style="height: 30px;  width: 80px; left: 240px; top: 386px; line-height: 28px; text-align: center;"
           href="mailto:ai@baidu.com" target="_blank">技术咨询</a>
        <!--<a class="absolute btn-bg-white"
           style="height: 30px;  width: 80px; left: 285px; top: 361px; line-height: 28px; text-align: center;"
           href="http://idl-api.baidu.com/?r=demo/ocr&type=LocateRecognize" target="_blank">技术体验</a>
        -->
        <a class="absolute btn-bg-white"
           style="height: 30px;  width: 80px; left: 835px; top: 386px; line-height: 28px; text-align: center;"
           href="http://api.fanyi.baidu.com/api/trans/product/index" target="_blank">查看更多</a>
        <!--<a class="absolute btn-bg-white"
           style="height: 30px;  width: 80px; left: 925px; top: 361px; line-height: 28px; text-align: center;"
           href="http://idl-api.baidu.com/?r=demo/facebase" target="_blank">技术体验</a>
           -->
        <a class="absolute btn-bg-white"
           style="height: 30px;  width: 80px; left: 925px; top: 386px; line-height: 28px; text-align: center;"
           href="http://fanyi.baidu.com/" target="_blank">技术体验</a>
        <!--
        <a class="absolute btn-bg-white"
           style="height: 30px;  width: 80px; left: 762px; top: 337px; line-height: 28px; text-align: center;"
           href="http://idl-api.baidu.com/?r=demo/democlass&type=class970" target="_blank">技术体验</a>

        <a class="absolute btn-bg-white"
           style="height: 30px;  width: 80px; left: 985px; top: 337px; line-height: 28px; text-align: center;"
           href="http://idl-api.baidu.com/?r=idl/tec" target="_blank">查看更多</a>
        <a class="absolute btn-bg-white"
           style="height: 30px;  width: 80px; left: 1075px; top: 337px; line-height: 28px; text-align: center;"
           href="http://stu.baidu.com" target="_blank">技术体验</a>
           -->
    </div>
    <!--<div class="sep-line"></div>-->
    <div>
        <div class="sprite" style="height: 385px;background-position: center -965px;"></div>
    </div>
    <!--<div class="sep-line"></div>-->
    <div>
        <div class="sprite" style="height: 110px;background-position: center -1350px;"></div>
    </div>

    <div class="s-w relative" style="height: 514px;overflow: hidden;">
        <div class="scroll" style="width: 100%; height: 100%; white-space: nowrap; font-size: 0;">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="tip-btn-w">
            <div class="tip-btn">搜索知识问答</div>
            <div class="tip-btn">搜索推荐</div>
            <div class="tip-btn">度秘对话交互</div>
            <div class="tip-btn">新闻摘要生成</div>
            <div class="tip-btn">会话翻译</div>
            <div class="tip-btn">糯米评论分析</div>
        </div>
    </div>
    <!--
    <div style="background-color: #0077d5">
        <div class="sprite" style="height: 240px; background-position: center -1814px; ">
            <a href="#" style="    position: absolute;
    width: 260px;
    height: 65px;
    top: 123px;
    left: 0;"></a>
            <a href="http://idl-api.baidu.com/?r=demo/facebase" style=" position: absolute;
    width: 260px;
    height: 65px;
    top: 123px;
    left: 313px;"></a>
            <a href="http://idl-api.baidu.com/?r=demo/democlass&type=class970" style=" position: absolute;
    width: 260px;
    height: 65px;
    top: 123px;
    left: 626px;"></a>
            <a href="http://stu.baidu.com" style=" position: absolute;
    width: 260px;
    height: 65px;
    top: 123px;
    left: 939px;"></a>
        </div>
    </div>
    -->
    <!--
    <div class="sprite" style="height: 210px;background-position: center -2052px">
        <a style="position: absolute; left: 97px; top: 140px; width: 100px; height: 30px"
           href="http://hetu.baidu.com/api/platform/index?platformId=1533"></a>
        <a style="position: absolute; left: 404px; top: 140px; width: 100px; height: 30px"
           href="http://hetu.baidu.com/api/platform/index?platformId=1533"></a>
        <a style="position: absolute; left: 706px; top: 140px; width: 100px; height: 30px"
           href="http://hetu.baidu.com/api/platform/index?platformId=1533"></a>
        <a style="position: absolute; left: 1008px; top: 140px; width: 100px; height: 30px"
           href="http://hetu.baidu.com/api/platform/index?platformId=1533"></a>
    </div>
    -->
    <div style="background: #f5f5f5" id="contact-us">
        <div class="sprite" style="height: 172px;background-position: center -1982px">
            <a class="contact" href="mailto:ai@baidu.com"
               style="outline: none; position: absolute; left: 597px; top: 108px; width: 115px; height: 30px;">ai@baidu.com</a>
            <!--<a class="contact" href="baidu://addgroup/?id=1516306" style="width: 80px; height: 25px; position: absolute; left: 290px; top: 109px;">1516306</a>-->
            <!--<a class="contact" href="http://hetu.baidu.com/api/area/ai" style="width: 90px; height: 25px; position: absolute; left: 968px; top: 108px;" target="_blank">河图AI专区</a>-->
        </div>
    </div>
</div>

{%require name='brain:page/language/language.tpl'%}{%/block%}
