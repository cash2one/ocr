{%extends file="brain/page/layout/layout.tpl"%}

{%block name="title"%}百度大脑{%/block%}
{%block name="seo_keywords"%}百度大脑,Baidu Brain,百度AI,机器学习,大数据,图像技术,语音技术,自然语言处理,用户画像{%/block%}
{%block name="seo_description"%}百度大脑，汇集百度人工智能技术成果，已建成超大规模神经网络，拥有万亿级参数，能模拟人脑的工作机制，对开发者、创业者、企业等开放核心能力和底层技术。{%/block%}
{%block name="head_static"%}
{%require name="brain:page/home/home.css"%}
{%require name="brain:page/home/home.js"%}
{%/block%}
{%block name="content"%}
<div> class="introduction">
    <h1>技术服务：机器学习、语音技术、图像技术、语音技术、用户画像</h1>
    <h2>应用场景</h2>
    <ol>
        <li>
            <h3>智慧物流</h3>
            <p><b>基于大数据分析能力和机器学习算法进行调度优化，太原铁路局提升物流调度效率达59%</b></p>
        </li>
        <li>
            <h3>用户个性化营销方案</h3>
            <p><b>O2O业务通过用户画像个性化营销模型进行个性化补贴，在同等预算下显著提升用户黏性</b></p>
        </li>
        <li>
            <h3>真人验证及实名认证</h3>
            <p><b>金融场景通过人脸识别，比对身份证照片，多方位验证用户身份，自助完成真人实名认证</b></p>
        </li>
    </ol>
</div>
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
            <div style="position:absolute; width: 110px; height: 36px; left: 270px; top: 120px;">
                <a href="./nlp" style="display: block; height: 100%; cursor: pointer"></a>
            </div>
            <div style="position:absolute; width: 110px; height: 36px; left: 290px; top: 257px;">
                <a href="./ml" style="display: block; height: 100%; cursor: pointer"></a>
            </div>
            <div style="position:absolute; width: 110px; height: 36px; left: 710px; top: 124px;">
                <a href="/userProfile" style="display: block; height: 100%; cursor: pointer"></a>
            </div>
            <div style="position:absolute; width: 110px; height: 36px; left: 810px; top: 217px;">
                <a href="./image" style="display: block; height: 100%; cursor: pointer"></a>
            </div>
            <div style="position:absolute; width: 110px; height: 36px; left: 790px; top: 342px;">
                <a href="./speech" style="display: block; height: 100%; cursor: pointer"></a>
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
        <a href="./ml#intro" class="service-section" style="    position: absolute;
    cursor: pointer;
    width: 104px;
    left: 35px;
    top: 348px;">多种深度学习模型</a>
        <a href="./ml#intro" class="service-section" style="    position: absolute;
    cursor: pointer;
    width: 80px;
    left: 35px;
    top: 368px;">高效模型训练</a>
        <a href="./ml#intro" class="service-section" style="    position: absolute;
    cursor: pointer;
    width: 91px;
    left: 35px;
    top: 388px;">模型预测和评估</a>
      <!--  <a href="/easyDL#intro" class="service-section" style="    position: absolute;
    cursor: pointer;
    width: 55px;
    left: 35px;
    top: 414px;">特征工程</a>-->

        <a href="./ml#intro" class="service-detail" style="    position: absolute;
    cursor: pointer;
    height: 36px;
    left: 51px;
    top: 445px;">了解详情</a>

        <a href="./speech#intro" class="service-section" style="    position: absolute;
    cursor: pointer;
    width: 60px;
    left: 267px;
    top: 327px;">语音识别</a>
        <a href="./speech#intro" class="service-section" style="    position: absolute;
    cursor: pointer;
    width: 52px;
    left: 271px;
    top: 347px;">语音合成</a>
        <!--
        <a href="/bigData#intro" class="service-section" style="    position: absolute;
    cursor: pointer;
    width: 100px;
    left: 276px;
    top: 395px;">大数据知识图谱</a>
    -->
        <a href="./speech#intro" class="service-detail" style="    position: absolute;
    cursor: pointer;
    height: 36px;
    left: 288px;
    top: 445px;">了解详情</a>

        <a href="./image#intro" class="service-section" style="    position: absolute;
    cursor: pointer;
    width: 31px;
    left: 510px;
    top: 347px;">OCR</a>
        <a href="./image#intro" class="service-section" style="    position: absolute;
    cursor: pointer;
    width: 60px;
    left: 506px;
    top: 367px;">人脸识别</a>
        <a href="./image#intro" class="service-section" style="    position: absolute;
    cursor: pointer;
    width: 60px;
    left: 506px;
    top: 386px;">色情识别</a>
       <!-- <a href="./image#intro" class="service-section" style="    position: absolute;
    cursor: pointer;
    width: 60px;
    left: 512px;
    top: 415px;">图像搜索</a> -->
        <a href="./image#intro" class="service-detail" style="    position: absolute;
    cursor: pointer;
    height: 36px;
    left: 524px;
    top: 445px;">了解详情</a>

        <a href="./nlp#intro" class="service-section" style="    position: absolute;
    cursor: pointer;
    width: 65px;
    left: 743px;
    top: 347px;">NLP Cloud</a>
        <a href="./nlp#intro" class="service-section" style="    position: absolute;
    cursor: pointer;
    width: 60px;
    left: 740px;
    top: 367px;">机器翻译</a>
        <a href="./nlp#intro" class="service-detail" style="    position: absolute;
    cursor: pointer;
    height: 36px;
    left: 760px;
    top: 445px;">了解详情</a>

        <a href="./userProfile#intro" class="service-section" style="    position: absolute;
    cursor: pointer;
    width: 55px;
    height: 40px;
    left: 978px;
    top: 346px;">用户画像</a>
        <!--<a href="/userProfile#intro" class="service-section" style="    position: absolute;
    cursor: pointer;
    width: 85px;
    left: 990px;
    top: 395px;">USER PROFILE</a>-->
        <a href="./userProfile#intro" class="service-section" style="    position: absolute;
    cursor: pointer;
    width: 60px;
    left: 975px;
    top: 367px;">推荐服务</a>
        <a href="./userProfile#intro" class="service-detail" style="    position: absolute;
    cursor: pointer;
    height: 36px;
    left: 995px;
    top: 445px;">了解详情</a>
    </div>
    <div style="background: #fafafa">
        <div style="height: 350px; background-position: center -1060px" class="sprite">
            <!--
        <a href="mailto:ai-bp@baidu.com"
           style="text-align: center; font-size: 14px; font-weight: 200;background: #fafafa; color: #008cfa;outline: none; position: absolute;left: 322px;top: 41px; height: 20px; line-height: 18px;">ai-bp@baidu.com</a>
           -->
        </div>
    </div>
    <div style="height: 153px; background-position: center -1408px" class="sprite" id="contact-us">
        <a href="mailto:ai@baidu.com" class="contact"
           style="text-align: left; outline: none; position: absolute;left: 120px;top: 91px;width: 145px;height: 30px; line-height: 24px;">ai@baidu.com</a>
        <a href="#" class="subscribe contact"
           style="text-align: left; outline: none; position: absolute;left: 404px;top: 91px;width: 145px;height: 30px; line-height: 24px;">邮件订阅</a>
        <a href="#" class="contact get-qr-code" role="button"
           style="width: 75px; height: 25px; position: absolute; left: 86px; top: 92px; line-height: 24px;">
           <span>点击获取公众号二维码</span>
           <img src="/index/static/brain/img/qr-code.png" style="display:none; position: absolute; left: 50%; top: 50%;margin: -70px 0 0 -70px;">
        </a>
    </div>
</div>

{%require name='brain:page/home/home.tpl'%}{%/block%}
