{%extends file="brain/page/layout/layout.tpl"%}

{%block name="title"%}用户画像-百度大脑{%/block%}
{%block name="seo_keywords"%}百度大脑,Baidu Brain,百度AI,百度大脑开放平台,用户画像{%/block%}
{%block name="seo_description"%}用户画像，基于海量互联网数据，利用大数据分析处理能力，理解用户特征、兴趣偏好，实现精准的用户分析和个性化推荐。{%/block%}
{%block name="head_static"%}
{%require name="brain:page/up/up.css"%}
{%require name="brain:page/up/up.js"%}
{%/block%}
{%block name="header"%}
    {%widget
    name="brain:widget/nav/nav.tpl"
    page_name="nav"
    %}
{%/block%}
{%block name="content"%}
    {%widget
    name="brain:widget/up/up.tpl"
    page_name="up"
    %}
{%require name='brain:page/up/up.tpl'%}{%/block%}

