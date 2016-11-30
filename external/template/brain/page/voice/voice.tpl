{%extends file="brain/page/layout/layout.tpl"%}

{%block name="title"%}语音技术-百度大脑{%/block%}
{%block name="seo_keywords"%}百度大脑,Baidu Brain,百度AI,百度大脑开放平台,机器学习,语音技术{%/block%}
{%block name="seo_description"%}语音技术，多场景语音服务支持专家，让你的应用长上耳朵、开口说话。{%/block%}
{%block name="head_static"%}
{%require name="brain:page/voice/voice.css"%}
{%require name="brain:page/voice/voice.js"%}
{%/block%}
{%block name="header"%}
    {%widget
    name="brain:widget/nav/nav.tpl"
    page_name="nav"
    %}
{%/block%}
<div class="introduction">
    <h1>语音技术</h1>
    <p><b>多场景语音服务支持专家，让你的应用长上耳朵、开口说话</b></p>
    <ul>
        <li><b>语音识别</b></li>
        <li><b>语音合成</b></li>
    </ul>
</div>
{%block name="content"%}
    {%widget
    name="brain:widget/voice/voice.tpl"
    page_name="voice"
    %}
{%require name='brain:page/voice/voice.tpl'%}{%/block%}

