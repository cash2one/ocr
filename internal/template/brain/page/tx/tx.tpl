{%extends file="brain/page/layout/layout.tpl"%}

{%block name="title"%}百度大脑{%/block%}
{%block name="seo_keywords"%}百度大脑,机器学习,大数据,图像识别,语音识别{%/block%}
{%block name="seo_description"%}{%/block%}
{%block name="head_static"%}
{%require name="brain:page/tx/tx.css"%}
{%require name="brain:page/tx/tx.js"%}
{%/block%}
{%block name="content"%}
<div class="body">
    <div class="a" style="height: 500px; background-size: 100% 100%">
        <div class="sprite" style="height: 100%;background-position: center 0">
            <a class="absolute btn-bg-blue"
                style="height: 45px; width: 140px; left: 761px; top: 319px;"
            href="http://hetu.baidu.com/api/?categoryId=187" target="_blank"></a>
        </div>
    </div>
    <div class="sprite relative" style="height: 417px;background-position: center -500px" id="intro">
        <a class="absolute btn-bg-white"
           style="height: 30px;  width: 80px; left: 45px; top: 337px; line-height: 28px; text-align: center;"
           href="http://idl-api.baidu.com/?r=idl/tec" target="_blank">查看更多</a>
        <a class="absolute btn-bg-white"
           style="height: 30px;  width: 80px; left: 135px; top: 337px; line-height: 28px; text-align: center;"
           href="http://idl-api.baidu.com/?r=demo/ocr&type=LocateRecognize" target="_blank">技术体验</a>

        <a class="absolute btn-bg-white"
           style="height: 30px;  width: 80px; left: 356px; top: 337px; line-height: 28px; text-align: center;"
           href="http://idl-api.baidu.com/?r=idl/tec" target="_blank">查看更多</a>
        <a class="absolute btn-bg-white"
           style="height: 30px;  width: 80px; left: 446px; top: 337px; line-height: 28px; text-align: center;"
           href="http://idl-api.baidu.com/?r=demo/facebase" target="_blank">技术体验</a>

        <a class="absolute btn-bg-white"
           style="height: 30px;  width: 80px; left: 672px; top: 337px; line-height: 28px; text-align: center;"
           href="http://idl-api.baidu.com/?r=idl/tec" target="_blank">查看更多</a>
        <a class="absolute btn-bg-white"
           style="height: 30px;  width: 80px; left: 762px; top: 337px; line-height: 28px; text-align: center;"
           href="http://idl-api.baidu.com/?r=demo/democlass&type=class970" target="_blank">技术体验</a>

        <a class="absolute btn-bg-white"
           style="height: 30px;  width: 80px; left: 985px; top: 337px; line-height: 28px; text-align: center;"
           href="http://idl-api.baidu.com/?r=idl/tec" target="_blank">查看更多</a>
        <a class="absolute btn-bg-white"
           style="height: 30px;  width: 80px; left: 1075px; top: 337px; line-height: 28px; text-align: center;"
           href="http://stu.baidu.com" target="_blank">技术体验</a>
    </div>
    <div class="sep-line"></div>
    <div>
        <div class="sprite" style="height: 385px;background-position: center -917px;"></div>
    </div>
    <div class="sep-line"></div>
    <div>
        <div class="sprite" style="height: 110px;background-position: center -1302px;"></div>
    </div>

    <div class="s-w relative" style="height: 514px;overflow: hidden;">
        <div class="scroll" style="height: 100%; white-space: nowrap; font-size: 0;">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="tip-btn-w">
            <div class="tip-btn">拍照翻译</div>
            <div class="tip-btn">拍照搜索</div>
            <div class="tip-btn">刷脸身份证验证</div>
            <div class="tip-btn">图片质量管理</div>
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
        <div class="sprite" style="height: 172px;background-position: center -1925px">
            <a class="contact" href="mailto:ai-bp@baidu.com" style="outline: none; position: absolute; left: 565px; top: 106px; width: 150px; height: 30px;">ai-bp@baidu.com</a>
            <a class="contact" href="baidu://addgroup/?id=1516306" style="width: 80px; height: 25px; position: absolute; left: 290px; top: 109px;">1516306</a>
            <a class="contact" href="http://hetu.baidu.com/api/area/ai" style="width: 90px; height: 25px; position: absolute; left: 968px; top: 108px;" target="_blank">河图AI专区</a>
        </div>
    </div>
</div>

{%require name='brain:page/tx/tx.tpl'%}{%/block%}
