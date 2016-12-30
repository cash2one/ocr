<div class="messagebar">
    <img class="bell" src="/static/img/home/bell.png"></img>
    <div id="messagelist">
        {%foreach from=$messagelist item=row%}
            <span class="messageitem">·{%$row%}</span>
        {%/foreach%}
        <span class="more">更多</span>
    </div>
    <div id="how-to-start">
        <img src="/static/img/home/scope.png"class="icon"></img>
        <span class="copy">How to Start</span>
        <span class="hts up-arrow"></span>
    </div>
</div>
