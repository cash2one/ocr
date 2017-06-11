{%extends file="brain/page/layout/layout.tpl"%}

{%block name="title"%}百度大脑{%/block%}
{%block name="seo_keywords"%}百度大脑,机器学习,大数据,图像识别,语音识别{%/block%}
{%block name="seo_description"%}{%/block%}
{%block name="head_static"%}
{%require name="brain:page/home/home.css"%}
{%require name="brain:page/home/home.js"%}
{%/block%}
{%block name="content"%}
<div class="body">
    <div class="a" style="position: relative; height: 500px ;background-size: cover;overflow: hidden">
        <div class="absolute b"
             data-anim="z-anim"
             data-anim-delay="1"
             style="width: 1200px; height: 100%; right: 0; margin: auto;"></div>
        <div class="absolute c"
             data-anim="s-anim"
             data-anim-delay="1"
             style="width: 1200px; height: 100%; right: 0; margin: auto;"></div>
        <div class="absolute d"
             data-anim="w-anim"
             data-anim-delay="1"
             style="width: 1200px; height: 100%; right: 0; margin: auto;"></div>
        <div class="absolute e"
             data-anim="b-anim"
             style="width: 1200px; height: 100%; right: 0; margin: auto;"></div>
        <div class="absolute" style="width: 1200px; height: 100%; right: 0; margin: auto;">
            <div style="position:absolute; width: 110px; height: 36px; left: 300px; top: 117px;">
                <a href="/bigData" style="display: block; height: 100%; cursor: pointer"></a>
            </div>
            <div style="position:absolute; width: 110px; height: 36px; left: 250px; top: 203px;">
                <a href="/easyDL" style="display: block; height: 100%; cursor: pointer"></a>
            </div>
            <div style="position:absolute; width: 110px; height: 36px; left: 290px; top: 278px;">
                <a href="/speech" style="display: block; height: 100%; cursor: pointer"></a>
            </div>
            <div style="position:absolute; width: 110px; height: 36px; left: 710px; top: 124px;">
                <a href="/userProfile" style="display: block; height: 100%; cursor: pointer"></a>
            </div>
            <div style="position:absolute; width: 110px; height: 36px; left: 810px; top: 217px;">
                <a href="/image" style="display: block; height: 100%; cursor: pointer"></a>
            </div>
            <div style="position:absolute; width: 110px; height: 36px; left: 790px; top: 342px;">
                <a href="/speech" style="display: block; height: 100%; cursor: pointer"></a>
            </div>
        </div>
    </div>
    <div style="height: 36px;line-height: 36px;background: #fafafa">
        <div class="bell"></div>
        <div class="js-content">
          <div class="add-news" style="overflow: auto; white-space: nowrap"></div>
        </div>
    </div>
    <div style="height: 526px; background-position: center -532px" class="sprite">
        <a href="/easyDL#intro" class="service-section" style="    position: absolute;
    cursor: pointer;
    width: 80px;
    left: 44px;
    top: 355px;">深度学习训练</a>
        <a href="/easyDL#intro" class="service-section" style="    position: absolute;
    cursor: pointer;
    width: 100px;
    left: 40px;
    top: 375px;">模型预测和评估</a>
        <a href="/easyDL#intro" class="service-section" style="    position: absolute;
    cursor: pointer;
    width: 55px;
    left: 44px;
    top: 395px;">数据分析</a>
        <a href="/easyDL#intro" class="service-section" style="    position: absolute;
    cursor: pointer;
    width: 55px;
    left: 44px;
    top: 414px;">特征工程</a>

        <a href="/easyDL" class="service-detail" style="    position: absolute;
    cursor: pointer;
    height: 36px;
    left: 51px;
    top: 440px;">了解详情</a>

        <a href="/bigData#intro" class="service-section" style="    position: absolute;
    cursor: pointer;
    width: 90px;
    left: 279px;
    top: 355px;">Global Session</a>
        <a href="/bigData#intro" class="service-section" style="    position: absolute;
    cursor: pointer;
    width: 110px;
    left: 283px;
    top: 375px;">到店大数据（谛听）</a>
        <a href="/bigData#intro" class="service-section" style="    position: absolute;
    cursor: pointer;
    width: 100px;
    left: 276px;
    top: 395px;">大数据知识图谱</a>
        <a href="/bigData" class="service-detail" style="    position: absolute;
    cursor: pointer;
    height: 36px;
    left: 288px;
    top: 440px;">了解详情</a>

        <a href="/image#intro" class="service-section" style="    position: absolute;
    cursor: pointer;
    width: 78px;
    left: 516px;
    top: 355px;">OCR文字识别</a>
        <a href="/image#intro" class="service-section" style="    position: absolute;
    cursor: pointer;
    width: 60px;
    left: 512px;
    top: 375px;">人脸识别</a>
        <a href="/image#intro" class="service-section" style="    position: absolute;
    cursor: pointer;
    width: 60px;
    left: 512px;
    top: 395px;">图像识别</a>
        <a href="/image#intro" class="service-section" style="    position: absolute;
    cursor: pointer;
    width: 60px;
    left: 512px;
    top: 415px;">图像搜索</a>
        <a href="/image" class="service-detail" style="    position: absolute;
    cursor: pointer;
    height: 36px;
    left: 522px;
    top: 440px;">了解详情</a>

        <a href="/speech#intro" class="service-section" style="    position: absolute;
    cursor: pointer;
    width: 60px;
    left: 748px;
    top: 355px;">语音识别</a>
        <a href="/speech#intro" class="service-section" style="    position: absolute;
    cursor: pointer;
    width: 60px;
    left: 748px;
    top: 375px;">语音合成</a>
        <a href="/speech#intro" class="service-section" style="    position: absolute;
    cursor: pointer;
    width: 60px;
    left: 748px;
    top: 395px;">声纹识别</a>
        <a href="/speech" class="service-detail" style="    position: absolute;
    cursor: pointer;
    height: 36px;
    left: 758px;
    top: 440px;">了解详情</a>

        <a href="/userProfile#intro" class="service-section" style="    position: absolute;
    cursor: pointer;
    width: 90px;
    height: 40px;
    left: 990px;
    top: 355px;">ID MAPPING & SOCIAL GRAPH</a>
        <a href="/userProfile#intro" class="service-section" style="    position: absolute;
    cursor: pointer;
    width: 85px;
    left: 990px;
    top: 395px;">USER PROFILE</a>
        <a href="/userProfile#intro" class="service-section" style="    position: absolute;
    cursor: pointer;
    width: 60px;
    left: 985px;
    top: 415px;">推荐服务</a>
        <a href="/userProfile" class="service-detail" style="    position: absolute;
    cursor: pointer;
    height: 36px;
    left: 995px;
    top: 440px;">了解详情</a>
    </div>
    <div style="background: #fafafa">
        <div style="height: 350px; background-position: center -1060px" class="sprite">
        <a href="mailto:ai-bp@baidu.com"
           style="text-align: center; font-size: 14px; font-weight: 200;background: #fafafa; color: #008cfa;outline: none; position: absolute;left: 322px;top: 41px; height: 20px; line-height: 18px;">ai-bp@baidu.com</a>
        </div>
    </div>
    <div style="height: 153px; background-position: center -1408px" class="sprite" id="contact-us">
        <a href="mailto:ai-bp@baidu.com" class="contact"
           style="outline: none; position: absolute;left: 355px;top: 89px;width: 145px;height: 30px; line-height: 24px;">ai-bp@baidu.com</a>
        <a href="baidu://addgroup/?id=1516306" class="contact"
           style="width: 75px; height: 25px; position: absolute; left: 86px; top: 92px; line-height: 24px;">1516306</a>
        <a href="http://hetu.baidu.com/api/area/ai" class="contact" target="_blank"
            style="width: 90px; height: 25px; position: absolute; left: 755px; top: 92px; line-height: 24px;">河图AI专区</a>
    </div>
</div>

{%require name='brain:page/home/home.tpl'%}{%/block%}
