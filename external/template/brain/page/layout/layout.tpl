<!DOCTYPE html>
{%html framework="brain:static/modjs/mod.js"%}
{%head%}
    <meta charset="utf-8" />
    <title>{%block name="title"%}{%/block%}</title>
    <meta name="keywords" content="{%block name="seo_keywords"%}{%/block%}" />
    <meta name="description" content="{%block name="seo_description"%}{%/block%}" />
    {%require name="brain:static/base/base.css"%}
    {%require name="brain:page/layout/layout.css"%}
    {%require name="brain:static/common/jquery-ui.css"%}
    {%require name="brain:static/common/jquery.js"%}
    {%require name="brain:static/common/jquery-ui-1.10.4.custom.js"%}
    <script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?fdad4351b2e90e0f489d7fbfc47c8acf";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
</script>
    {%block name="head_static"%}{%/block%}
{%/head%}
{%body%}
    <div class="wrapper">
        <div class="content-wrapper">
            {%block name="header"%}
                {%widget
                name="brain:widget/nav/nav.tpl"
                page_name="nav"
                %}
            {%/block%}
            <div class="main">
                {%block name="content"%}{%/block%}
            </div>
            {%block name="footer"%}
                {%widget
                name="brain:widget/footer/footer.tpl"
                page_name="footer"
                %}
            {%/block%}
        </div>
    </div>
{%require name='brain:page/layout/layout.tpl'%}{%/body%}
{%/html%}
