{%extends file="brain/page/layout/layout.tpl"%}

{%block name="title"%}百度大脑{%/block%}
{%block name="seo_keywords"%}百度大脑,机器学习,大数据,图像识别,语音识别{%/block%}
{%block name="seo_description"%}{%/block%}
{%block name="head_static"%}
{%require name="brain:page/modifynews/modifynewslist.css"%}
{%require name="brain:page/modifynews/modifynewslist.js"%}
{%/block%}
{%block name="header"%}
{%widget
name="brain:widget/nav/nav.tpl"
page_name="nav"
%}
{%/block%}
{%block name="content"%}
<div style="min-height: 500px; padding-bottom: 60px; position: relative;">
    <div class="news-hd"></div>
    <div style="width: 1000px;margin: auto">
        <h3 style="color: #333;padding-top: 40px; padding-bottom: 20px; font-size: 24px; border-bottom: 1px solid #eee">
            编辑新闻</h3>

        <div class="lst">

        </div>
    </div>
    <div class="pg" style="position: absolute; bottom: 20px; left: 0;height: 40px;width: 100%"></div>
</div>
{%require name='brain:page/deletenews/modifynewslist.tpl'%}{%/block%}

