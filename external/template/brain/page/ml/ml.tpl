{%extends file="brain/page/layout/layout.tpl"%}

{%block name="title"%}机器学习-百度大脑{%/block%}
{%block name="seo_keywords"%}百度大脑,Baidu Brain,百度AI,百度大脑开放平台,机器学习{%/block%}
{%block name="seo_description"%}机器学习，开放易用的深度学习平台PaddlePaddle，为企业级应用和学术调研提供支持。{%/block%}
{%block name="head_static"%}
{%require name="brain:page/ml/ml.css"%}
{%require name="brain:page/ml/ml.js"%}
{%/block%}
{%block name="header"%}
    {%widget
    name="brain:widget/nav/nav.tpl"
    page_name="nav"
    %}
{%/block%}
{%block name="content"%}
    {%widget
    name="brain:widget/ml/ml.tpl"
    page_name="ml"
    %}
{%require name='brain:page/ml/ml.tpl'%}{%/block%}

