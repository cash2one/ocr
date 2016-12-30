{%extends file="brain/page/layout/layout.tpl"%}

{%block name="title"%}百度大脑{%/block%}
{%block name="seo_keywords"%}百度大脑,机器学习,大数据,图像识别,语音识别{%/block%}
{%block name="seo_description"%}{%/block%}
{%block name="head_static"%}
{%require name="brain:page/voice/voice.css"%}
{%require name="brain:page/voice/voice.js"%}
{%/block%}
{%block name="header"%}
{%/block%}
{%block name="content"%}
<style>
    .t-center {
        text-align: center;
    }

    td {
        padding: 10px 0;
    }

    input[type="text"] {
        line-height: 2;
        font-size: 18px;
    }
</style>
<div style="width: 1200px; margin: auto; min-height: 600px;">
    <form class="frm">
        <table style="width: 1200px;">
            <tr class="t-center">
                <td>标题</td>
                <td><input data-errmsg="标题不能为空" name="title" class="t-center" style="width: 100%;" type="text"/></td>
            </tr>
            <tr class="t-center">
                <td>作者</td>
                <td><input data-errmsg="作者不能为空" name="author" class="t-center" style="width: 100%;" type="text"/></td>
            </tr>
            <tr class="t-center">
                <td>Family链接</td>
                <td><input class="t-center" type="text" name="link" style="width: 100%"/></td>
            </tr>

            <tr class="t-center">
                <td>时间</td>
                <td><input class="t-center" type="text" name="time" style="width: 100%"/></td>
            </tr>
            <tr>
                <td colspan="2">
                    <textarea data-errmsg="正文不能为空" style="display: none" name="content" id="content" rows="10"
                              cols="80">
                        {%$content%}
                    </textarea>
                </td>
            </tr>
        </table>
        <div class="t-center">
            <span class="submit">提交</span>
        </div>
    </form>

</div>
<script src="/index/static/brain/page/modifynews/ckeditor/ckeditor.js"></script>
{%require name='brain:page/modifynews/editnews.tpl'%}{%/block%}

