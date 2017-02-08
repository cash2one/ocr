/**
* @file 错误页面脚本入口
* @author shiliang@baidu.com
*/
'use strict';

import $ from 'jquery';

import 'less/error.less';

$(document).ready(function () {
    let second = 4;
    setInterval(function () {
        $('#error-back').html(second-- + '秒后返回');
        if (second === 0) {
            window.open('//ai.baidu.com', '_self');
        }
    }, 1000);
});
