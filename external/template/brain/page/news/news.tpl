{%extends file="brain/page/layout/layout.tpl"%}

{%block name="title"%}新闻动态-百度大脑{%/block%}
{%block name="seo_keywords"%}百度大脑,Baidu Brain,百度AI,百度大脑开放平台{%/block%}
{%block name="seo_description"%}百度大脑，汇集百度人工智能技术成果，已建成超大规模神经网络，拥有万亿级参数，能模拟人脑的工作机制，对开发者、创业者、企业等开放核心能力和底层技术。{%/block%}
{%block name="head_static"%}
{%require name="brain:page/news/news.css"%}
{%require name="brain:page/news/news.js"%}
{%/block%}
{%block name="header"%}
{%widget
name="brain:widget/nav/nav.tpl"
page_name="nav"
%}
{%/block%}
{%block name="content"%}
{%widget
name="brain:widget/news/news.tpl"
page_name="news"
%}
{%require name='brain:page/news/news.tpl'%}{%/block%}

