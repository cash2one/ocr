{%extends file="brain/page/layout/layout.tpl"%}

{%block name="title"%}百度大脑{%/block%}
{%block name="seo_keywords"%}百度大脑,机器学习,大数据,图像识别,语音识别{%/block%}
{%block name="seo_description"%}{%/block%}
{%block name="head_static"%}
{%require name="brain:widget/news/news.css"%}
{%require name="brain:page/editnews/editor.css"%}
{%/block%}
{%block name="header"%}
{%widget
name="brain:widget/nav/nav.tpl"
page_name="nav"
%}
{%/block%}
{%block name="content"%}
<style>
    .lk {
        color: #008CFA;
    }

</style>
<div style="min-height: 500px; padding-bottom: 40px; position: relative;">
    <div class="news-hd"></div>
    <div style="width: 1000px;margin: auto">
        <div class="dt-title" style="padding: 40px 0 25px; border-bottom: 1px solid #eee;">
            <div class="dt-head" style="font-size: 24px; color: #333; margin-bottom: 10px">
                {%$data.title%}
            </div>
            <div style="font-size: 12px; color: #999">
                <span style="margin-right: 15px">
                    <script>document.write((function () {
                            function transformTime(time) {
                                var t = new Date(),
                                        year, month, date;
                                t.setTime(time);
                                year = t.getFullYear();
                                month = t.getMonth() + 1;
                                month = month < 10 ? ('0' + month) : month;
                                date = t.getDate();
                                date = date < 10 ? ('0' + date) : date;
                                return [year, month, date].join('-');
                            }

                            return transformTime(parseInt({%$data.time%}, 10) * 1000);
                        })())</script>
                </span>
                <span style="margin-right: 15px">{%$data.author%}</span>
                <span>{%$data.pv%}次浏览</span>
            </div>
        </div>
        <div class="ct cke_editable" style="position: relative; margin: 25px 0 0">
            {%$data.content%}
        </div>
        <a href="#" target="_blank" style="display: none; margin: 15px 0 0" class="lk">
            <svg style="width: 20px; vertical-align: middle" viewBox="0 0 500 500">
                <circle style="fill: currentColor" cx="253.9" cy="246.4" r="204.7" stroke-miterlimit="10"/>
                <circle cx="253.9" cy="246.4" fill="#FFFFFF" r="181.8" stroke-miterlimit="10"/>
                <polyline fill="none" points="  214.2,313.4 305.9,245 305.9,245 305.9,245 305.9,245 214.3,176.5 "
                          style="stroke: currentColor" stroke-linecap="round" stroke-linejoin="round"
                          stroke-miterlimit="10"
                          stroke-width="22"/>
            </svg>
            <span style="vertical-align: middle">查看原文参与互动</span>
        </a>
        <script>
            var link = '{%$data.link%}';
            if (link) {
                var d = document.querySelector('.lk');
                d.style.display = 'inline-block';
                d.href = link;
            }
        </script>
    </div>
    <div class="pg" style="position: absolute; bottom: 0; left: 0;height: 40px;width: 100%"></div>
</div>
<script>
    // document.querySelector('#nav-contact').parentNode.href = '/home#contact-us' ;
</script>
{%require name='brain:page/news/detail.tpl'%}{%/block%}

