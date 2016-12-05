<!DOCTYPE html>
<html lang="en">
{%head%}
<meta charset="utf-8" />
<title>取消订阅-百度大脑</title>
<link rel="stylesheet" type="text/css" href="/index/static/brain/base/base.css">
<link rel="stylesheet" type="text/css" href="/index/static/brain/page/layout/layout.css">
<link rel="stylesheet" type="text/css" href="/index/static/brain/email/unsubscribe.css">
<script>
    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?fdad4351b2e90e0f489d7fbfc47c8acf";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
</script>
{%/head%}
<body class="unsubscribe">
<h1>取消订阅百度大脑邮件</h1>
<form action="/subscribe?action=unsubscribe" method="post">
    <input type="hidden" name="email">
    <input type="hidden" name="token">
    <label>您取消订阅的主要原因是：</label>
    <ul>
        <li><label><input type="radio" name="reason" value="内容缺乏时效性" checked>内容缺乏时效性</label></li>
        <li><label><input type="radio" name="reason" value="不关注此类信息">不关注此类信息</label></li>
        <li><label><input type="radio" name="reason" value="已没有阅读订阅邮件的习惯">已没有阅读订阅邮件的习惯</label></li>
        <li><label><input type="radio" name="reason" value="发送太频繁">发送太频繁</label></li>
    </ul>
    <label><input type="checkbox" name="follow" checked value="1">当百度大脑有重大活动和新闻时，仍然通知我</label>
    <div class="form-actions">
        <button type="submit" class="btn-primary">确定</button>
        <button type="button" class="btn-cancel" onclick="window.close();">取消</button>
    </div>
</form>
<script>
    var search = window.location.search;
    var tokenStr = search.match(/token=[a-zA-Z0-9]{32}/g);
    if (tokenStr) {
        document.querySelector('input[name="token"]').value = tokenStr[0].split('=')[1];
    } 
    var emailStr = search.match(/email=(\w)+(\.\w+)*@(\w)+((\.\w+)+)/g);
    if (emailStr) {
        document.querySelector('input[name="email"]').value = emailStr[0].split('=')[1];
    }
</script>
</body>
</html>
